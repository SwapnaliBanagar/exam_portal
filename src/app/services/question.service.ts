import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuestionDto } from '../Dto/question-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private baseUrl = 'http://localhost:8080/question';

  constructor(private httpClient: HttpClient) { }


  public addQuestion(questionDto: QuestionDto): Observable<QuestionDto> {
    if (!questionDto.category || !questionDto.category.category_id) {
      throw new Error("Category ID is missing!");
    }

    return this.httpClient.post<QuestionDto>(
      `${this.baseUrl}/${questionDto.category.category_id}/addQuestion`,
      questionDto
    );
  }



  public getAllQuestions(): Observable<QuestionDto[]> {
    return this.httpClient.get<QuestionDto[]>(`${this.baseUrl}/getAllQuestions`)
  }



  public getQuestionsByCategory(categoryName: string): Observable<QuestionDto[]> {
    return this.httpClient.get<QuestionDto[]>(`${this.baseUrl}/${categoryName}`);
  }


  public deleteQuestionById(q_Id:number):Observable<String>
  {
    return this.httpClient.delete<String>(`${this.baseUrl}/delete/${q_Id}`,{ responseType: 'text' as 'json' });
  }

  
public updateQuestionQuery(name:string,q_Id:number,questionDto: any):Observable<string>
{
  return this.httpClient.put<string>(`${this.baseUrl}/update/${name}/${q_Id}`,questionDto,{responseType: 'text' as 'json'});
}
}



