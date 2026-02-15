import React from "react";

const Hero = () => {
  return (
    <section className="w-full bg-white md:p-0">
      {/* CONTAINER WIDTH CONTROL:
         1. mx-auto: Centers the hero
         2. w-11/12 max-w-md: Matches the Navbar Mobile width exactly
         3. mt-20: Pushes it down so it's not hidden behind the fixed Navbar
         4. md:w-full md:max-w-none md:mt-0: Resets for Desktop
      */}
      <div
        className="mx-auto w-11/12 max-w-md mt-24 md:w-full md:max-w-none md:mt-0 md:rounded-none
        relative overflow-hidden rounded-[2rem] h-[500px] md:h-[600px] group"
      >
        {/* Mobile Background: Chef Image */}
        <div
          className="absolute inset-0 bg-cover bg-center md:hidden"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2000&auto=format&fit=crop')",
          }}
        />

        {/* Desktop Background: Salad Image */}
        <div
          className="absolute inset-0 bg-cover bg-center hidden md:block"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2000&auto=format&fit=crop')",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 md:bg-black/30"></div>

        {/* Content */}
        <div className="relative z-10 h-full w-full flex flex-col justify-center items-center text-center px-6 md:items-start md:text-left md:px-20 md:max-w-7xl md:mx-auto">
          <h1 className="font-sans font-bold text-white leading-tight drop-shadow-lg text-4xl uppercase tracking-wide md:text-6xl md:normal-case md:tracking-normal">
            Find the Perfect <br className="hidden md:block" />
            Recipe in <br className="md:hidden" />
            <span className="md:text-[#E85D51]">Seconds.</span>
          </h1>

          <p className="text-gray-200 mt-4 mb-8 max-w-xs md:max-w-lg text-base md:text-xl font-light">
            Discover meals that nourish your body and delight your taste buds.
          </p>

          <button className="bg-[#F0A500] text-black rounded-full px-8 py-3 text-sm font-bold hover:bg-[#d99500] transition-colors md:bg-transparent md:text-white md:border md:border-white md:rounded-sm md:text-lg md:hover:bg-white md:hover:text-[#6BB03F]">
            BROWSE RECIPES
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
