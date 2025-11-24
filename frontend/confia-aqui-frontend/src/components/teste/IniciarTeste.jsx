
import { useState } from "react";

function IniciarTeste({ onIniciar, carregando }) {
  const [categoria, setCategoria] = useState("golpe_presente");

  return (
    <main className="flex justify-center items-center w-screen h-screen bg-gray-50 px-4">
      <div className="bg-white w-full max-w-xl p-10 shadow-xl rounded-2xl text-center">
        <h1 className="text-2xl font-bold text-cinza-600 mb-6">
          Teste - {categoria === "golpe_presente" ? "Golpe do Presente" : "Segurança Digital"}
        </h1>

        <p className="text-cinza-500 mb-8">
          Escolha a categoria e clique para iniciar seu teste.
        </p>

        <div className="flex justify-center gap-4 mb-8">
          <button
            className={`px-4 py-2 rounded-lg font-semibold transition ${categoria === "golpe_presente" ? "bg-azul text-white" : "bg-gray-200 text-cinza-600 hover:bg-gray-300"}`}
            onClick={() => setCategoria("golpe_presente")}
            disabled={carregando}
          >
            Golpe do Presente
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-semibold transition ${categoria === "seguranca_digital" ? "bg-azul text-white" : "bg-gray-200 text-cinza-600 hover:bg-gray-300"}`}
            onClick={() => setCategoria("seguranca_digital")}
            disabled={carregando}
          >
            Segurança Digital
          </button>
        </div>

        <button
          onClick={() => onIniciar(categoria)}
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