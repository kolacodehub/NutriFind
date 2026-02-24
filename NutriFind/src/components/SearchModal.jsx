import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchModal = ({ isOpen, onClose }) => {
  // Local state to track the user's search input
  const [query, setQuery] = useState("");
  // Hook to handle programmatic routing to the search results page
  const navigate = useNavigate();

  // Listens for the "Enter" keypress to trigger the search without needing a button click
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    // Only proceed if the query isn't just empty spaces
    if (query.trim()) {
      // Construct the search URL, safely encoding the user's input to handle special characters
      navigate(`/search/${encodeURIComponent(query)}`);
      // Close the modal overlay
      onClose();
      // Clear the input field for the next time the modal is opened
      setQuery("");
    }
  };

  // If the modal isn't toggled open, don't render anything to the DOM
  if (!isOpen) return null;

  return (
    // Fullscreen frosted-glass overlay that sits above all other content (z-[80])
    <div className="fixed inset-0 z-[80] bg-white/95 backdrop-blur-md flex flex-col p-6 animate-in fade-in duration-200">
      {/* Top-right close action */}
      <div className="flex justify-end mb-8">
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Main search input area vertically pushed down and centered on the screen */}
      <div className="w-full max-w-2xl mx-auto mt-20">
        <h2 className="text-3xl font-extrabold text-[#2F3E46] mb-8 text-center">
          What are you craving?
        </h2>

        <div className="relative group">
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'Pasta', 'Chicken', etc..."
            className="w-full text-2xl md:text-4xl border-b-2 border-gray-200 py-4 px-2 bg-transparent outline-none focus:border-[#6BB03F] text-gray-800 placeholder-gray-300 text-center transition-colors font-bold"
          />

          {/* Absolute positioned search button inside the input area */}
          <button
            onClick={handleSubmit}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-[#6BB03F] font-bold text-sm uppercase tracking-wide hover:text-green-700 bg-white/50 px-3 py-1 rounded-lg"
          >
            Search
          </button>
        </div>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Press <b>Enter</b> to see results
        </p>

        {/* Pre-defined search chips for quick navigation */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {["Chicken", "Pasta", "Seafood", "Salad"].map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setQuery(tag);
                // A small delay ensures the state finishes updating before the navigation triggers
                setTimeout(handleSubmit, 100);
              }}
              className="px-4 py-2 bg-gray-50 text-gray-500 rounded-full text-sm hover:bg-[#EBF5E0] hover:text-[#4C8229] transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
