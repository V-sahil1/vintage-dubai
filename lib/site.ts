export const site = {
  name: "Vantage Motors",
  tagline: "Drive What Defines You.",
  phoneDisplay: "+971 4 800 VANTAGE",
  phoneFull: "+971 4 800 8268243",
  phoneHref: "tel:+97148008268243",
  whatsapp: "https://wa.me/97148008268243",
  email: "vip@vantagemotors.ae",
  maps: "https://maps.google.com/?q=Sheikh+Zayed+Road+Al+Quoz+Dubai",
};

export const whatsappLink = (text?: string) =>
  text ? `${site.whatsapp}?text=${encodeURIComponent(text)}` : site.whatsapp;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/inventory", label: "Inventory" },
  { href: "/luxury-cars", label: "Luxury Cars" },
  { href: "/used-cars", label: "Used Cars" },
  { href: "/sell-your-car", label: "Sell Your Car" },
  { href: "/about-us", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export const tabLinks = [
  { href: "/inventory", label: "Stock", icon: "directions_car" },
  { href: "/inventory#search", label: "Filter", icon: "tune" },
  { href: "/book-a-test-drive", label: "Test Drive", icon: "speed" },
  { href: "/contact", label: "Concierge", icon: "support_agent" },
  { href: "/luxury-cars", label: "Vault", icon: "folder_shared" },
];
