import React, { useState } from 'react'
import { createRecipe } from '../services/api'
import './RecipeForm.css'

function RecipeForm({ onRecipeCreated, onClose }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [steps, setSteps] = useState('')
  const [tags, setTags] = useState('')
  const [difficulty, setDifficulty] = useState('Easy')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newRecipe = {
      title,
      description,
      ingredients: ingredients.split(',').map(item => item.trim()),
      steps,
      tags: tags.split(',').map(tag => tag.trim()),
      difficulty,
      lastUpdated: new Date().toISOString()
    }
    try {
      await createRecipe(newRecipe)
      onRecipeCreated() // refresh parent list
      onClose()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
  <h2>Create New Recipe</h2>
  <div>
    <label>Title:</label>
    <input value={title} onChange={(e) => setTitle(e.target.value)} required />
  </div>
  <div>
    <label>Description:</label>
    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
  </div>
  <div>
    <label>Ingredients (comma separated):</label>
    <input value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
  </div>
  <div>
    <label>Preparation Steps:</label>
    <textarea value={steps} onChange={(e) => setSteps(e.target.value)} required />
  </div>
  <div>
    <label>Tags (comma separated):</label>
    <input value={tags} onChange={(e) => setTags(e.target.value)} />
  </div>
  <div>
    <label>Difficulty:</label>
    <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
      <option>Easy</option>
      <option>Medium</option>
      <option>Hard</option>
    </select>
  </div>
  <button type="submit">Save Recipe</button>
</form>
  )
}

export default RecipeForm
