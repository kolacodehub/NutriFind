import React from "react";
import logo_white from "../assets/LogoWhite.png";

// Reusable sidebar component to handle recipe filtering logic and UI
const FilterSidebar = ({ isOpen, onClose, filters, onToggle }) => {
  return (
    <div
      // Controls the overall visibility and fading transition of the modal overlay
      className={`fixed inset-0 z-[60] flex transition-opacity duration-300 ${
        isOpen
          ? "opacity-100 visible"
          : "opacity-0 invisible pointer-events-none"
      }`}
    >
      {/* Backdrop overlay that clicks-to-close the sidebar */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Main sliding panel containing the filter options */}
      <div
        className={`relative w-[85%] max-w-xs h-full bg-[#1F1E1B] p-6 overflow-y-auto transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <img
            src={logo_white}
            alt="NutriFind"
            className="h-8 w-auto object-contain"
          />

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#3E3E3E] flex items-center justify-center text-[#D9822B] hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <h2 className="text-3xl text-[#84CC16] font-[cursive] italic mb-6">
          Filter Recipes
        </h2>

        <div className="space-y-6">
          {/* Only render filter sections if the filters object is populated */}
          {filters && (
            <>
              <Section
                title="Category"
                group="categories"
                items={filters.categories}
                onToggle={onToggle}
              />
              <Section
                title="Cuisine"
                group="areas"
                items={filters.areas}
                onToggle={onToggle}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper component to render individual filter groups with custom checkbox styling
const Section = ({ title, group, items, onToggle }) => (
  <div>
    <h3 className="text-white font-bold mb-3 border-b border-gray-700 pb-2">
      {title}
    </h3>
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-center gap-3 cursor-pointer group"
          // Pass the specific group and index back to the parent to update state
          onClick={() => onToggle(group, i)}
        >
          <div
            className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
              item.checked
                ? "bg-[#4C8229] border-[#4C8229]"
                : "border-gray-600 group-hover:border-[#4C8229]"
            }`}
          >
            {/* Custom checkmark icon shown only when the item is selected */}
            {item.checked && <span className="text-white text-xs">✓</span>}
          </div>
          <span
            className={`text-sm transition-colors ${item.checked ? "text-white" : "text-gray-400 group-hover:text-white"}`}
          >
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default FilterSidebar;
