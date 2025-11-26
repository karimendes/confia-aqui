function BotaoRespostas({ texto, onClick, selecionada, animacao, isCorrect=false, isWrong=false }) {
    let cor = "bg-azul";
        if (isCorrect) {
            cor = "bg-green-500";
        } else if (isWrong) {
            cor = "bg-red-500";
        } else if (selecionada && animacao === "correto") {
            cor = "bg-green-500";
        } else if (selecionada && animacao === "errado") {
            cor = "bg-red-500";
    }
    return (
        <button
            onClick={onClick}
            className={`w-full ${cor} text-white py-3 px-4 rounded-lg text-left hover:opacity-90 transition shadow-sm`}
        >
            {texto}
        </button>
    );
}

export default BotaoRespostas;