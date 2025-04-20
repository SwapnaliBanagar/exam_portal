import { CategoriesDto } from "./categories-dto";

export class QuestionDto {
    q_Id!: number;
    question!: string;
    image?: string;
    option1!: string;
    option2!: string;
    option3!: string;
    option4!: string;
    answer!: string;
    category!: CategoriesDto;
  
    // Regular constructor
    constructor(
      q_Id: number,
      question: string,
      option1: string,
      option2: string,
      option3: string,
      option4: string,
      answer: string,
      category: CategoriesDto,
      image?: string
    ) {
      this.q_Id = q_Id;
      this.question = question;
      this.image = image;
      this.option1 = option1;
      this.option2 = option2;
      this.option3 = option3;
      this.option4 = option4;
      this.answer = answer;
      this.category = category;
    }
}