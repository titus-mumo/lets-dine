import React from "react";
import { ToastMessage } from "../utils";
import axios from "axios";
import { refreshAccessToken } from "./RefreshToken";

require('dotenv').config();

const base_url = process.env.BASE_URL;

export const ApiCall = async (endpoint, method, token, refreshToken, setToken, data = {}, options = {}) => {
    const headers = {
        ...options.headers,
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    };

    const api = axios.create({
        baseURL: base_url,
        headers: headers
    });

    try {
        let res;
        if (method === 'post') {
            res = await api.post(endpoint, data);
        } else if (method === 'get') {
            res = await api.get(endpoint);
        }
        return res;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Token has expired, attempt to refresh it
            try {
                const newToken = await refreshAccessToken(refreshToken);
                console.log(newToken)
                if (newToken) {
                    setToken(newToken);
                    // Retry the original request with the new token
                    headers["Authorization"] = `Bearer ${newToken}`;
                    if (method === 'post') {
                        res = await api.post(endpoint, data, { headers });
                    } else if (method === 'get') {
                        res = await api.get(endpoint, { headers });
                    }
                    return res;
                } else {
                    ToastMessage("error", "You are not authorized to perform this function");
                }
            } catch (refreshError) {
                console.log("Failed to refresh token:", refreshError.message);
                ToastMessage("error", "Session expired. Please log in again.");
            }
        } else {
            console.log(error.message);
        }
    }
};