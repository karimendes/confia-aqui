import apiUser from "./apiUser";

export const getPerfil = () => {
    return apiUser.get("/user/me")
}

export const alterarEmail = (novoEmail) => {
    return apiUser.put("/user/alterarEmail", {email: novoEmail})
}

export const alterarSenha = (novaSenha) => {
    return apiUser.put("/user/alterarSenha", {senha: novaSenha})
}

export const excluirUser = () => {
    return apiUser.delete("/user/deletaUsuario")
}