import apiTeste from "./apiTeste";

export async function criarQuiz(category = "golpe-do-presente", numQ = 5, title = "Quiz Golpe do Presente") {
    const res = await apiTeste.post(`/create?category=${category}&numQ=${numQ}&title=${encodeURIComponent(title)}`);
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