import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Input from "../components/Input"
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons"
import BotaoForm from "../components/BotaoForm"

function RedefinirSenha() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [novaSenha, setNovaSenha] = useState("")
    const [confirmarSenha, setConfirmarSenha] = useState("")
    const [mensagem, setMensagem] = useState("")
    const [tipoMensagem, setTipoMensagem] = useState("")
    const [erros, setErros] = useState({
    email: false,
    novaSenha: false,
    confirmarSenha: false,
})

    async function mudarSenha(e) {
        e.preventDefault()

        let novosErros = { email: false, novaSenha: false, confirmarSenha: false }

        if (!email) novosErros.email = true
        if (!novaSenha) novosErros.novaSenha = true
        if(!confirmarSenha) novosErros.confirmarSenha = true

        setErros(novosErros)

        if(novaSenha !== confirmarSenha) {
            setMensagem("As senhas não são iguais. Digite novamente.")
            setTipoMensagem("erro")
            return
        }

        if(!email || !novaSenha || !confirmarSenha) {
            setMensagem("Campo vazio. Preencha todos os campos.")
            setTipoMensagem("erro")
            return
        }

        setMensagem("Senha alterada com sucesso!")
        setTipoMensagem("sucesso")

        setTimeout(() => {
            navigate("/login")
        }, 1500);
    }

    return (
        <div className="flex h-screen w-screen">
    <div className="w-full p-6 flex justify-center items-center bg-white">
    <div className="w-full max-w-md">
      <h1 className="text-2xl mb-4 text-cinza-600 font-bold text-center">Redefinir Senha</h1>

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

      <form onSubmit={mudarSenha} className="flex flex-col gap-3 w-full">
        <label className="text-sm text-cinza-600">Email:</label>
        <Input
          type="email"
          placeholder="Digite o seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)} icon={faEnvelope}
          isErro={erros.email}
        />

        <label className="text-sm text-cinza-600">Nova senha:</label>
        <Input
          type="password"
          placeholder="Digite a sua nova senha"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)} icon={faLock}
          isErro={erros.novaSenha}
        />

        <label className="text-sm text-cinza-600">Confirme a nova senha:</label>
        <Input
          type="password"
          placeholder="Digite a sua nova senha novamente"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)} icon={faLock}
          isErro={erros.confirmarSenha}
        />

        <BotaoForm text="Mudar a senha" onClick={mudarSenha} />
      </form>
    </div>
    </div>
</div>

    )
}

export default RedefinirSenha