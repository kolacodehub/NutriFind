import Home from "./components/Home";
import "./App.css";

function App() {
  return (
    // 1. OUTER WRAPPER: Full width & Height background
    <div className="min-h-screen bg-white w-full font-sans">
      {/* 2. CENTERED CONTAINER: 
          - max-w-[1440px]: Restricts width on huge screens
          - mx-auto: Centers the app
          - md:px-8: Adds the side padding on desktop
      */}
      <div >
        <Home />
      </div>
    </div>
  );
}

export default App;
