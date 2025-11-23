function IniciarTeste({ onIniciar, carregando }) {
  return (
    <main className="flex justify-center items-center w-screen h-screen bg-gray-50 px-4">
      <div className="bg-white w-full max-w-xl p-10 shadow-xl rounded-2xl text-center">
        <h1 className="text-2xl font-bold text-cinza-600 mb-6">
          Teste - Golpe do Presente
        </h1>

        <p className="text-cinza-500 mb-8">
          Clique no botão abaixo para iniciar seu teste e avaliar os seus conhecimentos sobre o golpe do presente.
        </p>

        <button
          onClick={onIniciar}
          disabled={carregando}
          className="bg-azul text-white px-6 py-3 rounded-xl text-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {carregando ? "Carregando..." : "Iniciar Teste"}
        </button>
      </div>
    </main>
  );
}

export default IniciarTeste;