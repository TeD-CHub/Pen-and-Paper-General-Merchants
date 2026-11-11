-- Pen and Paper: initial Supabase schema
-- Initial schema migration for a new Supabase project.
-- Do not put provider secrets in public.settings; use Supabase/Vercel secrets.

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = (select auth.uid())
      and p.role = 'admin'
  );
$$;

create or replace function public.create_profile_for_auth_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    nullif(trim(new.raw_user_meta_data ->> 'full_name'), '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger auth_user_profile
after insert on auth.users
for each row execute function public.create_profile_for_auth_user();

create or replace function public.protect_profile_role()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.role is distinct from old.role and not public.is_admin() then
    raise exception 'Only an admin can change a profile role';
  end if;
  return new;
end;
$$;

create trigger profiles_protect_role
before update on public.profiles
for each row execute function public.protect_profile_role();

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  code text not null unique check (code ~ '^[A-Z0-9]{2,8}$'),
  description text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.publishers (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  website_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.grades (
  id uuid primary key default gen_random_uuid(),
  curriculum_code text not null check (curriculum_code ~ '^[A-Z0-9]{2,8}$'),
  name text not null,
  code text not null check (code ~ '^[A-Z0-9]{1,8}$'),
  sort_order integer not null default 0,
  is_active boolean not null default true,
  unique (curriculum_code, code),
  unique (curriculum_code, name)
);

create table public.subjects (
  id uuid primary key default gen_random_uuid(),
  curriculum_code text not null check (curriculum_code ~ '^[A-Z0-9]{2,8}$'),
  name text not null,
  code text not null check (code ~ '^[A-Z0-9]{1,8}$'),
  sort_order integer not null default 0,
  is_active boolean not null default true,
  unique (curriculum_code, code),
  unique (curriculum_code, name)
);

-- Counter rows serialize SKU allocation per prefix and avoid sequence collisions.
create table public.sku_counters (
  prefix text primary key,
  last_value integer not null check (last_value > 0)
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  sku text unique,
  sku_type_code text not null default 'BK'
    check (sku_type_code ~ '^[A-Z0-9]{2,4}$'),
  curriculum_code text
    check (curriculum_code is null or curriculum_code ~ '^[A-Z0-9]{2,8}$'),
  category_id uuid not null references public.categories(id) on delete restrict,
  publisher_id uuid references public.publishers(id) on delete set null,
  grade_id uuid references public.grades(id) on delete set null,
  subject_id uuid references public.subjects(id) on delete set null,
  title text not null,
  slug text not null unique,
  description text,
  isbn text,
  price_kes numeric(12,2) not null check (price_kes >= 0),
  stock_on_hand integer not null default 0 check (stock_on_hand >= 0),
  low_stock_threshold integer not null default 5 check (low_stock_threshold >= 0),
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.assign_product_sku()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  category_code text;
  grade_code text;
  subject_code text;
  sku_prefix text;
  next_number integer;
begin
  if new.sku is not null then
    return new;
  end if;

  select c.code into category_code
  from public.categories c
  where c.id = new.category_id;

  if category_code is null then
    raise exception 'A valid category is required before assigning a SKU';
  end if;

  select g.code into grade_code
  from public.grades g
  where g.id = new.grade_id;

  select s.code into subject_code
  from public.subjects s
  where s.id = new.subject_id;

  sku_prefix := upper(concat_ws(
    '-',
    new.sku_type_code,
    coalesce(new.curriculum_code, 'GEN'),
    coalesce(grade_code, 'NA'),
    coalesce(subject_code, 'NA')
  ));

  insert into public.sku_counters (prefix, last_value)
  values (sku_prefix, 1)
  on conflict (prefix)
  do update set last_value = public.sku_counters.last_value + 1
  returning last_value into next_number;

  new.sku := sku_prefix || '-' || lpad(next_number::text, 4, '0');
  return new;
end;
$$;

create trigger products_assign_sku
before insert on public.products
for each row execute function public.assign_product_sku();

create or replace function public.guard_product_stock_changes()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    if new.stock_on_hand <> 0 then
      raise exception 'Set opening stock with an inventory movement';
    end if;
  elsif new.stock_on_hand is distinct from old.stock_on_hand
        and pg_trigger_depth() < 2 then
    raise exception 'Change stock by inserting an inventory movement';
  end if;
  return new;
end;
$$;

create trigger products_guard_stock
before insert or update of stock_on_hand on public.products
for each row execute function public.guard_product_stock_changes();

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  storage_path text not null unique,
  alt_text text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  county text,
  town text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.school_lists (
  id uuid primary key default gen_random_uuid(),
  school_id uuid references public.schools(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  name text not null,
  academic_year text,
  grade_name text,
  notes text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.school_list_items (
  id uuid primary key default gen_random_uuid(),
  school_list_id uuid not null references public.school_lists(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  item_title text not null,
  item_details text,
  quantity integer not null default 1 check (quantity > 0),
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.carts (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'active'
    check (status in ('active', 'converted', 'abandoned')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index carts_one_active_per_customer
  on public.carts(customer_id) where status = 'active';

create table public.cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid not null references public.carts(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  quantity integer not null check (quantity > 0),
  added_at timestamptz not null default now(),
  unique (cart_id, product_id)
);

create table public.discount_codes (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  description text,
  discount_type text not null check (discount_type in ('percentage', 'fixed')),
  discount_value numeric(12,2) not null check (discount_value > 0),
  minimum_subtotal_kes numeric(12,2) not null default 0
    check (minimum_subtotal_kes >= 0),
  starts_at timestamptz,
  expires_at timestamptz,
  usage_limit integer check (usage_limit is null or usage_limit > 0),
  per_customer_limit integer check (per_customer_limit is null or per_customer_limit > 0),
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (expires_at is null or starts_at is null or expires_at > starts_at),
  check (discount_type <> 'percentage' or discount_value <= 100)
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number bigint generated always as identity unique,
  customer_id uuid not null references public.profiles(id) on delete restrict,
  status text not null default 'pending'
    check (status in (
      'pending', 'paid', 'processing', 'out_for_delivery',
      'delivered', 'cancelled', 'refunded'
    )),
  currency text not null default 'KES' check (currency = 'KES'),
  subtotal_kes numeric(12,2) not null check (subtotal_kes >= 0),
  discount_kes numeric(12,2) not null default 0 check (discount_kes >= 0),
  delivery_fee_kes numeric(12,2) not null check (delivery_fee_kes >= 0),
  total_kes numeric(12,2) not null check (total_kes >= 0),
  discount_code_id uuid references public.discount_codes(id) on delete set null,
  discount_code_snapshot text,
  delivery_name text not null,
  delivery_phone text not null,
  delivery_email text,
  delivery_address text not null,
  delivery_town text,
  delivery_county text,
  customer_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  sku_snapshot text not null,
  title_snapshot text not null,
  unit_price_kes numeric(12,2) not null check (unit_price_kes >= 0),
  quantity integer not null check (quantity > 0),
  line_total_kes numeric(12,2) not null check (line_total_kes >= 0),
  created_at timestamptz not null default now()
);

create table public.inventory_movements (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete restrict,
  order_item_id uuid references public.order_items(id) on delete restrict,
  movement_type text not null
    check (movement_type in ('receipt', 'adjustment', 'sale', 'cancellation_return')),
  quantity_delta integer not null check (quantity_delta <> 0),
  note text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  check (
    (movement_type = 'sale' and quantity_delta < 0 and order_item_id is not null)
    or (movement_type = 'cancellation_return' and quantity_delta > 0 and order_item_id is not null)
    or (movement_type in ('receipt', 'adjustment') and order_item_id is null)
  )
);

create unique index inventory_order_item_movement_once
  on public.inventory_movements(order_item_id, movement_type)
  where order_item_id is not null;

create or replace function public.apply_inventory_movement()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  rows_updated integer;
begin
  update public.products
  set stock_on_hand = stock_on_hand + new.quantity_delta,
      updated_at = now()
  where id = new.product_id
    and stock_on_hand + new.quantity_delta >= 0;

  get diagnostics rows_updated = row_count;
  if rows_updated <> 1 then
    raise exception 'Inventory movement would make stock negative or product is missing';
  end if;
  return new;
end;
$$;

create trigger inventory_movements_apply_stock
after insert on public.inventory_movements
for each row execute function public.apply_inventory_movement();

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete restrict,
  provider text not null
    check (provider in ('intasend', 'pesapal', 'bank_transfer', 'cash_on_delivery')),
  status text not null default 'pending'
    check (status in ('pending', 'succeeded', 'failed', 'refunded')),
  amount_kes numeric(12,2) not null check (amount_kes >= 0),
  provider_reference text,
  idempotency_key text unique,
  metadata jsonb not null default '{}'::jsonb,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (provider, provider_reference)
);

create or replace function public.apply_successful_payment_to_stock()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_order public.orders%rowtype;
  order_line record;
begin
  if new.status <> 'succeeded' then
    return new;
  end if;
  if tg_op = 'UPDATE' then
    if old.status = 'succeeded' then
      return new;
    end if;
  end if;

  select * into current_order
  from public.orders
  where id = new.order_id
  for update;

  if new.provider = 'cash_on_delivery' then
    if current_order.status <> 'delivered' then
      raise exception 'Cash-on-delivery payment can only be recorded on delivery';
    end if;
  elsif current_order.status <> 'pending' then
    raise exception 'Prepaid payment can only be applied to a pending order';
  end if;
  if new.amount_kes <> current_order.total_kes then
    raise exception 'Payment amount must match the order total';
  end if;

  for order_line in
    select oi.id, oi.product_id, oi.quantity
    from public.order_items oi
    where oi.order_id = new.order_id
    order by oi.product_id
  loop
    if exists (
      select 1 from public.inventory_movements im
      where im.order_item_id = order_line.id
        and im.movement_type = 'sale'
    ) then
      continue;
    end if;

    insert into public.inventory_movements (
      product_id, order_item_id, movement_type, quantity_delta, note
    )
    values (
      order_line.product_id, order_line.id, 'sale',
      -order_line.quantity, 'Stock deducted after successful payment'
    )
    on conflict do nothing;
  end loop;

  if new.provider <> 'cash_on_delivery' then
    update public.orders
    set status = 'paid', updated_at = now()
    where id = new.order_id;
  end if;

  return new;
end;
$$;

create trigger payments_deduct_stock
after insert or update of status on public.payments
for each row execute function public.apply_successful_payment_to_stock();

create or replace function public.restore_stock_on_order_cancellation()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  order_line record;
  movement_id uuid;
begin
  if new.status <> 'cancelled' or old.status = 'cancelled' then
    return new;
  end if;

  for order_line in
    select oi.id, oi.product_id, oi.quantity
    from public.order_items oi
    where oi.order_id = new.id
    order by oi.product_id
  loop
    if exists (
      select 1 from public.inventory_movements im
      where im.order_item_id = order_line.id
        and im.movement_type = 'sale'
    ) then
      insert into public.inventory_movements (
        product_id, order_item_id, movement_type, quantity_delta, note
      )
      values (
        order_line.product_id, order_line.id, 'cancellation_return',
        order_line.quantity, 'Stock restored after order cancellation'
      )
      on conflict do nothing
      returning id into movement_id;

      movement_id := null;
    end if;
  end loop;

  return new;
end;
$$;

create or replace function public.enforce_order_status_flow()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.status = old.status then
    return new;
  end if;

  if not (
    (old.status = 'pending' and new.status in ('paid', 'processing', 'cancelled'))
    or (old.status = 'paid' and new.status in ('processing', 'cancelled', 'refunded'))
    or (old.status = 'processing' and new.status in ('out_for_delivery', 'cancelled', 'refunded'))
    or (old.status = 'out_for_delivery' and new.status in ('delivered', 'cancelled', 'refunded'))
    or (old.status = 'delivered' and new.status = 'refunded')
  ) then
    raise exception 'Invalid order status transition: % -> %', old.status, new.status;
  end if;
  if old.status = 'pending' and new.status = 'processing'
     and not exists (
       select 1 from public.payments p
       where p.order_id = new.id
         and p.provider = 'cash_on_delivery'
         and p.status = 'pending'
     ) then
    raise exception 'Only a cash-on-delivery order can enter processing before payment';
  end if;
  return new;
end;
$$;

create trigger orders_enforce_status_flow
before update of status on public.orders
for each row execute function public.enforce_order_status_flow();

create trigger orders_restore_stock_on_cancel
after update of status on public.orders
for each row execute function public.restore_stock_on_order_cancellation();

create table public.discount_redemptions (
  id uuid primary key default gen_random_uuid(),
  discount_code_id uuid not null references public.discount_codes(id) on delete restrict,
  order_id uuid not null unique references public.orders(id) on delete cascade,
  customer_id uuid not null references public.profiles(id) on delete restrict,
  redeemed_at timestamptz not null default now(),
  unique (discount_code_id, customer_id, order_id)
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  customer_id uuid not null references public.profiles(id) on delete cascade,
  rating smallint not null check (rating between 1 and 5),
  title text,
  body text not null,
  is_approved boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (product_id, customer_id)
);

create table public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.profiles(id) on delete set null,
  contact_name text not null,
  email text not null,
  phone text not null,
  school_or_business text,
  notes text,
  status text not null default 'new'
    check (status in ('new', 'reviewing', 'quoted', 'accepted', 'declined', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.quote_items (
  id uuid primary key default gen_random_uuid(),
  quote_request_id uuid not null references public.quote_requests(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  item_title text not null,
  item_details text,
  quantity integer not null check (quantity > 0),
  created_at timestamptz not null default now()
);

create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references public.profiles(id) on delete set null,
  title text not null,
  slug text not null unique,
  excerpt text,
  body_markdown text not null,
  cover_image_path text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (status <> 'published' or published_at is not null)
);

create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  consented_at timestamptz not null,
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.delivery_zones (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  county text,
  town text,
  fee_kes numeric(12,2) not null check (fee_kes >= 0),
  estimated_days_min integer check (estimated_days_min is null or estimated_days_min >= 0),
  estimated_days_max integer check (estimated_days_max is null or estimated_days_max >= 0),
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    estimated_days_min is null or estimated_days_max is null
    or estimated_days_max >= estimated_days_min
  )
);

create table public.settings (
  key text primary key,
  value jsonb not null,
  is_public boolean not null default false,
  updated_at timestamptz not null default now()
);

create index products_catalog_lookup
  on public.products(category_id, grade_id, subject_id)
  where is_active;
create index products_publisher_lookup on public.products(publisher_id);
create index school_lists_school_lookup on public.school_lists(school_id);
create index school_list_items_list_order
  on public.school_list_items(school_list_id, sort_order);
create index cart_items_cart_lookup on public.cart_items(cart_id);
create index orders_customer_recent on public.orders(customer_id, created_at desc);
create index order_items_order_lookup on public.order_items(order_id);
create index inventory_movements_product_recent
  on public.inventory_movements(product_id, created_at desc);
create index payments_order_lookup on public.payments(order_id);
create index reviews_approved_product on public.reviews(product_id, created_at desc)
  where is_approved;
create index quote_requests_recent on public.quote_requests(created_at desc);
create index blog_posts_published_recent on public.blog_posts(published_at desc)
  where status = 'published';

-- Keep updated_at consistent on mutable tables.
do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'profiles', 'categories', 'publishers', 'products', 'schools',
    'school_lists', 'carts', 'discount_codes', 'orders', 'payments',
    'reviews', 'quote_requests', 'blog_posts', 'delivery_zones'
  ]
  loop
    execute format(
      'create trigger %I before update on public.%I for each row execute function public.set_updated_at()',
      table_name || '_set_updated_at',
      table_name
    );
  end loop;
end;
$$;

-- RLS is enabled on all application tables. The service role bypasses RLS;
-- never expose its key in a browser bundle.
do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'profiles', 'categories', 'publishers', 'grades', 'subjects', 'sku_counters',
    'products', 'product_images', 'schools', 'school_lists', 'school_list_items',
    'carts', 'cart_items', 'discount_codes', 'orders', 'order_items',
    'inventory_movements', 'payments', 'discount_redemptions', 'reviews',
    'quote_requests', 'quote_items', 'blog_posts', 'newsletter_subscribers',
    'delivery_zones', 'settings'
  ]
  loop
    execute format('alter table public.%I enable row level security', table_name);
  end loop;
end;
$$;

-- Profiles: customers can see/update their own profile; only admins can manage roles.
create policy profiles_select_own_or_admin on public.profiles
  for select using ((select auth.uid()) = id or public.is_admin());
create policy profiles_update_own_or_admin on public.profiles
  for update using ((select auth.uid()) = id or public.is_admin())
  with check ((select auth.uid()) = id or public.is_admin());
create policy profiles_admin_all on public.profiles
  for all using (public.is_admin()) with check (public.is_admin());

-- Public catalogue/filter data.
create policy categories_public_read on public.categories
  for select using (is_active or public.is_admin());
create policy categories_admin_all on public.categories
  for all using (public.is_admin()) with check (public.is_admin());
create policy publishers_public_read on public.publishers
  for select using (true);
create policy publishers_admin_all on public.publishers
  for all using (public.is_admin()) with check (public.is_admin());
create policy grades_public_read on public.grades
  for select using (is_active or public.is_admin());
create policy grades_admin_all on public.grades
  for all using (public.is_admin()) with check (public.is_admin());
create policy subjects_public_read on public.subjects
  for select using (is_active or public.is_admin());
create policy subjects_admin_all on public.subjects
  for all using (public.is_admin()) with check (public.is_admin());
create policy products_public_read on public.products
  for select using (is_active or public.is_admin());
create policy products_admin_all on public.products
  for all using (public.is_admin()) with check (public.is_admin());
create policy product_images_public_read on public.product_images
  for select using (
    exists (
      select 1 from public.products p
      where p.id = product_id and (p.is_active or public.is_admin())
    )
  );
create policy product_images_admin_all on public.product_images
  for all using (public.is_admin()) with check (public.is_admin());

-- Schools and curated lists may be public; customer-created lists remain private.
create policy schools_public_read on public.schools
  for select using (is_active or public.is_admin());
create policy schools_admin_all on public.schools
  for all using (public.is_admin()) with check (public.is_admin());
create policy school_lists_select on public.school_lists
  for select using (
    is_published or created_by = (select auth.uid()) or public.is_admin()
  );
create policy school_lists_owner_insert on public.school_lists
  for insert with check (
    created_by = (select auth.uid()) and not is_published
  );
create policy school_lists_owner_update on public.school_lists
  for update using (created_by = (select auth.uid()))
  with check (created_by = (select auth.uid()) and not is_published);
create policy school_lists_owner_delete on public.school_lists
  for delete using (created_by = (select auth.uid()));
create policy school_lists_admin_all on public.school_lists
  for all using (public.is_admin()) with check (public.is_admin());
create policy school_list_items_select on public.school_list_items
  for select using (
    exists (
      select 1 from public.school_lists sl
      where sl.id = school_list_id
        and (sl.is_published or sl.created_by = (select auth.uid()) or public.is_admin())
    )
  );
create policy school_list_items_owner_manage on public.school_list_items
  for all using (
    exists (
      select 1 from public.school_lists sl
      where sl.id = school_list_id and sl.created_by = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1 from public.school_lists sl
      where sl.id = school_list_id and sl.created_by = (select auth.uid())
    )
  );
create policy school_list_items_admin_all on public.school_list_items
  for all using (public.is_admin()) with check (public.is_admin());

-- Cart rows and lines belong only to their authenticated customer.
create policy carts_owner_all on public.carts
  for all using (customer_id = (select auth.uid()))
  with check (customer_id = (select auth.uid()));
create policy cart_items_owner_all on public.cart_items
  for all using (
    exists (
      select 1 from public.carts c
      where c.id = cart_id and c.customer_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1 from public.carts c
      where c.id = cart_id and c.customer_id = (select auth.uid())
    )
  );
create policy carts_admin_all on public.carts
  for all using (public.is_admin()) with check (public.is_admin());
create policy cart_items_admin_all on public.cart_items
  for all using (public.is_admin()) with check (public.is_admin());

-- Pricing codes are deliberately not readable by customers; validate/redeem server-side.
create policy discount_codes_admin_all on public.discount_codes
  for all using (public.is_admin()) with check (public.is_admin());
create policy discount_redemptions_admin_all on public.discount_redemptions
  for all using (public.is_admin()) with check (public.is_admin());

-- Orders, lines, and payment records are read-only to customers.
-- Create/update them only in trusted server code after recalculating prices.
create policy orders_customer_read on public.orders
  for select using (customer_id = (select auth.uid()) or public.is_admin());
create policy orders_admin_all on public.orders
  for all using (public.is_admin()) with check (public.is_admin());
create policy order_items_customer_read on public.order_items
  for select using (
    exists (
      select 1 from public.orders o
      where o.id = order_id
        and (o.customer_id = (select auth.uid()) or public.is_admin())
    )
  );
create policy order_items_admin_all on public.order_items
  for all using (public.is_admin()) with check (public.is_admin());
create policy payments_customer_read on public.payments
  for select using (
    exists (
      select 1 from public.orders o
      where o.id = order_id
        and (o.customer_id = (select auth.uid()) or public.is_admin())
    )
  );
create policy payments_admin_all on public.payments
  for all using (public.is_admin()) with check (public.is_admin());
create policy inventory_movements_admin_all on public.inventory_movements
  for all using (public.is_admin()) with check (public.is_admin());

-- Reviews are public only after moderation; customers can submit but not self-approve.
create policy reviews_public_read_approved on public.reviews
  for select using (is_approved or customer_id = (select auth.uid()) or public.is_admin());
create policy reviews_customer_insert on public.reviews
  for insert with check (customer_id = (select auth.uid()) and not is_approved);
create policy reviews_admin_all on public.reviews
  for all using (public.is_admin()) with check (public.is_admin());

-- Quote requests/items: guest submissions are allowed; owners can read their own.
create policy quote_requests_insert on public.quote_requests
  for insert with check (
    status = 'new'
    and (customer_id is null or customer_id = (select auth.uid()))
  );
create policy quote_requests_owner_read on public.quote_requests
  for select using (
    customer_id = (select auth.uid()) or public.is_admin()
  );
create policy quote_requests_admin_all on public.quote_requests
  for all using (public.is_admin()) with check (public.is_admin());
create policy quote_items_owner_read on public.quote_items
  for select using (
    exists (
      select 1 from public.quote_requests qr
      where qr.id = quote_request_id
        and (qr.customer_id = (select auth.uid()) or public.is_admin())
    )
  );
create policy quote_items_insert on public.quote_items
  for insert with check (
    exists (
      select 1 from public.quote_requests qr
      where qr.id = quote_request_id
        and (
          (qr.customer_id is null and (select auth.uid()) is null)
          or qr.customer_id = (select auth.uid())
        )
    )
  );
create policy quote_items_admin_all on public.quote_items
  for all using (public.is_admin()) with check (public.is_admin());

-- Blog content and published delivery info are public.
create policy blog_posts_public_read on public.blog_posts
  for select using (status = 'published' or public.is_admin());
create policy blog_posts_admin_all on public.blog_posts
  for all using (public.is_admin()) with check (public.is_admin());
create policy newsletter_public_insert on public.newsletter_subscribers
  for insert with check (true);
create policy newsletter_admin_all on public.newsletter_subscribers
  for all using (public.is_admin()) with check (public.is_admin());
create policy delivery_zones_public_read on public.delivery_zones
  for select using (is_active or public.is_admin());
create policy delivery_zones_admin_all on public.delivery_zones
  for all using (public.is_admin()) with check (public.is_admin());
create policy settings_public_read on public.settings
  for select using (is_public or public.is_admin());
create policy settings_admin_all on public.settings
  for all using (public.is_admin()) with check (public.is_admin());

-- PostgreSQL grants are required in addition to RLS policies. Every application
-- table has RLS enabled above; these grants only permit policy-checked requests.
grant usage on schema public to anon, authenticated, service_role;
grant select, insert, update, delete on all tables in schema public
  to anon, authenticated, service_role;
grant usage, select on all sequences in schema public
  to anon, authenticated, service_role;

-- Product images are public; only admins may upload, replace, or delete them.
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy product_images_storage_public_read on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'product-images');
create policy product_images_storage_admin_insert on storage.objects
  for insert to authenticated
  with check (bucket_id = 'product-images' and public.is_admin());
create policy product_images_storage_admin_update on storage.objects
  for update to authenticated
  using (bucket_id = 'product-images' and public.is_admin())
  with check (bucket_id = 'product-images' and public.is_admin());
create policy product_images_storage_admin_delete on storage.objects
  for delete to authenticated
  using (bucket_id = 'product-images' and public.is_admin());
