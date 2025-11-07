import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ApiResponse, Exercise } from '../types';
import { CreateExerciseDto, UpdateExerciseDto } from './dto';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Get()
  getAll(@Query('categoryId') categoryId?: string): ApiResponse<Exercise[]> {
    return this.exercisesService.getAll(categoryId);
  }

  @Get(':id')
  getOne(@Param('id') id: string): ApiResponse<Exercise> {
    return this.exercisesService.getOne(id);
  }

  @Post()
  create(@Body() dto: CreateExerciseDto): ApiResponse<Exercise> {
    return this.exercisesService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateExerciseDto): ApiResponse<Exercise> {
    return this.exercisesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): ApiResponse<null> {
    return this.exercisesService.remove(id);
  }
}
