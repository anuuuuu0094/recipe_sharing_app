import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/solid";

export default function FavoriteRecipes({ favorites = [], onToggleFavorite }) {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-50 via-yellow-50 to-blue-50 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-extrabold text-fuchsia-600 mb-8">
          💖 Your Favorite Recipes
        </h1>

        {favorites.length === 0 ? (
          <p className="text-lg text-gray-500">
            You haven't favorited any recipes yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {favorites.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-gradient-to-br from-pink-100 via-yellow-50 to-blue-100 rounded-xl border border-pink-200 shadow-md hover:shadow-xl transition overflow-hidden relative"
              >
                {recipe.image && (
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                )}
                <button
                  onClick={() => onToggleFavorite(recipe.id)}
                  className="absolute top-4 right-4 text-pink-500 hover:text-pink-600 transition"
                >
                  <HeartIcon className="h-6 w-6 fill-current" />
                </button>

                <div className="p-4 bg-gradient-to-br from-fuchsia-50 via-yellow-50 to-pink-50">
                  <h3 className="text-lg font-bold text-gray-800">
                    {recipe.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Prep: {recipe.prepTimeMinutes ?? "-"} mins | Rating:{" "}
                    {recipe.rating ?? "-"} ⭐
                  </p>
                  <p className="text-xs text-gray-400 mb-2">
                    Source: {recipe.source}
                  </p>

                  {recipe.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
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

                  <Link
                    to={`/recipe-firebase/${String(recipe.id).replace(
                      "dummy-",
                      ""
                    )}`}
                    className="inline-block mt-2 text-sm font-semibold text-fuchsia-600 hover:text-fuchsia-700 transition"
                  >
                    View Recipe →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white rounded-md hover:from-purple-600 hover:to-fuchsia-600 transition font-medium shadow-lg"
          >
            Back to All Recipes
          </Link>
        </div>
      </div>
    </div>
  );
}
