"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Property } from "@/types/property";
import Head from "next/head";

export default function PropertyDetails() {
  const { propertyId } = useParams();
  const [property, setProperty] = useState<Property | null>(null);

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

  if (!property) return <p>Loading property details...</p>;

  return (
    <>
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
              "url": `https://yourdomain.com/properties/${propertyId}`,
              "priceCurrency": "NGN",
              "price": property.price,
              "itemOffered": {
                "@type": "House",
                "name": property.estate,
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": property.location || "Abuja",
                  "addressRegion": property.location || "Abuja State",
                  "addressCountry": "Nigeria",
                },
                "numberOfRooms": property.bedroom || 0,
              },
              "seller": {
                "@type": "RealEstateAgent",
                "name": "Yesha Realty",
              },
            }),
          }}
        />
      </Head>

      <h1>{property.estate}</h1>
      <p>Land Size: {property.landSize}</p>
      <p>Bedrooms: {property.bedroom}</p>
      <p>Price: ₦{property.price}</p>
      <p>Type: {property.houseType}</p>
      <p>Location: {property.location}</p>
    </>
  );
}
