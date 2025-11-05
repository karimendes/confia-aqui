import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:8080/api", 
    headers: {"Content-Type": "application/json"},
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
}, 
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.warn("Sessão expirada. Redirecionando para login...");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }

      if (error.response.status >= 500) {
        console.error("Erro interno do servidor:", error.response.data);
      }
    } else {
      console.error("Erro de conexão com o servidor:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api