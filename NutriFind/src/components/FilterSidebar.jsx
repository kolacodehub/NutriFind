import React from "react";
import logo_white from "../assets/LogoWhite.png";

const FilterSidebar = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 z-[60] flex transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
    >
      {/* Dark Background Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Sidebar Content */}
      <div
        className={`relative w-[85%] max-w-xs h-full bg-[#1F1E1B] p-6 overflow-y-auto transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header: White Logo & Close Button */}
        <div className="flex items-center justify-between mb-8">
          {/* LOGO IMAGE (White) */}
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
          <Section title="Diet" items={["Veggies", "Dairy"]} checkedIdx={0} />
          <Section
            title="Allergies"
            items={["Gluten", "Lorem"]}
            checkedIdx={0}
          />
          <Section
            title="Cuisines"
            items={["Pakistani", "Indian", "Persian", "British", "Irish"]}
            checkedIdx={0}
            showMore
          />
          <Section
            title="Goals"
            items={["Weight Loss", "Get Active"]}
            checkedIdx={0}
          />
        </div>
      </div>
    </div>
  );
};

// Helper for the checkboxes (No changes needed here)
const Section = ({ title, items, checkedIdx, showMore }) => (
  <div>
    <h3 className="text-white font-bold mb-3">{title}</h3>
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-3">
          <div
            className={`w-5 h-5 rounded border flex items-center justify-center ${i === checkedIdx ? "bg-[#4C8229] border-[#4C8229]" : "border-gray-600"}`}
          >
            {i === checkedIdx && <span className="text-white text-xs">✓</span>}
          </div>
          <span className="text-gray-300 text-sm">{item}</span>
        </li>
      ))}
    </ul>
    {showMore && <p className="text-[#4C8229] text-xs mt-3">See more</p>}
  </div>
);

export default FilterSidebar;
