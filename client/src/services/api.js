import axios from 'axios'

const API_URL = 'http://localhost:3001'

export const getRecipe = async (id) => {
    const res = await axios.get(`${API_URL}/recipes/${id}`)
    return res.data
}

export const getAllRecipes = async (page = 1, limit = 10) => {
    // Workaround because res.headers["x-total-count"] does not work anymore. 
    // I would have forked and fixed the library but I don't have enough time. 
    // Hopefully when I do, I will open a PR for the OG team.
    const response = await axios.get(`${API_URL}/recipes`);
    const count = response.data.length;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedRecipes = response.data.slice(startIndex, endIndex);

    return {
        data: paginatedRecipes,
        total: count,
    };
};

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

export const getAllTags = async () => {
    const res = await axios.get(`${API_URL}/tags`)
    return res.data
}