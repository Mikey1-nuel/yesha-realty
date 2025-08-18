import { motion } from "framer-motion";
import PropertyCard from "./property-card";
import "../style/featured-properties.css";

type FeaturedPropertiesProps = {
  properties: any[];
  onDelete: (id: number) => Promise<void>;
  deletingId: number | null;
};

const FeaturedProperties = ({
  properties,
  onDelete,
  deletingId,
}: FeaturedPropertiesProps) => {
  const featured = properties
    .filter((property) => property.featured)
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 6); // Get the most recent 6

  console.log("Featured Properties:", featured);

  if (featured.length === 0) {
    return (
      <section className="featured-section">
        <h2>Featured Property</h2>
        <p>No featured properties available at the moment.</p>
      </section>
    );
  }

  return (
    <section className="featured-section">
      <h2>Featured Property</h2>
      <p className="featured-para">
        Premium listings selected for the best experience
      </p>
      <div className="property-grid">
        {featured.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.3,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <PropertyCard
              key={property.id}
              property={property}
              onDelete={onDelete}
              deletingId={deletingId}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProperties;
