import React, { useState } from "react";
import { deleteRecipe, updateRecipe } from "../services/api";
import "./RecipeCard.css";

function RecipeCard({ recipe, onDelete, onEdit, isFeatured }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${recipe.title}"?`)) {
      await deleteRecipe(recipe.id);
      onDelete();
    }
  };

  const handleUpdate = async () => {
    const updatedRecipe = {
      ...recipe,
      title,
      description,
      lastUpdated: new Date().toISOString(),
    };
    await updateRecipe(recipe.id, updatedRecipe);
    setIsEditing(false);
    onEdit();
  };

  return (
    <div className="recipe-card">
      {isEditing ? (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="button-group">
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <img
            src={recipe.url}
            alt={recipe.title}
            className="recipe-card-image"
          />
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <p>
            <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
          </p>
          <p>
            <strong>Difficulty:</strong> {recipe.difficulty}
          </p>
          <p>
            <strong>Last Updated:</strong>{" "}
            {new Date(recipe.lastUpdated).toLocaleString()}
          </p>
          <p>
            <strong>Tags:</strong> {recipe.tags.join(", ")}
          </p>
          {!isFeatured && (
            <div className="button-group">
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default RecipeCard;
