import type { Metadata, Viewport } from "next";
import { Anek_Tamil, Archivo, Noto_Serif_Tamil } from "next/font/google";
import { ArrowUp } from "lucide-react";
import { ScrollAnimations } from "@/components/common/ScrollAnimations";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/config/site";
import { SCROLL_ANIMATION_SCRIPT } from "@/lib/scroll-animations";
import "./globals.css";

const anekTamil = Anek_Tamil({
  subsets: ["tamil", "latin"],
  axes: ["wdth"],
  variable: "--font-anek-tamil",
  display: "swap",
});

// English brand wordmark ("Teakadai Politics")
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-brand-latin",
  display: "swap",
});

const notoSerifTamil = Noto_Serif_Tamil({
  subsets: ["tamil", "latin"],
  variable: "--font-serif-tamil",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name}: ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: siteConfig.allowIndexing ? { index: true, follow: true } : { index: false, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#17202e",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ta" className={`${anekTamil.variable} ${archivo.variable} ${notoSerifTamil.variable}`} suppressHydrationWarning>
      <body id="top" className="flex min-h-dvh flex-col antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          உள்ளடக்கத்துக்குச் செல்ல
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <a
          href="#top"
          className="to-top fixed bottom-5 right-5 z-30 grid size-12 place-items-center rounded-full bg-ink text-paper shadow-lg hover:bg-tea"
        >
          <ArrowUp className="size-5" aria-hidden />
          <span className="sr-only">மேலே செல்ல</span>
        </a>
        <ScrollAnimations />
        <script dangerouslySetInnerHTML={{ __html: SCROLL_ANIMATION_SCRIPT }} />
      </body>
    </html>
  );
}
