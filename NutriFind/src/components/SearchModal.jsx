import React, { useState } from "react";

const SearchModal = ({ isOpen, onClose, onSearch }) => {
  const [query, setQuery] = useState("");

  // Handle "Enter" key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (query.trim()) {
      onSearch(query); // Calls the API function in Home.jsx
      onClose(); // Optional: Close modal after search
    }
  };

  // CSS for visibility animation
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-white/95 backdrop-blur-md flex flex-col p-6 animate-in fade-in duration-200">
      {/* HEADER: Close Button */}
      <div className="flex justify-end mb-8">
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          {/* Close Icon (X) */}
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

      {/* INPUT SECTION */}
      <div className="w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-[#2F3E46] mb-4 text-center">
          What are you craving?
        </h2>

        <div className="relative">
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'Pasta', 'Vegan', etc..."
            className="w-full text-xl md:text-3xl border-b-2 border-gray-300 py-4 px-2 bg-transparent outline-none focus:border-[#6BB03F] text-gray-800 placeholder-gray-300 text-center"
          />

          {/* Search Button (Optional visual cue) */}
          <button
            onClick={handleSubmit}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-[#6BB03F] font-bold text-sm uppercase tracking-wide hover:text-green-700"
          >
            Search
          </button>
        </div>

        <p className="text-center text-gray-400 mt-4 text-sm">
          Press <b>Enter</b> to search
        </p>
      </div>
    </div>
  );
};

export default SearchModal;
