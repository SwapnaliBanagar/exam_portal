import { Component, OnInit } from '@angular/core';
import { CategoriesDto } from '../../../Dto/categories-dto';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  categoriesDto: CategoriesDto[] = [];

  showAddCategoryForm = false; // Controls form visibility                 //use for toggleAddCategoryForm
  showDeleteCategoryForm = false;

  // Holds user input using ng model in addNewCategory form
  name = '';
  description = '';

  // delete category form selected category value
  selectedDeletedCategory: string | null = null;


  ngOnInit(): void { }

  constructor(private categoryService: CategoryService) {
    this.getAllCategories(); // ✅ Fetch categories when the component initializes
  }


  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(
      (data: CategoriesDto[]) => {
        this.categoriesDto = data;
        console.log('Categories:', this.categoriesDto);
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

//------------------------------------------------------------- add new category ----------------------------------------------------------

  toggleAddCategory() {
    this.showAddCategoryForm = !this.showAddCategoryForm;
    this.showDeleteCategoryForm = false;
  }

  addCategory() {
    if (!this.name.trim()) {
      console.error('Category name cannot be empty');
      return;
    }

    const newCategory: CategoriesDto = {
      name: this.name,
      description: this.description,
      category_id: 0
    };


    this.categoryService.addCategory(newCategory).subscribe(
      (data: CategoriesDto) => {

        if (!data || !data.category_id) {  // Check if category was not created
          Swal.fire("", "Category already exists", "warning");
          console.log("This category already exists");
          return;
        }

        this.categoriesDto.push(data); // add OR Append new category
        this.name = ''; // Clear input field
        this.description = '';
        this.showAddCategoryForm = false; // Hide form after submission
        Swal.fire("Success", data.name +" category added successfully","success");
      },
      (error) => {
        if (error.status === 400 || error.status === null) {
          Swal.fire("", "category already exist", "warning")
          console.log("This category already exist");
        }
        console.error('Error adding category', error);
      }
    );
  } 


  addCategoryBackButton() {
    console.log("add new category form back button worked ")
    this.showAddCategoryForm = !this.showAddCategoryForm;
    this.name = ''; // Clear input field
    this.description = '';
  }


//------------------------------------------------------------  delete Category --------------------------------------------------------

  toggleDeleteCategoryForm() {
    this.showDeleteCategoryForm = !this.showDeleteCategoryForm;
    this.showAddCategoryForm = false;
  }

  // delete category button 
  deleteCategory() {

    if (!this.selectedDeletedCategory) {
      console.error("No category selected");
      return;
    }
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete '+this.selectedDeletedCategory  +' category!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategoryByCategoryName(this.selectedDeletedCategory as string).subscribe(
          (response: String) => {
            console.log(response);
            this.getAllCategories();

            Swal.fire("Success", response + "",);
            this.selectedDeletedCategory = null;
            this.showDeleteCategoryForm = false;
          },
          (error) => {
            Swal.fire('Error', 'Category not found.', 'error');
            console.log("error in delete category", error);
          }
        );
              }
      this.selectedDeletedCategory = null;     // result is cancel then clear selectedcategoryName
    });
  }


}
