import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Input from "../components/Input"
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons"
import BotaoForm from "../components/BotaoForm"
import LinkTexto from "../components/LinkTexto"
import imagemLayoutForm from "../images/imagemLayoutForm.png"

function Cadastro() {
    const navigate = useNavigate()
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    async function fazerCadastro(e) {
        e.preventDefault()
        navigate("/login")
    }

    return (
         <div className="flex h-screen w-screen">
    <div className="w-1/2 flex flex-col justify-center items-center p-20 bg-white">
    <div className="w-full max-w-md">
      <h1 className="text-2xl mb-4 text-cinza-600 font-bold text-center">Cadastro</h1>

      <form onSubmit={fazerCadastro} className="flex flex-col gap-3 w-full">
        <label className="text-sm text-cinza-600">Nome:</label>
        <Input
          type="text"
          placeholder="Digite o seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)} icon={faUser}
        />

        <label className="text-sm text-cinza-600">Email:</label>
        <Input
          type="email"
          placeholder="Digite o seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)} icon={faEnvelope}
        />

        <label className="text-sm text-cinza-600">Senha:</label>
        <Input
          type="password"
          placeholder="Digite a sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)} icon={faLock}
        />

        <BotaoForm text="Cadastrar-se" onClick={fazerCadastro} />

        <div className="flex justify-between text-sm mt-1">
          <LinkTexto to={"/login"} text="Já possui uma conta?" />
        </div>
      </form>
    </div>
    </div>

    <div className="w-1/2 bg-azul flex items-center justify-center">
      <img
        src={imagemLayoutForm}
        alt="Ilustração de um homem com lupa analisando um computador"
        className="w-80 object-center"
      />
    </div>
</div>
    )
}

export default Cadastro