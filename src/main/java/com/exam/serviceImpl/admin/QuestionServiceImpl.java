package com.exam.serviceImpl.admin;

import com.exam.dto.admin.QuestionDto;
import com.exam.entity.admin.CategoriesEntity;
import com.exam.entity.admin.QuestionsEntity;
import com.exam.repository.admin.CategoryRepository;
import com.exam.repository.admin.QuestionRepository;
import com.exam.service.admin.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionServiceImpl implements QuestionService {
    @Autowired
    QuestionRepository questionRepository;
    @Autowired
    CategoryRepository categoryRepository;

    @Override
    public ResponseEntity<QuestionsEntity> addQuestion(int category_id, QuestionDto questionDto) {

        Optional<CategoriesEntity> categoryFindById = categoryRepository.findById(category_id);
        if (categoryFindById.isPresent()) {
            QuestionsEntity questionsEntity = new QuestionsEntity();
            questionsEntity.setQuestion(questionDto.getQuestion());
            questionsEntity.setImage(questionDto.getImage());
            questionsEntity.setOption1(questionDto.getOption1());
            questionsEntity.setOption2(questionDto.getOption2());
            questionsEntity.setOption3(questionDto.getOption3());
            questionsEntity.setOption4(questionDto.getOption4());
            questionsEntity.setAnswer(questionDto.getAnswer());
            questionsEntity.setCategory(categoryFindById.get());

            QuestionsEntity questionSaved = questionRepository.save(questionsEntity);
            return ResponseEntity.status(HttpStatus.CREATED).body(questionSaved);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new QuestionsEntity());
    }

    @Override
    public ResponseEntity<List<QuestionsEntity>> getAllQuestions() {
        List<QuestionsEntity> allQuestions = questionRepository.findAll();
        if (allQuestions.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok().body(allQuestions);
    }


    @Override
    public ResponseEntity<QuestionsEntity> getQuestionById(int question_id) {
        Optional<QuestionsEntity> byId = questionRepository.findById(question_id);
        return byId.map(questionsEntity -> ResponseEntity.ok().body(questionsEntity))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @Override
    public ResponseEntity<List<QuestionsEntity>> getQuestionsByCategoryName(String name) {
        List<QuestionsEntity> byCategoryName = questionRepository.findByCategoryName(name.toUpperCase());
        if (byCategoryName.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(byCategoryName);
    }


    @Override
    public ResponseEntity<String> updateQuestion(String name, int question_id, QuestionDto questionDto) {
        Optional<CategoriesEntity> categoryName = categoryRepository.findByName(name);
        Optional<QuestionsEntity> byId = questionRepository.findById(question_id);
        if (byId.isEmpty()) {
            return  ResponseEntity.status(HttpStatus.NOT_FOUND).body("question_id:" + question_id + " question is Not Found");
                   } else if (categoryName.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(categoryName + " category is Not Found");
        }

        QuestionsEntity update = new QuestionsEntity();
        update.setQ_Id(question_id);
        update.setQuestion(questionDto.getQuestion());
        update.setImage(questionDto.getImage());
        update.setOption1(questionDto.getOption1());
        update.setOption2(questionDto.getOption2());
        update.setOption3(questionDto.getOption3());
        update.setOption4(questionDto.getOption4());
        update.setAnswer(questionDto.getAnswer());
        update.setCategory(categoryName.get());
        questionRepository.save(update);
        return  ResponseEntity.ok("question_id:" + question_id + " question is updated successfully");
    }


    @Override
    public ResponseEntity<String> deleteQuestion(int question_id) {
        Optional<QuestionsEntity> byId = questionRepository.findById(question_id);
        if (byId.isPresent()) {
            questionRepository.deleteById(question_id);

            return ResponseEntity.ok("question_id:" + question_id + " question is deleted successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("question_id:" + question_id + " question is Not Found");
    }
}
