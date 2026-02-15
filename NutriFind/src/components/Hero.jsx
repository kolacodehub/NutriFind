import React from "react";

const Hero = () => {
  return (
    <section className="relative w-full h-[500px] md:h-[600px] bg-gray-900 overflow-hidden">
      {/* 1. Background Image */}
      {/* Using a similar Unsplash image for the salad bowl look */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2000&auto=format&fit=crop')",
        }}
      >
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/40 md:bg-black/30"></div>
      </div>

      {/* 2. Content Container */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center text-left">
        <div className="max-w-xl space-y-6">
          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-sans font-medium text-white leading-tight drop-shadow-md">
            Find the Perfect <br />
            Recipe in{" "}
            <span className="text-red-500 md:text-white">Seconds.</span>
          </h1>

          {/* Subtext */}
          <p className="text-gray-100 text-lg md:text-xl font-light max-w-md drop-shadow-sm">
            Discover meals that nourish your body and delight your taste buds.
          </p>

          {/* Button */}
          <button className="mt-8 px-8 py-3 border border-white text-white text-lg font-medium hover:bg-white hover:text-[#6BB03F] transition-all duration-300 rounded-sm">
            Browse Recipes
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
