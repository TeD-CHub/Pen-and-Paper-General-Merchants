const WHATSAPP_BUSINESS_NUMBER = "254797253949";

export function getWhatsAppUrl(message: string): string {
  const url = new URL(`https://wa.me/${WHATSAPP_BUSINESS_NUMBER}`);
  url.searchParams.set("text", message);
  return url.toString();
}
