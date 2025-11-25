import { useState } from "react"
import Input from "../components/ui/Input"
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons"
import BotaoForm from "../components/ui/BotaoForm"
import LinkTexto from "../components/ui/LinkTexto"
import imagemLogo from "../images/imagemLogo.png"
import MessageBox from "../components/ui/MessageBox"
import { useAuth } from "../components/auth/AuthContext"

function Login() {
  const { login } = useAuth()
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [mensagem, setMensagem] = useState("")
    const [tipoMensagem, setTipoMensagem] = useState("")
    const [loading, setLoading] = useState(false)
    const [erros, setErros] = useState({
    email: false,
    senha: false,
})

    async function fazerLogin(e) {
        e.preventDefault()
        if (loading) return

        let novosErros = { email: false, senha: false }

        if (!email) novosErros.email = true
        if (!senha) novosErros.senha = true

        setErros(novosErros)

        if(!email || !senha) {
            setMensagem("Campo vazio. Preencha todos os campos.")
            setTipoMensagem("erro")
            setLoading(false)
            return
        }

        setLoading(true)
       
        try {
          await login(email, senha)
          setMensagem("Login realizado com sucesso!")
          setTipoMensagem("sucesso")
        } catch (erro) {
          console.error("Erro ao fazer login:", erro)
          if (erro.response?.status === 401) {
            setMensagem("E-mail ou senha incorretos.")
          } else {
            setMensagem("Erro ao conectar com o servidor.")
          }
          setTipoMensagem("erro")
        } finally {
          setLoading(false)
        }
    }

    return (
       <div className="flex h-screen w-screen flex-col md:flex-row bg-azul">
  <div className="w-full md:w-1/2 md:h-full flex flex-col justify-center items-center p-8 sm:p-12 md:p-16 bg-white">
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-2xl mb-4 text-cinza-600 font-bold text-center">Login</h1>

      {mensagem && (
          <MessageBox type={tipoMensagem} mensagem={mensagem} />
    )}

      <form onSubmit={fazerLogin} className="flex flex-col gap-3 w-full">
        <label className="text-sm text-cinza-600">Email:</label>
        <Input
          type="email"
          placeholder="Digite o seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={faEnvelope}
          isErro={erros.email}
        />

        <label className="text-sm text-cinza-600">Senha:</label>
        <Input
          type="password"
          placeholder="Digite a sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          icon={faLock}
          isErro={erros.senha}
        />

        <BotaoForm text="Login" onClick={fazerLogin} />

        <div className="flex justify-between text-sm mt-1 gap-4">
          <LinkTexto to={"/esqueci-senha"} text="Esqueceu a senha?" />
          <LinkTexto to={"/cadastro"} text="Ainda não possui uma conta?" />
        </div>
      </form>
    </div>
  </div>

  <div className="w-full md:w-1/2 md:h-full flex items-center justify-center bg-azul p-8 md:p-0">
    <img
      src={imagemLogo}
      alt="Imagem logo do Confia Aqui"
      className="w-60 sm:w-72 md:w-80 lg:w-96 object-contain"
    />
  </div>
</div>
    )
}

export default Login