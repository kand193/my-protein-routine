import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiResponse, MuscleCategory } from '../types';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getAll(): ApiResponse<MuscleCategory[]> {
    return this.categoriesService.getAll();
  }
}
