import axios from "axios"

const apiFaq = axios.create({
    baseURL: import.meta.env.VITE_API_FAQ_URL,
    headers: {
        "Content-Type": "application/json",
    },
})


apiFaq.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default apiFaq