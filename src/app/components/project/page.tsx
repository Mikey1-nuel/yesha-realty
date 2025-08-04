"use client";
import React from "react";
import "../../style/project.css";
import FeaturedProperties from "../featured-properties";

const Project = () => {
  const projects = [
  {
    id: 1,
    estate: "Soteria City, Jikwoyi",
    size: "250sqm",
    bedrooms: 2,
    houseType: "Fully Detached Bungalow",
    price: "₦5,000,000",
    location: "Abuja",
    views: 25,
    featured: false,
  },
  {
    id: 2,
    estate: "Soteria City, Jikwoyi",
    size: "350sqm",
    bedrooms: 3,
    houseType: "Fully Detached Bungalow",
    price: "₦6,000,000",
    location: "Abuja",
    views: 58,
    featured: false,
  },
  {
    id: 3,
    estate: "Soteria City, Jikwoyi",
    size: "400sqm",
    bedrooms: 4,
    houseType: "Fully Detached Bungalow",
    price: "₦8,000,000",
    location: "Abuja",
    views: 65,
    featured: false,
  },
  {
    id: 4,
    estate: "Soteria City, Jikwoyi",
    size: "450sqm",
    bedrooms: 4,
    houseType: "Fully Detached Bungalow",
    price: "₦10,000,000",
    location: "Abuja",
    views: 75,
    featured: true,
  },
  {
      id: 5,
      estate: "Soteria City Phase II, Kuje",
    size: "150sqm",
    bedrooms: 2,
    houseType: "Terrace Duplex",
    price: "₦2,000,000",
    location: "Abuja",
    views: 45,
    featured: true,
  },
  {
    id: 6,
    estate: "Soteria City Phase II, Kuje",
    size: "250sqm",
    bedrooms: 3,
    houseType: "Terrace Duplex",
    price: "₦3,500,000",
    location: "Abuja",
    views: 60,
    featured: true,
  },
  {
    id: 7,
    estate: "Soteria City Phase II, Kuje",
    size: "350sqm",
    bedrooms: 3,
    houseType: "Fully Detached Bungalow",
    price: "₦4,500,000",
    location: "Abuja",
    views: 55,
    featured: true,
  },
  {
    id: 8,
    estate: "Soteria City Phase II, Kuje",
    size: "400sqm",
    bedrooms: 4,
    houseType: "Fully Detached Bungalow",
    price: "₦5,500,000",
    location: "Abuja",
    views: 70,
    featured: true,
  },
  {
    id: 9,
    estate: "Soteria City Phase II, Kuje",
    size: "500sqm",
    bedrooms: 4,
    houseType: "Duplex with BQ",
    price: "₦7,000,000",
    location: "Abuja",
    views: 80,
    featured: true,
  },
  ];

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
          <FeaturedProperties properties={projects} />
      </div>
    </main>
  );
};

export default Project;
