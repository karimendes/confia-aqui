package br.com.faqservice.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.commonlib.dto.FaqDTO;
import br.com.faqservice.service.FaqService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin/faq")
public class AdminFaqController {

    @Autowired
    private FaqService faqService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> listar() {
        List<FaqDTO> all = faqService.listarTodos();
        return ResponseEntity.ok(all);
    }

@GetMapping("/{id}")
@PreAuthorize("hasRole('ADMIN')")
public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
    FaqDTO dto = faqService.findById(id);
    if (dto == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                             .body(Map.of("message", "Pergunta não encontrada"));
    }
    return ResponseEntity.ok(dto);
}


    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> criar(@Valid @RequestBody FaqDTO dto) {
        try {
            FaqDTO created = faqService.criarFaq(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", ex.getMessage()));
        }
    }

@PutMapping("/{id}")
@PreAuthorize("hasRole('ADMIN')")
public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody FaqDTO dto) {
    try {
        FaqDTO updated = faqService.atualizarFaq(id, dto);
        return ResponseEntity.ok(updated);
    } catch (IllegalArgumentException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                             .body(Map.of("message", ex.getMessage()));
    }
}


@DeleteMapping("/{id}")
@PreAuthorize("hasRole('ADMIN')")
public ResponseEntity<?> deletar(@PathVariable Long id) {
    try {
        faqService.deletarFaq(id);
        return ResponseEntity.ok(Map.of("message", "Pergunta removida com sucesso"));
    } catch (IllegalArgumentException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", ex.getMessage()));
    }
}

}
