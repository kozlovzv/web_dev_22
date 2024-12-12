import { Injectable, HttpStatus } from '@nestjs/common';
import { DatasourceService } from 'src/datasource/datasource.service';
import { Country } from './country.entity';

@Injectable()
export class CountryService {
  constructor(private readonly datasourceService: DatasourceService) {}

  create(country: Omit<Country, 'id'>): Country {
    const newCountry: Country = {
      ...country,
      id: this.datasourceService.getCountries().length + 1, // Генерация уникального ID
    };
    this.datasourceService.addCountry(newCountry);
    return newCountry;
  }

  findOne(id: number): Country {
    const country = this.datasourceService.findCountryById(id);
    if (!country) {
      throw new Error(`Country with ID ${id} not found`);
    }
    return country;
  }

  findAll(): Country[] {
    return this.datasourceService.getCountries();
  }

  update(id: number, updatedCountry: Omit<Country, 'id'>): Country {
    const index = this.datasourceService
      .getCountries()
      .findIndex((country) => country.id === id);

    if (index !== -1) {
      const country = { ...this.datasourceService.getCountries()[index], ...updatedCountry };
      this.datasourceService.getCountries()[index] = country;
      return country;
    }

    throw new Error(`Country with ID ${id} not found`);
  }

  remove(id: number): HttpStatus {
    const index = this.datasourceService
      .getCountries()
      .findIndex((country) => country.id === id);

    if (index !== -1) {
      this.datasourceService.getCountries().splice(index, 1);
      return HttpStatus.OK;
    }

    throw new Error(`Country with ID ${id} not found`);
  }
}
