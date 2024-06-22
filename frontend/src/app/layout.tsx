import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import siteMetadata from "@/lib/metadata";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({ subsets: ["latin"], display: "swap", weight: ["400", "600", "700"], });

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="min-h-screen"
      >
        {children}
        <Suspense>
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
