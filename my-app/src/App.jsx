


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../src/store";
import { AuthProvider } from "./context/AuthContext";
import { useState } from "react";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import ViewRecipe from "./components/ViewRecipe";
import RecipeDetails from "./components/RecipeDetail";
import SearchRecipes from "./components/Search";
import FavoriteRecipes from "./components/Favoruite";

function App() {
  const [favorites, setFavorites] = useState([]);

  const handleToggleFavorite = (recipe) => {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.some((fav) => fav.id === recipe.id);
      if (exists) {
        return prevFavorites.filter((fav) => fav.id !== recipe.id);
      } else {
        return [...prevFavorites, recipe];
      }
    });
  };

  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    favorites={favorites}
                    onToggleFavorite={handleToggleFavorite}
                  />
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/recipe-firebase/:id" element={<RecipeDetails />} />
              <Route path="/recipe-dummyjson/:id" element={<ViewRecipe />} />
              <Route path="/search" element={<SearchRecipes />} />
              <Route
                path="/favorites"
                element={
                  <FavoriteRecipes
                    favorites={favorites}
                    onToggleFavorite={handleToggleFavorite}
                  />
                }
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
