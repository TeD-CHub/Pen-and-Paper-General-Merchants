"use client";

import { useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Drawer } from "@/components/ui/drawer";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Pagination } from "@/components/ui/pagination";
import { Price } from "@/components/ui/price";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { Radio } from "@/components/ui/radio";
import { Rating } from "@/components/ui/rating";
import { Select } from "@/components/ui/select";
import { ProductCardSkeleton, Skeleton } from "@/components/ui/skeleton";
import { Tabs } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Toast } from "@/components/ui/toast";

const sampleTabs = [
  { id: "overview", label: "Overview", content: <p>Product details and information.</p> },
  { id: "delivery", label: "Delivery", content: <p>Delivery details are [PLACEHOLDER].</p> },
  { id: "reviews", label: "Reviews", content: <p>Sample reviews are not real customer testimonials.</p> },
];

const faqItems = [
  {
    id: "sample-faq-one",
    title: "Can I order a school list?",
    content: <p>School-list ordering is a sample interface and is not connected to a live catalogue.</p>,
  },
  {
    id: "sample-faq-two",
    title: "Are these prices current?",
    content: <p>No. Prices on this styleguide are sample values for development only.</p>,
  },
];

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-6 space-y-4">
      <h2 id={`${id}-heading`} className="border-b border-neutral-200 pb-2 font-heading text-2xl font-extrabold text-neutral-900">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function StyleguidePage() {
  const [quantity, setQuantity] = useState(2);
  const [rating, setRating] = useState(4);
  const [page, setPage] = useState(2);
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(true);

  return (
    <main className="mx-auto max-w-5xl space-y-12 px-4 py-8 sm:px-6 sm:py-12">
      <header className="space-y-3">
        <p className="text-sm font-bold uppercase tracking-wide text-primary">Bright Desk design system</p>
        <h1 className="font-heading text-4xl font-extrabold text-neutral-900">UI styleguide</h1>
        <p className="max-w-3xl text-lg text-neutral-700">
          Reusable accessible interface components. All school and product examples here are sample content.
        </p>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Styleguide" }]} />
      </header>

      <Section id="buttons" title="Button">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Section>

      <Section id="form-controls" title="Form controls">
        <div className="grid gap-6 rounded-xl border border-neutral-200 bg-white p-5 md:grid-cols-2">
          <Input id="sample-name" label="Full name" placeholder="Enter your name" hint="Use the name for the order." />
          <Input id="sample-error" label="Phone number" error="Enter a valid phone number." aria-invalid="true" />
          <Select
            id="sample-grade"
            label="Grade"
            placeholder="Choose a grade"
            options={[
              { value: "1", label: "Grade 1" },
              { value: "2", label: "Grade 2" },
              { value: "3", label: "Grade 3" },
            ]}
          />
          <Textarea id="sample-notes" label="Order notes" rows={3} placeholder="Add a note (optional)" />
          <div className="space-y-3">
            <Checkbox id="sample-checkbox" label="Use this sample address" description="Demonstration checkbox." />
          </div>
          <fieldset className="space-y-3">
            <legend className="mb-2 font-semibold text-neutral-900">Fulfilment</legend>
            <Radio id="sample-pickup" name="sample-fulfilment" value="pickup" label="Pickup" />
            <Radio id="sample-delivery" name="sample-fulfilment" value="delivery" label="Delivery" description="Delivery details are [PLACEHOLDER]." />
          </fieldset>
        </div>
      </Section>

      <Section id="quantity" title="Quantity stepper">
        <QuantityStepper label="Sample exercise book" value={quantity} onChange={setQuantity} />
      </Section>

      <Section id="badges" title="Badges">
        <div className="flex flex-wrap items-center gap-3">
          <Badge status="in-stock" />
          <Badge status="low-stock" />
          <Badge status="out-of-stock" />
          <Badge status="sale" />
          <Badge tone="primary">Sample</Badge>
        </div>
      </Section>

      <Section id="cards" title="Card">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card title="Sample product card">
            <p className="text-neutral-700">A reusable surface for product information and actions.</p>
            <div className="mt-4"><Price amount={1250} originalAmount={1500} className="font-bold text-primary" /></div>
          </Card>
          <Card>
            <h3 className="font-heading text-lg font-bold text-neutral-900">Card without heading prop</h3>
            <p className="mt-2 text-neutral-700">Custom content can be used inside the card.</p>
          </Card>
        </div>
      </Section>

      <Section id="overlays" title="Modal and drawer">
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setModalOpen(true)}>Open modal</Button>
          <Button variant="secondary" onClick={() => setDrawerOpen(true)}>Open drawer / mobile sheet</Button>
        </div>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Sample modal">
          <p className="text-neutral-700">Native dialog provides modal semantics, Escape-to-close, and focus containment.</p>
          <Button className="mt-4" onClick={() => setModalOpen(false)}>Close</Button>
        </Modal>
        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Sample filters">
          <p className="text-neutral-700">On small screens, this drawer appears as a bottom sheet.</p>
          <Checkbox id="drawer-cbe" label="CBE sample books" className="mt-4" />
          <Button className="mt-5" onClick={() => setDrawerOpen(false)}>Apply sample filter</Button>
        </Drawer>
      </Section>

      <Section id="accordion" title="Accordion">
        <Accordion items={faqItems} />
      </Section>

      <Section id="tabs" title="Tabs">
        <Tabs label="Sample product information" tabs={sampleTabs} />
      </Section>

      <Section id="toast" title="Toast">
        {toastVisible ? (
          <div className="max-w-lg">
            <Toast
              title="Sample notification"
              message="This is a non-persistent styleguide toast."
              onDismiss={() => setToastVisible(false)}
            />
          </div>
        ) : (
          <Button variant="secondary" onClick={() => setToastVisible(true)}>Show toast again</Button>
        )}
      </Section>

      <Section id="pagination" title="Breadcrumb and pagination">
        <Pagination page={page} pageCount={5} onPageChange={(nextPage) => setPage(Math.max(1, Math.min(5, nextPage)))} />
        <p className="text-sm text-neutral-500" aria-live="polite">Current sample page: {page}</p>
      </Section>

      <Section id="loading" title="Skeleton loaders">
        <div className="grid gap-4 sm:grid-cols-3">
          <ProductCardSkeleton />
          <div className="space-y-3 rounded-xl border border-neutral-200 bg-white p-4">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </Section>

      <Section id="rating-and-price" title="Rating and Price">
        <div className="flex flex-wrap items-center gap-6">
          <Rating value={4} label="Sample read-only rating" />
          <div className="flex items-center gap-2">
            <span className="font-semibold">Interactive sample rating</span>
            <Rating value={rating} onChange={setRating} label="Choose a sample rating" />
          </div>
          <Price amount={1250} originalAmount={1500} className="font-heading text-xl font-extrabold text-primary" />
        </div>
      </Section>

      <Section id="states" title="Empty state and alerts">
        <EmptyState
          title="No sample results"
          description="Try changing a filter or search term. This is placeholder content."
          action={<Button variant="secondary">Clear sample filters</Button>}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <Alert variant="info" title="Information">This product data is for demonstration.</Alert>
          <Alert variant="success" title="Success">Your sample list is ready.</Alert>
          <Alert variant="warning" title="Check sample details">Confirm real prices and stock before launch.</Alert>
          <Alert variant="error" title="Unable to continue">This is an example error alert.</Alert>
        </div>
      </Section>

      <footer className="border-t border-neutral-200 pt-5 text-sm text-neutral-500">
        Styleguide examples are not real products, reviews, or business policies.
      </footer>
    </main>
  );
}
