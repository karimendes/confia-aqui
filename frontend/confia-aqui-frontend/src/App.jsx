import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import EsqueceuSenha from "./pages/EsqueceuSenha"
import RedefinirSenha from "./pages/RedefinirSenha"
import Cadastro from "./pages/Cadastro"
import Home from "./pages/Home"
import HomeAdmin from "./pages/HomeAdmin"
import Teste from "./pages/Teste"
import Perfil from "./pages/Perfil"
import "./App.css"
import "./index.css"

import { AuthProvider } from "./components/auth/AuthContext"
import PrivateRoute from "./components/auth/PrivateRoute"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/esqueci-senha" element={<EsqueceuSenha />} />
          <Route path="/redefinir-senha" element={<RedefinirSenha />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/home" element={<PrivateRoute role="USER"><Home /></PrivateRoute>} />
         <Route path="/admin/home" element={<PrivateRoute role="ADMIN"><HomeAdmin /></PrivateRoute>} />
          <Route path="/teste" element={<PrivateRoute role="USER"><Teste /></PrivateRoute>} />
          <Route path="/perfil" element={<PrivateRoute role="USER"><Perfil /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

