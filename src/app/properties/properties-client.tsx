// src/app/properties/PropertiesClient.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowLeft, PlusCircle } from "lucide-react";
import { Property } from "@/types/property";
import { Filters } from "@/types/filters";
import Navbar from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";
import PropertyCard from "@/app/components/property-card";
import MobilePropertyFilter from "@/app/components/mobille-property-filter";
import PropertyFilter from "@/app/components/property-filter";
import "../style/properties.css";

export default function PropertiesClient() {
  const [availableProperties, setAvailableProperties] = useState<Property[]>([]);
  const [filtered, setFiltered] = useState<Property[]>([]);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 8;

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  useEffect(() => {
    fetch("https://yesha-reality-backend-staging.up.railway.app/properties")
      .then((res) => res.json())
      .then((data: Property[]) => {
        const sortedData = [...data].sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setAvailableProperties(sortedData);
        setFiltered(sortedData);
      })
      .catch((err) => console.error("Error fetching properties:", err));
  }, []);

  const handleDeleteProperty = async (id: number) => {
    setDeletingId(id);
    try {
      const res = await fetch(
        `https://yesha-reality-backend-staging.up.railway.app/properties/${id}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server error:", errorText);
        throw new Error("Failed to delete property");
      }

      setAvailableProperties((prev) => {
        const updated = prev.filter((p) => p.id !== id);
        setFiltered(updated);
        if (currentPage > Math.ceil(updated.length / propertiesPerPage)) {
          setCurrentPage(1);
        }
        return updated;
      });
    } catch (err) {
      console.error("Error deleting property:", err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleFilterChange = (filters: Filters) => {
    const filteredResults = availableProperties.filter((p) => {
      const priceValue = parseInt(p.price.replace(/\D/g, ""));
      return (
        (!filters.estate || p.estate === filters.estate) &&
        (!filters.landSize || p.landSize === parseInt(filters.landSize)) &&
        (!filters.bedroom || p.bedroom === parseInt(filters.bedroom)) &&
        (!filters.houseType || p.houseType === filters.houseType) &&
        (!filters.price ||
          (filters.price === "5" && priceValue < 5000000) ||
          (filters.price === "8" && priceValue >= 5000000 && priceValue <= 8000000) ||
          (filters.price === "10" && priceValue > 8000000))
      );
    });

    setFiltered(filteredResults);
    setCurrentPage(1);
  };

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filtered.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filtered.length / propertiesPerPage);

  const mostViewed = useMemo(() => {
    return [...availableProperties].sort((a, b) => b.views - a.views).slice(0, 2);
  }, [availableProperties]);

  return (
    <main>
      <Navbar />
      {/* Breadcrumb */}
      <section className="page-route">
        <div className="back">
          <Link href="/" className="left-back">
            <ArrowLeft className="w-8 h-6 ml-1 left" />
          </Link>
        </div>
        <div className="route-path">
          <Link href="/" className="route-border-only">Home</Link>
          <ChevronRight className="w-6 h-6 ml-1 right" />
          <Link href="/pages/properties" className="route-border-only">Properties</Link>
        </div>
      </section>

      {/* Header */}
      <section className="land-list-header">
        <h2>Available Lands for Sale</h2>
        <p>
          Browse our curated list of available land plots in top locations,
          perfect for residential, commercial, or investment purposes.
        </p>
      </section>

      {/* Main Listing */}
      <section className="land-listing-container">
        <div className="property-section">
          <div className="property-section__filter">
            <PropertyFilter onFilterChange={handleFilterChange} />
          </div>

          {/* Most Viewed */}
          <div className="property-section__popular-list">
            <h4>Most Viewed Properties</h4>
            <div className="most-viewed-container">
              {mostViewed.map((property) => (
                <div className="sidebar-property" key={property.id}>
                  <div className="img-et-attribute">
                    <div className="land-img">
                      {property.image && (
                        <Image
                          src={`https://yesha-reality-backend-staging.up.railway.app${property.image}`}
                          alt={`${property.bedroom}-bedroom ${property.houseType} in ${property.location}, ${property.landSize} sqm`}
                          width={350}
                          height={50}
                        />
                      )}
                    </div>
                    <div className="attribute">
                      <div className="icon-value-container">
                        <Image src="/land-size.webp" alt="Land size" width={20} height={20} />
                        <span>{property.landSize} sqm</span>
                      </div>
                      <div className="icon-value-container">
                        <Image src="/bedroom.webp" alt="Bedrooms" width={20} height={20} />
                        <span>{property.bedroom}</span>
                      </div>
                    </div>
                  </div>
                  <div className="land-info">
                    <div className="house-type-price">
                      <h3>{property.bedroom} Bedroom {property.houseType}</h3>
                      <span>₦{Number(property.price).toLocaleString()}</span>
                    </div>
                    <div className="land-info-desc">
                      <p><strong>{property.estate}</strong></p>
                      <p>{property.bedroom} bedroom {property.houseType} in {property.estate}, {property.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination & Listing */}
        <div className="property-pagination">
          {userRole === "admin" && (
            <div className="add-new-property">
              <Link href="/pages/create-property-form">
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                    <PlusCircle size={20} />
                  Add Property
                </button>
              </Link>
            </div>
          )}

          <div
            className={`land-listings ${
              filtered.length === 0 ? "full-grid" : ""
            }`}
          >
            <MobilePropertyFilter onFilterChange={handleFilterChange} />
            <div
              className={`mobile-propty-container ${
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
                  <Link href={`/properties/${property.id}`} key={property.id}>
                    <PropertyCard
                      property={property}
                      onDelete={handleDeleteProperty}
                      deletingId={deletingId}
                    />
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Pagination Controls */}
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
}
