

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";

export default function ViewRecipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [liked, setLiked] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);

  const auth = getAuth();
  const currentUser = auth.currentUser;

  // Load recipe and feedback from localStorage on mount
  useEffect(() => {
    fetch(`https://dummyjson.com/recipes/${id}`)
      .then((response) => response.json())
      .then((data) => setRecipe(data))
      .catch((error) =>
        console.error("Error fetching recipe details:", error)
      );

    const savedFeedback = localStorage.getItem(`feedback-recipe-${id}`);
    if (savedFeedback) {
      setFeedbackList(JSON.parse(savedFeedback));
    }
  }, [id]);

  const handleLikeToggle = () => {
    setLiked(!liked);
  };

  const handleSaveToFavorites = () => {
    alert(`"${recipe.name}" has been added to your favorites!`);
  };

  const handleCommentSubmit = () => {
    if (!comment || !rating) {
      alert("Please add a comment and select a rating.");
      return;
    }

    const userDisplayName =
      currentUser?.displayName || currentUser?.email || "AnonymousUser";

    const newFeedback = {
      id: Date.now(),
      user: userDisplayName,
      comment,
      rating,
    };

    const updatedFeedback = [...feedbackList, newFeedback];
    setFeedbackList(updatedFeedback);
    localStorage.setItem(
      `feedback-recipe-${id}`,
      JSON.stringify(updatedFeedback)
    );

    setComment("");
    setRating("");
  };

  if (!recipe)
    return <p className="text-center text-gray-500">Loading recipe...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-72 md:h-[450px] object-cover"
        />

        <div className="flex flex-col md:flex-row gap-8 p-6 md:p-12">
          {/* Left: Main Recipe Details */}
          <div className="md:w-2/3">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {recipe.name}
            </h1>

            <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                {recipe.cuisine}
              </span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                Difficulty: {recipe.difficulty}
              </span>
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                Prep: {recipe.prepTimeMinutes} min
              </span>
              <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm">
                Cook: {recipe.cookTimeMinutes} min
              </span>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                Servings: {recipe.servings}
              </span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                Calories: {recipe.caloriesPerServing}
              </span>
            </div>

            {/* <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Ingredients
            </h2>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
              {recipe.ingredients.map((ingredient, idx) => (
                <li key={idx}>{ingredient}</li>
              ))}
            </ul>

            

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Instructions
            </h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-10">
              {recipe.instructions.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol> */}


            <h2 className="text-xl font-semibold text-gray-800 mb-2">Ingredients</h2>
<ul className="list-disc list-inside text-gray-700 mb-6 space-y-1">
  {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 ? (
    recipe.ingredients.map((ingredient, idx) => <li key={idx}>{ingredient}</li>)
  ) : (
    <li>No ingredients available.</li>
  )}
</ul>

<h2 className="text-xl font-semibold text-gray-800 mb-2">Instructions</h2>
<ol className="list-decimal list-inside text-gray-700 space-y-2 mb-10">
  {Array.isArray(recipe.instructions) && recipe.instructions.length > 0 ? (
    recipe.instructions.map((step, idx) => <li key={idx}>{step}</li>)
  ) : (
    <li>No instructions available.</li>
  )}
</ol>


            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <span className="font-medium">Rating:</span>
                <span className="text-yellow-500 font-semibold">
                  {recipe.rating} ⭐
                </span>
                <span>({recipe.reviewCount} reviews)</span>
              </div>
              <button
                onClick={handleSaveToFavorites}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-6 py-2 font-medium transition"
              >
                Save to Favorites
              </button>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="md:w-1/3 flex flex-col gap-6">
            <div className="bg-gray-50 border rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-2">Leave a Comment</h3>
              <textarea
                className="w-full border rounded-md p-2 text-sm"
                rows="4"
                placeholder="Write your comment here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <div className="bg-gray-50 border rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-2">Rate this Recipe</h3>
              <select
                className="w-full border rounded-md p-2 text-sm"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="">Select a rating</option>
                <option value="1">1 ⭐</option>
                <option value="2">2 ⭐</option>
                <option value="3">3 ⭐</option>
                <option value="4">4 ⭐</option>
                <option value="5">5 ⭐</option>
              </select>
            </div>

            <button
              onClick={handleCommentSubmit}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-medium transition"
            >
              Submit Feedback
            </button>

            <button
              onClick={handleLikeToggle}
              className={`w-full ${
                liked ? "bg-red-500" : "bg-gray-200"
              } text-gray-800 hover:opacity-80 py-2 rounded-md font-medium transition`}
            >
              {liked ? "❤️ Liked" : "🤍 Like this Recipe"}
            </button>
          </div>
        </div>

        {/* User Feedback Section */}
        <div className="p-6 md:p-12 border-t">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">User Reviews</h2>

          {feedbackList.length === 0 && (
            <p className="text-gray-500">
              No reviews yet. Be the first to share your thoughts!
            </p>
          )}

          <div className="space-y-4">
            {feedbackList.map((feedback) => (
              <div
                key={feedback.id}
                className="border rounded-md p-4 bg-white shadow-sm relative transition hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-yellow-500 font-semibold text-sm">
                    {"★".repeat(feedback.rating)}{"☆".repeat(5 - feedback.rating)}
                  </span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {feedback.comment}
                </p>
                <div className="text-right text-xs text-gray-500 mt-3">
                  — {feedback.user}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
