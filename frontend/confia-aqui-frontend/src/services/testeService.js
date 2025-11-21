import apiTeste from "./apiTeste";

export const getPerguntas = async () => {
    const response = await apiTeste.get("/quiz/perguntas")
    return response.data
}