package br.com.confia_aqui.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.confia_aqui.model.QuestionWrapper;
import br.com.confia_aqui.model.QuizResult;
import br.com.confia_aqui.model.Response;
import br.com.confia_aqui.service.QuizService;

@RestController
@RequestMapping("quiz")
@CrossOrigin(origins = "*")
public class QuizController {

    @Autowired
    QuizService quizService;

    private static final Logger logger = LoggerFactory.getLogger(QuizController.class);

    //cria um novo quiz
    @PostMapping("create")
    public ResponseEntity<String> createQuiz(
            @RequestParam String category,
            @RequestParam int numQ,
            @RequestParam String title) {

        if (numQ <= 0) {
            return ResponseEntity.badRequest()
                    .body("O número de questões deve ser maior que zero");
        }

        if (numQ > 50) {
            return ResponseEntity.badRequest()
                    .body("O número máximo de questões é 50");
        }

        if (title == null || title.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("O título do quiz não pode ser vazio");
        }

        if (title.length() > 200) {
            return ResponseEntity.badRequest()
                    .body("O título do quiz não pode ter mais de 200 caracteres");
        }

        if (category == null || category.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body("A categoria não pode ser vazia");
        }

        return quizService.createQuiz(category.trim(), numQ, title.trim());
    }

    //getta perguntas do quiz pelo id sem as respostas
    @GetMapping("get/{id}")
    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(@PathVariable String id) {
        if (id == null || id.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        String sanitized = id.trim();
        if (sanitized.startsWith("{") && sanitized.endsWith("}")) {
            sanitized = sanitized.substring(1, sanitized.length() - 1);
        }
        Integer parsedId;
        try {
            parsedId = Integer.valueOf(sanitized);
        } catch (NumberFormatException ex) {
            return ResponseEntity.badRequest().build();
        }
        if (parsedId <= 0) return ResponseEntity.badRequest().build();
        return quizService.getQuizQuestions(parsedId);
    }

    //envia respostas do quiz e calcula resultado
    @PostMapping("submit/{id}")
    public ResponseEntity<QuizResult> submitQuiz(
            @PathVariable String id,
            @RequestBody List<Response> responses) {

        if (id == null || id.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        String sanitizedId = id.trim();
        if (sanitizedId.startsWith("{") && sanitizedId.endsWith("}")) {
            sanitizedId = sanitizedId.substring(1, sanitizedId.length() - 1);
        }
        Integer parsedId;
        try {
            parsedId = Integer.valueOf(sanitizedId);
        } catch (NumberFormatException ex) {
            return ResponseEntity.badRequest().build();
        }
        if (parsedId <= 0) return ResponseEntity.badRequest().build();

        if (responses == null || responses.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        //valida se respostas sao validas (not nullas e not vazias)
        for (Response response : responses) {
            if (response.getId() == null || response.getResponse() == null ||
                    response.getResponse().trim().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
        }

        return quizService.calculateResult(parsedId, responses);
    }

    // Verifica se a resposta para uma pergunta está correta (sem expor rightAnswer)
    @PostMapping("check/{quizId}/{questionId}")
    public ResponseEntity<Boolean> checkAnswer(
            @PathVariable String quizId,
            @PathVariable String questionId,
            @RequestBody Response response) {

        if (quizId == null || quizId.trim().isEmpty() || questionId == null || questionId.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        String sanitizedQuizId = quizId.trim();
        if (sanitizedQuizId.startsWith("{") && sanitizedQuizId.endsWith("}")) {
            sanitizedQuizId = sanitizedQuizId.substring(1, sanitizedQuizId.length() - 1);
        }
        String sanitizedQuestionId = questionId.trim();
        if (sanitizedQuestionId.startsWith("{") && sanitizedQuestionId.endsWith("}")) {
            sanitizedQuestionId = sanitizedQuestionId.substring(1, sanitizedQuestionId.length() - 1);
        }
        Integer parsedQuizId;
        Integer parsedQuestionId;
        try {
            parsedQuizId = Integer.valueOf(sanitizedQuizId);
            parsedQuestionId = Integer.valueOf(sanitizedQuestionId);
        } catch (NumberFormatException ex) {
            return ResponseEntity.badRequest().build();
        }
        if (parsedQuizId <= 0 || parsedQuestionId <= 0) return ResponseEntity.badRequest().build();

        if (response == null || response.getResponse() == null || response.getResponse().trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        logger.debug("[QuizController] checkAnswer called: quizId={}, questionId={}, response={}", parsedQuizId, parsedQuestionId, response.getResponse());
        try {
            boolean correct = quizService.checkAnswer(parsedQuizId, parsedQuestionId, response.getResponse());
            logger.debug("[QuizController] checkAnswer result: {}", correct);
            return ResponseEntity.ok(correct);
        } catch (br.com.confia_aqui.exception.QuizNotFoundException | br.com.confia_aqui.exception.QuestionNotFoundException ex) {
            logger.warn("[QuizController] checkAnswer - not found: {}", ex.getMessage());
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException ex) {
            logger.warn("[QuizController] checkAnswer - bad request: {}", ex.getMessage());
            return ResponseEntity.badRequest().build();
        } catch (Exception ex) {
            logger.error("[QuizController] checkAnswer - unexpected error: {}", ex.getMessage(), ex);
            return ResponseEntity.status(500).build();
        }
    }
}