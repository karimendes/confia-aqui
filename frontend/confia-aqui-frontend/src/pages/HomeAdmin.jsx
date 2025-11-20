import { useState, useEffect } from "react"
import Header from "../components/Header"
import MessageBox from "../components/MessageBox"
import { useGerenciarFaq } from "../hooks/gerenciarFaq"

function HomeAdmin() {
    const { faqs, loading, error, fetchFaqs, addFaq, editFaq, removeFaq } = useGerenciarFaq()
    const [showModal, setShowModal] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [formData, setFormData] = useState({ pergunta: "", resposta: "" })
    const [formError, setFormError] = useState("")
    const [mensagem, setMensagem] = useState("")
    const [tipoMensagem, setTipoMensagem] = useState("")

    useEffect(() => {
    fetchFaqs()
}, [])

    const handleOpenModal = (faq = null) => {
        if (faq) {
            setEditingId(faq.id)
            setFormData({ pergunta: faq.pergunta, resposta: faq.resposta })
        } else {
            setEditingId(null)
            setFormData({ pergunta: "", resposta: "" })
        }
        setFormError("")
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setEditingId(null)
        setFormData({ pergunta: "", resposta: "" })
        setFormError("")
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError("")

        if (!formData.pergunta.trim() || !formData.resposta.trim()) {
            setFormError("Pergunta e resposta são obrigatórias")
            return
        }

        try {
            if (editingId) {
                await editFaq(editingId, formData.pergunta, formData.resposta)
                setMensagem("FAQ atualizada com sucesso!")
                setTipoMensagem("sucesso")
            } else {
                await addFaq(formData.pergunta, formData.resposta)
                setMensagem("FAQ criada com sucesso!")
                setTipoMensagem("sucesso")
            }
            handleCloseModal()
        } catch (err) {
            setFormError(err.message || "Erro ao salvar FAQ.")
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

              {mensagem && (
          <MessageBox type={tipoMensagem} mensagem={mensagem} />
    )}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-cinza-600">Gerenciar FAQs</h1>
                    <button
                        onClick={() => handleOpenModal()}
                        className="bg-azul text-white px-6 py-2 rounded-lg hover:bg-azul/90 transition font-semibold"
                    >
                        + Nova FAQ
                    </button>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
                        {error}
                    </div>
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

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6">
                        <h2 className="text-2xl font-bold text-cinza-600 mb-4">
                            {editingId ? "Editar FAQ" : "Nova FAQ"}
                        </h2>

                        {formError && (
                            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                                {formError}
                            </div>
                        )}

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
                                    disabled={loading}
                                    className="px-6 py-2 bg-azul text-white rounded-lg hover:bg-azul/90 transition font-semibold disabled:opacity-50"
                                >
                                    {loading ? "Salvando..." : editingId ? "Atualizar" : "Criar"}
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