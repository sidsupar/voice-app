import { StatusCodes } from "@repo/types";
import axios from "axios";
import { redirect } from "react-router";
import { store } from "./globalStates/store";
import { checkUserLoginStatusThunk } from "./globalStates/userDataSlice";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const USER_ROUTE = import.meta.env.VITE_USER_ROUTE;

export const refreshInterceptor = axios.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        
        // Check if the error is a 403 Forbidden and the request has not been retried
        if (error.response.status === StatusCodes.forbidden && !originalRequest._retry) {
            originalRequest._retry = true; // Set the retry flag to avoid infinite loop
            
            try {
                // Attempt to refresh the token
                const res = await axios.post(`${BASE_URL}/${USER_ROUTE}/refreshToken`, {}, {
                    validateStatus: status => status >= 200 && status < 600
                });

                if (res.status === StatusCodes.accepted) {
                    console.log("Credentials refreshed");
                    // Set the new token in the original request and retry it
                    originalRequest.headers['Authorization'] = `Bearer ${res.data.token}`;
                    return axios(originalRequest);
                } else {
                    console.log("Token refresh failed, redirecting to auth");
                    store.dispatch(checkUserLoginStatusThunk(store.getState()?.userDetails.name as string));
                    redirect("/auth");
                    location.reload();
                    throw new Error("Your login credentials have expired");
                }
            } catch (err) {
                console.log("Error during token refresh, redirecting to auth");
                redirect("/auth");
                location.reload();
                return Promise.reject(err);
            }
        }

        // If the error is not 403 or the request has already been retried, reject the promise
        return Promise.reject(error);
    }
);
