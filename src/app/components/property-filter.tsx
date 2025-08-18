"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import { Property } from "@/types/property";
import { Filters } from "@/types/filters";
import CustomDropdown from "./custom-dropdown";
import "../style/property-filter.css";

type PropertyCardProps = {
  property: Property;
};

type Props = {
  onFilterChange: (filters: Filters) => void;
};

const PropertyFilter: React.FC<Props> = ({ onFilterChange }) => {
  const [listOfEstate, setListOfEstate] = useState<string[]>([]);
  const [listOfLandSize, setListOfLandSize] = useState<string[]>([]);
  const [listOfBedroom, setListOfBedroom] = useState<string[]>([]);
  const [listOfHouseType, setListOfHouseType] = useState<string[]>([]);
  const [listOfPrice, setListOfPrice] = useState<string[]>([]);
  const [listOfLocation, setListOfLocation] = useState<string[]>([]);
  useEffect(() => {
    fetch("https://yesha-reality-backend-staging.up.railway.app/properties")
      .then((res) => res.json())
      .then((data: Property[]) => {
        setListOfEstate([...new Set(data.map((item) => item.estate))]);
        setListOfLandSize([
          ...new Set(data.map((item) => item.landSize.toString())),
        ]);
        setListOfBedroom([
          ...new Set(data.map((item) => `${item.bedroom} Bedroom`)),
        ]);
        setListOfHouseType([...new Set(data.map((item) => item.houseType))]);
        setListOfPrice([...new Set(data.map((item) => item.price))]);
        setListOfLocation([...new Set(data.map((item) => item.location))]);
      })
      .catch((err) => console.error("Error fetching properties:", err));
  }, []);

  const sortedLandSize = [...listOfLandSize].sort(
    (a, b) => Number(a) - Number(b)
  );

  const [filters, setFilters] = useState<Filters>({
    estate: "",
    landSize: "",
    bedroom: "",
    houseType: "",
    price: "",
    location: "",
  });

  const handleClearFilters = () => {
    const resetFilters: Filters = {
      estate: "",
      landSize: "",
      bedroom: "",
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

    if (name === "bedroom") {
      return value.split(" ")[0]; // "4 Bedroom" → "4"
    }

    if (name === "landSize") {
      return Number(value.split(" ")[0]); // "500 sqm" → 500
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

  console.log(filters);

  return (
    <div className="property-section_filter">
      <h3>Filter Property</h3>
      <div className="filter-grid">
        <CustomDropdown
          name="estate"
          value={filters.estate}
          onChange={handleChange}
          label="Estate/property"
          options={listOfEstate}
        />

        <CustomDropdown
          name="landSize"
          value={filters.landSize}
          onChange={handleChange}
          label="Plot Size"
          options={sortedLandSize}
        />

        <CustomDropdown
          name="bedroom"
          value={filters.bedroom}
          onChange={handleChange}
          label="Bedroom"
          options={listOfBedroom}
        />

        <CustomDropdown
          name="houseType"
          value={filters.houseType}
          onChange={handleChange}
          label="Structure"
          options={listOfHouseType}
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
          options={listOfLocation}
        />
      </div>

      <button className="clear-filter-btn" onClick={handleClearFilters}>
        Clear Filters
      </button>
    </div>
  );
};

export default PropertyFilter;
