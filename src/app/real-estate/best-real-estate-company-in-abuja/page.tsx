"use client";
import { Metadata } from "next";
import React from "react";
import Link from "next/link";
import "../../style/landing-hero-section.css";
import Navbar from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";
import LandingFeaturedProperties from "../landing-featured-properties/page";
import WhyChooseYesha from "../why-choose-yesha/page";
import ClientTestimonials from "../client-testimonials/page";
import LeadCaptureForm from "../lead-capture-form/page";
import NeighborhoodHighlights from "../neighborhood-highlights/page";
import AgentSpotlight from "../agent-spotlight/page";

const metadata: Metadata = {
  title: "Luxury Homes in Abuja | Yesha Realty Real Estate",
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

export default function LandingHeroSection() {
  return (
    <main>
      <Navbar />

      <section className="landing-hero-container">
        <div className="landing-hero-content">
          <h1 className="landing-hero-content-headline">
            Find Your Dream Home in Abuja —{" "}
            <span>Luxury, Affordability, Trust.</span>
          </h1>
          <p className="landing-hero-content-subheadline">
            Yesha Reality connects you with the finest properties across
            Nigeria.
          </p>
          <div className="landing-hero-cta-button">
            <Link href="/properties">
              <button>View Available Listings</button>
            </Link>
          </div>
        </div>
      </section>

      <LandingFeaturedProperties />
      <WhyChooseYesha />
      <ClientTestimonials />
      <LeadCaptureForm />
      <NeighborhoodHighlights />
      <AgentSpotlight />

      <Footer />
    </main>
  );
}
