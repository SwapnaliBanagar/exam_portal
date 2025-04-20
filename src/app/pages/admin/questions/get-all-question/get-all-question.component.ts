import { Component, OnInit } from '@angular/core';
import { QuestionDto } from '../../../../Dto/question-dto';
import { QuestionService } from '../../../../services/question.service';
import { CategoryService } from '../../../../services/category.service';
import { CategoriesDto } from '../../../../Dto/categories-dto';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-all-question',
  standalone: false,
  templateUrl: './get-all-question.component.html',
  styleUrl: './get-all-question.component.css'
})
export class GetAllQuestionComponent implements OnInit {

  questionDto: QuestionDto[] = [];

  categoriesDto: CategoriesDto[] = [];

  selectedCategory = '';

  showUpdateForm: boolean = false;
  selectedQuestion: any = {}; // Store selected question for editing


  ngOnInit(): void {
    this.getAllQuestions();
    this.getAllCategories();
  }


  constructor(private questionService: QuestionService, private categoryService: CategoryService, private router: Router) { }



  getAllQuestions() {
    this.questionService.getAllQuestions().subscribe(
      (data: QuestionDto[]) => {
        this.questionDto = data;
        console.log("getDate", data);
      },
      (error) => {
        console.log("error for getall questions")
      }
    )
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(
      (data: CategoriesDto[]) => {
        this.categoriesDto = data;
        console.log("Fetched Categories:", data);
      },
      (error) => {
        Swal.fire("Error", "Failed to fetch categories.", "error");
        console.error("Error fetching categories:", error);
      }
    );
  }

  filterQuestions() {
    if (this.selectedCategory) { // Ensure a category is selected
      this.questionService.getQuestionsByCategory(this.selectedCategory).subscribe(
        (data: QuestionDto[]) => {
          this.questionDto = data;
          console.log("Filtered Questions:", this.selectedCategory, ':', data);
        },
        (error) => { // Fix type error

          if (error.status == 404) {
            this.questionDto=[];
            Swal.fire("empty", "No questions available for this category.", "warning").then(() => {
              console.log(this.selectedCategory);
            });

          }
        }
      );
    } else {
      this.getAllQuestions(); // Fetch all if no category is selected
    }
  }

  addQuestion() {
    console.log("view-add-question button working");
    this.router.navigate(['admin-dashboard/addQuestion'])
  }

  //---------------------------------------------------- update Question --------------------------------------------------------------------------

  editQuestion(question: any) {
    this.selectedQuestion = { ...question }; // Clone the object
    this.showUpdateForm = true;
    console.log("selected Question for edit", this.selectedQuestion);
  }

  updateQuestion() {

    // 🔹 Validate before making API call
    if (!this.selectedQuestion ||
      !this.selectedQuestion.question ||
      !this.selectedQuestion.option1 ||
      !this.selectedQuestion.option2 ||
      !this.selectedQuestion.option3 ||
      !this.selectedQuestion.option4 ||
      !this.selectedQuestion.answer) {
      Swal.fire("Error", "All fields are required!", "error");
      return;
    }

    this.questionService.updateQuestionQuery(this.selectedQuestion.category.name, this.selectedQuestion.q_Id, this.selectedQuestion)
      .subscribe(response => {
        if (this.selectedQuestion = null) {
          console.log('all filed are required!');
        }
        console.log('Question updated successfully!');
        this.getAllQuestions();
        Swal.fire("Sucess", "question updated successfully", "success");
        this.selectedQuestion = null;
        this.showUpdateForm = false;

      }, error => {
        console.error('Error updating question', error);
      });
  }


  cancelEdit() {
    console.log('edit question cancel!');
    this.selectedQuestion = null;
    this.showUpdateForm = false;
  }







  //---------------------------------------------------- delete Question --------------------------------------------------------------------------

  deleteQuestion(q_Id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this question!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.questionService.deleteQuestionById(q_Id).subscribe(
          (response) => {
            Swal.fire('Deleted!', 'Question has been deleted.', 'success');
            // Use a new array reference to trigger change detection
            this.filterQuestions();
          },
          (error) => {
            Swal.fire('Error', 'Question ID not found.', 'error');
          }
        );
      }
    });
  }
}