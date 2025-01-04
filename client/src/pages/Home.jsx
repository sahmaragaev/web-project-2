import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { getRecipe } from "../services/api";

import "./Home.css";

function Home() {
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    fetchRecipe();
  }, []);

  async function fetchRecipe() {
    try {
      const id = new Date().getDate();
      const data = await getRecipe(id);
      setRecipe(data);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  }

  return (
    <div>
      <h1>Welcome to the Recipe Manager App</h1>
      <p>This app allows you to create, view, edit, and delete recipes.</p>

      <h2>Featured Recipe</h2>
      {Object.keys(recipe).length === 0 ? (
        <p>Loading...</p>
      ) : (
        <RecipeCard
          key={`${recipe.id}`}
          recipe={recipe}
          onDelete={() => console.log("delete")}
          onEdit={() => console.log("edit")}
          isFeatured={true}
        />
      )}
      <h2>Our Projects</h2>
      <ul>
        <li>
          <a
            href="https://github.com/sahmaragaev/web-project-1"
            target="_blank"
            rel="noreferrer"
          >
            Web project 1 (Deprecated, we have already made the repository
            private)
          </a>
        </li>
        <li>
          <a
            href="https://github.com/sahmaragaev/aze-flag"
            target="_blank"
            rel="noreferrer"
          >
            Flag (Shahmar, Also private)
          </a>
        </li>
        <li>
          <a href="sahmar.org" target="_blank" rel="noreferrer">
            Shahmar CV
          </a>
        </li>
        <li>
          <a href="https://github.com/sahmaragaev/commit-rigging" target="_blank" rel="noreferrer">
            Commit Rigging (For making fake commits at fake times)
          </a>
        </li>
        <li>
          <a href="https://github.com/sahmaragaev/cpp-compiler-learning" target="_blank" rel="noreferrer">
            Compiler in CPP
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Home;
