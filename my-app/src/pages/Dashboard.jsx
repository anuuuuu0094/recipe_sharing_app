
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import RecipeForm from "../components/RecipeForm";
import RecipeList from "../components/RecipeList";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const { favorites, items } = useSelector((state) => state.recipes);

  const userRecipes = items.filter(
    (recipe) => recipe.userId === currentUser?.uid
  );
  const favoriteRecipes = items.filter((recipe) =>
    favorites.includes(recipe.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800">
            🍳 My Dashboard
          </h1>
          <Link
            to="/"
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-md shadow-md hover:opacity-90 transition"
          >
            Browse Recipes
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side: Form & My Recipes */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-purple-700 mb-4">
                ✨ Add New Recipe
              </h2>
              <RecipeForm />
            </div>

            <div className="p-6 bg-white rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">
                📝 My Recipes
              </h2>
              {userRecipes.length > 0 ? (
                <RecipeList recipes={userRecipes} />
              ) : (
                <p className="text-gray-500">You haven't created any recipes yet.</p>
              )}
            </div>
          </div>

          {/* Right Side: Favorites */}
          <div className="p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-pink-700 mb-4">
              ❤️ My Favorites
            </h2>
            {favoriteRecipes.length > 0 ? (
              <RecipeList recipes={favoriteRecipes}  />
            ) : (
              <p className="text-gray-500">You haven't favorited any recipes yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

