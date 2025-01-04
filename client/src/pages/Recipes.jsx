import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import RecipeForm from "../components/RecipeForm";
import SearchBar from "../components/SearchBar";
import { getAllRecipes, getAllTags } from "../services/api";
import "./Recipes.css";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [tags, setTags] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [sortType, setSortType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchRecipes(1, true);
    fetchTags();
  }, []);

  async function fetchRecipes(page = 1, reset = false) {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const { data, total } = await getAllRecipes(page);

      setRecipes((prevRecipes) => (reset ? data : [...prevRecipes, ...data]));
      setTotalRecipes(total);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchTags() {
    try {
      const data = await getAllTags();
      setTags(data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  }

  const filteredRecipes = recipes.filter((recipe) => {
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && recipes.length < totalRecipes) {
          fetchRecipes(currentPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    const sentinel = document.querySelector("#sentinel");
    if (sentinel) observer.observe(sentinel);

    return () => observer.disconnect();
  }, [currentPage, recipes, totalRecipes]);

  return (
    <div className="recipes-container">
      <h1>Recipes</h1>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close" : "Create New Recipe"}
      </button>

      {showForm && (
        <RecipeForm
          onRecipeCreated={() => {
            setRecipes([]);
            fetchRecipes(1, true);
          }}
          onClose={() => setShowForm(false)}
        />
      )}

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <div className="filter-container">
        <label>Filter by tag:</label>
        <select
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
        >
          <option value="">All</option>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.tag}>
              {tag.tag}
            </option>
          ))}
        </select>
      </div>

      <div className="sort-container">
        <label>Sort by:</label>
        <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="">None</option>
          <option value="title">Title</option>
          <option value="difficulty">Difficulty</option>
          <option value="lastUpdated">Last Updated</option>
        </select>
      </div>

      <div className="recipes-grid">
        {sortedRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onDelete={() => fetchRecipes(1, true)}
            onEdit={() => fetchRecipes(1, true)}
          />
        ))}
      </div>
      {isLoading && <p>Loading...</p>}
      <div id="sentinel" />
    </div>
  );
}

export default Recipes;
