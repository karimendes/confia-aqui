import apiFaq from "./apiFaq";

export const getAllFaqs = async () => {
  try {
    const response = await apiFaq.get("/admin/faq");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar FAQs:", error);
    throw error;
  }
};

export const createFaq = async (faqData) => {
  try {
    const response = await apiFaq.post("/admin/faq", faqData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar FAQ:", error);
    throw error;
  }
};

export const updateFaq = async (id, faqData) => {
  try {
    const response = await apiFaq.put(`/admin/faq/${id}`, faqData);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar FAQ:", error);
    throw error;
  }
};

export const deleteFaq = async (id) => {
  try {
    const response = await apiFaq.delete(`/admin/faq/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar FAQ:", error);
    throw error;
  }
};