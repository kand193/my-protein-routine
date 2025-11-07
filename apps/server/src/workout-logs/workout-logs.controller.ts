import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { WorkoutLogsService } from './workout-logs.service';
import { ApiResponse, WorkoutLog, WorkoutSet } from '../types';
import { CreateWorkoutLogDto, UpdateWorkoutLogDto, AddSetDto } from './dto';

@Controller('workout-logs')
export class WorkoutLogsController {
  constructor(private readonly workoutLogsService: WorkoutLogsService) {}

  @Get()
  getAll(@Query('date') date?: string): ApiResponse<WorkoutLog[]> {
    return this.workoutLogsService.getAll(date);
  }

  @Get(':id')
  getOne(@Param('id') id: string): ApiResponse<WorkoutLog> {
    return this.workoutLogsService.getOne(id);
  }

  @Post()
  create(@Body() dto: CreateWorkoutLogDto): ApiResponse<WorkoutLog> {
    return this.workoutLogsService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateWorkoutLogDto): ApiResponse<WorkoutLog> {
    return this.workoutLogsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): ApiResponse<null> {
    return this.workoutLogsService.remove(id);
  }

  @Post(':id/sets')
  addSet(@Param('id') id: string, @Body() dto: AddSetDto): ApiResponse<WorkoutSet> {
    return this.workoutLogsService.addSet(id, dto);
  }

  @Delete(':logId/sets/:setId')
  removeSet(@Param('logId') logId: string, @Param('setId') setId: string): ApiResponse<null> {
    return this.workoutLogsService.removeSet(logId, setId);
  }
}
