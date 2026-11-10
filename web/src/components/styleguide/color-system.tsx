import { BookOpen, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Price } from "@/components/ui/price";
import type { Product } from "@/types";

const palette = [
  {
    name: "Purple · brand",
    shades: ["#F8F5FA", "#EDE6F2", "#D8CBE3", "#BCA8CC", "#9E83B3", "#87699E", "#765392", "#63437C", "#4B3361", "#352347"],
  },
  {
    name: "Gold · primary actions",
    shades: ["#FBF7E8", "#F5EBC7", "#EBD89A", "#D9BD68", "#C3A33F", "#A98925", "#8A6B0E", "#705506", "#574205", "#403105"],
  },
  {
    name: "Cream · page surfaces",
    shades: ["#FFFEFA", "#FBF8F1", "#F5EFE3", "#E9E0D0", "#D8CAB4", "#C3B394", "#A89676", "#89785D", "#695B47", "#493F33"],
  },
  {
    name: "Charcoal · text & borders",
    shades: ["#F5F4F5", "#E8E6E9", "#D2CED4", "#B6B0B9", "#938B97", "#706875", "#574F5D", "#423A47", "#302A35", "#211C25"],
  },
  {
    name: "Lilac · section tints",
    shades: ["#FBF8FC", "#F3EDF7", "#E7DCEF", "#D6C1E3", "#BF9ED2", "#A47ABE", "#8657A5", "#6B4385", "#503265", "#362147"],
  },
  {
    name: "Teal · success only",
    shades: ["#EFF9F6", "#D5EFE8", "#A9DFD1", "#70C4B0", "#36A48E", "#12846F", "#006B59", "#005344", "#003D33", "#002A23"],
  },
  {
    name: "Coral · promo / warning / error",
    shades: ["#FFF5F1", "#FBE4DC", "#F4C7B9", "#EAA18D", "#D87860", "#C45743", "#A83D2F", "#873126", "#67251F", "#481A18"],
  },
];

const shades = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"];

const sampleProduct: Product = {
  id: "color-styleguide-sample",
  slug: "color-styleguide-sample",
  name: "Sample learner’s book",
  description: "Illustrative product for color styleguide only.",
  categoryId: "textbooks",
  sku: "PP-SAMPLE-STYLEGUIDE",
  curriculum: "CBE",
  publisher: "[SAMPLE PUBLISHER]",
  grade: "Grade 3",
  subject: "English",
  priceKsh: 1250,
  stockStatus: "in-stock",
  image: "/images/sample-product-placeholder.svg",
  isSample: true,
};

