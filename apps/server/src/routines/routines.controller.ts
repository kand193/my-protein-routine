import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { RoutinesService } from './routines.service';
import { ApiResponse, RoutineTemplate } from '../types';
import { CreateRoutineDto, UpdateRoutineDto } from './dto';

@Controller('routines')
export class RoutinesController {
  constructor(private readonly routinesService: RoutinesService) {}

  @Get()
  getAll(): ApiResponse<RoutineTemplate[]> {
    return this.routinesService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): ApiResponse<RoutineTemplate> {
    return this.routinesService.getOne(id);
  }

  @Post()
  create(@Body() dto: CreateRoutineDto): ApiResponse<RoutineTemplate> {
    return this.routinesService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRoutineDto): ApiResponse<RoutineTemplate> {
    return this.routinesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): ApiResponse<null> {
    return this.routinesService.remove(id);
  }
}
