import React from "react";
import logo_white from "../assets/LogoWhite.png";

const Footer = () => {
  return (
    <footer className="w-full px-4 py-6 bg-white font-sans">
      {/* CONTAINER: 
          - Dark Background (#1F1E1B)
          - Rounded Corners
      */}
      <div className="bg-[#1F1E1B] rounded-[2.5rem] px-6 py-10 md:px-16 md:py-12 flex flex-col relative overflow-hidden mx-auto max-w-[1400px]">
        {/* MAIN CONTENT ROW */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
          {/* 1. LEFT: Logo (Centered on mobile, Left on Desktop) */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="w-32 md:w-auto">
              <img
                src={logo_white}
                alt="NutriFind"
                className="w-full h-auto object-contain"
              />
            </div>
            {/* Tagline: Hidden on Mobile as per your screenshot */}
            <p className="text-gray-400 text-sm hidden md:block">
              Cookpal is a recipe website...
            </p>
          </div>

          {/* 2. CENTER: Navigation & Subscribe */}
          <div className="flex flex-col items-center gap-6 w-full md:w-auto">
            {/* Links: Home & Help */}
            <div className="flex items-center gap-12 md:gap-8 font-bold text-lg md:text-sm">
              <a
                href="#"
                className="text-[#E85D51] hover:text-red-400 transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="text-white hover:text-[#6BB03F] transition-colors"
              >
                Help
              </a>
            </div>

            {/* Subscribe Button */}
            <button className="flex items-center gap-2 border border-[#4C8229] rounded-full px-8 py-2.5 bg-[#1F1E1B] hover:bg-[#4C8229] transition-colors group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-[#FF6B6B]"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
              <span className="text-white text-sm font-semibold group-hover:text-white">
                Subscribe
              </span>
            </button>
          </div>

          {/* 3. RIGHT: Search Bar (Hidden on Mobile) */}
          <div className="hidden md:block w-auto min-w-[300px]">
            <div className="flex w-full bg-white rounded overflow-hidden h-10">
              <input
                type="text"
                placeholder="Search for recipes..."
                className="w-full bg-transparent px-4 py-2 text-sm text-gray-700 outline-none placeholder-gray-400"
              />
              <button className="bg-[#6BB03F] w-12 flex items-center justify-center hover:bg-green-700 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
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

        {/* Divider Line */}
        <div className="w-full h-px bg-[#2F3E46] my-8"></div>

        {/* BOTTOM ROW: Copyright */}
        <div className="text-center text-gray-500 text-[10px] tracking-widest uppercase font-medium">
          COPYRIGHT © 2026 NUTRIFIND.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
