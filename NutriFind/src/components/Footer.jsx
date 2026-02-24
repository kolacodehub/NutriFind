import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo_white from "../assets/LogoWhite.png";

const Footer = () => {
  // Local state to manage the search input value
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Navigates to the search results page and resets the view
  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query)}`);
      setQuery("");
      window.scrollTo(0, 0);
    }
  };

  // Allows users to trigger search by pressing the Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <footer className="w-full px-4 py-6 bg-white font-sans">
      {/* Inner floating container with dark background and heavy rounding */}
      <div className="bg-[#1F1E1B] rounded-[2rem] px-6 py-8 md:px-12 md:py-10 flex flex-col relative overflow-hidden mx-auto max-w-6xl">
        {/* Responsive layout: stacks vertically on mobile, spreads horizontally on desktop */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
          {/* Branding Section: Logo and tagline */}
          <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
            <div className="w-32 md:w-28">
              <img
                src={logo_white}
                alt="NutriFind"
                className="w-full h-auto object-contain"
              />
            </div>
            {/* Tagline hidden on mobile to save space */}
            <p className="text-gray-400 text-xs hidden md:block max-w-xs leading-relaxed">
              NutriFind is your go-to platform for healthy, delicious, and
              easy-to-make recipes.
            </p>
          </div>

          {/* Navigation and Action Section */}
          <div className="flex flex-col items-center gap-6 md:gap-4">
            <div className="flex items-center gap-8 text-sm font-bold">
              <Link
                to="/"
                className="text-[#E85D51] hover:text-red-400 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-white hover:text-[#6BB03F] transition-colors"
              >
                About Us
              </Link>
            </div>

            {/* Subscribe CTA button with SVG icon */}
            <button className="flex items-center gap-2 border border-[#4C8229] rounded-full px-6 py-2 bg-[#1F1E1B] hover:bg-[#4C8229] transition-colors group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-3.5 h-3.5 text-[#FF6B6B]"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
              <span className="text-white text-xs font-semibold group-hover:text-white">
                Subscribe
              </span>
            </button>
          </div>

          {/* Search Bar Section: Visible only on desktop/tablet (md breakpoint) */}
          <div className="hidden md:block w-auto min-w-[240px]">
            <div className="flex w-full bg-white rounded overflow-hidden h-9">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search for recipes..."
                className="w-full bg-transparent px-4 py-1 text-xs text-gray-700 outline-none placeholder-gray-400"
              />
              <button
                onClick={handleSearch}
                className="bg-[#6BB03F] w-10 flex items-center justify-center hover:bg-green-700 transition-colors"
              >
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
        </div>

        <div className="w-full h-px bg-[#2F3E46] my-6"></div>

        <div className="text-center text-gray-500 text-[10px] tracking-widest uppercase font-medium">
          COPYRIGHT © 2026 NUTRIFIND. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
