import BotaoRespostas from "./BotaoRespostas";

function CardPerguntas({ pergunta, onResponder, animacao }) {

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
                    {pergunta.titulo}
                </h2>

                <span
                    className={`text-white px-3 py-1 rounded-full text-xs ${corDificuldade[pergunta.dificuldade]}`}
                >
                    {pergunta.dificuldade}
                </span>
            </div>

            <div className="flex flex-col gap-3 mt-4">
                {pergunta.respostas.map((resp) => (
                    <BotaoRespostas
                        key={resp.id}
                        texto={resp.texto}
                        onClick={() => onResponder(resp.correta)}
                    />
                ))}
            </div>
        </div>
    );
}

export default CardPerguntas;