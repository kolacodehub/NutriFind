import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const RecipeDetails = () => {
  const { id } = useParams(); // 1. Get the ID from the URL
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. SIMULATE FETCHING DATA
  // In a real app, you would fetch(`.../lookup.php?i=${id}`) here.
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);

    // Simulating API delay
    setTimeout(() => {
      setMeal({
        idMeal: id, // Use the ID from the URL
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
      });
      setLoading(false);
    }, 500);
  }, [id]);

  // HELPER: Parse Ingredients
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

  // HELPER: Youtube Embed
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
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!meal) return null;

  const ingredientsList = getIngredients(meal);
  const videoId = getYoutubeEmbed(meal.strYoutube);

  return (
    <div className="w-full min-h-screen bg-white font-sans">
      {/* HEADER SECTION */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)} // Go back in history
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
          Back to Home
        </button>

        {/* Title & Metadata */}
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

      {/* HERO IMAGE (Full width on mobile, rounded on desktop) */}
      <div className="max-w-5xl mx-auto md:px-6 mb-12">
        <div className="w-full h-[300px] md:h-[500px] md:rounded-3xl overflow-hidden shadow-xl relative">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-full object-cover object-center"
          />
          {/* Overlay gradient for text readability if needed */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      </div>

      {/* CONTENT GRID */}
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12 pb-20">
        {/* LEFT COLUMN: Instructions */}
        <div>
          <h2 className="text-2xl font-bold text-[#2F3E46] mb-6 flex items-center gap-2">
            <span className="text-[#6BB03F]">📝</span> Instructions
          </h2>

          <div className="prose prose-lg text-gray-600 leading-relaxed whitespace-pre-line mb-12">
            {meal.strInstructions}
          </div>

          {/* Video */}
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

        {/* RIGHT COLUMN: Ingredients (Sticky) */}
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
