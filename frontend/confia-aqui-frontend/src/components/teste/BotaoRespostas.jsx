function BotaoRespostas({ texto, onClick }) {
    return (
        <button
            onClick={onClick}
            className="w-full bg-azul text-white py-3 px-4 rounded-lg text-left 
                       hover:opacity-90 transition shadow-sm"
        >
            {texto}
        </button>
    );
}

export default BotaoRespostas;