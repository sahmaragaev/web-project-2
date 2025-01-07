import axios from "axios";

const API_URL = "http://localhost:3001";

export const getRecipe = async (id) => {
    const res = await axios.get(`${API_URL}/recipes/${id}`);
    return res.data;
};


export const getAllRecipes = async (page = 1, limit = 10) => {
    const res = await axios.get(`${API_URL}/recipes?_page=${page}&_limit=${limit}&_sort=order&_order=asc`);
    const total = parseInt(res.headers["x-total-count"], 10);
    return {
        data: res.data,
        total: isNaN(total) ? 0 : total,
    };
};


export const createRecipe = async (recipe) => {
    const res = await axios.post(`${API_URL}/recipes`, recipe);
    return res.data;
};


export const deleteRecipe = async (id) => {
    await axios.delete(`${API_URL}/recipes/${id}`);
};


export const updateRecipe = async (id, updatedData) => {
    const res = await axios.put(`${API_URL}/recipes/${id}`, updatedData);
    return res.data;
};


export const sendMessage = async (messageData) => {
    const res = await axios.post(`${API_URL}/messages`, messageData);
    return res.data;
};


export const getAllTags = async () => {
    const res = await axios.get(`${API_URL}/tags`);
    return res.data;
};


export const updateRecipeOrder = async (reorderedData) => {
    try {
        const updatePromises = reorderedData.map((recipe) =>
            axios.patch(`${API_URL}/recipes/${recipe.id}`, { order: recipe.order })
        );
        await Promise.all(updatePromises);
    } catch (error) {
        console.error("Error updating recipe order:", error);
        throw error;
    }
};
