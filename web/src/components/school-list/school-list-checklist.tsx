"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type MouseEvent } from "react";
import { Check, Copy, MessageCircle, Printer, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Price } from "@/components/ui/price";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { Select } from "@/components/ui/select";
import { useCartStore } from "@/store/cart-store";
import type { Product, School, SchoolList } from "@/types";

interface SchoolListChecklistProps {
  school: School;
  schoolLists: SchoolList[];
  products: Product[];
  initialGrade?: string;
  slug: string;
}

function findSubstitute(product: Product, products: Product[]) {
  const gradeNumber = (grade: string) => Number(grade.match(/\d+/)?.[0] ?? 0);

  return products
    .filter((candidate) =>
      candidate.id !== product.id &&
      candidate.stockStatus !== "out-of-stock" &&
      candidate.subject === product.subject &&
      candidate.curriculum === product.curriculum,
    )
    .sort((left, right) => {
      const leftGrade = left.grade === product.grade ? 0 : 1;
      const rightGrade = right.grade === product.grade ? 0 : 1;
      return leftGrade - rightGrade ||
        Math.abs(gradeNumber(left.grade) - gradeNumber(product.grade)) -
          Math.abs(gradeNumber(right.grade) - gradeNumber(product.grade));
    })[0];
}

export function SchoolListChecklist({
  school,
  schoolLists,
  products,
  initialGrade,
  slug,
}: SchoolListChecklistProps) {
  const sortedLists = useMemo(
    () => [...schoolLists].sort((left, right) => left.grade.localeCompare(right.grade, undefined, { numeric: true })),
    [schoolLists],
  );
  const startingList = sortedLists.find((list) => list.grade === initialGrade) ?? sortedLists[0];
  const [selectedListId, setSelectedListId] = useState(startingList?.id ?? "");
  const selectedList = sortedLists.find((list) => list.id === selectedListId) ?? startingList;

  if (!selectedList) {
    return <p role="alert" className="rounded-xl bg-white p-5 text-neutral-900">No sample lists are available for this school yet.</p>;
  }

  return (
    <SchoolChecklist
      key={selectedList.id}
      school={school}
      schoolLists={sortedLists}
      selectedList={selectedList}
      onGradeChange={setSelectedListId}
      products={products}
      slug={slug}
    />
  );
}

interface SchoolChecklistProps extends Omit<SchoolListChecklistProps, "initialGrade"> {
  selectedList: SchoolList;
  onGradeChange: (id: string) => void;
}

