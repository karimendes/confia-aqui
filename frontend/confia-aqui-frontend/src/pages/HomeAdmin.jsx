import { useState, useEffect } from "react"
import Header from "../components/ui/Header"
import MessageBox from "../components/ui/MessageBox"
import { useGerenciarFaq } from "../hooks/gerenciarFaq"

function HomeAdmin() {
    const { faqs, loading, error, fetchFaqs, addFaq, editFaq, removeFaq } = useGerenciarFaq()

    const [showModal, setShowModal] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [formData, setFormData] = useState({ pergunta: "", resposta: "" })

    const [mensagem, setMensagem] = useState("")
    const [tipoMensagem, setTipoMensagem] = useState("")

    useEffect(() => {
    const carregar = async () => {
        try {
            await fetchFaqs()
        } catch (err) {
            setMensagem("Erro ao conectar com o servidor. Tente novamente.")
            setTipoMensagem("erro")
        }
    }

    carregar()
}, [])

    const handleOpenModal = (faq = null) => {
        if (faq) {
            setEditingId(faq.id)
            setFormData({ pergunta: faq.pergunta, resposta: faq.resposta })
        } else {
            setEditingId(null)
            setFormData({ pergunta: "", resposta: "" })
        }

        setMensagem("")
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setEditingId(null)
        setFormData({ pergunta: "", resposta: "" })
        setMensagem("")
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
    e.preventDefault()
    setMensagem("")

    const pergunta = formData.pergunta.trim()
    const resposta = formData.resposta.trim()

    if (!pergunta || !resposta) {
        setMensagem("Pergunta e resposta são obrigatórias.");
        setTipoMensagem("erro");
        return;
    }

    const existePergunta = faqs.some(
        (faq) =>
            faq.pergunta.toLowerCase() === pergunta.toLowerCase() &&
            faq.id !== editingId 
    )

    if (existePergunta) {
        setMensagem("Já existe uma FAQ com essa pergunta.")
        setTipoMensagem("erro")
        return
    }

    if (!editingId && faqs.length >= 6) {
        setMensagem("Você só pode criar no máximo 6 FAQs.")
        setTipoMensagem("erro")
        return
    }

    try {
        if (editingId) {
            await editFaq(editingId, pergunta, resposta)
            setMensagem("FAQ atualizada com sucesso!")
            setTipoMensagem("sucesso")
        } else {
            await addFaq(pergunta, resposta);
            setMensagem("FAQ criada com sucesso!")
            setTipoMensagem("sucesso")
        }

        handleCloseModal();

    } catch (err) {
        setMensagem("Erro ao salvar FAQ.")
        setTipoMensagem("erro")
    }
}

    const handleDelete = async (id) => {
        try {
            await removeFaq(id)
            setMensagem("FAQ deletada com sucesso!")
            setTipoMensagem("sucesso")
        } catch (err) {
            setMensagem("Erro ao deletar FAQ.")
            setTipoMensagem("erro")
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />

            <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 pt-16">

                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-cinza-600">Gerenciar FAQs</h1>

                    <button
                        onClick={() => handleOpenModal()}
                        className="bg-azul text-white px-6 py-2 rounded-lg hover:bg-azul/90 transition font-semibold"
                    >
                        + Nova FAQ
                    </button>
                </div>

                {mensagem && !showModal && (
                    <MessageBox type={tipoMensagem} mensagem={mensagem} />
                )}

                {loading && (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-azul"></div>
                    </div>
                )}

                {!loading && faqs.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-cinza-500 text-lg">Nenhuma FAQ cadastrada</p>
                    </div>
                )}

                {!loading && faqs.length > 0 && (
                    <div className="grid gap-4">
                        {faqs.map((faq) => (
                            <div
                                key={faq.id}
                                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
                            >
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-azul mb-2">{faq.pergunta}</h3>
                                        <p className="text-cinza-500">{faq.resposta}</p>
                                    </div>

                                    <div className="flex gap-2 flex-shrink-0">
                                        <button
                                            onClick={() => handleOpenModal(faq)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm font-semibold"
                                        >
                                            Editar
                                        </button>

                                        <button
                                            onClick={() => handleDelete(faq.id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm font-semibold"
                                        >
                                            Deletar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6">

                        {mensagem && (
                            <div className="mb-4">
                                <MessageBox type={tipoMensagem} mensagem={mensagem} />
                            </div>
                        )}

                        <h2 className="text-2xl font-bold text-cinza-600 mb-4">
                            {editingId ? "Editar FAQ" : "Nova FAQ"}
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-cinza-600 font-semibold mb-2">
                                    Pergunta *
                                </label>
                                <input
                                    type="text"
                                    name="pergunta"
                                    value={formData.pergunta}
                                    onChange={handleInputChange}
                                    placeholder="Digite a pergunta"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-azul focus:ring-2 focus:ring-azul/20"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-cinza-600 font-semibold mb-2">
                                    Resposta *
                                </label>
                                <textarea
                                    name="resposta"
                                    value={formData.resposta}
                                    onChange={handleInputChange}
                                    placeholder="Digite a resposta"
                                    rows="6"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-azul focus:ring-2 focus:ring-azul/20 resize-none"
                                />
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold text-cinza-600"
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-azul text-white rounded-lg hover:bg-azul/90 transition font-semibold"
                                >
                                    {editingId ? "Atualizar" : "Criar"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default HomeAdmin