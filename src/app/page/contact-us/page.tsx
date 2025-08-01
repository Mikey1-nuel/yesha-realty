"use client";
import React from "react";
import Navbar from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";
import "../../style/contact.css";
import ContactForm from "@/app/components/contact-form";

const ContactUs = () => {
  return (
    <main className="contact-container">
      <Navbar />

      <section className="contact-us">
        <div className="location-section">
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps?q=Suite%20D3,%20Sliverline%20Plaza,%20Plot%201543%20Cadastral%20Zone%20A03%20Safana%20Close%20Garki%202,%20Abuja&output=embed"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <a
            href="https://www.google.com/maps?q=Shariff+Plaza,+24+Aminu+Kano+Crescent,+Wuse+2,+Abuja,+Nigeria+904101"
            target="_blank"
            rel="noopener noreferrer"
            className="get-directions"
          >
            Get Directions
          </a>
        </div>

        <ContactForm />
      </section>

      <Footer />
    </main>
  );
};

export default ContactUs;
