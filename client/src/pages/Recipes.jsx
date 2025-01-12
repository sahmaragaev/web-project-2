import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import RecipeForm from "../components/RecipeForm";
import SearchBar from "../components/SearchBar";
import { getAllRecipes, getAllTags, updateRecipeOrder } from "../services/api";
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
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);

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

  const handleSelectRecipe = (recipeId) => {
    setSelectedRecipes((prevSelected) =>
      prevSelected.includes(recipeId)
        ? prevSelected.filter((id) => id !== recipeId)
        : [...prevSelected, recipeId]
    );
  };

  const handleSendEmail = () => {
    const selectedData = recipes.filter((recipe) =>
      selectedRecipes.includes(recipe.id)
    );
    const jsonString = encodeURIComponent(
      JSON.stringify(selectedData, null, 2)
    );
    const mailtoLink = `mailto:?subject=Selected Recipes&body=${jsonString}`;
    window.location.href = mailtoLink;
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (index) => {
    const updatedRecipes = [...recipes];
    const [draggedItem] = updatedRecipes.splice(draggedIndex, 1);
    updatedRecipes.splice(index, 0, draggedItem);

    setRecipes(updatedRecipes);
    setDraggedIndex(null);

    // Update order in database
    try {
      const reorderedData = updatedRecipes.map((recipe, i) => ({
        id: recipe.id,
        order: i,
      }));
      await updateRecipeOrder(reorderedData);
    } catch (error) {
      console.error("Error updating recipe order:", error);
    }
  };

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
      <div className="top-controls">
        <button
          onClick={handleSendEmail}
          disabled={selectedRecipes.length === 0}
        >
          Send Selected Recipes via Email
        </button>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close" : "Create New Recipe"}
        </button>
      </div>

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
        {sortedRecipes.map((recipe, index) => (
          <div
            key={recipe.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            className="recipe-card"
          >
            <RecipeCard
              recipe={recipe}
              isSelected={selectedRecipes.includes(recipe.id)}
              onSelect={() => handleSelectRecipe(recipe.id)}
              onDelete={() => fetchRecipes(1, true)}
              onEdit={() => fetchRecipes(1, true)}
            />
          </div>
        ))}
      </div>
      {isLoading && <p>Loading...</p>}
      <div id="sentinel" />
    </div>
  );
}

export default Recipes;
