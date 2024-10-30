import axios from "axios";
import { LS_TOKEN } from "../constants";
import { toast } from 'react-toastify';;

// const { default: axios } = require("axios");

const api = axios.create({
    // baseURL: "http://localhost:8080/v1/api",
    baseURL: "https://fyp-production-5bd6.up.railway.app/v1/api",

    headers: {
        Accept: "application/json"
    }
});



api.interceptors.request.use((config) => {
    const token = localStorage.getItem(LS_TOKEN);

    // Exclude requests to signin and signup routes
    if (!config.url.includes("signin") && !config.url.includes("signup")) {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});


api.interceptors.response.use(
    (response) => {
        // Check for specific status codes and log the response
        const status = response.data.status;

        if (status === 400 || status === 404 || status === 500 || status === 401 || status === 403) {
            toast(response.data.message);
        }

        return response;
    },
    (error) => {

        if (error.response) {
            const status = error.response.data.status;
            if (status === 400 || status === 404 || status === 500 || status === 401 || status === 403) {
                toast(error.response.data.message || "asdf", {
                    type: "error"
                });
                if (status === 401 || status === 403) {
                    localStorage.setItem(LS_TOKEN, "");
                    window.location.href = "/signin"
                }
            }
        } else {
            console.log('Error without response:', error);
        }

        return Promise.resolve(error); // Resolve to allow further handling without rejection
    }
);


export default api;