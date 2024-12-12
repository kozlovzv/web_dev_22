import { Module } from '@nestjs/common';
import { CityModule } from 'src/citiy/city.module';  // Модуль для работы с городами
import { CountryModule } from 'src/сountry/country.module';  // Модуль для работы со странами
import { CategoryModule } from './category/category.module';  // Модуль для работы с категориями
import { DatasourceModule } from './datasource/datasource.module';  // Модуль для работы с данными

@Module({
  imports: [
    CityModule,
    CountryModule,
    CategoryModule,
    DatasourceModule,  // Добавлено подключение модуля данных
  ],
})
export class AppModule {}
