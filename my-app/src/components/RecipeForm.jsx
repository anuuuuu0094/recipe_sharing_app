

import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function RecipeForm() {
  const [formData, setFormData] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    prepTimeMinutes: "",
    cookTimeMinutes: "",
    servings: "",
    difficulty: "Easy",
    cuisine: "",
    caloriesPerServing: "",
    tags: "",
    image: "",
    mealType: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { currentUser } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser?.uid) {
      setError("You must be logged in to add a recipe.");
      return;
    }

    if (!formData.name.trim()) {
      setError("Recipe name is required.");
      return;
    }

    try {
      const recipeData = {
        name: formData.name.trim(),
        ingredients: formData.ingredients
          .split("\n")
          .map((i) => i.trim())
          .filter(Boolean),
        instructions: formData.instructions
          .split("\n")
          .map((step) => step.trim())
          .filter(Boolean),
        prepTimeMinutes: formData.prepTimeMinutes.trim(),
        cookTimeMinutes: formData.cookTimeMinutes.trim(),
        servings: formData.servings.trim(),
        difficulty: formData.difficulty,
        cuisine: formData.cuisine.trim(),
        caloriesPerServing: formData.caloriesPerServing.trim(),
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        mealType: formData.mealType
          .split(",")
          .map((meal) => meal.trim())
          .filter(Boolean),
        image: formData.image.trim(),
        userId: currentUser.uid,
        rating: 0,
        reviewCount: 0,
        createdAt: new Date().toISOString(),
      };

      await fetch(
        "https://recipesharing-11fc6-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json",
        {
          method: "POST",
          body: JSON.stringify(recipeData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setFormData({
        name: "",
        ingredients: "",
        instructions: "",
        prepTimeMinutes: "",
        cookTimeMinutes: "",
        servings: "",
        difficulty: "Easy",
        cuisine: "",
        caloriesPerServing: "",
        tags: "",
        image: "",
        mealType: "",
      });
      setError(null);
      setSuccess("Recipe added successfully!");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-8 rounded-3xl shadow-xl">
      <h2 className="text-3xl font-extrabold text-purple-700 mb-6 text-center">
        🍕 Add New Recipe
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-200 text-red-800 rounded-lg shadow">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-green-200 text-green-800 rounded-lg shadow">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="font-medium text-gray-700">Recipe Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full p-3 border border-purple-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label>Ingredients (one per line)</label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            className="mt-1 w-full p-3 border border-purple-300 rounded-lg"
            rows="4"
            required
          />
        </div>

        <div>
          <label>Instructions (one per line)</label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            className="mt-1 w-full p-3 border border-purple-300 rounded-lg"
            rows="4"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Prep Time (min)</label>
            <input
              type="number"
              name="prepTimeMinutes"
              value={formData.prepTimeMinutes}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-purple-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label>Cook Time (min)</label>
            <input
              type="number"
              name="cookTimeMinutes"
              value={formData.cookTimeMinutes}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-purple-300 rounded-lg"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Servings</label>
            <input
              type="number"
              name="servings"
              value={formData.servings}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-purple-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label>Calories per Serving</label>
            <input
              type="number"
              name="caloriesPerServing"
              value={formData.caloriesPerServing}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-purple-300 rounded-lg"
            />
          </div>
        </div>

        <div>
          <label>Cuisine</label>
          <input
            type="text"
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            className="mt-1 w-full p-3 border border-purple-300 rounded-lg"
          />
        </div>

        <div>
          <label>Difficulty</label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="mt-1 w-full p-3 border border-purple-300 rounded-lg"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div>
          <label>Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="mt-1 w-full p-3 border border-purple-300 rounded-lg"
          />
        </div>

        <div>
          <label>Meal Type (comma separated)</label>
          <input
            type="text"
            name="mealType"
            value={formData.mealType}
            onChange={handleChange}
            className="mt-1 w-full p-3 border border-purple-300 rounded-lg"
          />
        </div>

        <div>
          <label>Image URL</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="mt-1 w-full p-3 border border-purple-300 rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg"
        >
          🚀 Add Recipe
        </button>
      </form>
    </div>
  );
}
