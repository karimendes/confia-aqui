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
    const [mensagem, setMensagem] = useState("")
    const [tipoMensagem, setTipoMensagem] = useState("")
    const [erros, setErros] = useState({
    nome: false,
    email: false,
    senha: false,
})

    async function fazerCadastro(e) {
        e.preventDefault()

        let novosErros = { nome: false, email: false, senha: false }

        if(!nome) novosErros.nome = true
        if (!email) novosErros.email = true
        if (!senha) novosErros.senha = true

        setErros(novosErros)

        if(!nome || !email || !senha) {
            setMensagem("Campo vazio. Preencha todos os campos.")
            setTipoMensagem("erro")
            return
        }

        setMensagem("Cadastro realizado com sucesso!")
        setTipoMensagem("sucesso")

        setTimeout(() => {
            navigate("/login")
        }, 3000);
    }

    return (
         <div className="flex flex-col md:flex-row min-h-screen w-screen">
  <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-8 sm:p-12 md:p-16">
    <div className="w-full max-w-md">
      <h1 className="text-2xl mb-4 text-cinza-600 font-bold text-center">Cadastro</h1>

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

      <form onSubmit={fazerCadastro} className="flex flex-col gap-3 w-full">
        <label className="text-sm text-cinza-600">Nome:</label>
        <Input
          type="text"
          placeholder="Digite o seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          icon={faUser}
          isErro={erros.nome}
        />

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

        <BotaoForm text="Cadastrar-se" onClick={fazerCadastro} />

        <div className="flex justify-between text-sm mt-1">
          <LinkTexto to={"/login"} text="Já possui uma conta?" />
        </div>
      </form>
    </div>
  </div>

  <div className="w-full md:w-1/2 bg-azul flex justify-center items-center">
    <img
      src={imagemLayoutForm}
      alt="Ilustração de um homem com lupa analisando um computador"
      className="w-60 sm:w-72 md:w-80 lg:w-96 object-contain"
    />
  </div>
</div>
    )
}

export default Cadastro