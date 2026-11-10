# Pen and Paper storefront frontend

Frontend-only Next.js App Router storefront with the approved lighter purple visual direction.
All products, school lists, reviews, and articles are mock data marked as
sample. Do not treat sample prices, publishers, schools, stock, reviews, or
articles as real business information.

## Create a fresh project

Run this from the directory in which you want the new app:

```bash
npx create-next-app@latest pen-and-paper-web --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd pen-and-paper-web
npm install zustand lucide-react clsx
```

For this existing checkout, the Next.js + TypeScript + Tailwind app already
exists in this directory. From `web/`, install the added dependencies with:

```bash
npm install zustand lucide-react clsx
```

## Project structure

```text
src/
  app/                 Next.js App Router routes and global styles
  components/
    ui/                Shared interface primitives
    layout/            Site header and layout pieces
    product/           Product catalogue components
    school-list/       School-list components
    cart/              Cart interface pieces
    checkout/          Checkout interface pieces
  data/                Typed, clearly marked sample datasets
  lib/api.ts           Async data-access functions (replace implementation for a backend)
  store/               Zustand browser state, persisted in localStorage
  types/               Shared TypeScript domain types
public/images/          Local sample image placeholder
tailwind.config.js      Lighter purple design tokens
```

## Design tokens

- **Brand purple:** lighter variant `#765392`; hover `#63437C`
- **Primary actions:** warm gold `#705506`; hover `#574205`; white button text
- **Surfaces:** cream `#FBF8F1`, white `#FFFFFF`, soft lilac `#F3EDF7`
- **Text:** charcoal `#211C25`; muted `#574F5D`; visible borders `#938B97`
- **Status:** teal success `#005344`, coral warning `#873126`, deep coral error `#67251F`
- **Focus and links:** focus ring `#765392`; link `#5B2A86`
- **Fonts:** Manrope headings and Source Sans 3 body, with system fallbacks
- **Type scale:** 12px through 48px; base body text is 16px
- **Spacing:** Tailwind spacing scale plus 4.5rem, 5.5rem, and 6.5rem
- **Radius:** 6px, 10px, 16px, 24px, and pill
- **Shadows:** card, raised, and focus

Tailwind 4 is used in this starter. Tokens are defined in
`tailwind.config.js` and loaded from the global stylesheet with `@config`.
Global styles provide visible keyboard focus rings and reduced-motion support.
The full 50–900 palette, semantic tokens, example component states, contrast
checks, print notes, and usage guidance are shown at `/styleguide`.

The lighter purple variant retains WCAG AA contrast for normal-size white text.
Primary actions use the darker gold shade (`#705506`) with white text; gold is
not used for body text or ordinary badges. State colors use explicit labels and
tinted surfaces, and important print content remains legible in grayscale.

## Run and check

From `web/`:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You should see the lighter
purple sample storefront, sample textbook catalogue, school-list finder, and
cart counter. Product photos are local placeholders; prices and school lists
are sample data, not actual shop information.

Open [http://localhost:3000/styleguide](http://localhost:3000/styleguide) to
preview the reusable components and their interactive states. Import named
components from `@/components/ui` or individual component modules.

The school-list experience is available at `/school-lists`, with individual
sample checklists at `/school-lists/[slug]` and the school enquiry page at
`/partner-with-us`. The lists support grade selection, selecting items,
quantity changes, sample totals, cart actions, sharing, and printing. Request,
review, and partnership forms are frontend demos and do not send or store
submissions. All sample school names, list contents, availability, and prices
must be replaced or confirmed before launch.

Check lint and production compilation:

```bash
npm run lint
npm run build
```

Google Fonts are requested from Google Fonts in the browser; system font
fallbacks keep the layout usable if those fonts are unavailable.
