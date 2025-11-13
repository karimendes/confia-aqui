import { useState, useEffect } from "react"
import { getPerfil, alterarEmail, alterarSenha } from "../services/userService"
import Input from "../components/Input"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faSave, faEnvelope, faUser, faLock } from "@fortawesome/free-solid-svg-icons"


function PerfilSection(){
    const [dados, setDados] = useState({
        nome: "",
        email: "",
      })
      const [novoEmail, setNovoEmail] = useState("")
      const [novaSenha, setNovaSenha] = useState("")
      const [editandoEmail, setEditandoEmail] = useState(false)
      const [editandoSenha, setEditandoSenha] = useState(false)
      const [mensagem, setMensagem] = useState("")
      const [tipoMensagem, setTipoMensagem] = useState("")
    
      useEffect(() => {
        const carregar = async () => {
          try {
            const resposta = await getPerfil()
            setDados({
              nome: resposta.data.nome || "",
              email: resposta.data.email || "",
            })
            setNovoEmail(resposta.data.email || "")
          } catch (error) {
            console.error("Erro ao carregar perfil:", error)
            setMensagem("Erro ao carregar informações do usuário.")
            setTipoMensagem("erro")
          } 
        }
    
        carregar()
      }, [])
    
      const salvarEmail = async () => {
        try {
          await alterarEmail(novoEmail)
          setDados((prev) => ({ ...prev, email: novoEmail }))
          setEditandoEmail(false)
          setMensagem("E-mail atualizado com sucesso!")
          setTipoMensagem("sucesso")
        } catch (error) {
          console.error("Erro ao atualizar e-mail:", error)
          setMensagem("Erro ao atualizar e-mail. Tente novamente.")
          setTipoMensagem("erro")
        }
      }
    
      const salvarSenha = async () => {
        try {
          await alterarSenha(novaSenha)
          setEditandoSenha(false)
          setNovaSenha("")
          setMensagem("Senha atualizada com sucesso!")
          setTipoMensagem("sucesso")
        } catch (error) {
          console.error("Erro ao atualizar senha:", error)
          setMensagem("Erro ao atualizar senha. Tente novamente.")
          setTipoMensagem("erro")
        }
      }
    return (
    <main className="flex justify-center items-center px-4 w-screen bg-gray-50">
      <div className="bg-white rounded-2xl shadow-xl w-screen p-10 lg:mt-10">
        <h2 className="text-2xl font-bold text-cinza-600 mb-8">Meu Perfil</h2>

        {mensagem && (
          <div
            className={`mb-6 px-4 py-3 rounded-lg text-sm text-center font-medium ${
              tipoMensagem === "erro"
                ? "bg-red-100 text-red-700 border border-red-300"
                : "bg-green-100 text-green-700 border border-green-300"
            }`}
          >
            {mensagem}
          </div>
        )}

        <div className="mb-6">
          <label className="text-base text-cinza-600 block mb-2">Nome:</label>
          <Input
            type="text"
            name="nome"
            icon={faUser}
            disabled
            placeholder={dados.nome || "Seu nome"}
          />
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="text-base text-cinza-600">E-mail:</label>
            <button
              onClick={() => (editandoEmail ? salvarEmail() : setEditandoEmail(true))}
              className="text-sm text-azul hover:opacity-80 flex items-center gap-1"
            >
              <FontAwesomeIcon icon={editandoEmail ? faSave : faEdit} />
              {editandoEmail ? "Salvar" : "Editar"}
            </button>
          </div>
          <Input
            type="email"
            name="email"
            value={editandoEmail ? novoEmail : ""}
            onChange={(e) => setNovoEmail(e.target.value)}
            icon={faEnvelope}
            disabled={!editandoEmail}
            placeholder={!editandoEmail ? dados.email : "Digite seu novo e-mail"}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-base text-cinza-600">Senha:</label>
            <button
              onClick={() => (editandoSenha ? salvarSenha() : setEditandoSenha(true))}
              className="text-sm text-azul hover:opacity-80 flex items-center gap-1"
            >
              <FontAwesomeIcon icon={editandoSenha ? faSave : faEdit} />
              {editandoSenha ? "Salvar" : "Editar"}
            </button>
          </div>
          <Input
            type="password"
            name="senha"
            value={editandoSenha ? novaSenha : ""}
            onChange={(e) => setNovaSenha(e.target.value)}
            icon={faLock}
            disabled={!editandoSenha}
            placeholder={editandoSenha ? "Digite sua nova senha" : "********"}
          />
        </div>
      </div>
    </main>
    )
}

export default PerfilSection