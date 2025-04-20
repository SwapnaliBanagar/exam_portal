package com.exam.repository.admin;

import com.exam.entity.admin.QuestionsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<QuestionsEntity,Integer> {
    List<QuestionsEntity> findByCategoryName(String name);
}
