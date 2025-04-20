package com.exam.service.admin;

import com.exam.dto.admin.CategoryDto;
import com.exam.entity.admin.CategoriesEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Map;

@Service
public interface CategoryService {
    public CategoriesEntity addCategory(CategoryDto categoryDto);
    public ResponseEntity<List<CategoriesEntity>> getAllCategories();
    public ResponseEntity<CategoriesEntity> getCategoryById(int category_id);
    public ResponseEntity<CategoriesEntity>getCategoryByName( String name);
    public String deleteCategoryById( int category_id);
    public ResponseEntity<String> deleteCategoryByName( String name);
}
