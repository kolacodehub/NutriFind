import React, { useState } from "react";
import logo_black from "../assets/LogoBlack.png";
import logo_white from "../assets/LogoWhite.png";

const Navbar = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // 1. INITIAL STATE
  const [filters, setFilters] = useState({
    diet: [
      { label: "Veggies", checked: true },
      { label: "Dairy", checked: false },
    ],
    allergies: [
      { label: "Gluten", checked: true },
      { label: "Lorem", checked: false },
    ],
    cuisines: [
      { label: "Pakistani", checked: true },
      { label: "Indian", checked: false },
      { label: "Persian", checked: false },
      { label: "British", checked: false },
      { label: "Irish", checked: false },
    ],
    goals: [
      { label: "Weight Loss", checked: true },
      { label: "Get Active", checked: false },
    ],
  });

  // 2. LOGIC: This function toggles the checked state
  const handleToggle = (category, index) => {
    setFilters((prev) => {
      // Create a copy of the specific category array
      const updatedCategory = [...prev[category]];
      // Toggle the boolean
      updatedCategory[index] = {
        ...updatedCategory[index],
        checked: !updatedCategory[index].checked,
      };
      // Return the new state object
      return { ...prev, [category]: updatedCategory };
    });
  };

  return (
    <>
      {/* =======================
          1. DESKTOP NAVBAR 
      ======================== */}
      <nav className="hidden md:flex w-full bg-white px-26 py-4 items-center justify-between font-sans shadow-sm">
        <img src={logo_black} alt="" width={70} />

        <div className="flex flex-1 max-w-lg mx-6">
          <div className="flex w-full bg-[#F3F4F6] rounded overflow-hidden">
            <input
              type="text"
              placeholder="Search for recipes..."
              className="w-full bg-transparent px-4 py-2.5 text-sm text-gray-700 outline-none placeholder-gray-400"
            />
            <button className="bg-[#6BB03F] px-4 flex items-center justify-center hover:bg-green-700 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-8 text-sm font-semibold">
          <a href="#" className="text-[#6BB03F]">
            Home
          </a>
          <a href="#" className="text-gray-500 hover:text-[#6BB03F]">
            About Us
          </a>
          <button className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-1.5 bg-white hover:shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-[#FF6B6B]"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            <span className="text-xs font-bold text-gray-700">Subscribe</span>
          </button>
        </div>
      </nav>

      {/* =======================
          2. MOBILE NAVBAR (Pill)
      ======================== */}
      <div className="md:hidden w-full flex justify-center pt-4 px-4 fixed top-2 left-0 z-40">
        <div className="bg-white border border-gray-200 shadow-lg rounded-full px-4 py-2 flex items-center justify-between w-full max-w-sm">
          <div className="scale-75 origin-left ml-2">
            <img src={logo_black} alt="" width={70} />
          </div>

          <div className="flex items-center gap-4 text-sm font-semibold">
            <a href="#" className="text-[#6BB03F]">
              Home
            </a>
            <a href="#" className="text-[#2F3E46]">
              About Us
            </a>
          </div>

          <button
            onClick={() => setIsFilterOpen(true)}
            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* =======================
          3. FILTER SIDEBAR (Overlay)
      ======================== */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsFilterOpen(false)}
          ></div>

          {/* Sidebar Content */}
          <div className="relative w-full max-w-xs h-full bg-[#1F1E1B] p-6 overflow-y-auto text-gray-200 shadow-xl">
            {/* Header: Logo & Close */}
            <div className="flex items-center justify-between mb-8">
              <div className="scale-90 origin-left">
                <img src={logo_white} alt="" width={70} />
              </div>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-8 h-8 rounded-full bg-[#3E3E3E] flex items-center justify-center hover:bg-[#505050] transition-colors group"
              >
                <span className="text-[#D9822B] font-bold text-lg group-hover:text-[#FFA040]">
                  ✕
                </span>
              </button>
            </div>

            {/* Filter Title */}
            <h2 className="text-3xl text-[#84CC16] font-[cursive] mb-6 italic tracking-wide">
              Filter Recipes
            </h2>

            {/* Filter Sections */}
            <div className="space-y-6">
              <FilterSection
                title="Diet"
                categoryKey="diet"
                items={filters.diet}
                onToggle={handleToggle}
              />

              <FilterSection
                title="Allergies"
                categoryKey="allergies"
                items={filters.allergies}
                onToggle={handleToggle}
              />

              <FilterSection
                title="Cuisines"
                categoryKey="cuisines"
                items={filters.cuisines}
                onToggle={handleToggle}
                showMore
              />

              <FilterSection
                title="Goals"
                categoryKey="goals"
                items={filters.goals}
                onToggle={handleToggle}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ==========================================
// Helper Component for Filter Lists
// ==========================================
const FilterSection = ({ title, items, categoryKey, onToggle, showMore }) => (
  <div>
    <h3 className="text-white font-bold text-base mb-3">{title}</h3>
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <li
          key={idx}
          // 3. EVENT: On click, trigger the toggle function passed from Navbar
          onClick={() => onToggle(categoryKey, idx)}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Custom Checkbox */}
          <div
            className={`w-5 h-5 rounded border flex items-center justify-center transition-colors
            ${
              item.checked
                ? "bg-[#4C8229] border-[#4C8229]"
                : "bg-transparent border-gray-600 group-hover:border-gray-400"
            }`}
          >
            {item.checked && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <span className="text-gray-300 text-sm">{item.label}</span>
        </li>
      ))}
    </ul>
    {showMore && (
      <p className="text-[#4C8229] text-xs mt-3 cursor-pointer hover:underline">
        See more
      </p>
    )}
  </div>
);

export default Navbar;
