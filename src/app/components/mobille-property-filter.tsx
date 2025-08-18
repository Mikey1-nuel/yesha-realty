"use client";
import React, { useState, useEffect } from "react";
import CustomDropdown from "./custom-dropdown";
import { Property } from "@/types/property";
import { Filters } from "@/types/filters";
import "../style/custom-dropdown.css";
import "../style/mobile-property-filter.css";
import { X } from "lucide-react";

type PropertyCardProps = {
  property: Property;
};

type Props = {
  onFilterChange: (filters: Filters) => void;
};

const MobilePropertyFilter: React.FC<Props> = ({ onFilterChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);

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
    setMenuOpen(false);
  };

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

  const handleSearch = () => {
    onFilterChange(filters);
    setMenuOpen(false);
  };

  return (
    <div className="mobile-property-section_filter">
      <h4>Filter Property</h4>
      <button className="mobile-filter-btn" onClick={() => setMenuOpen(true)}>
        Filters
      </button>

      {menuOpen && (
        <div className="mobile-filter-menu">
          <div className="mobile-filter-header">
            <h4>Filter Options</h4>
            <button onClick={() => setMenuOpen(false)}>
              <X size={40} color="#333" />
            </button>
          </div>

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

          <div className="mobile-filter-actions">
            <button className="search-btn" onClick={handleSearch}>
              Search
            </button>
            <button className="clear-filter-btn" onClick={handleClearFilters}>
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobilePropertyFilter;
