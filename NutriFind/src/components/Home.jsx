import React, { useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import FilterSidebar from "./FilterSidebar";
import SearchModal from "./SearchModal"; // Import the new modal

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State for Search Modal

  // ==========================================
  //  YOUR API LOGIC GOES HERE
  // ==========================================
  const performSearch = async (query) => {
    console.log("Searching for:", query);

    try {
      // 👇👇👇 REPLACE THIS WITH YOUR ACTUAL API LINK 👇👇👇
      // const response = await fetch(`https://your-api.com/recipes?search=${query}`);
      // const data = await response.json();
      // console.log(data);
      // alert(`You searched for: ${query}. Check console for details.`);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar with handlers for both modals */}
      <Navbar
        onOpenFilter={() => setIsSidebarOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* The Sidebar (Filters) */}
      <FilterSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* The NEW Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={performSearch}
      />

      <Hero />

      {/* Content Area */}
      <div className="py-12 text-center">
        <h2 className="text-[#2F3E46] font-bold text-2xl uppercase">
          Embark on a Journey
        </h2>
        <p className="text-gray-400 mt-2">Recipes coming soon...</p>
      </div>
    </div>
  );
};

export default Home;
