import React, { useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import FilterSidebar from "./FilterSidebar";
import SearchModal from "./SearchModal";
import RecipeSection from "./RecipeSection";
import RecipeDetails from "./RecipeDetails";
import About from "./AboutUs"; // 1. Import About Page
import Footer from "./Footer";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // 2. STATE: Manage Views ('home', 'about', 'details')
  const [currentView, setCurrentView] = useState("home");
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

  // 3. HANDLER: Unified Navigation
  const handleNavigate = (view) => {
    setCurrentView(view);
    setSelectedMeal(null); // Clear meal when switching main pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 4. HANDLER: Recipe Click -> Go to Details View
  const handleRecipeClick = (id) => {
    console.log("User clicked recipe ID:", id);
    setSelectedMeal(MOCK_DETAILED_MEAL);
    setCurrentView("details");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 5. LAYOUT CLASS: Centers content on large screens
  const containerClass = "max-w-[1440px] mx-auto md:px-8 w-full";

  // 6. RENDER LOGIC: Decides what to show based on 'currentView'
  const renderContent = () => {
    switch (currentView) {
      case "details":
        return (
          <div className={containerClass}>
            <RecipeDetails
              meal={selectedMeal}
              onBack={() => handleNavigate("home")}
            />
          </div>
        );
      case "about":
        return (
          <div className={containerClass}>
            <About />
          </div>
        );
      case "home":
      default:
        return (
          <>
            {/* HERO: Full Width (Outside container) */}
            <div className="w-full">
              <Hero />
            </div>

            {/* RECIPES: Contained */}
            <div className={containerClass}>
              <RecipeSection onRecipeClick={handleRecipeClick} />
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white w-full font-sans">
      {/* NAVBAR: Contained */}
      <div className={containerClass}>
        <Navbar
          onOpenFilter={() => setIsSidebarOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onNavigate={handleNavigate} // Pass navigation handler
        />
      </div>

      {/* OVERLAYS (Fixed position, ignore containers) */}
      <FilterSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={(q) => console.log(q)}
      />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1">{renderContent()}</main>

      {/* FOOTER: Contained */}
      <div className={containerClass}>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
