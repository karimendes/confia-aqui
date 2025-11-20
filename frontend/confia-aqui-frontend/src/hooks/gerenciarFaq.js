import { useState, useCallback } from "react"
import { getAllFaqs, createFaq, updateFaq, deleteFaq } from "../services/faqService"

export function useGerenciarFaq() {
    const [faqs, setFaqs] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchFaqs = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await getAllFaqs()
            setFaqs(data)
        } catch (err) {
            setError(err.message || "Erro ao carregar FAQs")
            console.error("Erro ao buscar FAQs:", err)
        } finally {
            setLoading(false)
        }
    }, [])

    const addFaq = useCallback(async (pergunta, resposta) => {
        setLoading(true)
        setError(null)
        try {
            const newFaq = await createFaq({ pergunta, resposta })
            setFaqs((prevFaqs) => [...prevFaqs, newFaq])
            return newFaq
        } catch (err) {
            setError(err.message || "Erro ao criar FAQ")
            console.error("Erro ao criar FAQ:", err)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const editFaq = useCallback(async (id, pergunta, resposta) => {
        setLoading(true)
        setError(null)
        try {
            const updatedFaq = await updateFaq(id, { pergunta, resposta })
            setFaqs((prevFaqs) =>
                prevFaqs.map((faq) => (faq.id === id ? updatedFaq : faq))
            )
            return updatedFaq
        } catch (err) {
            setError(err.message || "Erro ao atualizar FAQ")
            console.error("Erro ao atualizar FAQ:", err)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    const removeFaq = useCallback(async (id) => {
        setLoading(true)
        setError(null)
        try {
            await deleteFaq(id)
            setFaqs((prevFaqs) => prevFaqs.filter((faq) => faq.id !== id))
        } catch (err) {
            setError(err.message || "Erro ao deletar FAQ")
            console.error("Erro ao deletar FAQ:", err)
            throw err
        } finally {
            setLoading(false)
        }
    }, [])

    return {
        faqs,
        loading,
        error,
        fetchFaqs,
        addFaq,
        editFaq,
        removeFaq,
    }
}