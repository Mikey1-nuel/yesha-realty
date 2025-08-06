"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import Navbar from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";
import PropertyCard from "@/app/components/property-card";
import MobilePropertyFilter from "@/app/components/mobille-property-filter";
import PropertyFilter from "@/app/components/property-filter";
import "../../style/properties.css";

const allProperties = [
  {
    id: 1,
    estate: "Soteria City, Jikoyi",
    size: "250sqm",
    bedrooms: 2,
    image: "/Fully-Detached-Bungalow.jpeg",
    houseType: "Fully Detached Bungalow",
    price: "₦5,000,000",
    location: "Abuja",
    views: 25,
    featured: false,
  },
  {
    id: 2,
    estate: "Soteria City, Jikoyi",
    size: "350sqm",
    bedrooms: 3,
    image: "/Fully-Detached-Bungalow.jpeg",
    houseType: "Fully Detached Bungalow",
    price: "₦6,000,000",
    location: "Abuja",
    views: 58,
    featured: false,
  },
  {
    id: 3,
    estate: "Soteria City, Jikoyi",
    size: "400sqm",
    bedrooms: 4,
    image: "/Fully-Detached-Bungalow.jpeg",
    houseType: "Fully Detached Bungalow",
    price: "₦8,000,000",
    location: "Abuja",
    views: 65,
    featured: false,
  },
  {
    id: 4,
    estate: "Soteria City, Jikoyi",
    size: "450sqm",
    bedrooms: 4,
    image: "/Fully-Detached-Bungalow.jpeg",
    houseType: "Fully Detached Bungalow",
    price: "₦10,000,000",
    location: "Abuja",
    views: 75,
    featured: true,
  },
  {
    id: 5,
    estate: "Soteria City Phase II, Kuje",
    size: "150sqm",
    bedrooms: 2,
    image: "/Fully-Terrace-Duplex.jpeg",
    houseType: "Fully Terrace Duplex",
    price: "₦2,000,000",
    location: "Abuja",
    views: 45,
    featured: true,
  },
  {
    id: 6,
    estate: "Soteria City Phase II, Kuje",
    size: "250sqm",
    bedrooms: 3,
    image: "/Fully-Terrace-Duplex.jpeg",
    houseType: "Fully Terrace Duplex",
    price: "₦3,500,000",
    location: "Abuja",
    views: 60,
    featured: true,
  },
  {
    id: 7,
    estate: "Soteria City Phase II, Kuje",
    size: "350sqm",
    bedrooms: 3,
    image: "/Fully-Detached-Bungalow.jpeg",
    houseType: "Fully Detached Bungalow",
    price: "₦4,500,000",
    location: "Abuja",
    views: 55,
    featured: false,
  },
  {
    id: 8,
    estate: "Soteria City Phase II, Kuje",
    size: "400sqm",
    bedrooms: 4,
    image: "/Fully-Detached-Bungalow.jpeg",
    houseType: "Fully Detached Bungalow",
    price: "₦5,500,000",
    location: "Abuja",
    views: 70,
    featured: true,
  },
  {
    id: 9,
    estate: "Soteria City Phase II, Kuje",
    size: "500sqm",
    bedrooms: 4,
    image: "/Fully-Detached-Duplex.jpeg",
    houseType: "Terrace Duplex with BQ",
    price: "₦7,000,000",
    location: "Abuja",
    views: 80,
    featured: true,
  },
  {
    id: 10,
    estate: "Soteria City Phase II, Kuje",
    size: "500sqm",
    bedrooms: 3,
    image: "/Penthouse.jpeg",
    houseType: "Penthouse",
    price: "₦7,000,000",
    location: "Abuja",
    views: 56,
    featured: false,
  },
  {
    id: 11,
    estate: "Soteria City Phase II, Kuje",
    size: "500sqm",
    bedrooms: 4,
    image: "/Penthouse.jpeg",
    houseType: "Penthouse",
    price: "₦9,000,000",
    location: "Abuja",
    views: 85,
    featured: true,
  },
];

const Properties = () => {
  const [filtered, setFiltered] = useState(allProperties);
  const mostViewed = [...allProperties]
    .sort((a, b) => b.views - a.views)
    .slice(0, 2);

  const propertiesPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(filtered.length / propertiesPerPage);

  // Get paginated data
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filtered.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  type Filters = {
    estate: string;
    size: string;
    bedrooms: string;
    houseType: string;
    price: string;
  };

  const handleFilterChange = (filters: Filters) => {
    const filteredResults = allProperties.filter((p) => {
      return (
        (!filters.estate || p.estate === filters.estate) &&
        (!filters.size || p.size === filters.size) &&
        (!filters.bedrooms || p.bedrooms === parseInt(filters.bedrooms)) &&
        (!filters.houseType || p.houseType === filters.houseType) &&
        (!filters.price ||
          (filters.price === "5" &&
            parseInt(p.price.replace(/\D/g, "")) < 5000000) ||
          (filters.price === "8" &&
            parseInt(p.price.replace(/\D/g, "")) >= 5000000 &&
            parseInt(p.price.replace(/\D/g, "")) <= 8000000) ||
          (filters.price === "10" &&
            parseInt(p.price.replace(/\D/g, "")) > 8000000))
      );
    });

    setFiltered(filteredResults);
  };
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
          <Link href="/page/properties" className="route-border-only">
            Properties
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
        <div className="property-section">
          <div className="property-section__filter">
            <PropertyFilter onFilterChange={handleFilterChange} />
          </div>
          <div className="property-section__popular-list">
            <h4>Most Viewed Properties</h4>
            <div className="most-viewed-container">
              {mostViewed.map((property) => (
                <div className="sidebar-property" key={property.id}>
                  <div className="img-et-attribute">
                    <div className="land-img">
                      <Image
                        src={property.image}
                        alt=""
                        width={350}
                        height={50}
                      />
                    </div>

                    <div className="attribute">
                      <div className="icon-value-container">
                        <Image
                          src="/land-size.webp"
                          alt=""
                          width={20}
                          height={20}
                        />
                        <span>{property.size}</span>
                      </div>

                      <div className="icon-value-container">
                        <Image
                          src="/bedroom.webp"
                          alt=""
                          width={20}
                          height={20}
                        />
                        <span>{property.bedrooms}</span>
                      </div>
                    </div>
                  </div>
                  <div className="land-info">
                    <div className="house-type-price">
                      <h3>
                        {property.bedrooms} bedroom {property.houseType}
                      </h3>
                      <span>{property.price}</span>
                    </div>
                    <div className="land-info-desc">
                      <p>
                        <strong>{property.estate}</strong>
                      </p>
                      <p>
                        {property.bedrooms} bedroom {property.houseType} in{" "}
                        {property.estate} estate, {property.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="property-pagination">
          <div
            className={`land-listings ${
              filtered.length === 0 ? "full-grid" : ""
            }`}
          >
            <MobilePropertyFilter onFilterChange={handleFilterChange} />
            <div className={`mobile-propty-container ${
              filtered.length === 0 ? "full-grid" : ""
            }`}
            >
              {filtered.length === 0 ? (
                <div className="not-found">
                  <p>No matching properties found.</p>
                  <span>
                    It looks like there are no properties matching your current
                    search criteria. Please try adjusting your filters or clear
                    them to see all available properties.
                  </span>
                </div>
              ) : (
                currentProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))
              )}
            </div>
          </div>
          {totalPages > 1 && (
            <div className="pagination-controls">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>

              <div className="page-numbers">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    className={currentPage === i + 1 ? "active-page" : ""}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Properties;
