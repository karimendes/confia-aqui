import { useState } from "react";
import { criarQuiz, getPerguntas, submitQuiz } from "../services/teste/testeService";

export function useGerenciarTeste() {
    const [quizId, setQuizId] = useState(null);
    const [perguntas, setPerguntas] = useState([]);
    const [iniciado, setIniciado] = useState(false);
    const [finalizado, setFinalizado] = useState(false);
    const [resultado, setResultado] = useState(null);

    const [indexAtual, setIndexAtual] = useState(0);
    const [respostas, setRespostas] = useState([]);
    const [animacao, setAnimacao] = useState(null);

    const [carregando, setCarregando] = useState(false);

    async function iniciar() {
    try {
        setCarregando(true);

        const criado = await criarQuiz();

        console.log("criado =", criado); // <<< AQUI — funciona

        setQuizId(criado.id);

        const data = await getPerguntas(criado.id);
        setPerguntas(data);

        setIniciado(true);
    } finally {
        setCarregando(false);
    }
}

    async function finalizarQuiz() {
        const resp = await submitQuiz(quizId, respostas);
        setResultado(resp);
        setFinalizado(true);
    }

    function responder(respostaSelecionada) {
        const perguntaAtual = perguntas[indexAtual];

        setRespostas((prev) => [
            ...prev,
            {
                id: perguntaAtual.id, 
                response: respostaSelecionada.texto
            }
        ]);

        const acertou = respostaSelecionada.correta;
        setAnimacao(acertou ? "correto" : "errado");

        setTimeout(() => {
            setAnimacao(null);

            if (indexAtual + 1 < perguntas.length) {
                setIndexAtual((i) => i + 1);
            } else {
                finalizarQuiz();
            }
        }, 500);
    }

    const progresso =
        perguntas.length > 0 ? ((indexAtual + 1) / perguntas.length) * 100 : 0;

    return {
        iniciado,
        iniciar,

        perguntas,
        indexAtual,
        animacao,
        responder,
        progresso,

        finalizado,
        resultado,

        carregando
    };
}