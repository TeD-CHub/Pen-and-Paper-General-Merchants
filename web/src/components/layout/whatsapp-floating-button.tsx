import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppFloatingButton() {
  const message =
    "Hi Pen and Paper, I have an enquiry. Could you please help me?";

  return (
    <a
      href={getWhatsAppUrl(message)}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Pen and Paper on WhatsApp"
      className="whatsapp-float fixed bottom-24 right-4 z-40 inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-4 font-bold text-white shadow-raised transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 sm:bottom-6 sm:right-6"
    >
      <MessageCircle aria-hidden="true" size={21} />
      <span>WhatsApp help</span>
    </a>
  );
}
