import React from "react";
import { ToastMessage } from "../utils";
import axios from "axios";
import { refreshAccessToken } from "./RefreshToken.js";

require('dotenv').config();

const base_url = process.env.BASE_URL;

export const ApiCall = async (endpoint, method, token, refreshToken, setToken, setRefresh, data = {}, options = {}, form = {}) => {
    const headers = {
        ...options.headers,
        "Authorization": `Bearer ${token}`,
        "Content-Type": form && form === true?'multipart/form-data':"application/json"
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
        } else if (method === 'delete'){
            res = await api.delete(endpoint);
        } else if(method === 'put'){
            res = await api.put(endpoint, data)
        }
        return res;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Token has expired, attempt to refresh it
            try {
                let refetchedData;
                const refreshLocal = localStorage.getItem("refresh")
                let response = await refreshAccessToken(refreshLocal);
                if (response === null){
                    return ToastMessage("Ooops", "An error occured")
                }
                const {access, refresh} = response
                if (access) {
                    setToken(access);
                    setRefresh(refresh);
                    localStorage.setItem("site", access);
                    localStorage.setItem("refresh", refresh);

                    // Retry the original request with the new token
                    headers["Authorization"] = `Bearer ${access}`;
                    if (method === 'post') {
                        refetchedData = await api.post(endpoint, data, { headers });
                    } else if (method === 'get') {
                        refetchedData = await api.get(endpoint, { headers });
                    }else if (method === 'delete') {
                        refetchedData = await api.delete(endpoint, { headers });
                    }else if (method === 'delete'){
                        refetchedData = await api.put(endpoint, data, { headers });
                    }
                    return refetchedData
                } else {
                    ToastMessage("error", "You are not authorized to perform this function");
                }
            } catch (refreshError) {
                ToastMessage("error", "Session expired. Please login again")
            }
        } else {
            return error.response

        }
    }
};