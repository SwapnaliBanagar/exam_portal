import { Component, OnInit } from '@angular/core';
import { QuestionDto } from '../../../Dto/question-dto';
import { CategoriesDto } from '../../../Dto/categories-dto';
import { QuestionService } from '../../../services/question.service';
import { CategoryService } from '../../../services/category.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  standalone: false,
  templateUrl: './start-quiz.component.html',
  styleUrl: './start-quiz.component.css'
})
export class StartQuizComponent implements OnInit {

  questionDto: (QuestionDto & { selectedOption?: string; submitted?: boolean })[] = [];

  categoriesDto: CategoriesDto[] = [];

  selectedCategory = '';

  ngOnInit(): void {
    this.getAllCategories();
  }

  constructor(private questionService: QuestionService, private categoryService: CategoryService, private router: Router) { }


  getAllQuestions() {
    this.questionService.getAllQuestions().subscribe(
      (data: QuestionDto[]) => {
        this.questionDto = data;

        console.log("Fetched All Questions:", this.questionDto);
      },
      (error) => {
        console.error("Error fetching all questions:", error);
      }
    );
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

    if (this.selectedCategory === '') {
      this.questionDto = [];
    }
    else if (this.selectedCategory === 'all') {
      this.getAllQuestions();
    }
    else {
      this.questionService.getQuestionsByCategory(this.selectedCategory).subscribe(
        (data: QuestionDto[]) => {
          this.questionDto = data;
          console.log("Filtered Questions:", this.selectedCategory, ':', data);
        },
        (error) => {

          if (error.status == 404) {
            this.questionDto = [];
            Swal.fire("empty", "No questions available for this category.", "warning").then(() => {
              console.log(this.selectedCategory);
            });

          }
        }
      );
    }
  }


  submitAnswer(question: QuestionDto & { selectedOption?: string; submitted?: boolean }) {
    console.log("Submit Button click");

    if (!question.selectedOption) {
      Swal.fire("Warning", "Please select an option before submitting!", "warning");
      return;
    }

    // console.log("Question:", question.question);
    // console.log("Selected Option:", question.selectedOption);
    // console.log("Correct Answer:", question.answer);


    // Disable further interactions
    question.submitted = true;
  }


  get totalQuestions(): number {
    return this.questionDto?.length || 0;
  }
  
  get attemptedQuestions(): number {
    return this.questionDto?.filter(q => q.submitted)?.length || 0;
  }

  get correctAnswers(): number {
    return this.questionDto?.filter(q => q.submitted && q.selectedOption===q.answer)?.length || 0;
  }


  get allQuestionsAttempted(): boolean {
    
    return this.attemptedQuestions === this.questionDto?.length;
  }

}
