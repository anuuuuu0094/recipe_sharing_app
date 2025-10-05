

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";

export default function FetchRecipe() {
  const API = "https://dummyjson.com/recipes";
  const [recipes, setRecipes] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 9; // Adjust for how many recipes to load per scroll
  const navigate = useNavigate();

  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}?limit=${limit}&skip=${skip}`);
      const data = await res.json();
      setRecipes((prev) => [...prev, ...data.recipes]);
      setSkip((prev) => prev + limit);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  }, [skip]);

  useEffect(() => {
    fetchRecipes();
  }, []); // Initial load

  useEffect(() => {
    const handleScroll = () => {
      const scrollBottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50;

      if (scrollBottom && !loading) {
        fetchRecipes();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, fetchRecipes]);

  return (
    <div className="p-4">
      <h2 className="text-3xl font-extrabold mb-8 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
        🍰 Explore New Recipes
      </h2>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
            >
              <img
                src={recipe.image}
                alt={recipe.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {recipe.name}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Cuisine:</span> {recipe.cuisine}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Difficulty:</span>{" "}
                  {recipe.difficulty}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Prep:</span>{" "}
                  {recipe.prepTimeMinutes} mins &nbsp;
                  <span className="font-medium">Cook:</span>{" "}
                  {recipe.cookTimeMinutes} mins
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Servings:</span>{" "}
                  {recipe.servings}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-medium">Calories:</span>{" "}
                  {recipe.caloriesPerServing}
                </p>

                <h4 className="font-semibold text-gray-700 mb-1">
                  Ingredients:
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-700 mb-4">
                  {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                  {recipe.ingredients.length > 3 && <li>...and more</li>}
                </ul>

                <button
                  onClick={() => navigate(`/recipe-dummyjson/${recipe.id}`)}
                  className="mt-auto bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 text-white text-sm font-semibold py-2 px-4 rounded-lg shadow-md hover:from-pink-600 hover:via-red-600 hover:to-yellow-500 transition"
                >
                  View Full Recipe
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Loading recipes...</p>
        )}
      </div>

      {loading && (
        <p className="text-center text-gray-500 mt-4">Loading more recipes...</p>
      )}
    </div>
  );
}
