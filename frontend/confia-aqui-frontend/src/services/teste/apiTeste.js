import axios from "axios";

const apiTeste = axios.create({
    baseURL: import.meta.env.VITE_API_TESTE_URL,
    headers: {"Content-Type": "application/json"},
})

apiTeste.interceptors.request.use(
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

export default apiTeste