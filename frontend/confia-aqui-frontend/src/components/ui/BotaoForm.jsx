function BotaoForm({text, onClick}){
    return (
        <button onClick={onClick} className="w-full py-2 mt-2 rounded-xl font-normal shadow-sm hover:opacity-90 transition bg-azul text-white text-sm">{text}</button>
    )
}

export default BotaoForm