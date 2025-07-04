import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.APP_URL
      ? `${process.env.APP_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT || 3000}`
  ),
  title: "AI call-center",
  description:
    "AI call center dashboard",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    url: "/",
    title: "AI call-center",
    description:
      "AI call center dashboard",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "AI call-center",
    description:
      "AI call center dashboard"
  }
};

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], 
  variable: "--font-mulish", 
  display: "swap",
});


export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={mulish.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
