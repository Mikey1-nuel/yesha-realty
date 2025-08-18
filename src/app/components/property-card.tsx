"use client";
import React from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Property } from "@/types/property";
import "../style/properties.css";

type PropertyCardProps = {
  property: Property;
  onDelete: (id: number) => Promise<void>;
  deletingId: number | null;
};

const PropertyCard = ({
  property,
  onDelete,
  deletingId,
}: PropertyCardProps) => {
  console.log("PropertyCard props:", property);
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div className="land-card" key={property.id}>
      <div className="img-et-attribute">
        <div className="land-img">
          {property.image ? (
            <Image
              src={`https://yesha-reality-backend-staging.up.railway.app${property.image}`}
              alt="Property"
              width={400}
              height={210}
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: 350,
                height: 200,
                backgroundColor: "#ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.9rem",
                color: "#333",
              }}
            >
              No Image Available
            </div>
          )}
        </div>

        <div className="attribute">
          <div className="icon-value-container">
            <Image src="/land-size.webp" alt="Size" width={20} height={20} />
            <span>{property.landSize} sqm</span>
          </div>

          <div className="icon-value-container">
            <Image src="/bedroom.webp" alt="Bedroom" width={20} height={20} />
            <span>{property.bedroom}</span>
          </div>
        </div>
      </div>

      <div className="land-info">
        <div className="house-type-price">
          <h3>
            {property.bedroom} Bedroom {property.houseType}
          </h3>
          <span>₦{Number(property.price).toLocaleString()}</span>
        </div>
        <div className="land-info-desc">
          <p>
            <strong>{property.estate}</strong>
          </p>
          <p>
            {truncateText(
              `${property.bedroom} bedroom ${property.houseType} in ${property.estate} estate, ${property.location}`,
              70
            )}
          </p>
        </div>
      </div>
      <Trash2
        size={24}
        color="red"
        className="delete-icon"
        onClick={() => onDelete(property.id)}
        style={{
          opacity: deletingId === property.id ? 0.5 : 1,
          pointerEvents: deletingId === property.id ? "none" : "auto",
        }}
      />
    </div>
  );
};

export default PropertyCard;
