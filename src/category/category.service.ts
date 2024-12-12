import { Injectable, HttpStatus } from '@nestjs/common';
import { DatasourceService } from 'src/datasource/datasource.service';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(private readonly datasourceService: DatasourceService) {}

  create(category: Omit<Category, 'id'>): Category {
    const newCategory: Category = {
      ...category,
      id: this.datasourceService.getCategories().length + 1, // Генерация уникального ID
    };
    this.datasourceService.addCategory(newCategory);
    return newCategory;
  }

  findOne(id: number): Category {
    const category = this.datasourceService.findCategoryById(id);
    if (!category) {
      throw new Error(`Category with ID ${id} not found`);
    }
    return category;
  }

  findAll(): Category[] {
    return this.datasourceService.getCategories();
  }

  update(id: number, updatedCategory: Omit<Category, 'id'>): Category {
    const index = this.datasourceService
      .getCategories()
      .findIndex((category) => category.id === id);

    if (index !== -1) {
      const category = { ...this.datasourceService.getCategories()[index], ...updatedCategory };
      this.datasourceService.getCategories()[index] = category;
      return category;
    }

    throw new Error(`Category with ID ${id} not found`);
  }

  remove(id: number): HttpStatus {
    const index = this.datasourceService
      .getCategories()
      .findIndex((category) => category.id === id);

    if (index !== -1) {
      this.datasourceService.getCategories().splice(index, 1);
      return HttpStatus.OK;
    }

    throw new Error(`Category with ID ${id} not found`);
  }
}
