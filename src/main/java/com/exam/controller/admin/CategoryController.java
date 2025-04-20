package com.exam.controller.admin;

import com.exam.dto.admin.CategoryDto;
import com.exam.entity.admin.CategoriesEntity;
import com.exam.service.admin.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("category")
@CrossOrigin(origins = "http://localhost:4200") // Allow Angular frontend
public class CategoryController {
    @Autowired
    CategoryService categoryService;

    // add category
    @PostMapping("/addCategory")
    public CategoriesEntity addCategory(@RequestBody CategoryDto categoryDto) {
        return categoryService.addCategory(categoryDto);
    }


    // getAll categories
    @GetMapping("/getAllCategories")
    public ResponseEntity<List<CategoriesEntity>> getAllCategories() {
        return categoryService.getAllCategories();
    }


    // get category byId
    @GetMapping("id/{category_id}")
    public ResponseEntity<CategoriesEntity> getCategoryById(@PathVariable int category_id) {
        return categoryService.getCategoryById(category_id);
    }


    // get category byName
    @GetMapping("/{name}")
    public ResponseEntity<CategoriesEntity> getCategoryByName(@PathVariable String name) {
        return categoryService.getCategoryByName(name);
    }

    // update category


    //delete category byId
    @DeleteMapping("id/{category_id}")
    public String deleteCategoryById(@PathVariable int category_id)
    {
         return categoryService.deleteCategoryById(category_id);
    }

    //delete category byName
    @DeleteMapping("/{name}")
    public ResponseEntity<String> deleteCategoryByName(@PathVariable String name)
    {
        return categoryService.deleteCategoryByName(name);
    }
}
