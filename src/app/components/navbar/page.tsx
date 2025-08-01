"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../../style/navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogoClick = () => {
    setMenuOpen(false);
  };
  return (
    <main>
      <section className="desktop-nav-container">
        <div className="logo">
          <Link href="/">
            <Image
              src="/SAVE_20250727_212827-removebg-preview.png"
              alt="Yesha Reality Logo"
              width={60}
              height={60}
            />
          </Link>
        </div>

        <div className="desktop-nav-links">
          <ul className="desk-nav">
            <li className="desk-nav-item">
              <Link href="/#about-us">About Us</Link>
            </li>
            <li className="desk-nav-item">
              <Link href="/#our-mission">Our Mission</Link>
            </li>
            <li className="desk-nav-item">
              <Link href="/#project">Project</Link>
            </li>
            <li className="desk-nav-item">
              <Link href="/#meet-the-team">Meet The Team</Link>
            </li>
            <li className="desk-nav-item">
              <Link href="/page/our-story">Our Story</Link>
            </li>
            <li className="desk-nav-item">
              <Link href="/page/contact-us">Contact Us</Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="mobile">
        <div className="mobile-nav-container">
          <div className="logo-hamburger-container">
            <Link onClick={handleLogoClick} href="/">
              <Image
                src="/SAVE_20250727_212827-removebg-preview.png"
                alt="Yesha Reality Logo"
                width={60}
                height={60}
              />
            </Link>

            <a
              onClick={toggleMenu}
              className={`hamburger ${menuOpen ? "open" : ""}`}
            >
              <div className="hamburger-line-1"></div>
              <div className="hamburger-line-2"></div>
            </a>
          </div>
        </div>

        {/* Mobile nav links */}
        <div
          onClick={toggleMenu}
          className={`mobile-nav-links ${menuOpen ? "open" : ""}`}
        >
          <div className="nav-link-img">
            <img src="/KS254_Batch1_FINAL_90_of_137_1000x1501.jpg" alt="" />
          </div>
          <ul className="nav-links">
            <li>
              <Link href="/#about-us">About Us</Link>
            </li>
            <li>
              <Link href="/#our-mission">Our Mission</Link>
            </li>
            <li>
              <Link href="/#project">Project</Link>
            </li>
            <li>
              <Link href="/#meet-the-team">Meet The Team</Link>
            </li>
            <li>
              <Link href="/page/our-story">Our Story</Link>
            </li>
            <li>
              <Link href="/page/contact-us">Contact Us</Link>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Navbar;
