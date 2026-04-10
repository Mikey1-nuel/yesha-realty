import type { Metadata, ResolvingMetadata } from "next";
import PropertyDetailsClient from "./generateMetadata";

type Params = {
  propertyId: string;
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function generateStaticParams() {
  const res = await fetch("https://yesha-reality-backend-staging.up.railway.app/properties", {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch properties");
    return [];
  }

  const properties = await res.json();

  return properties.map((property: { id: string }) => ({
    propertyId: property.id.toString(),
  }));
}

export const revalidate = 60;

export async function generateMetadata(
  { params }: { params: Promise<{ propertyId: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { propertyId } = await params;

  const res = await fetch(
    `https://yesha-reality-backend-staging.up.railway.app/properties/${propertyId}`,
    {
      next: { revalidate: 60 }, // ✅ instead of cache: "no-store"
    }
  );

  if (!res.ok) {
    return {
      title: "Property Listing - Yesha Realty",
      description: "Explore premium properties in Abuja.",
    };
  }

  const property = await res.json();
  await sleep(1000);

  return {
    title: `${property.bedroom} bedroom ${property.houseType} in ${property.estate} estate, ${property.location}`,
    description: property.description || "Explore this premium listing in Abuja.",
    openGraph: {
      title: `${property.bedroom} bedroom ${property.houseType} in ${property.estate}`,
      description: property.description || "Explore this premium listing in Abuja.",
      images: [
        {
          url: `${property.image}`,
          // url: `${property.image}`,
          width: 1200,
          height: 630,
          alt: "Property image",
        },
      ],
    },
  };
}

export default function PropertyDetails() {
  return (
    <PropertyDetailsClient />
  );
}
