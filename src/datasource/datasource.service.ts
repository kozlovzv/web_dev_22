import { Injectable } from '@nestjs/common';
import { City } from 'src/citiy/city.entity'; // Исправлен путь к сущности City
import { Country } from 'src/сountry/country.entity'; // Исправлен путь к сущности Country
import { Category } from 'src/category/category.entity'; // Исправлен путь к сущности Category

@Injectable()
export class DatasourceService {
  // Хранилища данных в памяти
  private cities: City[] = [];
  private countries: Country[] = [];
  private categories: Category[] = [];

  // === Методы для городов ===

  /**
   * Получить все города.
   * @returns Массив объектов City.
   */
  getCities(): City[] {
    return this.cities;
  }

  /**
   * Добавить город в хранилище.
   * @param city Объект City.
   */
  addCity(city: City): void {
    this.cities.push(city);
  }

  /**
   * Найти город по идентификатору.
   * @param id Идентификатор города.
   * @returns Найденный объект City или undefined.
   */
  findCityById(id: number): City | undefined {
    return this.cities.find((city) => city.id === id);
  }

  // === Методы для стран ===

  /**
   * Получить все страны.
   * @returns Массив объектов Country.
   */
  getCountries(): Country[] {
    return this.countries;
  }

  /**
   * Добавить страну в хранилище.
   * @param country Объект Country.
   */
  addCountry(country: Country): void {
    this.countries.push(country);
  }

  /**
   * Найти страну по идентификатору.
   * @param id Идентификатор страны.
   * @returns Найденный объект Country или undefined.
   */
  findCountryById(id: number): Country | undefined {
    return this.countries.find((country) => country.id === id);
  }

  // === Методы для категорий ===

  /**
   * Получить все категории.
   * @returns Массив объектов Category.
   */
  getCategories(): Category[] {
    return this.categories;
  }

  /**
   * Добавить категорию в хранилище.
   * @param category Объект Category.
   */
  addCategory(category: Category): void {
    this.categories.push(category);
  }

  /**
   * Найти категорию по идентификатору.
   * @param id Идентификатор категории.
   * @returns Найденный объект Category или undefined.
   */
  findCategoryById(id: number): Category | undefined {
    return this.categories.find((category) => category.id === id);
  }
}
