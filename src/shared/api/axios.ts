import axios from "axios"
import { setUpAxiosInterceptors } from "../interceptors/axios.interceptor"

declare module "axios" {
    interface AxiosRequestConfig {
        silentToast?: boolean;
        successMessage?: string;
    }
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
})

setUpAxiosInterceptors(api)

export default api
