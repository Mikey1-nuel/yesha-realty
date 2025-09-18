import { MetadataRoute } from "next";

const SITE_URL = process.env.SITE_URL || "https://yesha-realty.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let entries: MetadataRoute.Sitemap = [];

  try {
    const response = await fetch(
      "https://yesha-reality-backend-staging.up.railway.app/properties",
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch properties");

    const properties = await response.json();

    entries = properties.map(
      (property: { id: number; updatedAt?: string }) => ({
        url: `${SITE_URL}/properties/${property.id}`,
        lastModified: property.updatedAt
          ? new Date(property.updatedAt)
          : new Date(),
      })
    );
  } catch (error) {
    console.error("Sitemap generation error:", error);
  }

  return [
    { url: `${SITE_URL}/properties`, lastModified: new Date() },
    ...entries,
    { url: `${SITE_URL}/real-estate`, lastModified: new Date() },
    {
      url: `${SITE_URL}/pages/real-estate-agent-registration`,
      lastModified: new Date(),
    },
  ];
}