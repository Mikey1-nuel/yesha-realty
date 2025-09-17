import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/admin", "/privacy", "/componets"]
            }
        ],
        sitemap: `${process.env.SITE_URL}/sitemap.xml`
    }
}