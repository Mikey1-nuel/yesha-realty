import type { Metadata } from "next";
import { Toaster } from 'react-hot-toast';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yesha Realty Real Estate",
  description: "Trusted real estate company in Nigeria. Explore verified plots, smart homes, and prime locations.",
  openGraph: {
    title: "Yesha Realty Real Estate",
    description: "Trusted real estate company in Nigeria. Explore verified plots, smart homes, and prime locations.",
    images: [
      {
        url: "https://yesha-reality-backend-staging.up.railway.app/IMG-20250728-WA0001.JPG",
        width: 1200,
        height: 630,
        alt: "Yesha Realty Featured Property",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/IMG-20250728-WA0001.jpg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-center" containerClassName="react-hot-toast" />
        {children}
      </body>
    </html>
  );
}
