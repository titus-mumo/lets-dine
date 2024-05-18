require('dotenv').config()
import axios from "axios"

const base_url = process.env.BASE_URL


export const refreshAccessToken = async (refreshToken) => {
    const api = axios.create({
        baseURL: base_url,
        headers: {
            "Content-Type": "application/json"
        }
    });

    try {
        const response = await api.post('token/refresh/', { refresh: refreshToken });
        console.log(response)
        return response.data;
    } catch (error) {
        console.log("Failed to refresh token:", error.response.data.detail || error.message);
        return null;
    }
};