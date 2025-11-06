import { createContext, useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const token = localStorage.getItem("token")

    if (storedUser && token) {
      setUser(JSON.parse(storedUser))
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }
  }, [])

  const login = async (email, senha) => {
    try {
      const response = await api.post("/auth/login", { email, senha })
      const { token, user } = response.data

      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`
      setUser(user)

      if (user.role === "ADMIN") {
        navigate("/admin/home")
      } else {
        navigate("/home")
      }
    } catch (error) {
      console.error("Erro no login:", error)
      throw error
    }
  }

  const logout = async () => {
    try {
      const token = localStorage.getItem("token")

      if (token) {
        await api.post(
          "/auth/logout",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      }
    } catch (error) {
      console.warn("Erro ao chamar logout no back-end:", error)
    } finally {
      localStorage.clear()
      setUser(null)
      delete api.defaults.headers.common["Authorization"]
      navigate("/login")
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}