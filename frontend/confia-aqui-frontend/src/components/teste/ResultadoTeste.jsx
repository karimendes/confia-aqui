function ResultadoTeste({ resultado }) {

    return (
        <main className="flex justify-center items-center w-full min-h-screen bg-gray-50 px-4">
            <div className="bg-white w-full max-w-xl p-10 shadow-xl rounded-2xl text-center">

                <h1 className="text-2xl font-bold text-azul mb-4">
                    Quiz Finalizado!
                </h1>

                <p className="text-xl font-semibold text-cinza-600 mb-2">
                    Você acertou {resultado.correctAnswers} de {resultado.totalQuestions}.
                </p>

                <p className="text-cinza-600 font-semibold mb-1">
                    Nível: {resultado.performanceLevel}
                </p>

                <p className="text-cinza-500 mb-4">
                    {resultado.feedbackMessage}
                </p>

                <p className="text-cinza-500 italic mb-8">
                    {resultado.recommendation}
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