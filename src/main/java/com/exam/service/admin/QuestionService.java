package com.exam.service.admin;

import com.exam.dto.admin.QuestionDto;
import com.exam.entity.admin.QuestionsEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;


import java.util.List;

@Service
public interface QuestionService {

    public ResponseEntity<QuestionsEntity> addQuestion(int category_id, QuestionDto questionDto);

    public ResponseEntity<List<QuestionsEntity>> getAllQuestions();

    public ResponseEntity<QuestionsEntity> getQuestionById(int question_id);

    public ResponseEntity<List<QuestionsEntity>> getQuestionsByCategoryName(String name);
    public ResponseEntity<String> updateQuestion(String name,int question_id, QuestionDto questionDto);
    public ResponseEntity<String> deleteQuestion( int question_id);

}
