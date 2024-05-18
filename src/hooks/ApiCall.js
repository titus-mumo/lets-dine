import React from "react";
import { ToastMessage } from "../utils";
import axios from "axios";

require('dotenv').config();

const base_url = process.env.BASE_URL

export const ApiCall = async(endpoint,method, token, data={},options = {}) => {


    const headers = {
        ...options.headers,
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    }

    const api = axios.create({
        baseURL: base_url,
        headers: headers
    })

    try {

        if(method === 'post'){
            let res =await api.post(endpoint, data);
            return res
        } else if(method === 'get'){
            return await api.get(endpoint)
        }
    } catch (error) {
        return console.log(error.message)
    }

}