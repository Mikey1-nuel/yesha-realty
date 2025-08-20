"use client";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import "../../style/hero.css";

const heroBackgroundOptions = [
  "/IMG-20250728-WA0001.jpg",
  "/IMG-20250728-WA0000.jpg",
  "/IMG-20250728-WA0002.jpg",
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroBackgroundOptions.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="hero-container">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              name: "Yesha Realty",
              url: "https://yourdomain.com",
              logo: "https://yourdomain.com/logo.png", // update with your logo URL
              image: "https://yourdomain.com/IMG-20250728-WA0000.jpg", // pick a hero image
              description:
                "Secure your future with verified plots in prime locations. Let your journey to homeownership begin today.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Suite D7 & D8 Sliverline Plaza, Plot 1543 Cadastral Zone A03 Safana Close Garki 2, Abuja",
                addressLocality: "Abuja",
                addressRegion: "Abuja State",
                addressCountry: "NG",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+234 702 6521 222",
                contactType: "customer service",
                areaServed: "NG",
                availableLanguage: "English",
              },
              sameAs: [
                "https://www.tiktok.com/@yeshareality",
                "https://www.instagram.com/yeshareality/",
              ],
            }),
          }}
        />
      </Head>

      <div className="hero-bg-layer">
        {heroBackgroundOptions.map((src, i) => (
          <motion.div
            key={i}
            className="hero-bg-image"
            initial={false}
            animate={{
              opacity: index === i ? 1 : 0,
              zIndex: index === i ? 1 : 0,
            }}
            transition={{ duration: 3, ease: "easeInOut" }}
          >
            <Image
              src={src}
              alt={`Hero Slide ${i}`}
              fill
              priority={index === i}
              style={{ objectFit: "cover" }}
            />
          </motion.div>
        ))}
      </div>
      <div className="overlay"></div>

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1>
          Yesha <span>Reality</span>
        </h1>
      </motion.div>
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        viewport={{ once: true }}
      >
        <p>
          Secure your future with verified plots in prime locations. <br />
          Let your journey to homeownership begin today.
        </p>
      </motion.div>
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.6 }}
        viewport={{ once: true }}
      >
        <Link href="/#project">
          <button type="button">Explore Plots</button>
        </Link>
      </motion.div>
    </main>
  );
}
