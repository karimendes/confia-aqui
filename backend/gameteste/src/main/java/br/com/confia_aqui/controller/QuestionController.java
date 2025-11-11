package br.com.confia_aqui.controller;


import br.com.confia_aqui.model.Question;
import br.com.confia_aqui.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("question")
public class QuestionController {

    @Autowired
    QuestionService questionService;

    //req get para todas as questions
    @GetMapping("allQuestions")
    public ResponseEntity<List<Question>> getAllQuestions(){
         return questionService.getAllQuestions();

    }

    //req get para uma categoria específica
    @GetMapping("category/{category}")
    public ResponseEntity<List<Question>> getQuestionsByCategory(@PathVariable String category){
    return questionService.getQuestionsByCategory(category);

    }
//ADICIONAR PERGUNTA. NAO ESPECIFICAMOS ID POIS ELE É GERADO AUTOMATICAMENTE
    @PostMapping("add")
    public ResponseEntity<String>addQuestion(@RequestBody Question question){
        return questionService.addQuestion(question);
    }

//56
}