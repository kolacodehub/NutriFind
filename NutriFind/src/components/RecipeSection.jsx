import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FilterSidebar from "./FilterSidebar";

const RecipeSection = () => {
  // State to manage the visibility of the mobile slide-out menu
  const [isMobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Core filter state: Tracks which checkboxes (Categories/Areas) are active
  const [filters, setFilters] = useState({
    categories: [
      { label: "Beef", value: "Beef", checked: true },
      { label: "Chicken", value: "Chicken", checked: false },
      { label: "Dessert", value: "Dessert", checked: false },
      { label: "Vegetarian", value: "Vegetarian", checked: false },
      { label: "Seafood", value: "Seafood", checked: false },
    ],
    areas: [
      { label: "British", value: "British", checked: false },
      { label: "Italian", value: "Italian", checked: false },
      { label: "American", value: "American", checked: false },
      { label: "Japanese", value: "Japanese", checked: false },
    ],
  });

  // State to store the fetched recipe data and loading status
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination state: Controls which slice of the 'meals' array is currently visible
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Limits the grid to 12 cards per view

  // Complex Effect: Handles fetching data based on multiple active filters
  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      // Always reset to the first page when filter criteria change
      setCurrentPage(1);

      const activePromises = [];

      // 1. Gather all requests for selected CATEGORIES
      filters.categories.forEach((cat) => {
        if (cat.checked) {
          activePromises.push(
            fetch(
              `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat.value}`,
            )
              .then((res) => res.json())
              .then((data) =>
                // Tag the results so we can display the category on the card later
                (data.meals || []).map((m) => ({
                  ...m,
                  strCategory: cat.label,
                })),
              ),
          );
        }
      });

      // 2. Gather all requests for selected AREAS (Cuisines)
      filters.areas.forEach((area) => {
        if (area.checked) {
          activePromises.push(
            fetch(
              `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area.value}`,
            )
              .then((res) => res.json())
              .then((data) =>
                (data.meals || []).map((m) => ({ ...m, strArea: area.label })),
              ),
          );
        }
      });

      // 3. Fallback: If no filters are selected, fetch a default search list
      if (activePromises.length === 0) {
        try {
          const res = await fetch(
            "https://www.themealdb.com/api/json/v1/1/search.php?s=",
          );
          const data = await res.json();
          // Slice to 48 just to ensure we have enough data to show pagination working
          setMeals(data.meals ? data.meals.slice(0, 48) : []);
        } catch (err) {
          console.error(err);
        }
        setLoading(false);
        return;
      }

      // 4. Execution & Merging: Run all fetches in parallel
      try {
        const results = await Promise.all(activePromises);
        const combinedMeals = results.flat();

        // Remove duplicates (e.g., a meal might be both "Beef" AND "American")
        // We use a Map keyed by idMeal to ensure uniqueness
        const uniqueMeals = Array.from(
          new Map(combinedMeals.map((m) => [m.idMeal, m])).values(),
        );
        setMeals(uniqueMeals);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [filters]);

  // Calculations for slicing the data array based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMeals = meals.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(meals.length / itemsPerPage);

  // Handles page changes and smooth-scrolls back to the top of the grid
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    document
      .getElementById("recipe-grid-top")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // Updates the specific checkbox state without mutating the previous state object
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

  return (
    <section className="bg-white py-16 w-full min-h-screen">
      {/* Intro Header Section */}
      <div className="text-center max-w-2xl mx-auto px-6 mb-12">
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

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-12">
        {/* Desktop Sidebar: Hidden on mobile (lg:block) */}
        <aside className="hidden lg:block w-64 pt-4 shrink-0">
          <h3 className="text-[#84CC16] font-[cursive] text-3xl mb-8">
            Filter Recipes
          </h3>
          <div className="space-y-8">
            <FilterGroup
              title="Category"
              items={filters.categories}
              onToggle={(idx) => handleToggle("categories", idx)}
            />
            <FilterGroup
              title="Cuisine"
              items={filters.areas}
              onToggle={(idx) => handleToggle("areas", idx)}
            />
          </div>
        </aside>

        {/* Mobile Filter Trigger: Visible only on small screens (lg:hidden) */}
        <div className="lg:hidden w-full">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="w-full bg-[#2F3E46] text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                clipRule="evenodd"
              />
            </svg>
            Filter Recipes
          </button>
        </div>

        {/* Main Recipe Grid Area */}
        <div className="flex-1" id="recipe-grid-top">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-[#84CC16] font-[cursive] text-3xl">
              {loading ? "Searching..." : "Latest Meals"}
            </h3>
            {!loading && (
              <span className="text-gray-400 text-sm">
                Showing {indexOfFirstItem + 1}-
                {Math.min(indexOfLastItem, meals.length)} of {meals.length}
              </span>
            )}
          </div>

          {loading ? (
            // Skeleton Loading State
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-100 h-80 rounded-xl"></div>
              ))}
            </div>
          ) : (
            <>
              {/* Responsive Grid: 1 col mobile, 2 cols sm, 3 cols xl */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
                {currentMeals.map((meal) => (
                  <RecipeCard key={meal.idMeal} data={meal} />
                ))}
                {currentMeals.length === 0 && (
                  <div className="col-span-full py-20 text-center text-gray-500">
                    No meals found.
                  </div>
                )}
              </div>

              {/* Pagination Controls */}
              {meals.length > itemsPerPage && (
                <div className="flex justify-center items-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-[#6BB03F] hover:text-white hover:border-[#6BB03F] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>

                  {/* Page Numbers Logic */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (number) => {
                      // Logic to truncate pagination (show first, last, and current neighbors)
                      if (
                        number === 1 ||
                        number === totalPages ||
                        (number >= currentPage - 1 && number <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`w-10 h-10 rounded-lg font-bold transition-all ${
                              currentPage === number
                                ? "bg-[#6BB03F] text-white shadow-lg scale-105"
                                : "bg-white border border-gray-200 text-gray-500 hover:border-[#6BB03F] hover:text-[#6BB03F]"
                            }`}
                          >
                            {number}
                          </button>
                        );
                      } else if (
                        number === currentPage - 2 ||
                        number === currentPage + 2
                      ) {
                        return (
                          <span key={number} className="text-gray-400">
                            ...
                          </span>
                        );
                      }
                      return null;
                    },
                  )}

                  {/* Next Button */}
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-[#6BB03F] hover:text-white hover:border-[#6BB03F] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Off-Canvas Mobile Filter Sidebar (controlled by state) */}
      <FilterSidebar
        isOpen={isMobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        filters={filters}
        onToggle={handleToggle}
      />
    </section>
  );
};

// --- SUB COMPONENTS ---

// Card Component: Displays individual meal details with hover effects
const RecipeCard = ({ data }) => {
  const { idMeal, strMeal, strMealThumb, strCategory, strArea } = data;
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-50 flex flex-col h-full overflow-hidden group">
      <div className="h-56 w-full relative overflow-hidden">
        <img
          src={strMealThumb}
          alt={strMeal}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {strCategory && (
          <span className="absolute top-3 left-3 bg-white/90 text-[#2F3E46] text-[10px] font-bold px-2 py-1 rounded shadow-sm">
            {strCategory}
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h4
          className="font-bold text-gray-800 text-lg mb-1 line-clamp-1"
          title={strMeal}
        >
          {strMeal}
        </h4>
        <p className="text-gray-400 text-xs font-medium mb-4 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]"></span>
          {strArea || "International"} Cuisine
        </p>
        <div className="mt-auto pt-2">
          <Link
            to={`/recipe/${idMeal}`}
            className="w-full bg-[#F3F4F6] text-[#2F3E46] text-xs font-bold py-3 rounded-lg hover:bg-[#6BB03F] hover:text-white transition-all uppercase tracking-wide flex items-center justify-center gap-2"
          >
            View Recipe
          </Link>
        </div>
      </div>
    </div>
  );
};

// Helper component for sidebar filter sections
const FilterGroup = ({ title, items, onToggle }) => (
  <div>
    <h4 className="font-bold text-[#2F3E46] text-sm mb-3">{title}</h4>
    <ul className="space-y-2">
      {items.map((item, idx) => (
        <li
          key={idx}
          onClick={() => onToggle(idx)}
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
