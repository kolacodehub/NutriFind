import { Link } from "react-router-dom"; 
import logo_black from "../assets/LogoBlack.png";

const Navbar = ({ onOpenSearch }) => {
  return (
    <>
      {/* =======================
          1. DESKTOP NAVBAR 
      ======================== */}
      <nav className="hidden md:flex w-full bg-white px-10 py-5 items-center justify-between shadow-sm font-sans z-50 relative">
        <Link to="/" className="cursor-pointer">
          <img
            src={logo_black}
            alt="NutriFind"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Search */}
        <div className="flex flex-1 max-w-lg mx-12">
          <div className="flex w-full bg-[#F3F4F6] rounded overflow-hidden">
            <input
              type="text"
              placeholder="Search for recipes..."
              className="w-full bg-transparent px-4 py-3 text-sm text-gray-700 outline-none placeholder-gray-400"
            />
            <button className="bg-[#6BB03F] px-6 flex items-center justify-center hover:bg-green-700 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-8 text-sm font-bold">
          {/* Home Link */}
          <Link
            to="/"
            className="text-[#6BB03F] hover:text-green-800 transition-colors"
          >
            Home
          </Link>

          {/* About Link */}
          <Link
            to="/about"
            className="text-gray-500 hover:text-[#6BB03F] transition-colors"
          >
            About Us
          </Link>

          <button className="flex items-center gap-2 border border-gray-300 rounded-full px-5 py-2 hover:shadow-md transition-shadow bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-[#FF6B6B]"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            <span className="text-xs font-bold text-gray-700">Subscribe</span>
          </button>
        </div>
      </nav>

      {/* =======================
          2. MOBILE NAVBAR (Floating Pill)
      ======================== */}
      <div className="md:hidden fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-xl rounded-full px-5 py-3 flex items-center justify-between w-full max-w-sm">
          <Link to="/" className="flex items-center">
            <img
              src={logo_black}
              alt="NutriFind"
              className="h-8 w-auto object-contain"
            />
          </Link>

          <div className="flex items-center gap-4 text-sm font-semibold">
            <Link to="/" className="text-[#6BB03F]">
              Home
            </Link>
            <Link to="/about" className="text-[#2F3E46]">
              About Us
            </Link>
          </div>

          {/* SEARCH BUTTON */}
          <button
            onClick={onOpenSearch}
            className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
