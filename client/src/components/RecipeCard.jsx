import React, { useState } from 'react'
import { deleteRecipe, updateRecipe } from '../services/api'

function RecipeCard({ recipe, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(recipe.title)
  const [description, setDescription] = useState(recipe.description)

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${recipe.title}"?`)) {
      await deleteRecipe(recipe.id)
      onDelete()
    }
  }

  const handleUpdate = async () => {
    const updatedRecipe = {
      ...recipe,
      title,
      description,
      lastUpdated: new Date().toISOString()
    }
    await updateRecipe(recipe.id, updatedRecipe)
    setIsEditing(false)
    onEdit()
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '1em', width: '250px', position: 'relative' }}>
      {isEditing ? (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
          <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
          <p><strong>Last Updated:</strong> {new Date(recipe.lastUpdated).toLocaleString()}</p>
          <p><strong>Tags:</strong> {recipe.tags.join(', ')}</p>
          <div style={{ marginTop: '1em' }}>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
    </div>
  )
}

export default RecipeCard
