package br.com.confia_aqui.service;

import br.com.confia_aqui.model.Question;
import br.com.confia_aqui.dao.QuestionDao;
import br.com.confia_aqui.exception.QuestionNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    @Autowired
    QuestionDao questionDao;

    // CRUD CREATE Pergunta
    public ResponseEntity<String> addQuestion(Question question) {
        try {
            questionDao.save(question);
            return new ResponseEntity<>("Pergunta adicionada com sucesso!", HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Erro ao adicionar pergunta", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // CRUD READ - ler todas as questoes
    public ResponseEntity<List<Question>> getAllQuestions() {
        try {
            return new ResponseEntity<>(questionDao.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
    }

    // CRUD READ - ler por categoria
    public ResponseEntity<List<Question>> getQuestionsByCategory(String category) {
        try {
            return new ResponseEntity<>(questionDao.findByCategory(category), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
    }

    // CRUD READ - buscacr peergunta pelo id 
    public ResponseEntity<Question> getQuestionById(Integer id) {
        try {
            Optional<Question> question = questionDao.findById(id);

            if (question.isEmpty()) {
                throw new QuestionNotFoundException("Pergunta não encontrada com ID: " + id);
            }

            return new ResponseEntity<>(question.get(), HttpStatus.OK);
        } catch (QuestionNotFoundException e) {
            throw e; // Deixa o GlobalExceptionHandler tratar
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // CRUD UPDATE - Editar a pergunta
    public ResponseEntity<String> updateQuestion(Integer id, Question updatedQuestion) {
        try {
            Optional<Question> existingQuestion = questionDao.findById(id);

            
            if (existingQuestion.isEmpty()) {
                throw new QuestionNotFoundException("Pergunta não encontrada com ID: " + id);
            }

            // atualiza/reescreve os campos
            Question question = existingQuestion.get();
            question.setQuestionTitle(updatedQuestion.getQuestionTitle());
            question.setOption1(updatedQuestion.getOption1());
            question.setOption2(updatedQuestion.getOption2());
            question.setOption3(updatedQuestion.getOption3());
            question.setOption4(updatedQuestion.getOption4());
            question.setRightAnswer(updatedQuestion.getRightAnswer());
            question.setDifficultyLevel(updatedQuestion.getDifficultyLevel());
            question.setCategory(updatedQuestion.getCategory());

            // save
            questionDao.save(question);

            return new ResponseEntity<>("Pergunta atualizada com sucesso!", HttpStatus.OK);

        } catch (QuestionNotFoundException e) {
            throw e; // Deixa o GlobalExceptionHandler tratar
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Erro ao atualizar pergunta", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // CRUD DELETE - deletar pergunta
    public ResponseEntity<String> deleteQuestion(Integer id) {
        try {
            Optional<Question> question = questionDao.findById(id);

            if (question.isEmpty()) {
                throw new QuestionNotFoundException("Pergunta não encontrada com ID: " + id);
            }

            // deleta
            questionDao.deleteById(id);

            return new ResponseEntity<>("Pergunta deletada com sucesso!", HttpStatus.OK);

        } catch (QuestionNotFoundException e) {
            throw e; // Deixa o GlobalExceptionHandler tratar
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Erro ao deletar pergunta", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
