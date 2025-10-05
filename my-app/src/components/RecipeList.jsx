// src/components/Recipe/RecipeList.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes, toggleFavorite } from "../redux/recipeSlice";
import RecipeCard from "./RecipeCard";

export default function RecipeList() {
  const dispatch = useDispatch();
  const { items, loading, error, favorites } = useSelector(
    (state) => state.recipes
  );

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-pulse text-purple-500 text-xl font-semibold">
          🍳 Loading delicious recipes...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-10 text-red-500 font-semibold text-lg">
        🚫 Error: {error}
      </div>
    );

  if (!items || items.length === 0)
    return (
      <div className="text-center py-12 text-gray-500 font-medium">
        No recipes found. Start by adding your first one! 🥗
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent mb-10">
        🍕 Explore Recipes
      </h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isFavorite={favorites.includes(recipe.id)}
            onToggleFavorite={() => dispatch(toggleFavorite(recipe.id))}
          />
        ))}
      </div>
    </div>
  );
}
