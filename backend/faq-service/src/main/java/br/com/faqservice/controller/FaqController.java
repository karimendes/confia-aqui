package br.com.faqservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.commonlib.dto.FaqDTO;
import br.com.faqservice.service.FaqService;

@RestController
@RequestMapping("/api/faq")
public class FaqController {

    @Autowired
    private FaqService faqService;

    @GetMapping
    public ResponseEntity<List<FaqDTO>> listaPublica() {
        List<FaqDTO> all = faqService.listarTodos();
        return ResponseEntity.ok(all);
    }
}
