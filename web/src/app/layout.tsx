import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pen and Paper | School Supplies in Nairobi",
  description:
    "Textbooks, stationery, uniforms, and gifts from Pen and Paper in Tassia, Nairobi. Countrywide delivery available.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="min-h-screen antialiased font-body">{children}</body>
    </html>
  );
}
