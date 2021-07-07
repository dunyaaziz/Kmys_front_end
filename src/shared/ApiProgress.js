import { useEffect, useState } from 'react';
import axios from 'axios';

export const useApiProgress = (apiMethod, apiPath) => {
    const[pendingApiCall, setPendingApiCall] = useState(false)

    useEffect(()=>{
        let requestIntercepter, responseIntercepter;

       const updateApiCallFor = (method, url, inprogress) =>{
            if(url.startsWith(apiPath) && method === apiMethod){
                setPendingApiCall(inprogress);
             }
        };

        const registerInterceptors = () =>{
            requestIntercepter = axios.interceptors.request.use(request => {
                const { url, method } = request;
                updateApiCallFor(method, url, true);
                   return request;
               })
               responseIntercepter = axios.interceptors.response.use(response =>{
                   const { url, method } = response.config;
                   updateApiCallFor(method, url, false);
                   return response;
               }, (error) => {
                const { url, method } = error.config;
                   updateApiCallFor(method, url, false);
                   throw error;
           });
        };
        const unregisterInterceptors = () => {
            axios.interceptors.request.eject(requestIntercepter);
            axios.interceptors.response.eject(responseIntercepter);
        };
    
        registerInterceptors();

        return function unmount() {
            unregisterInterceptors();
        }
    }, [apiPath, apiMethod]);
    return pendingApiCall;
} 