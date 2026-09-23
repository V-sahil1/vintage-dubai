import Icon from "./Icon";
import { whatsappLink } from "@/lib/site";

export default function ConciergeButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="VIP Concierge on WhatsApp"
      className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 flex items-center gap-space-xs px-3 md:px-space-md py-3 rounded-sm bg-primary-container text-on-primary-container font-headline-sm text-body-sm font-bold shadow-[0_0_24px_rgba(212,175,55,0.35)] hover:shadow-[0_0_36px_rgba(212,175,55,0.6)] transition-all"
    >
      <Icon name="chat" className="text-[20px]" />
      <span className="hidden md:inline font-label-badge text-[11px] uppercase tracking-widest">VIP Concierge</span>
    </a>
  );
}