function SchoolChecklist({
  school,
  schoolLists,
  selectedList,
  onGradeChange,
  products,
  slug,
}: SchoolChecklistProps) {
  const addItem = useCartStore((state) => state.addItem);
  const productById = useMemo(() => new Map(products.map((product) => [product.id, product])), [products]);
  const rows = useMemo(() => selectedList.items.map((item) => {
    const product = productById.get(item.productId);
    if (!product) throw new Error(`School list item references missing product: ${item.productId}`);
    const substitute = product.stockStatus === "out-of-stock" ? findSubstitute(product, products) : undefined;
    return { item, product, substitute, purchaseProduct: substitute ?? product };
  }), [productById, products, selectedList]);
  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    Object.fromEntries(rows.map(({ item, purchaseProduct }) => [purchaseProduct.id, item.quantity])),
  );
  const [selected, setSelected] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(rows.map(({ product, purchaseProduct }) => [
      purchaseProduct.id,
      product.stockStatus !== "out-of-stock" || Boolean(purchaseProduct.id !== product.id),
    ])),
  );
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const selectedRows = rows.filter(({ purchaseProduct }) => selected[purchaseProduct.id]);
  const total = selectedRows.reduce(
    (sum, { purchaseProduct }) => sum + purchaseProduct.priceKsh * (quantities[purchaseProduct.id] ?? 1),
    0,
  );

  function handleAddSelected() {
    setErrorMessage("");
    if (!selectedRows.length) {
      setErrorMessage("Tick at least one available item to add it to your cart.");
      return;
    }

    for (const { purchaseProduct } of selectedRows) {
      addItem(purchaseProduct.id, quantities[purchaseProduct.id] ?? 1);
    }
    setStatusMessage(`${selectedRows.length} selected ${selectedRows.length === 1 ? "item has" : "items have"} been added to your cart.`);
  }

  function listShareText() {
    const itemLines = rows.map(({ product, purchaseProduct }) => {
      const quantity = quantities[purchaseProduct.id] ?? 1;
      const name = product.stockStatus === "out-of-stock" && purchaseProduct.id !== product.id
        ? `${purchaseProduct.name} (suggested substitute for ${product.name})`
        : product.name;
      return `${selected[purchaseProduct.id] ? "[x]" : "[ ]"} ${name} × ${quantity}`;
    });
    return `${school.name} · ${selectedList.grade} sample book list\n${itemLines.join("\n")}\n\nSample list — please confirm titles and prices with the school and shop.`;
  }

  function listUrl() {
    return `${window.location.origin}/school-lists/${slug}?grade=${encodeURIComponent(selectedList.grade)}`;
  }

  async function copyListLink() {
    setErrorMessage("");
    try {
      if (!navigator.clipboard) throw new Error("Clipboard access is unavailable in this browser.");
      await navigator.clipboard.writeText(listUrl());
      setStatusMessage("School list link copied.");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Could not copy the school list link.");
    }
  }

  function printList() {
    window.print();
  }

  function shareViaWhatsApp(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const message = `${listShareText()}\n\nOpen list: ${listUrl()}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setStatusMessage("Opening WhatsApp with your school list.");
  }

  return (
    <div className="school-list-print">
      <div className="school-list-no-print grid gap-5 rounded-2xl border border-primary/15 bg-white p-5 shadow-card sm:grid-cols-[1fr_auto] sm:items-end sm:p-6">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-primary">{school.location} · {selectedList.academicYear}</p>
          <h1 className="mt-2 font-heading text-2xl font-extrabold text-neutral-900 sm:text-3xl">{school.name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <p className="text-neutral-700">Sample book list · {selectedList.items.length} items</p>
            <Badge tone="accent">Demo list</Badge>
          </div>
        </div>
        <div className="w-full sm:w-56">
          <Select
            id="school-list-grade"
            label="Choose grade"
            value={selectedList.id}
            onChange={(event) => onGradeChange(event.target.value)}
            options={schoolLists.map((list) => ({ value: list.id, label: list.grade }))}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 school-list-no-print">
        <Button variant="secondary" onClick={copyListLink}>
          <Copy aria-hidden="true" size={17} /> Copy list link
        </Button>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(listShareText())}`}
          onClick={shareViaWhatsApp}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-success px-4 py-2 font-semibold text-success hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
        >
          <MessageCircle aria-hidden="true" size={17} /> WhatsApp
        </a>
        <Button variant="ghost" onClick={printList}>
          <Printer aria-hidden="true" size={17} /> Print list
        </Button>
      </div>

      <p className="mt-3 text-sm text-neutral-600">
        These are sample items, not an official school list. Confirm every title and edition before ordering.
      </p>
      <p role="status" aria-live="polite" className="mt-2 text-sm font-semibold text-success school-list-no-print">{statusMessage}</p>
      {errorMessage ? <p role="alert" className="mt-2 text-sm font-semibold text-error school-list-no-print">{errorMessage}</p> : null}

      <h2 className="mt-7 font-heading text-xl font-extrabold text-neutral-900 print:mt-0">
        {school.name} · {selectedList.grade}
      </h2>
      <ul className="mt-3 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white">
        {rows.map(({ item, product, substitute, purchaseProduct }) => {
          const outOfStock = product.stockStatus === "out-of-stock";
          const quantity = quantities[purchaseProduct.id] ?? item.quantity;

          return (
            <li key={product.id} className="grid gap-3 p-4 sm:grid-cols-[auto_4.5rem_minmax(0,1fr)_auto] sm:items-center sm:gap-4">
              <div className="flex min-h-11 items-center sm:justify-center">
                {outOfStock ? (
                  <span className="grid size-6 place-items-center rounded border border-neutral-300 text-neutral-500" aria-label="Original item out of stock">
                    <span aria-hidden="true">—</span>
                  </span>
                ) : (
                  <Checkbox
                    id={`list-item-${product.id}`}
                    label=""
                    checked={Boolean(selected[purchaseProduct.id])}
                    onChange={(event) => setSelected((current) => ({ ...current, [purchaseProduct.id]: event.target.checked }))}
                    className="mt-0 size-11"
                    aria-label={`Include ${product.name}`}
                  />
                )}
              </div>
              <Image
                src={product.image}
                alt=""
                width={72}
                height={72}
                className="size-14 rounded-lg border border-neutral-200 bg-white object-contain p-1 sm:size-[4.5rem]"
              />
              <div className="min-w-0">
                <p className="font-semibold leading-6 text-neutral-900">
                  <span className="print:hidden">{product.name}</span>
                  {outOfStock && substitute && selected[purchaseProduct.id] ? (
                    <span className="hidden print:inline">
                      {purchaseProduct.name} (suggested substitute for {product.name})
                    </span>
                  ) : null}
                </p>
                <p className="text-sm text-neutral-600">{product.publisher} · {product.subject}</p>
                {outOfStock ? (
                  <div className="mt-2 rounded-lg bg-coral-50 p-3 text-sm text-warning">
                    <p className="font-bold">Out of stock</p>
                    {substitute ? (
                      <>
                        <p className="mt-1">
                          Suggested sample substitute: <Link href={`/product/${substitute.slug}`} className="font-semibold underline">{substitute.name}</Link>
                        </p>
                        <Checkbox
                          id={`substitute-${product.id}`}
                          label={`Add suggested substitute instead (${substitute.grade})`}
                          checked={Boolean(selected[purchaseProduct.id])}
                          onChange={(event) => setSelected((current) => ({ ...current, [purchaseProduct.id]: event.target.checked }))}
                          className="mt-2 size-11"
                        />
                      </>
                    ) : (
                      <p className="mt-1">No in-stock sample substitute found. Please ask us about alternatives.</p>
                    )}
                  </div>
                ) : null}
              </div>
              <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                <span aria-hidden="true" className="hidden size-5 items-center justify-center border border-black text-xs font-bold print:inline-flex">
                  {selected[purchaseProduct.id] ? "X" : ""}
                </span>
                {outOfStock && !substitute ? (
                  <span className="font-semibold text-warning">Unavailable</span>
                ) : (
                  <Price amount={purchaseProduct.priceKsh} className="font-heading font-extrabold text-primary" />
                )}
                {(!outOfStock || substitute) && selected[purchaseProduct.id] ? (
                  <QuantityStepper
                    label={purchaseProduct.name}
                    value={quantity}
                    onChange={(value) => setQuantities((current) => ({ ...current, [purchaseProduct.id]: value }))}
                  />
                ) : (
                  <span className="text-sm text-neutral-600">Qty: {item.quantity}</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 hidden items-center justify-between rounded-xl bg-secondary p-5 sm:flex">
        <div>
          <p className="text-sm text-neutral-700">{selectedRows.length} of {rows.length} items selected</p>
          <p className="mt-1 font-heading text-lg font-extrabold text-neutral-900">Estimated sample total</p>
        </div>
        <Price amount={total} className="font-heading text-xl font-extrabold text-primary" />
        <Button onClick={handleAddSelected} disabled={!selectedRows.length}>
          <ShoppingCart aria-hidden="true" size={18} /> Add all to cart
        </Button>
      </div>
      <p className="mt-3 text-right text-xs text-neutral-600">
        Sample prices only. Substitutes are suggestions, not school-approved replacements.
      </p>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-neutral-200 bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-raised sm:hidden school-list-no-print">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-neutral-600">{selectedRows.length} selected</p>
            <Price amount={total} className="font-heading font-extrabold text-primary" />
          </div>
          <Button onClick={handleAddSelected} disabled={!selectedRows.length} className="shrink-0">
            <Check aria-hidden="true" size={18} /> Add all to cart
          </Button>
        </div>
      </div>
    </div>
  );
}
