import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Space_Mono, Syne } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileTabBar from "@/components/MobileTabBar";
import ConciergeButton from "@/components/ConciergeButton";
import { CurrencyProvider } from "@/components/Currency";

const syne = Syne({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-syne" });
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-jakarta",
});
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-space-mono" });

export const metadata: Metadata = {
  title: {
    default: "VANTAGE MOTORS | Drive What Defines You",
    template: "%s | VANTAGE MOTORS Dubai",
  },
  description:
    "Premium multi-brand luxury automotive showroom on Sheikh Zayed Road, Dubai. Verified hypercars, certified GCC-spec pre-owned vehicles and white-glove concierge delivery.",
};

export const viewport: Viewport = {
  themeColor: "#0d0e11",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${syne.variable} ${jakarta.variable} ${spaceMono.variable}`}>
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
      </head>
      <body className="bg-surface-container-lowest text-on-surface font-body-md text-body-md antialiased selection:bg-primary-container selection:text-on-primary-container">
        <CurrencyProvider>
          <Header />
          <main className="w-full pt-16 lg:pt-20 bg-surface-container-lowest min-h-screen">
            <div className="flex flex-col w-full text-on-surface">{children}</div>
          </main>
          <Footer />
          <ConciergeButton />
          <MobileTabBar />
        </CurrencyProvider>
      </body>
    </html>
  );
}
