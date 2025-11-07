import { Injectable, NotFoundException } from '@nestjs/common';
import { ApiResponse, RoutineTemplate } from '../types';
import { CreateRoutineDto, UpdateRoutineDto } from './dto';

@Injectable()
export class RoutinesService {
  private routines: RoutineTemplate[] = [
    {
      id: 'routine_001',
      name: '가슴 + 삼두 루틴',
      exerciseIds: ['ex_bench_press', 'ex_incline_bench', 'ex_dumbbell_fly', 'ex_tricep_extension'],
      categoryId: 'cat_chest',
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
    },
    {
      id: 'routine_002',
      name: '등 + 이두 루틴',
      exerciseIds: ['ex_deadlift', 'ex_pull_up', 'ex_barbell_row', 'ex_barbell_curl'],
      categoryId: 'cat_back',
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
    },
    {
      id: 'routine_003',
      name: '하체 데이',
      exerciseIds: ['ex_squat', 'ex_leg_press', 'ex_lunge'],
      categoryId: 'cat_legs',
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
    },
  ];

  getAll(): ApiResponse<RoutineTemplate[]> {
    return {
      success: true,
      data: this.routines,
      timestamp: new Date().toISOString(),
    };
  }

  getOne(id: string): ApiResponse<RoutineTemplate> {
    const routine = this.routines.find((r) => r.id === id);
    if (!routine) {
      throw new NotFoundException(`Routine with id ${id} not found`);
    }

    return {
      success: true,
      data: routine,
      timestamp: new Date().toISOString(),
    };
  }

  create(dto: CreateRoutineDto): ApiResponse<RoutineTemplate> {
    const now = new Date().toISOString();
    const newRoutine: RoutineTemplate = {
      id: `routine_${Date.now()}`,
      name: dto.name,
      exerciseIds: dto.exerciseIds,
      categoryId: dto.categoryId,
      createdAt: now,
      updatedAt: now,
    };

    this.routines.push(newRoutine);

    return {
      success: true,
      data: newRoutine,
      message: '루틴이 생성되었습니다.',
      timestamp: new Date().toISOString(),
    };
  }

  update(id: string, dto: UpdateRoutineDto): ApiResponse<RoutineTemplate> {
    const index = this.routines.findIndex((r) => r.id === id);
    if (index === -1) {
      throw new NotFoundException(`Routine with id ${id} not found`);
    }

    this.routines[index] = {
      ...this.routines[index],
      ...dto,
      updatedAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: this.routines[index],
      message: '루틴이 수정되었습니다.',
      timestamp: new Date().toISOString(),
    };
  }

  remove(id: string): ApiResponse<null> {
    const index = this.routines.findIndex((r) => r.id === id);
    if (index === -1) {
      throw new NotFoundException(`Routine with id ${id} not found`);
    }

    this.routines.splice(index, 1);

    return {
      success: true,
      data: null,
      message: '루틴이 삭제되었습니다.',
      timestamp: new Date().toISOString(),
    };
  }
}
