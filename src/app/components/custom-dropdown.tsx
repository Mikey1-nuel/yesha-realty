'use client';
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import "../style/custom-dropdown.css";

type CustomDropdownProps = {
  name: string;
  value: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
  options: string[];
  label?: string;
};

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  name,
  value,
  onChange,
  options,
  label = 'Select',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setDropUp(spaceBelow < 200 && spaceAbove > spaceBelow);
    }
  }, [isOpen]);

  const handleOptionClick = (val: string) => {
    onChange({ target: { name, value: val } });
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button className="dropdown-button" onClick={toggleDropdown}>
        <div className="value">
            {value || label}
        </div>

        <div className="drop">
        {dropUp ? (
          <ChevronUp className="dropdown-icon" />
        ) : (
          <ChevronDown className="dropdown-icon" />
        )}
        </div>
      </button>
      {isOpen && (
        <ul className={`dropdown-options ${dropUp ? 'drop-up' : 'drop-down'}`}>
          {options.map((opt) => (
            <li key={opt} onClick={() => handleOptionClick(opt)}>
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
