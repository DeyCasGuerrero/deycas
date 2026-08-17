// AXIOS CONFIG

import { TokenManager } from '@/lib/token-manager';
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';


let isRefreshing = false;

const failedQueue:Array<{
    resolve:(value:string)=> void;
    reject:(error:Error)=> void;
}> = [];

const processQueue = (error: Error | null = null, token:string | null = null)=>{
    failedQueue.forEach(prom =>{
        if(error){
            prom.reject(error);
        } else {
            prom.resolve(token!);
        }
    })
    failedQueue.length = 0;
} 

export function setUpAxiosInterceptors(axiosClient: AxiosInstance) {
    axiosClient.interceptors.request.use(
        (config) => {
            const accessToken = TokenManager.getAccessToken();
            console.log("Access Token en interceptor:", accessToken);
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosClient.interceptors.response.use(
        (response) => {
            // Si el backend envuelve la respuesta en { success: true, data: ... }, desempaquetamos automáticamente el 'data'
            if (
                response.data &&
                typeof response.data === "object" &&
                response.data.success === true &&
                "data" in response.data
            ) {
                response.data = response.data.data;
            }
            return response;
        },
        async (error) => {
            if(!axios.isAxiosError(error) || !error.config){
                return Promise.reject(error);
            }
            

            const originalRequest = error.config as InternalAxiosRequestConfig & {_retry?: boolean};
            
            if(originalRequest.url?.includes('login') || originalRequest.url?.includes('refresh')){
                return Promise.reject(error);
            }

            if(error.response?.status !== 401){
                return Promise.reject(error);
            }

            if(originalRequest._retry){
                return Promise.reject(error);
            }

            if(isRefreshing){
                return new Promise<string | null>((resolve, reject) => {
                    failedQueue.push({resolve, reject});
                }).then(accessToken => {
                    if(accessToken){
                        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    }
                    return axiosClient(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const {data}= await axios.post('/api/auth/refresh', {}, {withCredentials: true});
                const resData = data?.data || data;
                const newAccessToken = resData?.accessToken || resData?.token;
                
                TokenManager.setAccessToken(newAccessToken);
                TokenManager.setUser(resData?.user || null);
                processQueue(null, newAccessToken);

                console.log("xdasdasdas", data)

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosClient(originalRequest);
            }catch (err) {
                processQueue(new Error('Failed to refresh access token'), null);
                TokenManager.clearSession();
                TokenManager.setUser(null);
                window.location.href = '/login';
                return Promise.reject(err);
            }finally {
                isRefreshing = false;
            }
        }
    );
}