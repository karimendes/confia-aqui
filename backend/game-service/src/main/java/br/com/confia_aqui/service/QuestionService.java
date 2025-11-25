package br.com.confia_aqui.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.confia_aqui.dao.QuestionDao;
import br.com.confia_aqui.model.Question;
import br.com.confia_aqui.model.QuestionWrapper;

@Service
public class QuestionService {

    @Autowired
    QuestionDao questionDao;

    private static final Logger logger = LoggerFactory.getLogger(QuestionService.class);

    // CRUD removido. apenas leitura, busca todas as perguntas
    public ResponseEntity<List<QuestionWrapper>> getAllQuestions() {
        try {
            List<Question> questions = questionDao.findAll();
            List<QuestionWrapper> wrappers = new ArrayList<>();
            for (Question q : questions) {
                wrappers.add(new QuestionWrapper(q.getId(), q.getQuestionTitle(), q.getOption1(), q.getOption2(), q.getOption3(), q.getOption4()));
            }
            return new ResponseEntity<>(wrappers, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("[QuestionService] getAllQuestions error: {}", e.getMessage(), e);
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // CRUD removido. apenas leitura, busca as perguntas por categoria
    public ResponseEntity<List<QuestionWrapper>> getQuestionsByCategory(String category) {
        try {
            List<Question> questions = questionDao.findByCategory(category);
            if (questions.isEmpty()) {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.NOT_FOUND);
            }
            List<QuestionWrapper> wrappers = new ArrayList<>();
            for (Question q : questions) {
                wrappers.add(new QuestionWrapper(q.getId(), q.getQuestionTitle(), q.getOption1(), q.getOption2(), q.getOption3(), q.getOption4()));
            }
            return new ResponseEntity<>(wrappers, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("[QuestionService] getQuestionsByCategory error: {}", e.getMessage(), e);
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // CRUD removido. apenas leitura, lista as categorias
    public ResponseEntity<List<String>> getAllCategories() {
        try {
            List<Question> allQuestions = questionDao.findAll();
            List<String> categories = allQuestions.stream()
                    .map(Question::getCategory)
                    .distinct()
                    .sorted()
                    .collect(Collectors.toList());
            return new ResponseEntity<>(categories, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("[QuestionService] getAllCategories error: {}", e.getMessage(), e);
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}