import { useState } from "react";
import { criarQuiz, getPerguntas, submitQuiz, checkAnswer } from "../services/teste/testeService";


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

    async function iniciar(categoria = "golpe_presente") {
        try {
            setCarregando(true);

            let criado;
            try {
                criado = await criarQuiz(categoria);
            } catch (err) {
                console.error('Erro ao criar quiz:', err, err && err.response ? { status: err.response.status, data: err.response.data } : null);
                if (err && err.response && err.response.data) {
                    const serverMsg = typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err.response.data);
                    alert('Erro ao iniciar o teste: ' + serverMsg);
                } else if (err && err.response && err.response.status === 401) {
                    alert('Você precisa estar logado para iniciar o teste. Faça login e tente novamente.');
                } else {
                    alert('Erro ao iniciar o teste. Tente novamente mais tarde.');
                }

                return;
            }

            console.log("criado =", criado);
            let criadoId = null;
            if (criado && typeof criado === 'object') {
                criadoId = criado.id || criado.id === 0 ? criado.id : null;
            } else if (typeof criado === 'string') {
                const m = criado.match(/ID[:\s]+(\d+)/i);
                if (m) {
                    criadoId = Number(m[1]);
                }
            }

            if (!criadoId && criadoId !== 0) {
                console.error('Resposta inválida do servidor ao criar quiz:', criado);
                return;
            }

            setQuizId(criadoId);

            const data = await getPerguntas(criadoId);
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

    async function responder(respostaSelecionada) {
        const perguntaAtual = perguntas[indexAtual];

        // Verifica com o backend se a resposta está correta, sem expor rightAnswer
        let acertou = false;
        try {
            acertou = await checkAnswer(quizId, perguntaAtual.id, respostaSelecionada.texto);
        } catch (err) {
            console.error('Erro ao verificar resposta', err);
            // se der erro, considerar incorreta para não expor
            acertou = false;
        }

        setRespostas((prev) => [
            ...prev,
            {
                id: perguntaAtual.id, 
                response: respostaSelecionada.texto
            }
        ]);

        setAnimacao(acertou ? "correto" : "errado");

            setTimeout(() => {
                setAnimacao(null);

                // limpar seleção atual para a próxima pergunta
                if (window._cardPerguntaSel) {
                    const oldSetter = window._cardPerguntaSel[1];
                    window._cardPerguntaSel = [null, oldSetter];
                }

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