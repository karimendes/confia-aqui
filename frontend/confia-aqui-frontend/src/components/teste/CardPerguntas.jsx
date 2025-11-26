import BotaoRespostas from "./BotaoRespostas";

function CardPerguntas({ pergunta, onResponder, animacao, selectedOptionId, correctOptionId, wrongOptionId }) {

    return (
        <main className="flex justify-center items-center w-screen h-screen bg-gray-50 px-4">
        <div
            className={`bg-white w-full max-w-xl shadow-xl rounded-2xl p-10 transition-all duration-300
                ${animacao === "correto" ? "ring-4 ring-green-400 scale-[1.02]" : ""}
                ${animacao === "errado" ? "ring-4 ring-red-400 scale-[0.98]" : ""}
            `}
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-cinza-600">
                    {pergunta?.titulo || pergunta?.questionTitle || "Pergunta"}
                </h2>
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
    </main>
    );
}

export default CardPerguntas;