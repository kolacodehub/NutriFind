import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const RecipeDetails = () => {
  const { id } = useParams(); // Extract the unique recipe ID from the URL path
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  // Side effect hook to fetch the selected recipe's data when the component mounts or the ID changes
  useEffect(() => {
    window.scrollTo(0, 0); // Reset scroll position to the top of the page on load

    const fetchMealDetails = async () => {
      try {
        setLoading(true);
        // Ping TheMealDB's lookup endpoint to get the full details for the specific ID
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
        );
        const data = await response.json();

        if (data.meals && data.meals[0]) {
          setMeal(data.meals[0]);
        } else {
          // Handle edge case: The API returned a successful response, but no meal matched the provided ID
          setMeal(null);
        }
      } catch (error) {
        console.error("Error fetching meal details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMealDetails();
  }, [id]);

  // Utility function to extract and pair ingredients with their exact measurements from the flattened API response
  const getIngredients = (mealData) => {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = mealData[`strIngredient${i}`];
      const measure = mealData[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push({ item: ingredient, qty: measure });
      }
    }
    return ingredients;
  };

  // Utility function to extract the standard YouTube video ID from a full watch URL for the iframe embed
  const getYoutubeEmbed = (url) => {
    if (!url) return null;
    const videoId = url.split("v=")[1];
    if (!videoId) return null;
    const ampersandPosition = videoId.indexOf("&");
    return ampersandPosition !== -1
      ? videoId.substring(0, ampersandPosition)
      : videoId;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#6BB03F] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#2F3E46] mb-2">
            Recipe Not Found
          </h2>
          <button
            onClick={() => navigate("/")}
            className="text-[#6BB03F] font-bold hover:underline"
          >
            Go back home
          </button>
        </div>
      </div>
    );
  }

  const ingredientsList = getIngredients(meal);
  const videoId = getYoutubeEmbed(meal.strYoutube);

  return (
    <div className="w-full min-h-screen bg-white font-sans animate-in fade-in duration-500">
      {/* HEADER: Contains navigation back action and primary recipe metadata */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Back Button: Uses React Router's navigate(-1) to return to the previous view without losing history */}
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-gray-500 hover:text-[#6BB03F] transition-colors mb-8 mt-16 md:mt-0 font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back
        </button>

        {/* Title & Categorization Tags */}
        <div className="text-center md:text-left mb-8">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
            <span className="bg-[#EBF5E0] text-[#4C8229] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {meal.strCategory}
            </span>
            <span className="flex items-center gap-1 text-gray-500 text-sm font-medium">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
              {meal.strArea} Cuisine
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#2F3E46] leading-tight mb-4">
            {meal.strMeal}
          </h1>
        </div>
      </div>

      {/* HERO IMAGE: Full-width container on mobile, rounded constrained container on desktop with a bottom gradient */}
      <div className="max-w-5xl mx-auto md:px-6 mb-12">
        <div className="w-full h-[300px] md:h-[500px] md:rounded-3xl overflow-hidden shadow-xl relative">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      </div>

      {/* MAIN CONTENT GRID: 1 column on mobile, 2 columns on large screens (Instructions left, Ingredients right) */}
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12 pb-20">
        {/* LEFT COLUMN: Detailed cooking instructions with parsed whitespace formatting */}
        <div>
          <h2 className="text-2xl font-bold text-[#2F3E46] mb-6 flex items-center gap-2">
            <span className="text-[#6BB03F]">📝</span> Instructions
          </h2>

          <div className="prose prose-lg text-gray-600 leading-relaxed whitespace-pre-line mb-12">
            {meal.strInstructions}
          </div>

          {/* Conditional Video Embed: Only renders if a valid YouTube ID was extracted */}
          {videoId && (
            <div className="mt-12">
              <h3 className="text-xl font-bold text-[#2F3E46] mb-6 flex items-center gap-2">
                <span className="text-[#6BB03F]">🎥</span> Video Tutorial
              </h3>
              <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="Recipe Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Sticky sidebar for the ingredients list so it stays visible while scrolling through instructions */}
        <div className="lg:sticky lg:top-8 h-fit">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h3 className="text-xl font-bold text-[#2F3E46] mb-6 border-b border-gray-100 pb-4 flex items-center justify-between">
              <span>Ingredients</span>
              <span className="text-xs font-normal text-gray-400">
                {ingredientsList.length} items
              </span>
            </h3>

            <ul className="space-y-4">
              {ingredientsList.map((ing, index) => (
                <li
                  key={index}
                  className="flex items-start justify-between text-sm group cursor-default"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#6BB03F] group-hover:scale-125 transition-transform"></div>
                    <span className="font-medium text-gray-700">
                      {ing.item}
                    </span>
                  </div>
                  <span className="text-gray-500 font-medium text-right ml-4">
                    {ing.qty}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <button className="w-full py-3.5 bg-[#2F3E46] text-white font-bold rounded-xl hover:bg-[#6BB03F] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Save Recipe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
