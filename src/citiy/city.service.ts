import { Injectable, HttpStatus } from '@nestjs/common';
import { DatasourceService } from 'src/datasource/datasource.service';
import { City } from './city.entity';

@Injectable()
export class CityService {
  constructor(private readonly datasourceService: DatasourceService) {}

  create(city: Omit<City, 'id'>): City {
    const newCity: City = {
      ...city,
      id: this.datasourceService.getCities().length + 1, // Генерация уникального ID
    };
    this.datasourceService.addCity(newCity);
    return newCity;
  }

  findOne(id: number): City {
    const city = this.datasourceService.findCityById(id);
    if (!city) {
      throw new Error(`City with ID ${id} not found`);
    }
    return city;
  }

  findAll(): City[] {
    return this.datasourceService.getCities();
  }

  update(id: number, updatedCity: Omit<City, 'id'>): City {
    const index = this.datasourceService
      .getCities()
      .findIndex((city) => city.id === id);

    if (index !== -1) {
      const city = { ...this.datasourceService.getCities()[index], ...updatedCity };
      this.datasourceService.getCities()[index] = city;
      return city;
    }

    throw new Error(`City with ID ${id} not found`);
  }

  remove(id: number): HttpStatus {
    const index = this.datasourceService
      .getCities()
      .findIndex((city) => city.id === id);

    if (index !== -1) {
      this.datasourceService.getCities().splice(index, 1);
      return HttpStatus.OK;
    }

    throw new Error(`City with ID ${id} not found`);
  }
}
