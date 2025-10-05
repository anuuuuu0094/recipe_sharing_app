






import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SearchRecipes() {
  const [dummyRecipes, setDummyRecipes] = useState([]);
  const [firebaseRecipes, setFirebaseRecipes] = useState([]);

  const [searchName, setSearchName] = useState("");
  const [minRating, setMinRating] = useState("");
  const [maxPrepTime, setMaxPrepTime] = useState("");

  const [showResults, setShowResults] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    async function fetchDummyAPI() {
      const res = await fetch("https://dummyjson.com/recipes");
      const data = await res.json();
      const updated = data.recipes.map((r) => ({
        ...r,
        id: `dummy-${r.id}`,
        source: "DummyAPI",
      }));
      setDummyRecipes(updated);
    }

    async function fetchFirebase() {
      const res = await fetch(
        "https://recipesharing-11fc6-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json"
      );
      const data = await res.json();
      if (!data) return;

      const firebaseArray = Object.entries(data).map(([key, value]) => ({
        ...value,
        id: key,
        source: "Firebase",
      }));
      setFirebaseRecipes(firebaseArray);
    }

    fetchDummyAPI();
    fetchFirebase();
  }, []);

  const handleSearch = () => {
    const allRecipes = [...dummyRecipes, ...firebaseRecipes];
    const filtered = allRecipes.filter((recipe) => {
      const nameMatch = recipe.name
        ?.toLowerCase()
        .includes(searchName.toLowerCase());

      const ratingMatch =
        minRating === "" ||
        (recipe.rating && Number(recipe.rating) >= Number(minRating));

      const prepTimeMatch =
        maxPrepTime === "" ||
        (recipe.prepTimeMinutes &&
          Number(recipe.prepTimeMinutes) <= Number(maxPrepTime));

      return nameMatch && ratingMatch && prepTimeMatch;
    });

    setFilteredRecipes(filtered);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-50 to-blue-100 py-10">
      <div className="max-w-4xl mx-auto p-6 bg-white/70 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-fuchsia-700">Search Recipes</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <input
            type="text"
            placeholder="Search by name..."
            className="border border-fuchsia-200 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-200"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Min Rating"
            className="border border-fuchsia-200 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-200"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max Prep Time (mins)"
            className="border border-fuchsia-200 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-200"
            value={maxPrepTime}
            onChange={(e) => setMaxPrepTime(e.target.value)}
          />
        </div>

        <button
          onClick={handleSearch}
          className="bg-gradient-to-r from-pink-500 to-fuchsia-500 hover:from-pink-600 hover:to-fuchsia-600 text-white rounded px-6 py-2 text-sm font-medium shadow-md transition"
        >
          Search
        </button>

        {showResults && (
          <div className="grid md:grid-cols-3 gap-6 pt-6">
            {filteredRecipes.length === 0 ? (
              <p className="text-gray-500 text-center col-span-full">No recipes found matching your criteria.</p>
            ) : (
              filteredRecipes.map((recipe) => (
                <Link
                  key={recipe.id}
                  to={`/recipe-firebase/${String(recipe.id).replace("dummy-", "")}`}
                  className="rounded-lg overflow-hidden shadow-md bg-white hover:shadow-xl hover:-translate-y-1 transition"
                >
                  {recipe.image && (
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-full h-40 object-cover"
                    />
                  )}
                  <div className="p-4 space-y-1 bg-gradient-to-br from-fuchsia-50 via-yellow-50 to-pink-50">
                    <h3 className="text-sm font-semibold text-fuchsia-700">{recipe.name}</h3>
                    <p className="text-xs text-gray-600">
                      Prep: {recipe.prepTimeMinutes ?? "-"} mins | Rating: {recipe.rating ?? "-"} ⭐
                    </p>
                    <p className="text-xs text-gray-400">Source: {recipe.source}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

