"use client";
import React from "react";
import Image from "next/image";
import "../style/properties.css";

type Property = {
  id: number;
  estate: string;
  size: string;
  bedrooms: number;
  image: string;
  houseType: string;
  price: string;
  location: string;
  views: number;
  featured: boolean;
};

type PropertyCardProps = {
  property: Property;
};

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };
  return (
    <div className="land-card" key={property.id}>
      <div className="img-et-attribute">
        <div className="land-img">
{property.image ? (
  <Image
    src={property.image}
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
            <span>{property.size}</span>
          </div>

          <div className="icon-value-container">
            <Image src="/bedroom.webp" alt="Bedrooms" width={20} height={20} />
            <span>{property.bedrooms}</span>
          </div>
        </div>
      </div>

      <div className="land-info">
        <div className="house-type-price">
          <h3>
            {property.bedrooms} Bedroom {property.houseType}
          </h3>
          <span>{property.price}</span>
        </div>
        <div className="land-info-desc">
          <p>
            <strong>{property.estate}</strong>
          </p>
          <p>
            {truncateText(
              `${property.bedrooms} bedroom ${property.houseType} in ${property.estate} estate, ${property.location}`,
              70
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
