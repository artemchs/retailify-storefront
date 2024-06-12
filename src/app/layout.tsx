import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import NavigationBar from "@/components/navigation/NavigationBar";
import Providers from "./Providers";
import { BRAND_NAME } from "@/shop-config";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    template: `${BRAND_NAME} | %s`,
    default: BRAND_NAME,
  },
  description: "aasdfasdfasdf",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-[100dvh]">
            <div className="sticky top-0">
              <NavigationBar />
            </div>
            {children}
          </div>
          <Toaster richColors position="top-center" closeButton />
        </Providers>
      </body>
    </html>
  );
}
