package com.exam.repository.admin;

import com.exam.entity.admin.CategoriesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<CategoriesEntity,Integer> {
    Optional<CategoriesEntity> findByName(String name);
}
