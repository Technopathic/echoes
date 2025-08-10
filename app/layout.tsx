import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { appConfig } from "@/config/app";
import Loading from "@/components/Loading";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${appConfig.siteName}`,
    template: `${appConfig.siteName}`
  },
  description: appConfig.description,
  keywords: appConfig.keywords,
  creator: appConfig.creator,
  openGraph: {
    type: appConfig.appType,
    locale: appConfig.locale,
    url: appConfig.siteURL,
    title: appConfig.siteName,
    description: appConfig.description,
    siteName: appConfig.siteName,
    images: appConfig.ogImage
  },
  twitter: {
    card: "summary_large_image",
    title: appConfig.siteName,
    description: appConfig.description,
    images: appConfig.ogImage,
    creator: appConfig.creator
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="flex w-full h-screen bg-neutral-900 p-4">
          <section className="flex-grow bg-neutral-800 h-full rounded-xl overflow-auto py-4">
            {children}
          </section>
        </main>
        <Loading />
      </body>
    </html>
  );
}
