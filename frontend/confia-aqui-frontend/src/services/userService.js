import apiUser from "./apiUser";

export const getPerfil = () => {
    return apiUser.get("/user/usuarioLogado")
}

export const alterarEmail = (novoEmail) => {
    return apiUser.patch("/user/alterarEmail", {email: novoEmail})
}

export const alterarSenha = (novaSenha) => {
    return apiUser.patch("/user/alterarSenha", {senha: novaSenha})
}

export const excluirUser = () => {
    return apiUser.delete("/user/deletaUsuario")
}