import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/hooks/useCart";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Qistaniya Restaurant | Mira Road, Mumbai – Fine Arabic & Mughlai Dining",
  description:
    "Experience royal Arabic, Mughlai & Indian cuisine at Qistaniya, Mira Road East, Mumbai. Opposite Shivar Garden. Reserve a table or order online. Call 09987370880.",
  keywords: ["Qistaniya", "restaurant Mira Road", "Arabic food Mumbai", "Mughlai restaurant", "biryani Mira Road", "fine dining Mumbai"],
  openGraph: {
    title: "Qistaniya Restaurant | Mira Road Mumbai",
    description: "Royal Arabic & Mughlai fine dining in Mira Road East, Mumbai.",
    type: "website",
    locale: "en_IN",
    siteName: "Qistaniya Restaurant",
    images: [{ url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200", width: 1200, height: 630, alt: "Qistaniya Restaurant" }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="no-overflow">
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#1a1a17",
                border: "1px solid rgba(212,168,67,0.3)",
                color: "#f5f0e8",
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}
