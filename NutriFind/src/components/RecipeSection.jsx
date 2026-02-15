import React, { useState } from "react";

const RecipeSection = ({ onRecipeClick }) => {
  // 1. STATE: Dummy Filters (Visual only for now)
  const [filters, setFilters] = useState({
    categories: [
      { label: "Beef", checked: true },
      { label: "Chicken", checked: false },
      { label: "Dessert", checked: false },
      { label: "Vegetarian", checked: false },
    ],
    areas: [
      { label: "British", checked: true },
      { label: "Italian", checked: false },
      { label: "American", checked: false },
    ],
  });

  const handleToggle = (group, index) => {
    setFilters((prev) => {
      const updatedGroup = [...prev[group]];
      updatedGroup[index] = {
        ...updatedGroup[index],
        checked: !updatedGroup[index].checked,
      };
      return { ...prev, [group]: updatedGroup };
    });
  };

  // 2. MOCK DATA: List of summaries
  const meals = [
    {
      idMeal: "52952",
      strMeal: "Beef Wellington",
      strCategory: "Beef",
      strArea: "British",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/vvpprx1487325699.jpg",
    },
    {
      idMeal: "52772",
      strMeal: "Teriyaki Chicken Casserole",
      strCategory: "Chicken",
      strArea: "Japanese",
      strMealThumb:
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2000&auto=format&fit=crop",
    },
    {
      idMeal: "52855",
      strMeal: "Banana Pancakes",
      strCategory: "Dessert",
      strArea: "American",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/sywswr1511383814.jpg",
    },
  ];

  return (
    <section className="bg-white py-16 max-w-[1200px] mx-auto w-full">
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto px-6 mb-16">
        <span className="bg-[#FF6B6B] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
          Discover
        </span>
        <h2 className="text-3xl font-extrabold text-[#2F3E46] uppercase mb-3">
          Embark on a Journey
        </h2>
        <p className="text-gray-400">
          Explore diverse dishes from around the world.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex gap-12">
        {/* SIDEBAR */}
        <aside className="hidden lg:block w-64 pt-4">
          <h3 className="text-[#84CC16] font-[cursive] text-3xl mb-8">
            Filter Recipes
          </h3>
          <div className="space-y-8">
            <FilterGroup
              title="Category"
              group="categories"
              items={filters.categories}
              onToggle={handleToggle}
            />
            <FilterGroup
              title="Cuisine"
              group="areas"
              items={filters.areas}
              onToggle={handleToggle}
            />
          </div>
        </aside>

        {/* GRID */}
        <div className="flex-1">
          <div className="mb-6">
            <h3 className="text-[#84CC16] font-[cursive] text-3xl">
              Latest Meals
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {meals.map((meal) => (
              <RecipeCard
                key={meal.idMeal}
                data={meal}
                // This triggers the function in Home.jsx
                onClick={() => onRecipeClick(meal.idMeal)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ... (FilterGroup and RecipeCard sub-components remain the same as previous) ...
// Ensure RecipeCard has the onClick prop attached to its button!

const RecipeCard = ({ data, onClick }) => {
  const { strMeal, strMealThumb, strCategory, strArea } = data;
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-50 flex flex-col h-full overflow-hidden group">
      <div className="h-56 w-full relative">
        <img
          src={strMealThumb}
          alt={strMeal}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-white/90 text-[#2F3E46] text-[10px] font-bold px-2 py-1 rounded">
          {strCategory}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h4 className="font-bold text-gray-800 text-lg mb-1 line-clamp-1">
          {strMeal}
        </h4>
        <p className="text-gray-400 text-xs font-medium mb-4 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]"></span>
          {strArea} Cuisine
        </p>
        <div className="mt-auto pt-2">
          <button
            onClick={onClick}
            className="w-full bg-[#F3F4F6] text-[#2F3E46] text-xs font-bold py-3 rounded-lg hover:bg-[#6BB03F] hover:text-white transition-all uppercase tracking-wide flex items-center justify-center gap-2"
          >
            View Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

// FilterGroup component goes here... (Same as before)
const FilterGroup = ({ title, items, group, onToggle }) => (
  <div>
    <h4 className="font-bold text-[#2F3E46] text-sm mb-3">{title}</h4>
    <ul className="space-y-2">
      {items.map((item, idx) => (
        <li
          key={idx}
          onClick={() => onToggle(group, idx)}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div
            className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors ${item.checked ? "bg-[#4C8229] border-[#4C8229]" : "bg-transparent border-gray-300"}`}
          >
            {item.checked && <span className="text-white text-[8px]">✓</span>}
          </div>
          <span
            className={`text-xs font-medium ${item.checked ? "text-[#4C8229]" : "text-gray-500"}`}
          >
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default RecipeSection;
