'use client';
import React, { useState, useEffect } from "react";
// import "./FeaturedProperties.css";
import { Property } from "@/types/property";
import "../../style/project.css";
import FeaturedProperties from "../../components/featured-properties";

type PropertyCardProps = {
  property: Property;
  onDelete: (id: number) => void;
  deletingId: number | null;
};

export default function LandingFeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://yesha-reality-backend-staging.up.railway.app/properties")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched properties:", data);
        setProperties(data); // ✅ update state
      })
      .catch((err) => console.error("Error fetching properties:", err));
  }, []);

  const handleDeleteProperty = async (id: number) => {
    setDeletingId(id);
    try {
      const res = await fetch(
        `https://yesha-reality-backend-staging.up.railway.app/properties/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server error:", errorText);
        throw new Error("Failed to delete property");
      }

      console.log("Deleted property:", await res.json());

      // ✅ Update state locally instead of re-fetching
      setProperties((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting property:", err);
    } finally {
      setDeletingId(null);
    }
  };
  return (
    <section className="project-container landing-featured-prop">
      {/* <div className="property-list"> */}
        <FeaturedProperties
          properties={properties}
          onDelete={handleDeleteProperty}
          deletingId={deletingId}
        />
      {/* </div> */}
    </section>
  );
}
