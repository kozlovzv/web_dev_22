import { Module } from '@nestjs/common';
import { DatasourceModule } from 'src/datasource/datasource.module';
import { CitiesController } from './city.controller'; // Исправлен путь к контроллеру
import { CityService } from 'src/citiy/city.service'; // Исправлен путь к сервису

@Module({
  controllers: [CitiesController],
  providers: [CityService],
  imports: [DatasourceModule],
})
export class CityModule {}
