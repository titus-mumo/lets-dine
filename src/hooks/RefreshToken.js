require('dotenv').config()

const base_url = process.env.BASE_URL


export const refreshAccessToken = async (refreshToken) => {
    const api = axios.create({
        baseURL: base_url,
        headers: {
            "Content-Type": "application/json"
        }
    });

    try {
        const response = await api.post('/auth/refresh/', { refresh: refreshToken });
        return response.data.access;
    } catch (error) {
        console.log("Failed to refresh token:", error.message);
        return null;
    }
};