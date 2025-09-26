"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Property } from "@/types/property";
import { Filters } from "@/types/filters";
import PropertyFilter from "@/app/components/property-filter";
import ContactForm from "@/app/components/contact-form";
import Navbar from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";
import "../../style/properties.css";

const BASE_URL = "https://yesha-reality-backend-staging.up.railway.app";

export default function PropertyDetailsClient() {
  const { propertyId } = useParams();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [property, setProperty] = useState<Property | null>(null);
  const [editData, setEditData] = useState<Property | null>(null);
  const [availableProperties, setAvailableProperties] = useState<Property[]>(
    []
  );
  const [filtered, setFiltered] = useState<Property[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const [amenityInput, setAmenityInput] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [propertyAmenities, setPropertyAmenities] = useState<string[]>([]);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  // Fetch all properties
  useEffect(() => {
    fetch(`${BASE_URL}/properties`)
      .then((res) => res.json())
      .then((data: Property[]) => {
        const sorted = [...data].sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setAvailableProperties(sorted);
        setFiltered(sorted);
      })
      .catch((err) => console.error("Error fetching properties:", err));
  }, []);

  // Fetch single property
  useEffect(() => {
    if (!propertyId) return;

    fetch(`${BASE_URL}/properties/${propertyId}`)
      .then((res) => res.json())
      .then((data) => {
        setProperty(data);
        setEditData(data);
      })
      .catch((err) => console.error("Error fetching property:", err));
  }, [propertyId]);

  // Fetch amenities for property
  useEffect(() => {
    fetch(`${BASE_URL}/properties/${propertyId}/amenities`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPropertyAmenities(data);
        } else {
          console.warn("Unexpected amenities format:", data);
          setPropertyAmenities([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching amenities:", err);
        setPropertyAmenities([]);
      });
  }, [propertyId]);

  // Filter logic
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
          (filters.price === "8" &&
            priceValue >= 5000000 &&
            priceValue <= 8000000) ||
          (filters.price === "10" && priceValue > 8000000))
      );
    });

    setFiltered(filteredResults);
  };

  const mostViewed = useMemo(() => {
    return [...availableProperties]
      .sort((a, b) => b.views - a.views)
      .slice(0, 2);
  }, [availableProperties]);

  // Amenity logic
  const addAmenity = () => {
    const trimmed = amenityInput.trim();
    if (trimmed && !amenities.includes(trimmed)) {
      setAmenities([...amenities, trimmed]);
      setAmenityInput("");
    }
  };

  const removeAmenity = (name: string) => {
    setAmenities(amenities.filter((a) => a !== name));
  };

  const submitAmenities = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/properties/${propertyId}/amenities`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amenities }),
        }
      );

      if (!res.ok) throw new Error("Failed to update amenities");

      alert("Amenities saved successfully");
    } catch (err) {
      console.error("Amenity update error:", err);
    }
  };

  // Property update logic
  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editData) return;

    setUpdating(true);

    const payload = {
      estate: editData.estate,
      landSize: editData.landSize,
      bedroom: editData.bedroom,
      image: editData.image,
      houseType: editData.houseType,
      price: editData.price,
      location: editData.location,
      featured: editData.featured ? 1 : 0,
    };

    try {
      const res = await fetch(`${BASE_URL}/properties/${propertyId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server response:", errorText);
        throw new Error("Failed to update property");
      }

      const updated = await res.json();
      setProperty(updated);
      setEditData(updated);
      setUpdateSuccess(true);
      setShowEditModal(false);
    } catch (err) {
      console.error("Update error:", err);
    } finally {
      setUpdating(false);
    }
  };

  if (!property) {
    return (
      <div className="loading-wrapper">
        <div className="spinner" />
        <p className="loading-text">Loading property details...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Head>
        <title>{property.estate} - Yesha Realty</title>
        <meta
          name="description"
          content={`Explore ${property.estate} located in ${property.location}. Price: ₦${property.price}`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Offer",
              url: `https://www.yesharealty.com/properties/${propertyId}`,
              priceCurrency: "NGN",
              price: property.price,
              itemOffered: {
                "@type": "House",
                name: property.estate,
                address: {
                  "@type": "PostalAddress",
                  addressLocality: property.location || "Abuja",
                  addressRegion: property.location || "Abuja State",
                  addressCountry: "Nigeria",
                },
                numberOfRooms: property.bedroom || 0,
              },
              seller: {
                "@type": "RealEstateAgent",
                name: "Yesha Realty",
              },
            }),
          }}
        />
      </Head>

      <section className="land-listing-container land-listing-cont">
        <div className="property-section">
          <div className="property-section__filter">
            <PropertyFilter onFilterChange={handleFilterChange} />
          </div>

          <div className="property-section__popular-list">
            <h4>Most Viewed Properties</h4>
            <div className="most-viewed-container">
              {mostViewed.map((p) => (
                <div className="sidebar-property" key={p.id}>
                  <div className="img-et-attribute">
                    <div className="land-img">
                      {p.image && (
                        <Image
                          src={`https://yesha-reality-backend-staging.up.railway.app${p.image}`}
                          alt={`${p.bedroom}-bedroom ${p.houseType} in ${p.location}, ${p.landSize} sqm`}
                          width={350}
                          height={50}
                        />
                      )}
                    </div>
                    <div className="attribute">
                      <div className="icon-value-container">
                        <Image
                          src="/land-size.webp"
                          alt="Land size"
                          width={20}
                          height={20}
                        />
                        <span>{p.landSize} sqm</span>
                      </div>
                      <div className="icon-value-container">
                        <Image
                          src="/bedroom.webp"
                          alt="Bedrooms"
                          width={20}
                          height={20}
                        />
                        <span>{p.bedroom}</span>
                      </div>
                    </div>
                  </div>
                  <div className="land-info">
                    <div className="house-type-price">
                      <h3>
                        {p.bedroom} Bedroom {p.houseType}
                      </h3>
                      <span>₦{Number(p.price).toLocaleString()}</span>
                    </div>
                    <div className="land-info-desc">
                      <p>
                        <strong>{p.estate}</strong>
                      </p>
                      <p>
                        {p.bedroom} bedroom {p.houseType} in {p.estate},{" "}
                        {p.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="property-details">
          <Image
            className="prop-img"
            src={property.image}
            alt={`${property.bedroom}-bedroom ${property.houseType} in ${property.location}, ${property.landSize} sqm`}
            width={350}
            height={50}
          />
          <h1 className="details-header">
            {`${property.bedroom} bedroom ${property.houseType} in ${property.estate}, ${property.location}`}
          </h1>
          {userRole === "admin" && (
            <button
              className="edit-button"
              onClick={() => setShowEditModal(true)}
              style={{ marginRight: "10px" }}
            >
              ✏️ Edit
            </button>
          )}

          <div className="features-et-amenities">
            <div className="features">
              <h3>FEATURES</h3>
              <div className="details-para-cont">
                <p>
                  <strong>Project:</strong> {property.estate}
                </p>
                <p>
                  <strong>Land Size:</strong> {property.landSize} sqm
                </p>
                <p>
                  <strong>Bedrooms:</strong> {property.bedroom}
                </p>
                <p>
                  <strong>Price:</strong> ₦
                  {Number(property.price).toLocaleString()}
                </p>
                <p>
                  <strong>Type:</strong> {property.houseType}
                </p>
                <p>
                  <strong>Location:</strong> {property.location}
                </p>
              </div>
            </div>

            <div className="amenities">
              <h3>Amenities</h3>
              {userRole === "admin" && (
                <div className="amenity-entry">
                  <input
                    type="text"
                    value={amenityInput}
                    onChange={(e) => setAmenityInput(e.target.value)}
                    placeholder="Enter amenity (e.g. POP, Wiring)"
                  />
                  <button type="button" onClick={addAmenity}>
                    Add
                  </button>
                  <button onClick={submitAmenities}>Save Amenities</button>
                </div>
              )}

              <ul className="amenity-list">
                {amenities.map((amenity) => (
                  <li key={amenity}>
                    {amenity}
                    <button onClick={() => removeAmenity(amenity)}>✕</button>
                  </li>
                ))}
              </ul>

              <div className="current-amenities-cont">
                <h4>Current Amenities</h4>
                <ul className="current-amenities">
                  {Array.isArray(propertyAmenities) &&
                  propertyAmenities.length > 0 ? (
                    propertyAmenities.map((amenity) => (
                      <li key={amenity}>{amenity}</li>
                    ))
                  ) : (
                    <li>No amenities listed yet</li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div className="get-in-touch">
            <h1 className="details-header">Get In Touch</h1>
            <ContactForm />
          </div>
        </div>
      </section>

      {showEditModal && editData && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Property</h3>
            <form onSubmit={handleUpdateSubmit}>
              <label>
                Estate:
                <input
                  type="text"
                  name="estate"
                  value={editData.estate || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, estate: e.target.value })
                  }
                  required
                />
              </label>

              <label>
                Price:
                <input
                  type="text"
                  name="price"
                  value={editData.price || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, price: e.target.value })
                  }
                  required
                />
              </label>

              <label>
                House Type:
                <input
                  type="text"
                  name="houseType"
                  value={editData.houseType || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, houseType: e.target.value })
                  }
                  required
                />
              </label>

              <label>
                Bedroom:
                <input
                  type="number"
                  name="bedroom"
                  value={editData.bedroom ?? 0}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      bedroom: parseInt(e.target.value) || 0,
                    })
                  }
                  required
                />
              </label>

              <label>
                Land Size (sqm):
                <input
                  type="number"
                  name="landSize"
                  value={editData.landSize ?? 0}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      landSize: parseInt(e.target.value) || 0,
                    })
                  }
                  required
                />
              </label>

              <label>
                Location:
                <input
                  type="text"
                  name="location"
                  value={editData.location || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, location: e.target.value })
                  }
                  required
                />
              </label>

              <label>
                Featured:
                <select
                  name="featured"
                  value={editData.featured ? "true" : "false"}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      featured: e.target.value === "true",
                    })
                  }
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </label>

              <div className="modal-actions">
                <button type="submit" disabled={updating}>
                  {updating ? "Updating..." : "Save"}
                </button>
                <button type="button" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
