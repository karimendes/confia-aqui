import apiAuth from "./apiAuth";

export const cadastrarUsuario = async (nome, email, senha) => {
    return await apiAuth.post("/auth/cadastrarUsuario", {nome, email, senha})
}

export const loginUser = async (email, senha) => {
    const response = await apiAuth.post("auth/login", {email, senha})
    return response.data
}

export const logoutUser = async () => {
    const token = localStorage.getItem("token")
    if(!token) return
    return await apiAuth.post("/auth/logout", {}, {headers: {Authorization: `Bearer ${token}`},})
}

export const esqueciSenha = async (email) => {
    return await apiAuth.post("auth/esqueciSenha", {email})
}

export const redefinirSenha = async (token, novaSenha) => {
    return await apiAuth.post("/auth/redefinirSenha", {token: token, senha: novaSenha,})
}