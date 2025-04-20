import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../../services/question.service';
import { CategoryService } from '../../../../services/category.service';
import { QuestionDto } from '../../../../Dto/question-dto';
import { CategoriesDto } from '../../../../Dto/categories-dto';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  standalone: false,
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent implements OnInit {


  categoriesDto: CategoriesDto[] = [];
  selectedCategoryId: number | null = null;
  questionDto: QuestionDto = {
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    category: {
      category_id: 0,
      name: '',
      description: ''
    } // Ensure category ID is included
    ,
    q_Id: 0
  };


  showForm: boolean = false;  // hide/show form



  constructor(private questionService: QuestionService, private categoryService: CategoryService, private router: Router) { }


  ngOnInit(): void {
    this.getAllCategories();
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



  onCategoryChange() {
    if (this.selectedCategoryId !== null) {
      this.showForm = true;  // 👈 Show the form when a category is selected
      const selectedCategory = this.categoriesDto.find(
        (category) => category.category_id === this.selectedCategoryId
      );

      if (selectedCategory) {
        this.questionDto.category = selectedCategory; // ✅ Assign full category object
      }
    }
  }




  addQuestion() {
    if (!this.selectedCategoryId) {
      alert('Please select a category before adding a question!');
      return;
    }

    if (!this.questionDto.question ||
      !this.questionDto.option1 ||
      !this.questionDto.option2 ||
      !this.questionDto.option3 ||
      !this.questionDto.option4 ||
      !this.questionDto.answer) {

      Swal.fire("Error", "All fields are required!", "error");
      return; // Stop execution if validation fails
    }


    this.questionService.addQuestion(this.questionDto).subscribe(
      (response) => {
        console.log('Question added successfully:', response);
        Swal.fire("Success", "Question added successfully", "success");
        this.showForm = false; // hide form
        // Optionally reset form after successful submission
        this.questionDto = {
          q_Id: 0,
          question: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          answer: '',
          category: this.questionDto.category  // Keep selected category
        };
        this.selectedCategoryId = null;

      },
      (error) => {
        console.error('Error adding question:', error);
      }
    );
  }


  goBack() {
    console.log("Add question back button is working:");
    this.router.navigate(['admin-dashboard/'])
  }
}