import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Input from "../components/Input"
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons"
import BotaoForm from "../components/BotaoForm"
import LinkTexto from "../components/LinkTexto"
import imagemLayoutForm from "../images/imagemLayoutForm.png"

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    async function fazerLogin(e) {
        e.preventDefault()
        navigate("/home")
    }

    return (
        <div className="flex h-screen w-screen">
    <div className="w-1/2 flex flex-col justify-center items-center p-20 bg-white">
    <div className="w-full max-w-md">
      <h1 className="text-2xl mb-4 text-cinza-600 font-bold text-center">Login</h1>

      <form onSubmit={fazerLogin} className="flex flex-col gap-3 w-full">
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

        <BotaoForm text="Login" onClick={fazerLogin} />

        <div className="flex justify-between text-sm mt-1 gap-4">
          <LinkTexto to={"/redefinirSenha"} text="Esqueceu a senha?" />
          <LinkTexto to={"/cadastro"} text="Ainda não possui uma conta?" />
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

export default Login