package com.exam.serviceImpl.admin;

import com.exam.dto.admin.CategoryDto;
import com.exam.entity.admin.CategoriesEntity;
import com.exam.repository.admin.CategoryRepository;
import com.exam.service.admin.CategoryService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    CategoryRepository categoryRepository;


    @Override
    public CategoriesEntity addCategory(CategoryDto categoryDto) {
        Optional<CategoriesEntity> categoryName = categoryRepository.findByName(categoryDto.getName());
        if (categoryName.isPresent()) {
            return null;
        }
        CategoriesEntity categoriesEntity = new CategoriesEntity();
        categoriesEntity.setName(categoryDto.getName().trim().toUpperCase());
        categoriesEntity.setDescription(categoryDto.getDescription());
        return categoryRepository.save(categoriesEntity);
    }


    @Override
    public ResponseEntity<List<CategoriesEntity>> getAllCategories() {
        List<CategoriesEntity> allCategories = categoryRepository.findAll();
        if (allCategories.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok().body(allCategories);
    }


    @Override
    public ResponseEntity<CategoriesEntity> getCategoryById(int category_id) {
        Optional<CategoriesEntity> byId = categoryRepository.findById(category_id);
        return byId.map(categoriesEntity -> ResponseEntity.ok().body(categoriesEntity))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }


    @Override
    public ResponseEntity<CategoriesEntity> getCategoryByName(String name) {
        Optional<CategoriesEntity> byName = categoryRepository.findByName(name);
        return byName.map(categoriesEntity -> ResponseEntity.ok().body(categoriesEntity))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }


    @Override
    public String deleteCategoryById(int category_id) {
        Optional<CategoriesEntity> byId = categoryRepository.findById(category_id);
        if (byId.isPresent()) {
            categoryRepository.deleteById(byId.get().getCategory_id());
            return "category_Id:" + category_id + " deleted successfully";
        }
        return "category_Id:" + category_id + " NOT FOUND";
    }


    @Override
    public ResponseEntity<String> deleteCategoryByName(String name) {
        Optional<CategoriesEntity> byName = categoryRepository.findByName(name.toUpperCase());
        if (byName.isPresent()) {
            categoryRepository.delete(byName.get());
            return ResponseEntity.ok(name + " category deleted successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(name + " category NOT FOUND");
    }


}