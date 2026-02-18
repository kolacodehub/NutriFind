import React, { useState } from "react";
import Hero from "../components/Hero";
import FilterSidebar from "../components/FilterSidebar";
import SearchModal from "../components/SearchModal";
import RecipeSection from "../components/RecipeSection";
import RecipeDetails from "./RecipeDetails";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // 1. STATE: Only track selected meal (List vs Details view)
  const [selectedMeal, setSelectedMeal] = useState(null);

  // MOCK DATA
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

  // 2. HANDLER: Show Details
  const handleRecipeClick = (id) => {
    console.log("User clicked recipe ID:", id);
    setSelectedMeal(MOCK_DETAILED_MEAL);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 3. HANDLER: Go Back to List
  const handleBack = () => {
    setSelectedMeal(null);
  };

  // Layout Helper
  const containerClass = "max-w-[1440px] mx-auto md:px-8 w-full";

  return (
    <div className="min-h-screen bg-white w-full font-sans">

      {/* OVERLAYS */}
      <FilterSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={(q) => console.log(q)}
      />

      {/* MAIN CONTENT */}
      <main className="flex-1">
        {selectedMeal ? (
          // VIEW 1: RECIPE DETAILS
          <div className={containerClass}>
            <RecipeDetails meal={selectedMeal} onBack={handleBack} />
          </div>
        ) : (
          // VIEW 2: HOME (Hero + List)
          <>
            {/* Hero is full width */}
            <div className="w-full">
              <Hero />
            </div>

            {/* Recipes are contained */}
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
