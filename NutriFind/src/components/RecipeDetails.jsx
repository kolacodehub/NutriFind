import React from "react";

const RecipeDetails = ({ meal, onBack }) => {
  // If no meal data is passed, I'll just return null or a loader
  if (!meal) return null;

  // 1. HELPER: TheMealDB returns ingredients as strIngredient1, strIngredient2, etc.
  // I need to loop through them and pair them with their measurements.
  const getIngredients = (mealData) => {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = mealData[`strIngredient${i}`];
      const measure = mealData[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== "") {
        ingredients.push({
          item: ingredient,
          qty: measure,
        });
      }
    }
    return ingredients;
  };

  const ingredientsList = getIngredients(meal);

  // 2. HELPER: Converting the standard YouTube URL to an Embed URL for the iframe
  const getYoutubeEmbed = (url) => {
    if (!url) return null;
    const videoId = url.split("v=")[1];
    const ampersandPosition = videoId.indexOf("&");
    if (ampersandPosition !== -1) {
      return videoId.substring(0, ampersandPosition);
    }
    return videoId;
  };

  const videoId = getYoutubeEmbed(meal.strYoutube);

  return (
    <div className="w-full min-h-screen bg-white font-sans">
      {/* HEADER: Back button and Title */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-gray-500 hover:text-[#6BB03F] transition-colors mb-6 font-medium"
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
          Back to Recipes
        </button>

        <h1 className="text-3xl md:text-5xl font-extrabold text-[#2F3E46] leading-tight mb-4">
          {meal.strMeal}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm font-semibold">
          <span className="bg-[#EBF5E0] text-[#4C8229] px-3 py-1 rounded-full">
            {meal.strCategory}
          </span>
          <span className="flex items-center gap-1 text-gray-500">
            <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
            {meal.strArea} Cuisine
          </span>
          {meal.strTags && (
            <span className="text-gray-400">
              Tags: {meal.strTags.split(",").join(", ")}
            </span>
          )}
        </div>
      </div>

      {/* HERO IMAGE */}
      <div className="w-full h-[400px] md:h-[500px] bg-gray-100 overflow-hidden">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-[1fr_350px] gap-12">
        {/* LEFT COLUMN: Instructions & Video */}
        <div>
          <h2 className="text-2xl font-bold text-[#2F3E46] mb-6 font-[cursive] tracking-wide">
            Instructions
          </h2>

          {/* Handling standard line breaks from the API text */}
          <div className="prose prose-lg text-gray-600 leading-relaxed whitespace-pre-line mb-12">
            {meal.strInstructions}
          </div>

          {/* Video Section - Only render if we have a valid ID */}
          {videoId && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-[#2F3E46] mb-4">
                Video Tutorial
              </h3>
              <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Ingredients Card */}
        <div className="md:sticky md:top-8 h-fit">
          <div className="bg-[#F9FAFB] border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-[#2F3E46] mb-6 border-b border-gray-200 pb-4">
              Ingredients
            </h3>

            <ul className="space-y-3">
              {ingredientsList.map((ing, index) => (
                <li
                  key={index}
                  className="flex items-start justify-between text-sm group"
                >
                  <span className="font-medium text-gray-700 flex-1">
                    {ing.item}
                  </span>
                  <span className="text-[#6BB03F] font-bold text-right ml-4">
                    {ing.qty}
                  </span>
                </li>
              ))}
            </ul>

            {/* Just a placeholder CTA if I want to add functionality later */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button className="w-full py-3 bg-[#2F3E46] text-white font-bold rounded-lg hover:bg-black transition-colors">
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
