// import type { Metadata } from "next";

// type Params = {
//   propertyId: string;
// };

// export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
//   const { propertyId } = params;

//   try {
//     const res = await fetch(
//       `https://yesha-reality-backend-staging.up.railway.app/properties/${propertyId}`,
//       { cache: "no-store" }
//     );

//     if (!res.ok) throw new Error("Failed to fetch");

//     const property = await res.json();

//     return {
//       title: `${property.bedroom} bedroom ${property.houseType} in ${property.estate} estate, ${property.location}`,
//       description: property.description || "Explore this premium listing in Abuja.",
//       openGraph: {
//         title: `${property.bedroom} bedroom ${property.houseType} in ${property.estate}`,
//         description: property.description || "Explore this premium listing in Abuja.",
//         images: [
//           {
//             url: `https://yesha-reality-backend-staging.up.railway.app${property.image}`,
//             width: 1200,
//             height: 630,
//             alt: "Property image",
//           },
//         ],
//       },
//     };
//   } catch (error) {
//     console.error("Metadata fetch error:", error);
//     return {
//       title: "Property Listing - Yesha Realty",
//       description: "Explore premium properties in Abuja.",
//     };
//   }
// }

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

export default function PropertyDetailsClient() {
  const { propertyId } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [availableProperties, setAvailableProperties] = useState<Property[]>([]);
  const [filtered, setFiltered] = useState<Property[]>([]);

  // Fetch all properties
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

  // Fetch single property
  useEffect(() => {
    if (!propertyId) return;

    fetch(`https://yesha-reality-backend-staging.up.railway.app/properties/${propertyId}`)
      .then((res) => res.json())
      .then((data) => {
        setProperty(data);
        console.log("Fetched property:", data);
      })
      .catch((err) => console.error("Error fetching property:", err));
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
          (filters.price === "8" && priceValue >= 5000000 && priceValue <= 8000000) ||
          (filters.price === "10" && priceValue > 8000000))
      );
    });

    setFiltered(filteredResults);
  };

  // Most viewed properties
  const mostViewed = useMemo(() => {
    return [...availableProperties].sort((a, b) => b.views - a.views).slice(0, 2);
  }, [availableProperties]);

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
              url: `https://yourdomain.com/properties/${propertyId}`,
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
                      <p>{property.bedroom} bedroom {property.houseType} in {property.estate} estate, {property.location}</p>
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
            src={`https://yesha-reality-backend-staging.up.railway.app${property.image}`}
            alt={`${property.bedroom}-bedroom ${property.houseType} in ${property.location}, ${property.landSize} sqm`}
            width={350}
            height={50}
          />
          <h1 className="details-header">
            {`${property.bedroom} bedroom ${property.houseType} in ${property.estate} estate, ${property.location}`}
          </h1>

          <div className="features-et-amenities">
            <div className="features">
              <h3>FEATURES</h3>
              <div className="details-para-cont">
                <p className="details-para"><strong>Project:</strong> {property.estate}</p>
                <p className="details-para"><strong>Land Size:</strong> {property.landSize} sqm</p>
                <p className="details-para"><strong>Bedrooms:</strong> {property.bedroom}</p>
                <p className="details-para"><strong>Price:</strong> ₦{Number(property.price).toLocaleString()}</p>
                <p className="details-para"><strong>Type:</strong> {property.houseType}</p>
                <p className="details-para"><strong>Location:</strong> {property.location}</p>
              </div>
            </div>

            <div className="amenities">
              <h3>Amenities</h3>
              <div className="details-para-cont">
                <p className="details-para">Basic Carcass</p>
                <p className="details-para">Screeding</p>
                <p className="details-para">POP</p>
                <p className="details-para">Wiring</p>
                <p className="details-para">Fittings</p>
                <p className="details-para">Internal doors</p>
                <p className="details-para">Painting</p>
                <p className="details-para">Basic Tiling</p>
              </div>
            </div>

            <div className="get-in-touch">
              <h1 className="details-header">Get In Touch</h1>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
