import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiParam, ApiBody, ApiTags } from '@nestjs/swagger';
import { CountryService } from './country.service';
import { Country } from './country.entity';

@ApiTags('Countries') // Тег для Swagger
@Controller('countries') // Базовый маршрут для работы со странами
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  /**
   * Создать новую страну.
   * @param country Данные страны.
   * @returns Созданная страна с сгенерированным id.
   */
  @Post()
  @ApiBody({
    description: 'Данные для создания новой страны',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Название страны' },
        capital: { type: 'string', description: 'Столица страны' },
        population: { type: 'number', description: 'Население страны' },
        description: { type: 'string', description: 'Описание страны' },
        imageUrl: { type: 'string', description: 'Ссылка на изображение страны' },
      },
      required: ['name', 'capital', 'population', 'description', 'imageUrl'], // Указываем обязательные поля
    },
  })
  create(@Body() country: Omit<Country, 'id'>) {
    return this.countryService.create(country);
  }

  @Get()
  findAll() {
    return this.countryService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number, description: 'Идентификатор страны' })
  findOne(@Param('id') id: string) {
    const numericId = Number(id); // Преобразование id в число
    return this.countryService.findOne(numericId);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: Number, description: 'Идентификатор страны' })
  @ApiBody({
    description: 'Данные для обновления страны',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Название страны' },
        capital: { type: 'string', description: 'Столица страны' },
        population: { type: 'number', description: 'Население страны' },
        description: { type: 'string', description: 'Описание страны' },
        imageUrl: { type: 'string', description: 'Ссылка на изображение страны' },
      },
      required: ['name', 'capital', 'population', 'description', 'imageUrl'], // Указываем обязательные поля
    },
  })
  update(@Param('id') id: string, @Body() country: Omit<Country, 'id'>) {
    const numericId = Number(id); // Преобразование id в число
    return this.countryService.update(numericId, country);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number, description: 'Идентификатор страны' })
  remove(@Param('id') id: string) {
    const numericId = Number(id); // Преобразование id в число
    return this.countryService.remove(numericId);
  }
}
