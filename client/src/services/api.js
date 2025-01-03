import axios from 'axios'

const API_URL = 'http://localhost:3000'

export const getRecipe = async (id) => {
    const res = await axios.get(`${API_URL}/recipes/${id}`)
    return res.data
}

export const getAllRecipes = async () => {
    const res = await axios.get(`${API_URL}/recipes`)
    return res.data
}

export const createRecipe = async (recipe) => {
    const res = await axios.post(`${API_URL}/recipes`, recipe)
    return res.data
}

export const deleteRecipe = async (id) => {
    await axios.delete(`${API_URL}/recipes/${id}`)
}

export const updateRecipe = async (id, updatedData) => {
    const res = await axios.put(`${API_URL}/recipes/${id}`, updatedData)
    return res.data
}

export const sendMessage = async (messageData) => {
    const res = await axios.post(`${API_URL}/messages`, messageData)
    return res.data
}