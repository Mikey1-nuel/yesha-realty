"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import "../../style/hero.css";

export default function Hero() {
  return (
    <main className="hero-container">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1>Soteria City by Yesha Realty</h1>
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
