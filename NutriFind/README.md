# 🥗 NutriFind - Recipe Discovery Platform

NutriFind is a modern, responsive React application designed to help users discover healthy and delicious recipes. It interfaces with **TheMealDB API** to provide a vast library of meals, complete with ingredient lists, cooking instructions, and video tutorials.


## 🚀 Features

* **Dynamic Search:** Real-time search functionality allowing users to find recipes by name.
* **Advanced Filtering:** Filter recipes by **Category** (e.g., Vegetarian, Seafood) and **Cuisine/Area** (e.g., Italian, Japanese).
* **Detailed Recipe Views:** Comprehensive breakdown of ingredients, measurements, and step-by-step instructions.
* **Video Integration:** Embedded YouTube tutorials for specific recipes.
* **Responsive Design:** Fully mobile-optimized UI with custom mobile navigation, sidebars, and grid layouts.
* **Pagination:** efficient data handling with client-side pagination for search results.
* **Loading States:** Polished skeleton loaders for better user experience during data fetching.

## 🛠️ Tech Stack

* **Frontend:** [React.js](https://reactjs.org/) (Functional Components & Hooks)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Routing:** [React Router v6](https://reactrouter.com/)
* **Data Source:** [TheMealDB API](https://www.themealdb.com/api.php)
* **Icons:** Inline SVGs (Heroicons style)

## 📂 Project Structure

```bash
src/
├── assets/          # Logos and static images
├── components/      # Reusable UI components
│   ├── FilterSidebar.js
│   ├── Footer.js
│   ├── Hero.js
│   ├── Navbar.js
│   ├── RecipeSection.js
│   └── SearchModal.js
├── pages/           # Page-level components
│   ├── About.js
│   ├── Home.js
│   ├── RecipeDetails.js
│   └── SearchResults.js
└── App.js           # Main routing configuration