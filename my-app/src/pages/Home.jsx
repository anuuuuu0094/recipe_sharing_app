


import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import RecipeList from "../components/RecipeList";
import FetchRecipe from "../components/FetchRecipe";
import Logout from "../components/Logout";
import SearchRecipes from "../components/Search";
import Footer from "../components/Footer";

export default function Home() {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-orange-100 py-12 px-6">
      <div className="container mx-auto max-w-4xl space-y-10">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-lg">
            🍽️ Discover Recipes
          </h1>

          {currentUser ? (
            <div className="flex items-center space-x-4">
              <Link
                to="/favorites"
                className="px-5 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500 hover:from-fuchsia-600 hover:via-pink-600 hover:to-rose-600 transition shadow-md"
              >
                💖 Favorites
              </Link>

              <Link
                to="/dashboard"
                className="px-5 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 hover:from-pink-600 hover:via-red-600 hover:to-yellow-500 transition shadow-md"
              >
                ➕ Add Recipe
              </Link>

              <Logout />
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="px-5 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition font-medium shadow-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 hover:from-pink-600 hover:via-red-600 hover:to-yellow-500 transition shadow-md"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* 🔍 Search Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            🔍 Search Recipes
          </h2>
          <SearchRecipes />
        </div>

        {/* 🚀 Your Recipes */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-800">
            📖 Your Saved Recipes
          </h2>
          <RecipeList />
          <FetchRecipe />
        </div>

        <Footer />
      </div>
    </div>
  );
}
