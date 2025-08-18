"use client";
import React, { useEffect, useState } from "react";
import "../../style/project.css";
import FeaturedProperties from "../featured-properties";

const Project = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch("https://yesha-reality-backend-staging.up.railway.app/properties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data); // ✅ update state
      })
      .catch((err) => console.error("Error fetching properties:", err));
  }, []);


  return (
    <main id="project" className="project-container">
      <div className="project-subcontainer">
        <h1>Project</h1>
        <p className="project-para">
          Introducing SOTERIA CITY, a cutting-edge smart estate that redefines
          the future of living. This innovative community boasts
          state-of-the-art smart home technology, seamlessly integrating
          comfort, convenience, and sustainability. Strategically situated in a
          rapidly growing area, SOTERIA CITY offers a prime opportunity for
          investors to maximize their returns. With its unique blend of modern
          luxury and smart living, this estate is poised to set a new standard
          for urban development.
        </p>
          <FeaturedProperties properties={properties} />
      </div>
    </main>
  );
};

export default Project;
