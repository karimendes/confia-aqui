function ResultadoTeste({ pontuacao, total }) {

    let mensagem = "";

    if (pontuacao === 0) mensagem = "Você não acertou nenhuma! Cuidado para não ser uma vítima do Golpe do Presente.";
    else if (pontuacao <= 5) mensagem = "Você acertou algumas! Você ainda está suscetível a sofrer o Golpe do Presente.";
    else if (pontuacao <= 10) mensagem = "Muito bom! Você tem um conhecimento mediano sobre o Golpe do Presente.";
    else if (pontuacao < total) mensagem = "Excelente! Você está bem conscientizado sobre o Golpe do Presente";
    else mensagem = "Parabéns! Você é praticamente um especialista em Golpe do Presente!";

    return (
        <main className="flex justify-center items-center w-full min-h-screen bg-gray-50 px-4">
            <div className="bg-white w-full max-w-xl p-10 shadow-xl rounded-2xl text-center">

                <h1 className="text-2xl font-bold text-azul mb-4">
                    Quiz Finalizado!
                </h1>

                <p className="text-xl font-semibold text-cinza-600 mb-2">
                    Você acertou {pontuacao} de {total}.
                </p>

                <p className="text-cinza-500 mb-8">
                    {mensagem}
                </p>

                <button
                    className="bg-azul text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
                    onClick={() => window.location.reload()}
                >
                    Tentar novamente
                </button>

            </div>
        </main>
    );
}

export default ResultadoTeste;