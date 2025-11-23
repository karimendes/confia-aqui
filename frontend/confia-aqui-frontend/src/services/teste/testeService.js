import api from "./apiTeste";

export async function criarQuiz() {
    const res = await api.post("/create");
    return res.data;
}

export async function getPerguntas(quizId) {
    const res = await api.get(`/get/${quizId}`);
    return res.data;
}

export async function submitQuiz(quizId, respostas) {
    const res = await api.post(`/submit/${quizId}`, respostas);
    return res.data;
}