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

apiTeste.interceptors.response.use(
    (response) => response,
    (error) => {
            if (error.response) {
                if (error.response.status === 401) {
                    debug('[apiTeste] Recebeu 401 do servidor. Não redirecionando automaticamente.');
                }
                if (error.response.status >= 500) {
                    error('[apiTeste] Erro interno do servidor:', sanitizeForLogging(error.response.data));
                }
            } else {
                error('[apiTeste] Erro de conexão:', error.message);
        }
        return Promise.reject(error);
    }
)

export default apiTeste