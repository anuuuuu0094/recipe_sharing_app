import React from "react";
// import "./RecipeDashboard.css";

const RecipeDashboard = () => {
  const data = {
    totalRecipes: 124,
    avgRating: 4.3,
    totalViews: 18450,
    categories: {
      Desserts: 40,
      Main: 35,
      Salads: 18,
      Appetizers: 21,
      Drinks: 10,
    },
  };

  const totalCategories = Object.values(data.categories).reduce(
    (a, b) => a + b,
    0
  );

  return (
    <div className="dashboard-container">
      <h1>Recipe Analytics Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h2>{data.totalRecipes}</h2>
          <p>Total Recipes</p>
        </div>
        <div className="stat-card">
          <h2>{data.avgRating} ⭐</h2>
          <p>Average Rating</p>
        </div>
        <div className="stat-card">
          <h2>{data.totalViews.toLocaleString()}</h2>
          <p>Total Views</p>
        </div>
      </div>

      <h3>Recipes by Category</h3>
      <div className="category-list">
        {Object.entries(data.categories).map(([category, count]) => (
          <div key={category} className="category-item">
            <span>{category}</span>
            <div
              className="bar"
              style={{ width: `${(count / totalCategories) * 100}%` }}
            ></div>
            <span>{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeDashboard;
