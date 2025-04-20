import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesDto } from '../Dto/categories-dto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:8080/category'; 

  constructor(private httpClient:HttpClient) { }

  
public addCategory(categoriesDto:CategoriesDto):Observable<CategoriesDto>
{
  return this.httpClient.post<CategoriesDto>(`${this.baseUrl}/addCategory`,categoriesDto);
}



public getAllCategories():Observable<CategoriesDto[]>
  {
    return this.httpClient.get<CategoriesDto[]>(`${this.baseUrl}/getAllCategories`);
  }


  public deleteCategoryByCategoryName(name:string):Observable<string>
  {
    return this.httpClient.delete<string>(`${this.baseUrl}/${name}`,{ responseType: 'text' as 'json' });
  }
}





