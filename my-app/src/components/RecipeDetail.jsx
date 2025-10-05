

import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { HeartIcon, StarIcon } from "@heroicons/react/24/solid";
import { getAuth } from "firebase/auth";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const auth = getAuth();
  const currentUser = auth.currentUser;
  const userEmail = currentUser?.email;

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  const [likes, setLikes] = useState(() => {
    const stored = JSON.parse(localStorage.getItem(`likes-${id}`));
    return Array.isArray(stored) ? stored : [];
  });

  const [ratings, setRatings] = useState(() => {
    const stored = JSON.parse(localStorage.getItem(`ratings-${id}`));
    return stored && typeof stored === "object" ? stored : {};
  });

  const [comments, setComments] = useState(() => {
    const stored = JSON.parse(localStorage.getItem(`comments-${id}`));
    return Array.isArray(stored) ? stored : [];
  });

  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const res = await fetch(
          `https://recipesharing-11fc6-default-rtdb.asia-southeast1.firebasedatabase.app/recipes/${id}.json`
        );
        const data = await res.json();
        setRecipe(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipe();
  }, [id]);

  useEffect(() => {
    localStorage.setItem(`likes-${id}`, JSON.stringify(likes));
    localStorage.setItem(`ratings-${id}`, JSON.stringify(ratings));
    localStorage.setItem(`comments-${id}`, JSON.stringify(comments));
  }, [likes, ratings, comments, id]);

  const userHasLiked = userEmail && likes.includes(userEmail);
  const userRating = userEmail ? ratings[userEmail] : null;

  const handleLike = () => {
    if (!userEmail || userHasLiked) return;
    setLikes([...likes, userEmail]);
  };

  const handleRating = (value) => {
    if (!userEmail || userRating) return;
    setRatings({ ...ratings, [userEmail]: value });
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !userEmail) return;
    setComments([...comments, { email: userEmail, text: newComment }]);
    setNewComment("");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh] bg-gradient-to-br from-pink-100 via-yellow-50 to-blue-100">
        <p className="text-gray-400 animate-pulse">Loading recipe...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] bg-gradient-to-br from-pink-100 via-yellow-50 to-blue-100">
        <p className="text-gray-500">Recipe not found.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded hover:from-pink-600 hover:to-purple-600"
        >
          Back to Recipes
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-100 via-yellow-50 to-blue-100 py-10">
      <div className="max-w-7xl mx-auto p-10 grid md:grid-cols-2 gap-10 bg-white/70 rounded-xl shadow-xl">
        <div className="space-y-8">
          <Link
            to="/"
            className="text-sm font-medium text-purple-600 hover:text-fuchsia-600 transition"
          >
            ← Back to Recipes
          </Link>

          <h1 className="text-4xl font-extrabold text-fuchsia-700">
            {recipe.name || "Untitled Recipe"}
          </h1>

          {recipe.image && (
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-64 object-cover rounded-lg shadow-md border border-purple-100"
            />
          )}

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <p><strong>Prep Time:</strong> {recipe.prepTimeMinutes ?? "-"} min</p>
            <p><strong>Cook Time:</strong> {recipe.cookTimeMinutes ?? "-"} min</p>
            <p><strong>Calories:</strong> {recipe.caloriesPerServing ?? "-"}</p>
            <p><strong>Servings:</strong> {recipe.servings ?? "-"}</p>
            <p><strong>Cuisine:</strong> {recipe.cuisine ?? "-"}</p>
            <p><strong>Difficulty:</strong> {recipe.difficulty ?? "-"}</p>
          </div>

          {recipe.tags?.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2 text-fuchsia-600">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-gradient-to-tr from-pink-100 to-yellow-100 text-pink-700 text-xs px-3 py-1 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-xl font-bold text-purple-600">Ingredients</h3>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-800">
              {recipe.ingredients?.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-purple-600">Instructions</h3>
            <ol className="list-decimal list-inside mt-2 space-y-1 text-gray-800">
              {recipe.instructions?.map((step, idx) => <li key={idx}>{step}</li>)}
            </ol>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-fuchsia-700">Community Interaction</h2>

          {userEmail ? (
            <p className="text-gray-600 text-sm">Logged in as <span className="font-semibold">{userEmail}</span></p>
          ) : (
            <p className="text-rose-500 text-sm">Please login to like, rate or comment.</p>
          )}

          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              disabled={!userEmail || userHasLiked}
              className={`flex items-center gap-2 px-4 py-2 rounded transition ${
                userHasLiked
                  ? "bg-gray-200 text-gray-600"
                  : "bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white hover:from-pink-600 hover:to-fuchsia-600"
              }`}
            >
              <HeartIcon className="h-5 w-5" />
              {userHasLiked ? "Liked" : "Like"}
            </button>
            <span className="text-sm text-gray-700">
              {likes.length} {likes.length === 1 ? "person likes" : "people like"} this
            </span>
          </div>

          {likes.length > 0 && (
            <div className="text-xs text-gray-500">Liked by: {likes.join(", ")}</div>
          )}

          <div>
            <h4 className="font-semibold text-gray-700">Rate this Recipe:</h4>
            <div className="flex gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  onClick={() => handleRating(star)}
                  className={`h-6 w-6 cursor-pointer transition ${
                    (userRating ?? 0) >= star ? "text-yellow-400" : "text-gray-300 hover:text-yellow-300"
                  }`}
                />
              ))}
            </div>
            {userRating && (
              <p className="text-xs text-gray-500 mt-1">You rated this {userRating}/5</p>
            )}
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-gray-700">Leave a Comment</h4>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Write a comment..."
                className="border border-fuchsia-200 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-fuchsia-200"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                disabled={!userEmail}
              />
              <button
                onClick={handleAddComment}
                disabled={!userEmail}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white rounded hover:from-purple-600 hover:to-fuchsia-600 disabled:bg-gray-300 disabled:text-gray-600 transition"
              >
                Post
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {comments.length > 0 ? (
                comments.map((c, idx) => (
                  <div
                    key={idx}
                    className="border border-purple-100 rounded p-3 bg-gradient-to-br from-fuchsia-50 via-yellow-50 to-pink-50 shadow-sm"
                  >
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">{c.email}</span>: {c.text}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400">No comments yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
