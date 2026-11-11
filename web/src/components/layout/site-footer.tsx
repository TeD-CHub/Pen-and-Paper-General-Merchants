import Link from "next/link";
import { BookOpen, MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const footerLinks = [
  { href: "/#featured-textbooks", label: "Shop books" },
  { href: "/school-lists", label: "School lists" },
  { href: "/partner-with-us", label: "Partner with us" },
  { href: "/cart", label: "Your basket" },
];

export function SiteFooter() {
  const enquiryMessage =
    "Hi Pen and Paper, I have an enquiry. Could you please help me?";

  return (
    <footer className="mt-auto border-t border-neutral-200 bg-white text-neutral-700">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-9 sm:px-6 sm:py-10 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Link
            href="/"
            aria-label="Pen and Paper home"
            className="inline-flex min-h-11 items-center gap-2 rounded-md font-heading text-lg font-extrabold text-primary"
          >
            <BookOpen aria-hidden="true" size={23} />
            Pen and Paper
          </Link>
          <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-600">
            School books and everyday supplies for families and learning communities.
          </p>
          <p className="mt-2 text-sm text-neutral-600">
            Tassia Complex, off Fedha Road, Nairobi
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="font-heading text-sm font-bold text-neutral-900">Explore</h2>
          <ul className="mt-2 space-y-1">
            {footerLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="inline-flex min-h-10 items-center rounded-sm text-sm text-neutral-700 underline-offset-4 hover:text-primary hover:underline"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-heading text-sm font-bold text-neutral-900">Need a hand?</h2>
          <p className="mt-2 text-sm leading-6 text-neutral-600">
            Ask about a book, school list, or order directly on WhatsApp.
          </p>
          <a
            href={getWhatsAppUrl(enquiryMessage)}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-md font-semibold text-primary underline-offset-4 hover:underline"
          >
            <MessageCircle aria-hidden="true" size={18} />
            Chat with us
          </a>
        </div>
      </div>

      <div className="border-t border-neutral-200 bg-secondary">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-sm text-neutral-600 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>
            Catalogue listings and prices are samples. Please confirm availability and final order
            details with us.
          </p>
          <p>© Pen and Paper</p>
        </div>
      </div>
    </footer>
  );
}
