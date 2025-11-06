import { useState } from "react"
import api from "../services/api.js"
import Input from "../components/Input"
import BotaoForm from "../components/BotaoForm.jsx"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"

function EsqueceuSenha(){
    const [email, setEmail] = useState("")
    const [mensagem, setMensagem] = useState("")
    const [tipoMensagem, setTipoMensagem] = useState("")
    const [erro, setErro] = useState(false)
    const [carregando, setCarregando] = useState(false)

    async function enviarEmail(e) {
        e.preventDefault()
        setMensagem("")
        setTipoMensagem("")
        setErro(false)

        if (!email) {
            setErro(true)
            setMensagem("Por favor, insira seu email.")
            setTipoMensagem("erro")
            return
        }

        try {
            setCarregando(true)
            await api.post("/auth/esqueciSenha", {email})

            setMensagem("Enviamos um link para o seu email. Verifique sua caixa de entrada.")
            setTipoMensagem("sucesso")
            setEmail("")
        } catch (error) {
            console.error(error)
            if (error.response && error.response.status === 404) {
                setMensagem("Email não encontrado.") 
            } else {
                setMensagem("Erro ao enviar o email. Tente novamente.")
            }
            setTipoMensagem("erro")
        } finally {
            setCarregando(false)
        }
    }

    return (
        <div className="flex h-screen w-screen">
    <div className="w-full p-6 flex justify-center items-center bg-white">
    <div className="w-full max-w-md">
      <h1 className="text-2xl mb-6 text-cinza-600 font-bold text-center">Esqueci minha senha</h1>

      {mensagem && (
          <div
            className={`mb-4 px-4 py-2 rounded-lg text-sm text-center font-medium transition-all duration-300 ${
              tipoMensagem === "erro"
                ? "bg-red-100 text-red-700 border border-red-300"
                : "bg-green-100 text-green-700 border border-green-300"
            }`}
          >
            {mensagem}
          </div>
        )}

      <form onSubmit={enviarEmail} className="flex flex-col gap-3 w-full">
        <label className="text-sm text-cinza-600">Email cadastrado:</label>
        <Input
          type="email"
          placeholder="Digite o seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} icon={faEnvelope} isErro={erro} required
        />

        <BotaoForm text={carregando ? "Enviando..." : "Enviar link"} disabled={carregando} />
      </form>
    </div>
    </div>
</div>
    )
}

export default EsqueceuSenha