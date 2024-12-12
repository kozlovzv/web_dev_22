import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiParam, ApiBody, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { Category } from './category.entity';

@ApiTags('Categories') // Тег для Swagger
@Controller('categories') // Базовый маршрут для работы с категориями
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiBody({
    description: 'Данные для создания новой категории',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Название категории' },
        description: { type: 'string', description: 'Описание категории' },
        imageUrl: { type: 'string', description: 'Ссылка на изображение категории' },
      },
      required: ['name', 'description', 'imageUrl'], // Обязательные поля
    },
  })
  create(@Body() category: Omit<Category, 'id'>) {
    return this.categoryService.create(category);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number, description: 'Идентификатор категории' })
  findOne(@Param('id') id: string) {
    const numericId = Number(id); // Преобразование id в число
    return this.categoryService.findOne(numericId);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: Number, description: 'Идентификатор категории' })
  @ApiBody({
    description: 'Данные для обновления категории',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Название категории' },
        description: { type: 'string', description: 'Описание категории' },
        imageUrl: { type: 'string', description: 'Ссылка на изображение категории' },
      },
      required: ['name', 'description', 'imageUrl'], // Обязательные поля
    },
  })
  update(@Param('id') id: string, @Body() category: Omit<Category, 'id'>) {
    const numericId = Number(id); // Преобразование id в число
    return this.categoryService.update(numericId, category);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number, description: 'Идентификатор категории' })
  remove(@Param('id') id: string) {
    const numericId = Number(id); // Преобразование id в число
    return this.categoryService.remove(numericId);
  }
}
