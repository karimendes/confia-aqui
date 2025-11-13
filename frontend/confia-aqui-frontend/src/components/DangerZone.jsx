import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faTimes } from "@fortawesome/free-solid-svg-icons"
import { excluirUser } from "../services/userService"

function DangerZone(){
    const [mostrarModal, setMostrarModal] = useState(false)
    const [carregando, setCarregando] = useState(false)
    const [mensagem, setMensagem] = useState("")
    const [tipoMensagem, setTipoMensagem] = useState("")

    const excluirConta = async () => {
        try {
            setCarregando(true)
            await excluirUser()
            setTipoMensagem("sucesso")
            setMensagem("Conta excluída com sucesso!")
            setTimeout(() => {
                localStorage.clear()
                window.location.href = "/login"
            }, 1500);
        } catch (error) {
            console.error("Erro ao excluir conta", error)
            setTipoMensagem("erro")
            setMensagem("Erro ao excluir conta. Tente novamente")
        } finally {
            setCarregando(false)
            setMostrarModal(false)
        }
    }

    return (
        <div className="mt-4 flex flex-col justify-center items-center w-full p-10 bg-gray-50">
        <div className="bg-white rounded-2xl shadow-xl p-4 m-4 w-full">
      {mensagem && (
        <div
          className={`mt-4 mb-4 px-4 py-3 rounded-lg text-sm font-medium w-full max-w-sm text-center ${
            tipoMensagem === "erro"
              ? "bg-red-100 text-red-700 border border-red-300"
              : "bg-green-100 text-green-700 border border-green-300"
          }`}
        >
          {mensagem}
        </div>
      )}

      <div className="flex flex-col items-start">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Excluir Conta</h2>

      <button
        onClick={() => setMostrarModal(true)}
        className="flex items-center gap-1 bg-red-600 text-white px-5 py-2 mb-4 rounded-xl hover:bg-red-700 transition"
      >
        <FontAwesomeIcon icon={faTrash} />
        Excluir Conta
      </button>
      </div>

      {mostrarModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-[90%] max-w-[400px] relative">
            <button
              onClick={() => setMostrarModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-3">
              Excluir Conta
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Tem certeza que deseja excluir sua conta? <br />
              Essa ação não pode ser desfeita.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setMostrarModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
              >
                Cancelar
              </button>
              <button
                onClick={excluirConta}
                disabled={carregando}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                {carregando ? "Excluindo..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
    )
}

export default DangerZone