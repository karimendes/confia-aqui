import BotaoRespostas from "./BotaoRespostas";

function CardPerguntas({ pergunta, onResponder, animacao, selectedOptionId, correctOptionId, wrongOptionId }) {
    const corDificuldade = {
        FACIL: "bg-green-500",
        MEDIO: "bg-yellow-500",
        DIFICIL: "bg-red-500"
    };

    return (
        <div
            className={`bg-white shadow-md rounded-xl p-6 transition-all duration-300
                ${animacao === "correto" ? "ring-4 ring-green-400 scale-[1.02]" : ""}
                ${animacao === "errado" ? "ring-4 ring-red-400 scale-[0.98]" : ""}
            `}
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-cinza-600">
                    {pergunta?.titulo || pergunta?.questionTitle || "Pergunta"}
                </h2>

                <span
                    className={`text-white px-3 py-1 rounded-full text-xs ${corDificuldade[pergunta?.dificuldade] || "bg-gray-400"}`}
                >
                    {pergunta?.dificuldade || ""}
                </span>
            </div>

            <div className="flex flex-col gap-3 mt-4">
                {(() => {
                    const buildOptionsFromFields = () => [pergunta?.option1, pergunta?.option2, pergunta?.option3, pergunta?.option4]
                        .filter(Boolean)
                        .map((texto, i) => ({ id: `${pergunta?.id || 'p'}_${i}`, texto }));

                    const rawRespostas = pergunta?.respostas && Array.isArray(pergunta.respostas)
                        ? pergunta.respostas
                        : buildOptionsFromFields();

                    const respostas = rawRespostas;
                    const [windowSelecionada, setSelecionada] = window._cardPerguntaSel || [null, () => {}];
                    const selecionada = selectedOptionId || windowSelecionada;
                        return respostas.map((resp) => (
                        <BotaoRespostas
                            key={resp.id}
                            texto={resp.texto}
                            selecionada={selecionada === resp.id}
                            isCorrect={correctOptionId === resp.id}
                            isWrong={wrongOptionId === resp.id}
                            animacao={animacao}
                            onClick={() => {
                                window._cardPerguntaSel = [resp.id, setSelecionada];
                                onResponder(resp);
                            }}
                        />
                    ));
                })()}
            </div>
        </div>
    );
}

export default CardPerguntas;