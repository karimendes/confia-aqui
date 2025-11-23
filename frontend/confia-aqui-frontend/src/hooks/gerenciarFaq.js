import { useState, useCallback } from "react"
import { getAllFaqs, createFaq, updateFaq, deleteFaq } from "../services/faq/faqService"

export function useGerenciarFaq() {
    const [faqs, setFaqs] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchFaqs = useCallback(async () => {
        setLoading(true)
        try {
            const data = await getAllFaqs()
            setFaqs(data)
        } catch (err) {
            console.error("Erro ao buscar FAQs:", err)
            throw err  
        } finally {
            setLoading(false)
        }
    }, [])

    const addFaq = useCallback(async (pergunta, resposta) => {
        setLoading(true)
        try {
            const newFaq = await createFaq({ pergunta, resposta })
            setFaqs((prevFaqs) => [...prevFaqs, newFaq])
            return newFaq
        } catch (err) {
            console.error("Erro ao criar FAQ:", err)
            throw err  
        } finally {
            setLoading(false)
        }
    }, [])

    const editFaq = useCallback(async (id, pergunta, resposta) => {
        setLoading(true)
        try {
            const updatedFaq = await updateFaq(id, { pergunta, resposta })
            setFaqs((prevFaqs) =>
                prevFaqs.map((faq) => (faq.id === id ? updatedFaq : faq))
            )
            return updatedFaq
        } catch (err) {
            console.error("Erro ao atualizar FAQ:", err)
            throw err   
        } finally {
            setLoading(false)
        }
    }, [])

    const removeFaq = useCallback(async (id) => {
        setLoading(true)
        try {
            await deleteFaq(id)
            setFaqs((prevFaqs) => prevFaqs.filter((faq) => faq.id !== id))
        } catch (err) {
            console.error("Erro ao deletar FAQ:", err)
            throw err  
        } finally {
            setLoading(false)
        }
    }, [])

    return {
        faqs,
        loading,
        fetchFaqs,
        addFaq,
        editFaq,
        removeFaq,
    }
}