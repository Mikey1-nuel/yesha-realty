// src/app/landing/page.tsx
import type { Metadata } from "next";
import LandingHeroSection from "./landinghero-section";

export const metadata: Metadata = {
  title: "Real Estate Company in Abuja Nigeria",
  description:
    "Browse premium listings in Abuja with Yesha Realty. Smart homes, affordable prices, expert agents.",
  openGraph: {
    title: "Luxury Homes in Abuja | Yesha Realty",
    description:
      "Browse premium listings in Abuja with Yesha Realty. Smart homes, affordable prices, expert agents.",
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

export default function LandingPage() {
  return <LandingHeroSection />;
}
