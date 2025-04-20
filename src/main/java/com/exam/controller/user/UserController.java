package com.exam.controller.user;

import com.exam.dto.admin.QuestionDto;
import com.exam.entity.admin.QuestionsEntity;
import com.exam.service.UserService;
import com.exam.service.admin.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/exam/user")
@CrossOrigin(origins = "http://localhost:4200") // Allow Angular frontend
public class UserController {
    @Autowired
    QuestionService questionService;

    // getAllQuestions  OR quiz
    @GetMapping("getAllQuestions")
    public ResponseEntity<List<QuestionsEntity>> getAllQuestions()
    {
        return questionService.getAllQuestions();
    }



    // Get Questions By Category
    @GetMapping("{name}")
    public ResponseEntity<List<QuestionsEntity>>getQuestionsByCategory(@PathVariable String name)
    {
        return questionService.getQuestionsByCategoryName(name);
    }
}
