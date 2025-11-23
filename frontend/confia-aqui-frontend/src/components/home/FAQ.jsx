import { useState, useEffect } from "react"
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useGerenciarFaq } from "../../hooks/gerenciarFaq"

function FAQ() {
    const [perguntaAtiva, setPerguntaAtiva] = useState(null)

    const { faqs, loading, error, fetchFaqs } = useGerenciarFaq()

    useEffect(() => {
        fetchFaqs()
    }, [])

    const abrirPergunta = (index) => {
        setPerguntaAtiva(perguntaAtiva === index ? null : index)
    }

    return (
        <section className="max-w-5xl mx-auto py-12 px-4 mb-4 text-left bg-white">
        <h2 className="text-lg font-bold text-cinza-600 mb-6 text-left">
            Dúvidas Frequentes (FAQ)
        </h2>

        {error && (
            <p className="text-red-600 mb-4 text-left">Erro ao carregar FAQ.</p>
        )}

        {loading && (
            <p className="text-cinza-500 text-left">Carregando...</p>
        )}

        {!loading && faqs.length === 0 && (
            <p className="text-cinza-500 text-left">Nenhuma FAQ cadastrada ainda.</p>
        )}

        <div className="grid md:grid-cols-2 gap-6">
            {!loading &&
                faqs.map((faq, index) => (
                    <div
                        key={faq.id}
                        className={`bg-white shadow-sm rounded-xl transition-all duration-300 ${
                            perguntaAtiva === index
                                ? "border border-azul shadow-md"
                                : "border border-gray-200"
                        }`}
                    >
                        <button
                            onClick={() => abrirPergunta(index)}
                            className="w-full flex justify-between items-center p-4 font-bold text-lg text-azul text-left focus:outline-none"
                        >
                            {faq.pergunta}
                            <FontAwesomeIcon
                                icon={perguntaAtiva === index ? faAngleUp : faAngleDown}
                                className="text-azul transition-transform duration-300"
                            />
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                perguntaAtiva === index
                                    ? "max-h-45 opacity-100 px-4 pb-4"
                                    : "max-h-0 opacity-0 px-4"
                            }`}
                        >
                            <p className="text-cinza-500 font-normal">{faq.resposta}</p>
                        </div>
                    </div>
                ))}
        </div>
</section>
    )
}

export default FAQ