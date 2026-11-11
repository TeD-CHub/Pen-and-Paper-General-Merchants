import Link from "next/link";
import { BookOpen, MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const footerLinks = [
  { href: "/#featured-textbooks", label: "Shop books" },
  { href: "/school-lists", label: "School lists" },
  { href: "/cart", label: "Your basket" },
];

export function SiteFooter() {
  const enquiryMessage =
    "Hi Pen and Paper, I have an enquiry about school books and supplies.";

  return (
    <footer className="mt-auto border-t border-purple-900 bg-purple-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-12 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Link
            href="/"
            aria-label="Pen and Paper home"
            className="inline-flex min-h-11 items-center gap-2 rounded-md font-heading text-lg font-extrabold text-white"
          >
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white">
              <BookOpen aria-hidden="true" size={18} />
            </div>
            Pen and Paper
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-6 text-purple-200/80">
            School books and everyday supplies for families and learning communities.
          </p>
          <p className="mt-2 text-sm text-purple-200/70">
            Tassia Complex, off Fedha Road, Nairobi
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-purple-200">
            Explore
          </h2>
          <ul className="mt-3 space-y-2">
            {footerLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="inline-flex min-h-8 items-center text-sm text-purple-200/80 hover:text-white transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-purple-200">
            Need a hand?
          </h2>
          <p className="mt-3 text-sm leading-6 text-purple-200/80">
            Ask about a book, school list, or order directly on WhatsApp.
          </p>
          <a
            href={getWhatsAppUrl(enquiryMessage)}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover transition-colors"
          >
            <MessageCircle aria-hidden="true" size={18} />
            Chat with us
          </a>
        </div>
      </div>

      <div className="border-t border-purple-900/60 bg-purple-950 py-4">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 text-xs text-purple-300/70 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© 2026 Pen and Paper Provisions. All rights reserved.</p>
          <p>Tassia Complex, off Fedha Road, Nairobi</p>
        </div>
      </div>
    </footer>
  );
}
