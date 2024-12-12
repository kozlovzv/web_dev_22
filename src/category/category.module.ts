import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { DatasourceModule } from 'src/datasource/datasource.module';

@Module({
  controllers: [CategoryController], // Регистрируем контроллер
  providers: [CategoryService], // Регистрируем сервис
  imports: [DatasourceModule], // Импортируем модуль данных
})
export class CategoryModule {}
