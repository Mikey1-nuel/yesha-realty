"use client";
import React, { useState, ChangeEvent } from "react";
import CustomDropdown from "./custom-dropdown";
import "../style/property-filter.css";

// Define the filter structure
type Filters = {
  estate: string;
  size: string;
  bedrooms: string;
  houseType: string;
  price: string;
  location: string;
};

type Props = {
  onFilterChange: (filters: Filters) => void;
};

const PropertyFilter: React.FC<Props> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<Filters>({
    estate: "",
    size: "",
    bedrooms: "",
    houseType: "",
    price: "",
    location: "",
  });

//   const handleChange = (e: ChangeEvent<HTMLSelectElement> | any) => {
//     const { name, value } = e.target;
//     const updated = { ...filters, [name]: value };
//     setFilters(updated);
//     onFilterChange(updated);
//   };

  const handleClearFilters = () => {
    const resetFilters: Filters = {
      estate: "",
      size: "",
      bedrooms: "",
      houseType: "",
      price: "",
      location: "",
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const normalizeValue = (name: string, value: string) => {
  if (name === "price") {
    if (value.includes("Below")) return "5";
    if (value.includes("₦5M - ₦8M")) return "8";
    if (value.includes("Above")) return "10";
  }

  if (name === "bedrooms") {
    return value.split(" ")[0]; // "4 Bedrooms" → "4"
  }

  return value;
};

const handleChange = (e: { target: { name: string; value: string } }) => {
  const { name, value } = e.target;
  const updated = {
    ...filters,
    [name]: normalizeValue(name, value),
  };
  setFilters(updated);
  onFilterChange(updated);
};

  return (
    <div className="property-section_filter">
      <h3>Filter Property</h3>
      <div className="filter-grid">
        <CustomDropdown
  name="estate"
  value={filters.estate}
  onChange={handleChange}
  label="Estate/property"
  options={[
    "Soteria City, Jikoyi",
    "Soteria City Phase II, Kuje",
  ]}
/>

<CustomDropdown
  name="size"
  value={filters.size}
  onChange={handleChange}
  label="Plot Size"
  options={[
    "250sqm", "300sqm", "350sqm", "400sqm", "450sqm", "500sqm",
    "550sqm", "600sqm", "650sqm", "700sqm", "750sqm", "800sqm",
    "850sqm", "900sqm", "950sqm", "1000sqm"
  ]}
/>

<CustomDropdown
  name="bedrooms"
  value={filters.bedrooms}
  onChange={handleChange}
  label="Bedroom"
  options={["2 Bedroom", "3 Bedroom", "4 Bedroom", "5 Bedroom"]}
/>

<CustomDropdown
  name="houseType"
  value={filters.houseType}
  onChange={handleChange}
  label="Structure"
  options={[
    "Bungalow",
    "Fully Detached Bungalow",
    "Semi Detached Duplex",
    "Fully Detached Duplex",
    "Fully Terrace Duplex",
    "Terrace Duplex with BQ",
    "Penthouse"
  ]}
/>

<CustomDropdown
  name="price"
  value={filters.price}
  onChange={handleChange}
  label="Price Range"
  options={["Below ₦5M", "₦5M - ₦8M", "Above ₦8M"]}
/>

<CustomDropdown
  name="location"
  value={filters.location}
  onChange={handleChange}
  label="Location"
  options={["Abuja"]}
/>

      </div>

      <button className="clear-filter-btn" onClick={handleClearFilters}>
        Clear Filters
      </button>
    </div>
  );
};

export default PropertyFilter;
