package com.exam.controller.admin;

import com.exam.dto.admin.QuestionDto;
import com.exam.entity.admin.QuestionsEntity;
import com.exam.service.admin.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/question")
@CrossOrigin(origins = {"http://localhost:4200", "https://swapnalibanagar.github.io"}) // Allow Angular frontend  , allow GitHub

public class QuestionController {
    @Autowired
    private QuestionService questionService;


    @PostMapping("{category_id}/addQuestion")
    public ResponseEntity<QuestionsEntity> addQuestion(@PathVariable int category_id, @RequestBody QuestionDto questionDto) {
        return questionService.addQuestion(category_id, questionDto);
    }

    @GetMapping("/getAllQuestions")
    public ResponseEntity<List<QuestionsEntity>> getAllQuestions() {
        return questionService.getAllQuestions();
    }

    @GetMapping("/id/{question_id}")
    public ResponseEntity<QuestionsEntity> getQuestionById(@PathVariable int question_id) {
        return questionService.getQuestionById(question_id);
    }

    // get questions by categoryName
    @GetMapping("/{name}")
    public ResponseEntity<List<QuestionsEntity>> getQuestionsByCategoryName(@PathVariable String name) {
        return questionService.getQuestionsByCategoryName(name);
    }

    @PutMapping("/update/{name}/{question_id}")
    public ResponseEntity<String> updateQuestion(@PathVariable String name,@PathVariable int question_id, @RequestBody QuestionDto questionDto)
    {
        return questionService.updateQuestion(name,question_id,questionDto);
    }


    @DeleteMapping("/delete/{question_id}")
    public ResponseEntity<String> deleteQuestion(@PathVariable int question_id)
    {
        return questionService.deleteQuestion(question_id);
    }

}
