import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchModal from "./components/SearchModal"; // Import your component
import Home from "./pages/Home";
import About from "./pages/AboutUs";
import RecipeDetails from "./pages/RecipeDetails";
import SearchResults from "./pages/SearchResults";
import Footer from './components/Footer'

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={(query) => console.log("Searching for:", query)}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/search/:query" element={<SearchResults />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
