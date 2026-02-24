import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const SearchResults = () => {
  // Extract the dynamic search query parameter from the URL routing
  const { query } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  // State to manage the active page for the grid view (limits rendering to 12 items at a time)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Side effect hook to trigger the search API call whenever the URL query parameter changes
  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      // Always reset the pagination back to the first page when a new search query is initiated
      setCurrentPage(1);
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
        );
        const data = await response.json();
        setMeals(data.meals || []);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    // Only attempt to fetch if a valid query exists
    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  // Calculate the precise slice of the meals array to display based on the current page index
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMeals = meals.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(meals.length / itemsPerPage);

  // Updates the current page state and smoothly returns the user to the top of the results
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white font-sans pt-8 pb-20 mt-16 md:mt-0">
      {/* Header Section: Displays the active search query to visually confirm user intent */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#2F3E46] mb-2">
          Search Results
        </h1>
        <p className="text-gray-500 text-lg">
          Showing results for{" "}
          <span className="text-[#6BB03F] font-bold">"{query}"</span>
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {loading ? (
          // Loading Skeleton: Displays a pulsing placeholder grid while the API request resolves
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 bg-gray-100 rounded-xl"></div>
            ))}
          </div>
        ) : (
          <>
            {meals.length > 0 ? (
              <>
                {/* Dynamic Grid Layout: Adjusts column count from 1 (mobile) to 4 (desktop) based on screen width */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
                  {currentMeals.map((meal) => (
                    <RecipeCard key={meal.idMeal} data={meal} />
                  ))}
                </div>

                {/* Pagination UI: Only renders if the total number of items exceeds the itemsPerPage threshold */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-[#6BB03F] hover:text-white hover:border-[#6BB03F] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>

                    <div className="flex gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (number) => (
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
                        ),
                      )}
                    </div>

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
            ) : (
              // Fallback Empty State: Renders a user-friendly message and a CTA to return home if no recipes match
              <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="text-6xl mb-4">🍳</div>
                <h2 className="text-2xl font-bold text-[#2F3E46] mb-2">
                  No recipes found
                </h2>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  We couldn't find any matches for "{query}". Try searching for
                  something else like "Beef", "Cake", or "Pasta".
                </p>
                <Link
                  to="/"
                  className="inline-block bg-[#2F3E46] text-white font-bold py-3 px-8 rounded-lg hover:bg-black transition-colors"
                >
                  Back to Home
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Reusable Card Component: Extracts meal metadata into a clean, hover-responsive UI element
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

export default SearchResults;
