package br.com.faqservice.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.commonlib.dto.FaqDTO;
import br.com.faqservice.entity.Faq;
import br.com.faqservice.repository.FaqRepository;

@Service
public class FaqService {

    private static final long MAX_FAQ = 6;

    @Autowired
    private FaqRepository repository;

    public List<FaqDTO> listarTodos() {
        return repository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    public FaqDTO findById(@NonNull Long id) {
        return repository.findById(id).map(this::toDto).orElse(null);
    }

    @Transactional
    public FaqDTO criarFaq(br.com.commonlib.dto.FaqDTO dto) {
        if (repository.count() >= MAX_FAQ) {
            throw new IllegalArgumentException("Limite de 6 perguntas do FAQ atingido.");
        }
        if (dto.getPergunta() == null || dto.getPergunta().isBlank()) throw new IllegalArgumentException("Pergunta é obrigatória");
        if (dto.getResposta() == null || dto.getResposta().isBlank()) throw new IllegalArgumentException("Resposta é obrigatória");
        if (repository.existsByPerguntaIgnoreCase(dto.getPergunta().trim())) {
            throw new IllegalArgumentException("FAQ já existe");
        }
        Faq f = new Faq(dto.getPergunta(), dto.getResposta());
        Faq saved = repository.save(f);
        return toDto(saved);
    }


    @Transactional
    public FaqDTO atualizarFaq(@NonNull Long id, br.com.commonlib.dto.FaqDTO dto) {
        Faq existing = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Pergunta não encontrada"));
        if (dto.getPergunta() == null || dto.getPergunta().isBlank()) throw new IllegalArgumentException("Pergunta é obrigatória");
        if (dto.getResposta() == null || dto.getResposta().isBlank()) throw new IllegalArgumentException("Resposta é obrigatória");
        if (repository.existsByPerguntaIgnoreCaseAndIdNot(dto.getPergunta().trim(), id)) {
            throw new IllegalArgumentException("FAQ já existe");
        }
        existing.setPergunta(dto.getPergunta());
        existing.setResposta(dto.getResposta());
        Faq updated = repository.save(existing);
        return toDto(updated);
    }

    @Transactional
    public void deletarFaq(@NonNull Long id) {
        if (!repository.existsById(id)) throw new IllegalArgumentException("Pergunta não encontrada");
        repository.deleteById(id);
    }

    private FaqDTO toDto(Faq f) {
        return new FaqDTO(f.getId(), f.getPergunta(), f.getResposta());
    }
}
