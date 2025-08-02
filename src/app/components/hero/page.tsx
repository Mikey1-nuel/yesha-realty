"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// import { motion, AnimatePresence } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import "../../style/hero.css";

const heroBackgroundOptions = [
    "/IMG-20250728-WA0001.jpg",
    "/IMG-20250728-WA0000.jpg",
    "/IMG-20250728-WA0002.jpg",
]

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

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1>Yesha Reality</h1>
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
          Flexible payments, trusted service, and long-term value — all within
          reach. <br /> Let your journey to homeownership begin today.
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

//  Hero;
