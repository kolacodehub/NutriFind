import React, { useState } from "react";
import Hero from "../components/Hero";
import FilterSidebar from "../components/FilterSidebar";
import SearchModal from "../components/SearchModal";
import RecipeSection from "../components/RecipeSection";
import RecipeDetails from "./RecipeDetails";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // State to manage view switching: If null, show Home; if populated, show Details
  const [selectedMeal, setSelectedMeal] = useState(null);

  // Placeholder data to simulate a full API response when a recipe is clicked
  const MOCK_DETAILED_MEAL = {
    idMeal: "52952",
    strMeal: "Beef Wellington",
    strCategory: "Beef",
    strArea: "British",
    strInstructions:
      "Preheat the oven to 220C/200C Fan/Gas 7.\n\nSit the 1kg beef fillet on a roasting tray...",
    strMealThumb:
      "https://www.themealdb.com/images/media/meals/vvpprx1487325699.jpg",
    strTags: "Meat,Pie,Main",
    strYoutube: "https://www.youtube.com/watch?v=FS8u1PBJz_I",
    strIngredient1: "Beef Fillet",
    strMeasure1: "1 kg",
    // ... add other ingredients as needed
  };

  // Triggered when a user selects a card: Loads mock data and resets scroll position
  const handleRecipeClick = (id) => {
    console.log("User clicked recipe ID:", id);
    setSelectedMeal(MOCK_DETAILED_MEAL);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Return to the main listing view
  const handleBack = () => {
    setSelectedMeal(null);
  };

  // Global container utility to keep content centered on large screens
  const containerClass = "max-w-[1440px] mx-auto md:px-8 w-full";

  return (
    <div className="min-h-screen bg-white w-full font-sans">
      {/* Global Overlays: Rendered outside the main flow to handle z-indexing correctly */}
      <FilterSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={(q) => console.log(q)}
      />

      {/* Main Layout Area */}
      <main className="flex-1">
        {/* Conditional Rendering: Switch between Details View and Landing View */}
        {selectedMeal ? (
          // Detailed View: Contained within the central layout
          <div className={containerClass}>
            <RecipeDetails meal={selectedMeal} onBack={handleBack} />
          </div>
        ) : (
          // Landing View: Hero (Full Width) + Recipe Grid (Contained)
          <>
            <div className="w-full">
              <Hero />
            </div>

            <div className={containerClass}>
              <RecipeSection onRecipeClick={handleRecipeClick} />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
