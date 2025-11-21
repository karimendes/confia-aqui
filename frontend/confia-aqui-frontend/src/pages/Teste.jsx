import { useState } from "react";
import Header from "../components/Header";
import CardPerguntas from "../components/CardPerguntas";
import ResultadoTeste from "../components/ResultadoTeste";
import IniciarTeste from "../components/IniciarTeste";

function Teste() {
    const perguntasFake = [
        {
            id: 1,
            titulo: "Qual é um dos sinais mais comuns do golpe do presente?",
            dificuldade: "FACIL",
            respostas: [
                { id: 1, texto: 'O golpista diz que vítima  "ganhou" um prêmio caro e agora precisa escolher o presente.', correta: true },
                { id: 2, texto: "O golpista envia nota fiscal verdadeira e verificada.", correta: false },
                { id: 3, texto: "O golpista dá um presente verdadeiro para a vítima.", correta: false },
                { id: 4, texto: "O golpista mostra documentos reais para comprovar a identidade.", correta: false },
            ]
        },
        {
            id: 2,
            titulo: "O que normalmente os golpistas pedem durante o golpe do presente?",
            dificuldade: "MEDIO",
            respostas: [
                { id: 1, texto: "Que você envie fotos do presente para confirmar o recebimento.", correta: false },
                { id: 2, texto: "Que você vá até uma agência oficial dos Correios retirar o pacote.", correta: false },
                { id: 3, texto: 'Que você pague uma taxa ou frete para "liberar" o presente.', correta: true },
                { id: 4, texto: "Que você assine um termo digital do governo para liberar o presente.", correta: false },
            ]
        },
        {
            id: 3,
            titulo: "Como identificar que o link enviado pelo golpista é falso?",
            dificuldade: "MEDIO",
            respostas: [
                { id: 1, texto: "O link leva diretamente ao site oficial dos Correios.", correta: false },
                { id: 2, texto: "O link possui URL estranha, com erros ortográficos ou domínios desconhecidos.", correta: true },
                { id: 3, texto: "O link utiliza certificado HTTPS válido e verificado.", correta: false },
                { id: 4, texto: "O link redireciona para o aplicativo oficial que você já tem instalado.", correta: false },
            ]
        }
    ];

    const [iniciado, setIniciado] = useState(false);
    const [perguntas] = useState(perguntasFake);
    const [indexAtual, setIndexAtual] = useState(0);
    const [pontuacao, setPontuacao] = useState(0);
    const [finalizado, setFinalizado] = useState(false);
    const [animacao, setAnimacao] = useState(null);

    function responder(acertou) {
        setAnimacao(acertou ? "correto" : "errado");

        if (acertou) setPontuacao((p) => p + 1);

        setTimeout(() => {
            setAnimacao(null);

            if (indexAtual + 1 < perguntas.length) {
                setIndexAtual((i) => i + 1);
            } else {
                setFinalizado(true);
            }
        }, 500);
    }

    const progresso = ((indexAtual + 1) / perguntas.length) * 100;

    return (
        <>
            <Header />

            {!iniciado && !finalizado && (
                <IniciarTeste onIniciar={() => setIniciado(true)} />
            )}

            {finalizado && (
                <ResultadoTeste pontuacao={pontuacao} total={perguntas.length} />
            )}

            {iniciado && !finalizado && (
                <div className="pt-20 px-4 w-screen h-screen flex justify-center items-start">
                    <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-xl">

                        <div className="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
                            <div
                                className="bg-azul h-3 rounded-full transition-all duration-300"
                                style={{ width: `${progresso}%` }}
                            ></div>
                        </div>

                        <CardPerguntas
                            pergunta={perguntas[indexAtual]}
                            onResponder={responder}
                            animacao={animacao}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default Teste;