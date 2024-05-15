import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import siteMetadata from "@/lib/metadata";

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
      <body className="min-h-screen bg-gradient-to-b from-slate-100 to-white text-slate-900 antialiased dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 dark:text-slate-50"
      >{children}</body>
    </html>
  );
}
