import React from "react";

const About = () => {
  return (
    <div className="w-full bg-white font-sans animate-in fade-in duration-500">
      {/* 1. HERO HEADER 
          - Changed 'py-16' to 'pt-32 pb-16' for mobile.
          - 'pt-32' (8rem) pushes the text down to clear the fixed navbar.
          - 'md:py-24' keeps the original spacing on desktop where navbar is not fixed.
      */}
      <div className="bg-[#F3F4F6] pt-32 pb-16 md:py-24 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#2F3E46] mb-4">
          We Are <span className="text-[#6BB03F]">NutriFind</span>
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
          Bridging the gap between healthy living and delicious eating. We
          believe that finding the perfect recipe should be as enjoyable as
          eating it.
        </p>
      </div>

      {/* 2. OUR MISSION SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2000&auto=format&fit=crop"
              alt="Chefs cooking"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#2F3E46]">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              At NutriFind, we understand the struggle of asking "What's for
              dinner?" Our mission is to simplify your cooking journey by
              providing a vast, searchable database of recipes that cater to
              every dietary need, allergy, and craving.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Whether you are looking for a quick 15-minute vegan meal or a
              decadent gluten-free dessert, our platform is designed to help you
              nourish your body and delight your taste buds.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100 mt-4">
              <div>
                <span className="block text-3xl font-bold text-[#6BB03F]">
                  10k+
                </span>
                <span className="text-xs text-gray-400 uppercase tracking-wide">
                  Recipes
                </span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-[#6BB03F]">
                  50+
                </span>
                <span className="text-xs text-gray-400 uppercase tracking-wide">
                  Cuisines
                </span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-[#6BB03F]">
                  100%
                </span>
                <span className="text-xs text-gray-400 uppercase tracking-wide">
                  Free
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. VALUES SECTION */}
      <div className="bg-[#1F1E1B] text-white py-16 px-6 rounded-3xl mx-4 md:mx-0 mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 font-[cursive] text-[#84CC16]">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-700 rounded-xl hover:border-[#6BB03F] transition-colors">
              <div className="text-4xl mb-4">🥗</div>
              <h3 className="font-bold text-lg mb-2">Health First</h3>
              <p className="text-gray-400 text-sm">
                Curated recipes that prioritize nutrition without sacrificing
                flavor.
              </p>
            </div>
            <div className="p-6 border border-gray-700 rounded-xl hover:border-[#6BB03F] transition-colors">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-bold text-lg mb-2">Fast & Easy</h3>
              <p className="text-gray-400 text-sm">
                Advanced filters to find meals that fit your schedule.
              </p>
            </div>
            <div className="p-6 border border-gray-700 rounded-xl hover:border-[#6BB03F] transition-colors">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="font-bold text-lg mb-2">Global Flavors</h3>
              <p className="text-gray-400 text-sm">
                Explore cuisines from Italian pasta to Japanese sushi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