function ColorSwatches() {
  return (
    <div className="space-y-4">
      {palette.map((colorFamily) => (
        <div key={colorFamily.name}>
          <h3 className="mb-2 font-semibold text-text">{colorFamily.name}</h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 lg:grid-cols-10">
            {colorFamily.shades.map((color, index) => (
              <div key={color} className="min-w-0 overflow-hidden rounded-lg border border-border bg-white">
                <span
                  aria-hidden="true"
                  className="block h-9"
                  style={{ backgroundColor: color }}
                />
                <span className="block px-2 py-1 text-xs text-text">
                  {shades[index]} <span className="block text-text-muted">{color}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ComponentPreview({ variant }: { variant: "cream" | "white" }) {
  const isCream = variant === "cream";

  return (
    <section
      aria-label={`${isCream ? "Cream" : "White"} background component previews`}
      className={`overflow-hidden rounded-2xl border border-border p-4 sm:p-6 ${
        isCream ? "bg-background" : "bg-surface"
      }`}
    >
      <h3 className="font-heading text-lg font-extrabold text-text">
        On {isCream ? "cream" : "white"}
      </h3>
      <header className="mt-4 flex min-h-14 items-center justify-between gap-3 rounded-xl bg-primary px-4 text-primary-contrast">
        <span className="flex items-center gap-2 font-heading font-extrabold">
          <BookOpen aria-hidden="true" size={20} />
          Pen and Paper
        </span>
        <span className="flex items-center gap-2">
          <span className="hidden text-sm sm:inline">Shop</span>
          <Button className="min-h-10 px-3 py-1 text-sm">Cart</Button>
        </span>
      </header>

      <div className="mt-4 rounded-xl bg-primary p-5 text-white">
        <p className="text-sm font-bold uppercase tracking-wide text-white">
          Tassia Complex · Nairobi
        </p>
        <h4 className="mt-2 font-heading text-2xl font-extrabold">
          Ready for the school term?
        </h4>
        <p className="mt-2 text-base text-white">
          Find sample books and school-list essentials in one place.
        </p>
        <Button className="mt-4">Shop Books</Button>
      </div>

      <div className="mt-4 rounded-xl border border-border p-4">
        <h4 className="font-semibold text-text">Primary action states</h4>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Button>Default</Button>
          <Button className="hover:bg-accent-hover">Hover</Button>
          <Button className="focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-focus">
            Focus
          </Button>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-border bg-white p-4">
        <div className="relative aspect-[16/7] overflow-hidden rounded-lg bg-lilac-50">
          <div className="absolute inset-0 grid place-items-center text-sm font-bold text-primary">
            Sample product image
          </div>
          <span className="absolute left-2 top-2">
            <Badge tone="primary">SAMPLE</Badge>
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge status="in-stock" />
          <Badge status="low-stock" />
          <Badge status="out-of-stock" />
          <Badge status="sale" />
        </div>
        <h4 className="mt-3 font-heading font-extrabold text-text">
          {sampleProduct.name}
        </h4>
        <p className="mt-1 text-sm text-text-muted">
          {sampleProduct.grade} · {sampleProduct.publisher}
        </p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <Price amount={sampleProduct.priceKsh} className="font-bold text-text" />
          <Button className="min-h-10 px-3 py-1 text-sm">Add to Cart</Button>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Input
          id={`color-guide-name-${variant}`}
          label="Parent or student name"
          placeholder="Your name"
        />
        <Input
          id={`color-guide-error-${variant}`}
          label="Phone number"
          type="tel"
          error="Enter a valid phone number."
        />
      </div>

      <footer className="mt-4 rounded-xl bg-primary-dark px-4 py-3 text-sm text-white">
        Pen and Paper · Contact and delivery information: [PLACEHOLDER]
      </footer>
    </section>
  );
}

const contrastRows = [
  ["Body text on cream", "#211C25 / #FBF8F1", "15.74:1"],
  ["Body text on lilac", "#211C25 / #F3EDF7", "14.53:1"],
  ["Muted text on white", "#574F5D / #FFFFFF", "7.83:1"],
  ["Purple brand text on white", "#765392 / #FFFFFF", "6.14:1"],
  ["Purple text on lilac button hover", "#765392 / #EDE6F2", "5.03:1"],
  ["White text on purple header", "#FFFFFF / #765392", "6.14:1"],
  ["White text on deeper purple footer", "#FFFFFF / #63437C", "8.00:1"],
  ["White CTA text on gold", "#FFFFFF / #705506", "7.02:1"],
  ["White CTA text on gold hover", "#FFFFFF / #574205", "9.60:1"],
  ["Secondary action text on white", "#765392 / #FFFFFF", "6.14:1"],
  ["Info alert text on lilac", "#63437C / #EDE6F2", "6.55:1"],
  ["Disabled label on disabled surface", "#423A47 / #D2CED4", "7.01:1"],
  ["Teal in-stock label on tint", "#005344 / #D5EFE8", "7.47:1"],
  ["Success alert text on tint", "#005344 / #EFF9F6", "8.42:1"],
  ["Coral low-stock label on tint", "#873126 / #FBE4DC", "6.90:1"],
  ["Coral Sale label on tint", "#873126 / #FBE4DC", "6.90:1"],
  ["Warning alert text on tint", "#873126 / #FBE4DC", "6.90:1"],
  ["Error label on tint", "#67251F / #FFF5F1", "11.28:1"],
  ["Out-of-stock label", "#423A47 / #E8E6E9", "8.78:1"],
  ["Purple sample label on lilac", "#362147 / #F3EDF7", "12.46:1"],
  ["Coral danger button with white label", "#FFFFFF / #873126", "8.41:1"],
  ["Form border on white", "#938B97 / #FFFFFF", "3.29:1"],
  ["Form border on cream", "#938B97 / #FBF8F1", "3.10:1"],
  ["Disabled button border", "#706875 / #D2CED4", "3.44:1"],
  ["Focus ring on cream", "#765392 / #FBF8F1", "5.78:1"],
];

const purpleVariants = [
  {
    name: "Lighter · chosen",
    color: "#765392",
    whiteContrast: "6.14:1",
    note: "Brighter and welcoming; passes AA for white text.",
  },
  {
    name: "Deeper · comparison",
    color: "#421D63",
    whiteContrast: "13.23:1",
    note: "More formal and traditional, with stronger contrast.",
  },
];

export function ColorSystem() {
  return (
    <section aria-labelledby="color-system-heading" className="space-y-8">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-primary">
          Lighter purple variant · #765392
        </p>
        <h2
          id="color-system-heading"
          className="mt-1 font-heading text-2xl font-extrabold text-neutral-900 sm:text-3xl"
        >
          Brand colour system
        </h2>
        <p className="mt-2 max-w-3xl text-neutral-700">
          A lighter, welcoming purple for the brand, with gold reserved for primary actions. Teal is for success and stock availability; coral is for promotions, low stock and errors.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-4 sm:p-6">
        <ColorSwatches />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ComponentPreview variant="cream" />
        <ComponentPreview variant="white" />
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
        <h3 className="font-heading text-lg font-extrabold text-text">
          Purple depth alternatives
        </h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {purpleVariants.map((variant) => (
            <div
              key={variant.name}
              className="flex items-center gap-4 rounded-xl border border-border bg-background p-4"
            >
              <span
                aria-hidden="true"
                className="grid size-16 shrink-0 place-items-center rounded-xl font-bold text-white"
                style={{ backgroundColor: variant.color }}
              >
                Aa
              </span>
              <span>
                <span className="block font-bold text-text">{variant.name}</span>
                <span className="block font-mono text-sm text-text-muted">{variant.color}</span>
                <span className="block text-sm text-text-muted">
                  White text contrast {variant.whiteContrast}. {variant.note}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 rounded-2xl border border-border bg-surface p-5 sm:p-6 lg:grid-cols-2">
        <div>
          <h3 className="font-heading text-lg font-extrabold text-text">
            Semantic tokens
          </h3>
          <dl className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-2 text-sm">
            {[
              ["Background", "#FBF8F1"],
              ["Surface", "#FFFFFF"],
              ["Surface alt", "#F3EDF7"],
              ["Border", "#938B97"],
              ["Text / muted", "#211C25 / #574F5D"],
              ["Primary / hover", "#765392 / #63437C"],
              ["Primary contrast", "#FFFFFF"],
              ["Accent / hover", "#705506 / #574205"],
              ["Accent contrast", "#FFFFFF"],
              ["Success", "#005344"],
              ["Warning", "#873126"],
              ["Error", "#67251F"],
              ["Focus ring", "#765392"],
              ["Link", "#5B2A86"],
            ].map(([name, value]) => (
              <div key={name} className="contents">
                <dt className="text-text-muted">{name}</dt>
                <dd className="font-mono font-semibold text-text">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h3 className="font-heading text-lg font-extrabold text-text">
            Contrast checks · WCAG AA
          </h3>
          <p className="mt-1 text-sm text-text-muted">
            Body text ≥ 4.5:1; control boundaries ≥ 3:1. All listed pairs pass.
          </p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="py-2 pr-3 font-bold text-text">Use</th>
                  <th scope="col" className="py-2 pr-3 font-bold text-text">Pair</th>
                  <th scope="col" className="py-2 font-bold text-text">Ratio</th>
                </tr>
              </thead>
              <tbody>
                {contrastRows.map(([use, pair, ratio]) => (
                  <tr key={use} className="border-b border-charcoal-200">
                    <th scope="row" className="py-2 pr-3 font-medium text-text">{use}</th>
                    <td className="py-2 pr-3 font-mono text-xs text-text-muted">{pair}</td>
                    <td className="py-2 font-semibold text-success">{ratio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-white p-5">
          <h3 className="font-heading text-lg font-extrabold text-text">Do</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-text-muted">
            <li>Use purple for headers, footers, headings and trust areas.</li>
            <li>Keep gold for primary actions such as Add to Cart and Checkout.</li>
            <li>Pair teal and coral status colors with clear written labels.</li>
            <li>For print, use dark text, white paper, grey rules and written statuses.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-white p-5">
          <h3 className="font-heading text-lg font-extrabold text-text">Don’t</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-text-muted">
            <li>Use gold for ordinary badges, body copy or large background panels.</li>
            <li>Use teal decoratively or coral for ordinary links.</li>
            <li>Place pale gold or pale purple text on white.</li>
            <li>Rely on color alone for stock, errors or printed information.</li>
          </ul>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-xl bg-teal-50 p-4 text-success">
        <CheckCircle2 aria-hidden="true" className="mt-0.5 shrink-0" size={20} />
        <p>
          The lighter brand purple retains AA contrast for normal-size white text. Disabled buttons use a separate neutral surface and readable charcoal label.
        </p>
      </div>
    </section>
  );
}
