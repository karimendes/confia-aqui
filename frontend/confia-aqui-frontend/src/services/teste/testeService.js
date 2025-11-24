import apiTeste from "./apiTeste";

export async function criarQuiz(category = "golpe_presente", numQ = 5, title = "Quiz Golpe do Presente") {
    const normalizedCategory = (category || "").toString().trim().replace(/-/g, '_');
    const res = await apiTeste.post(`/create?category=${normalizedCategory}&numQ=${numQ}&title=${encodeURIComponent(title)}`);
    return res.data;
}

export async function getPerguntas(Id) {
    const res = await apiTeste.get(`/get/${Id}`);
    return res.data;
}

export async function submitQuiz(Id, respostas) {
    const res = await apiTeste.post(`/submit/${Id}`, respostas);
    return res.data;
}

export async function checkAnswer(quizId, questionId, response) {
    const res = await apiTeste.post(`/check/${quizId}/${questionId}`, { response });
    return res.data;
}

export async function getCategories() {
    const res = await apiTeste.get(`/question/categories`);
    return res.data;
}