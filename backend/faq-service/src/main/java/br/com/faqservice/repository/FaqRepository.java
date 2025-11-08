package br.com.faqservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.faqservice.entity.Faq;

public interface FaqRepository extends JpaRepository<Faq, Long> {
	boolean existsByPerguntaIgnoreCase(String pergunta);
	boolean existsByPerguntaIgnoreCaseAndIdNot(String pergunta, Long id);
}
