"use client";
import React, { useState } from "react";
import CustomDropdown from "./custom-dropdown";
import "../style/custom-dropdown.css";
import "../style/mobile-property-filter.css";
import { X } from "lucide-react";

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

const MobilePropertyFilter: React.FC<Props> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<Filters>({
    estate: "",
    size: "",
    bedrooms: "",
    houseType: "",
    price: "",
    location: "",
  });

  const [menuOpen, setMenuOpen] = useState(false);

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
    setMenuOpen(false);
  };

  const normalizeValue = (name: string, value: string) => {
    if (name === "price") {
      if (value.includes("Below")) return "5";
      if (value.includes("₦5M - ₦8M")) return "8";
      if (value.includes("Above")) return "10";
    }
    if (name === "bedrooms") {
      return value.split(" ")[0];
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
  };

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
              options={["Soteria City, Jikoyi", "Soteria City Phase II, Kuje"]}
            />

            <CustomDropdown
              name="size"
              value={filters.size}
              onChange={handleChange}
              label="Plot Size"
              options={["250sqm", "300sqm", "350sqm", "400sqm", "450sqm", "500sqm"]}
            />

            <CustomDropdown
              name="bedrooms"
              value={filters.bedrooms}
              onChange={handleChange}
              label="Bedroom"
              options={["3 Bedroom", "4 Bedroom", "5 Bedroom"]}
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
                "Terrace Duplex",
                "Terrace Duplex with BQ",
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
