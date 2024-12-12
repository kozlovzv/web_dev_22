import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiParam, ApiBody, ApiTags } from '@nestjs/swagger';
import { CityService } from './city.service';
import { City } from './city.entity';

@ApiTags('Cities') // Тег для Swagger
@Controller('cities') // Базовый маршрут для работы с городами
export class CitiesController {
  constructor(private readonly cityService: CityService) {}

  /**
   * Создать новый город.
   * @param city Объект City.
   * @returns Созданный объект City с сгенерированным id.
   */
  @Post()
  @ApiBody({
    description: 'Данные для создания нового города',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Название города' },
        description: { type: 'string', description: 'Описание города' },
        country: { type: 'string', description: 'Страна города' },
        imageUrl: { type: 'string', description: 'Ссылка на изображение города' },
      },
      required: ['name', 'description', 'country', 'imageUrl'], // Обязательные поля
    },
  })
  create(@Body() city: Omit<City, 'id'>) {
    return this.cityService.create(city);
  }

  /**
   * Получить список всех городов.
   * @returns Массив объектов City.
   */
  @Get()
  findAll() {
    return this.cityService.findAll();
  }

  /**
   * Найти город по id.
   * @param id Идентификатор города.
   * @returns Объект City с указанным id.
   */
  @Get(':id')
  @ApiParam({ name: 'id', type: Number, description: 'Идентификатор города' })
  findOne(@Param('id') id: string) {
    const numericId = Number(id); // Преобразование id в число
    return this.cityService.findOne(numericId);
  }

  /**
   * Обновить данные города по id.
   * @param id Идентификатор города.
   * @param city Данные для обновления.
   * @returns Обновленный объект City.
   */
  @Put(':id')
  @ApiParam({ name: 'id', type: Number, description: 'Идентификатор города' })
  @ApiBody({
    description: 'Данные для обновления города',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Название города' },
        description: { type: 'string', description: 'Описание города' },
        country: { type: 'string', description: 'Страна города' },
        imageUrl: { type: 'string', description: 'Ссылка на изображение города' },
      },
      required: ['name', 'description', 'country', 'imageUrl'], // Обязательные поля
    },
  })
  update(@Param('id') id: string, @Body() city: Omit<City, 'id'>) {
    const numericId = Number(id); // Преобразование id в число
    return this.cityService.update(numericId, city);
  }

  /**
   * Удалить город по id.
   * @param id Идентификатор города.
   * @returns HttpStatus.OK при успешном удалении.
   */
  @Delete(':id')
  @ApiParam({ name: 'id', type: Number, description: 'Идентификатор города' })
  remove(@Param('id') id: string) {
    const numericId = Number(id); // Преобразование id в число
    return this.cityService.remove(numericId);
  }
}
