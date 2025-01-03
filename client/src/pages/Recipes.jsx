import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import RecipeForm from "../components/RecipeForm";
import SearchBar from "../components/SearchBar";
import { getAllRecipes } from "../services/api";
import './Recipes.css'

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [sortType, setSortType] = useState("");

  useEffect(() => {
    fetchRecipes();
  }, []);

  async function fetchRecipes() {
    try {
      const data = await getAllRecipes();

      const uniqueRecipes = data.filter(
        (recipe, index, self) =>
          index === self.findIndex((r) => r.id === recipe.id)
      );
      setRecipes(uniqueRecipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }

  const filteredRecipes = recipes
    .filter(
      (recipe, index, self) =>
        index === self.findIndex((r) => r.id === recipe.id)
    )
    .filter((recipe) => {
      const term = searchTerm.toLowerCase();
      return (
        recipe.title.toLowerCase().includes(term) ||
        recipe.description.toLowerCase().includes(term) ||
        recipe.ingredients.join(" ").toLowerCase().includes(term)
      );
    });

  const tagFilteredRecipes = filterTag
    ? filteredRecipes.filter((recipe) => recipe.tags.includes(filterTag))
    : filteredRecipes;

  const sortedRecipes = [...tagFilteredRecipes].sort((a, b) => {
    switch (sortType) {
      case "title":
        return a.title.localeCompare(b.title);
      case "difficulty":
        return a.difficulty.localeCompare(b.difficulty);
      case "lastUpdated":
        return new Date(b.lastUpdated) - new Date(a.lastUpdated);
      default:
        return 0;
    }
  });

  return (
    <div>
      <h1>Recipes</h1>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close" : "Create New Recipe"}
      </button>

      {showForm && (
        <RecipeForm
          onRecipeCreated={fetchRecipes}
          onClose={() => setShowForm(false)}
        />
      )}

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <div>
        <label>Filter by tag:</label>
        <select
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
        >
          <option value="">All</option>
          <option value="Dessert">Dessert</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Quick Meal">Quick Meal</option>
        </select>
      </div>

      <div>
        <label>Sort by:</label>
        <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="">None</option>
          <option value="title">Title</option>
          <option value="difficulty">Difficulty</option>
          <option value="lastUpdated">Last Updated</option>
        </select>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1em" }}>
        {sortedRecipes.map((recipe, index) => (
          <RecipeCard
            key={`${recipe.id}-${index}`}
            recipe={recipe}
            onDelete={fetchRecipes}
            onEdit={fetchRecipes}
          />
        ))}
      </div>
    </div>
  );
}

export default Recipes;
