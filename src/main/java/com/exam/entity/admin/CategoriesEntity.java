package com.exam.entity.admin;

import jakarta.persistence.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "Exam_Categories")
public class CategoriesEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int category_id;

    @Column(unique = true, nullable = false)
    private String name;
    private String description;

    @OneToMany(mappedBy = "category",cascade = CascadeType.ALL)
    private Set<QuestionsEntity> manyQuestions=new LinkedHashSet<>();

    public CategoriesEntity() {
    }

    public CategoriesEntity(int category_id, String name, String description) {
        this.category_id = category_id;
        this.name = name;
        this.description = description;
    }

    public int getCategory_id() {
        return category_id;
    }

    public void setCategory_id(int category_id) {
        this.category_id = category_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


}
