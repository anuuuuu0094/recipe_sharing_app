

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HeartIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { editRecipe, deleteRecipe } from "../redux/recipeSlice";

export default function RecipeCard({ recipe, isFavorite, onToggleFavorite }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(recipe.name);
  const [instructions, setInstructions] = useState(
    Array.isArray(recipe.instructions)
      ? recipe.instructions.join("\n")
      : recipe.instructions || ""
  );
  const navigate = useNavigate();

  const getInstructionPreview = (instructions) => {
    if (!instructions) return "No instructions available";
    if (Array.isArray(instructions))
      return instructions.join(" ").substring(0, 100);
    return String(instructions).substring(0, 100);
  };

  const handleSave = () => {
    const updatedInstructions = instructions
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    dispatch(
      editRecipe({
        id: recipe.id,
        updatedData: {
          name,
          instructions: updatedInstructions,
        },
      })
    );
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      dispatch(deleteRecipe(recipe.id));
    }
  };

  return (
    <div className="bg-gradient-to-br from-pink-100 via-yellow-50 to-blue-100 rounded-xl border border-pink-200 shadow-lg hover:shadow-xl transition-shadow group relative">
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-52 object-cover rounded-t-xl"
        />
      )}

      <div className="p-5 space-y-4 relative">
        <button
          onClick={onToggleFavorite}
          className={`absolute top-4 right-4 ${
            isFavorite ? "text-pink-500" : "text-gray-400"
          } hover:text-pink-600 transition`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <HeartIcon
            className={`h-6 w-6 transition ${
              isFavorite ? "fill-current" : "stroke-current fill-none"
            }`}
          />
        </button>

        {isEditing ? (
          <>
            <input
              type="text"
              className="border-2 border-fuchsia-300 focus:ring-4 focus:ring-fuchsia-100 rounded-md px-4 py-2 w-full text-lg font-semibold focus:outline-none bg-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              className="border-2 border-fuchsia-300 focus:ring-4 focus:ring-fuchsia-100 rounded-md px-4 py-2 w-full h-24 resize-none focus:outline-none bg-white"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 text-white bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 rounded-md hover:from-fuchsia-600 hover:to-rose-600 shadow-md transition"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-700 bg-yellow-100 rounded-md hover:bg-yellow-200 shadow-sm transition"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <Link
                to={`/recipe/${recipe.id}`}
                className="text-xl font-bold text-gray-800 hover:text-fuchsia-500 transition"
              >
                {recipe.name || "Untitled Recipe"}
              </Link>
            </div>

            {recipe.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-gradient-to-r from-amber-100 via-pink-100 to-rose-100 text-pink-700 text-xs px-3 py-1 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <p className="text-gray-700 leading-relaxed line-clamp-3 text-sm">
              {getInstructionPreview(recipe.instructions)}
              {String(recipe.instructions).length > 100 && "..."}
            </p>

            <div className="flex justify-between items-center pt-4">
              <Link
                to={`/recipe-firebase/${recipe.id}`}
                className="text-fuchsia-500 hover:text-fuchsia-700 text-sm font-semibold transition"
              >
                View Recipe
              </Link>

              <div className="flex gap-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-gray-400 hover:text-fuchsia-500 transition"
                  title="Edit"
                  aria-label="Edit recipe"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={handleDelete}
                  className="text-gray-400 hover:text-rose-500 transition"
                  title="Delete"
                  aria-label="Delete recipe"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
