import axios from "axios";
import { getCookies } from "@coocse";

const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})


request.interceptors.request.use((config) => {
    const token = getCookies("token")
    if (token) {
        config.headers["Authorization"] = token
    }
    return config
})

export default request

