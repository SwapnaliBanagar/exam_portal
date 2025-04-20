export class CategoriesDto {
  category_id!: number;
  name!: string;
  description!: string;

  constructor(category_id: number, name: string, description: string) {
    this.category_id = category_id;
    this.name = name;
    this.description = description;
  }
}
