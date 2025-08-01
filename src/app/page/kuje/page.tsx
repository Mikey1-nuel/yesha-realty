import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import Navbar from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";
import "../../style/kuje.css";

const lands = [
  {
    id: 1,
    size: "150sqm",
    bedrooms: 2,
    houseType: "Terrace Duplex",
    price: "₦2,000,000",
  },
  {
    id: 2,
    size: "250sqm",
    bedrooms: 3,
    houseType: "Terrace Duplex",
    price: "₦3,500,000",
  },
  {
    id: 3,
    size: "350sqm",
    bedrooms: 3,
    houseType: "Fully Detached Bungalow",
    price: "₦4,500,000",
  },
  {
    id: 4,
    size: "400sqm",
    bedrooms: 4,
    houseType: "Fully Detached Bungalow",
    price: "₦5,500,000",
  },
  {
    id: 5,
    size: "500sqm",
    bedrooms: 4,
    houseType: "Duplex with BQ",
    price: "₦7,000,000",
  },
];

const KujeLands = () => {
  return (
    <main>
      <Navbar />

      <section className="page-route">
        <div className="back">
          <Link href="/" className="left-back">
            <ArrowLeft className="w-8 h-6 ml-1 left" />
          </Link>
        </div>

        <div className="route-path">
          <Link href="/" className="route-border-only">
            Home
          </Link>
          <Link href="">
            <ChevronRight className="w-6 h-6 ml-1 right" />
          </Link>
          <Link href="/page/kuje" className="route-border-only">
            Kuje
          </Link>
        </div>
      </section>

      <section className="land-list-header">
        <h2>Available Lands for Sale</h2>
        <p>
          Browse our curated list of available land plots in top locations,
          perfect for residential, commercial, or investment purposes.
        </p>
      </section>

      <section className="land-listing-container">
        <div className="land-listings">
          {lands.map((land) => (
            <div className="land-card" key={land.id}>
              <div className="land-img">
                <Image
                  src="/freepik__the-style-is-candid-image-photography-with-natural__98563.png"
                  alt=""
                  width={250}
                  height={250}
                />
              </div>
              <div className="land-info">
                <h3>{land.houseType}</h3>
                <div className="land-info-desc">
                  <p>
                    <strong>Land Size:</strong> {land.size}
                  </p>
                  <p>
                    <strong>Bedrooms:</strong> {land.bedrooms}
                  </p>
                  <p>
                    <strong>Price:</strong> {land.price}
                  </p>
                </div>
              </div>
              <button className="inquire-btn">Inquire</button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default KujeLands;
