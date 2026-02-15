import React, { useState } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import FilterSidebar from "./FilterSidebar";
import SearchModal from "./SearchModal";
import RecipeSection from "./RecipeSection";
import RecipeDetails from "./RecipeDetails";
import Footer from "./Footer";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // 1. STATE: Selected meal is null by default (shows list)
  const [selectedMeal, setSelectedMeal] = useState(null);

  // 2. MOCK DATA: This mimics exactly what TheMealDB API returns for a single meal.
  // I put it here so you can swap it with a real API call later easily.
  const MOCK_DETAILED_MEAL = {
    idMeal: "52952",
    strMeal: "Beef Wellington",
    strCategory: "Beef",
    strArea: "British",
    strInstructions:
      "Preheat the oven to 220C/200C Fan/Gas 7.\n\nSit the 1kg beef fillet on a roasting tray, brush with 1 tbsp vegetable oil and season with pepper, then roast for 15 mins for medium-rare or 20 mins for medium. When the beef is cooked to your liking, remove from the oven to cool, then chill in the fridge for about 20 mins.\n\nWhile the beef is cooling, chop 250g chestnut mushrooms as finely as possible so they have the texture of coarse breadcrumbs. You can use a food processor to do this, but make sure you pulse-chop the mushrooms so they don’t become a slurry.\n\nHeat 2 tbsp of the oil and 50g butter in a large pan and fry the mushrooms on a medium heat, with 1 large thyme sprig, for about 10 mins stirring often, until you have a softened mixture. Season the mushroom mixture, pour over 100ml white wine and cook for about 10 mins until all the wine has been absorbed. The mixture should hold its shape when stirred. Remove the mushroom duxelles from the pan to cool and discard the thyme.\n\nOverlap two pieces of cling film over a large chopping board. Lay 12 slices prosciutto on the cling film, slightly overlapping, in a double row. Spread half the mushrooms over the prosciutto, then sit the fillet on it and spread the remaining mushrooms over. Use the cling film’s edges to draw the prosciutto around the fillet, then roll it into a sausage shape, twisting the ends of cling film to tighten it as you go. Chill the fillet while you roll out the pastry.",
    strMealThumb:
      "https://www.themealdb.com/images/media/meals/vvpprx1487325699.jpg",
    strTags: "Meat,Pie,Main",
    strYoutube: "https://www.youtube.com/watch?v=FS8u1PBJz_I",
    strIngredient1: "Beef Fillet",
    strMeasure1: "1 kg",
    strIngredient2: "Mushrooms",
    strMeasure2: "250g",
    strIngredient3: "Parma Ham",
    strMeasure3: "12 slices",
    strIngredient4: "Puff Pastry",
    strMeasure4: "400g",
    strIngredient5: "Egg",
    strMeasure5: "1 Beaten",
    strIngredient6: "Vegetable Oil",
    strMeasure6: "1 tbsp",
    strIngredient7: "English Mustard",
    strMeasure7: "2 tbsp",
    strIngredient8: "",
    strMeasure8: "",
    // ... (The API usually returns empty strings for unused slots 8-20)
  };

  // 3. LOGIC: Handle Click (No Async/Fetch needed anymore)
  const handleRecipeClick = (id) => {
    console.log("User clicked recipe ID:", id);

    // For now, I'm just setting the static mock data regardless of which ID was clicked.
    // Later, you can fetch the specific ID here.
    setSelectedMeal(MOCK_DETAILED_MEAL);

    // Scroll to top so they see the header
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 4. LOGIC: Go back to list
  const handleBack = () => {
    setSelectedMeal(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        onOpenFilter={() => setIsSidebarOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <FilterSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={(q) => console.log(q)}
      />

      {/* VIEW SWITCHER */}
      {selectedMeal ? (
        <RecipeDetails meal={selectedMeal} onBack={handleBack} />
      ) : (
        <>
          <Hero />
          {/* Passing the mock handler down */}
          <RecipeSection onRecipeClick={handleRecipeClick} />
        </>
      )}

      <Footer />
    </div>
  );
};

export default Home;
