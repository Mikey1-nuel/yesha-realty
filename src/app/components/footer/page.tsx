import React from "react";
import "../../style/footer.css";
import Image from "next/image";
import Link from "next/link";
import { FaTiktok, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section branding third">
          <Link href="/">
            <Image
              src="/SAVE_20250727_212827-removebg-preview.png"
              alt="Yesha Reality real estate company logo"
              width={80}
              height={80}
            />
          </Link>
          <p>
            Yesha Realty is committed to helping you find your perfect home or
            property investment. With a trusted team and expert knowledge, we
            simplify your real estate journey.
          </p>
        </div>

        <div className="footer-section services third">
          <h4>Our Services</h4>
          <ul>
            <li>
              <a href="/#project">Real Estate Sales and Brokerage</a>
            </li>
            <li>
              <a href="/#project">Property Management</a>
            </li>
            <li>
              <a href="/#consulting">Real Estate Development</a>
            </li>
            <li>
              <a href="/#valuation">Architecture and Construction</a>
            </li>
            <li>
              <a href="/#management">Legal and Documentation</a>
            </li>
            <li>
              <a href="/#management">Consulting</a>
            </li>
          </ul>
        </div>

        <div className="footer-section contact third">
          <h4>Contact Info</h4>
          <p>
            <strong>Address:</strong> Suite D7 & D8 Sliverline Plaza, Plot 1543
            Cadastral Zone A03 Safana Close Garki 2, Abuja
          </p>
          <p>
            <strong>Phone:</strong> +234 702 6521 222
          </p>
          <p>
            <strong>Email:</strong> yesharealityhomesltd@gmail.com
          </p>
        </div>

        <div className="footer-section newsletter full">
          <h4>Newsletter</h4>
          <p>
            Subscribe for updates on latest listings, deals, and market
            insights.
          </p>
          <div className="newsletter-action">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-socials">
          <a href="https://www.tiktok.com/@yeshareality">
            <FaTiktok />
          </a>
          <a href="https://www.instagram.com/yeshareality/">
            <FaInstagram />
          </a>
        </div>
        <p>&copy; 2025 Yesha Realty. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
