import { Injectable, NotFoundException } from '@nestjs/common';
import { ApiResponse, WorkoutLog, WorkoutSet } from '../types';
import { CreateWorkoutLogDto, UpdateWorkoutLogDto, AddSetDto } from './dto';

@Injectable()
export class WorkoutLogsService {
  private workoutLogs: WorkoutLog[] = [
    {
      id: 'log_001',
      exerciseId: 'ex_bench_press',
      date: '2025-01-05T10:30:00Z',
      sets: [
        {
          id: 'set_001_1',
          weight: 60,
          reps: 10,
          setNumber: 1,
          completed: true,
        },
        {
          id: 'set_001_2',
          weight: 60,
          reps: 8,
          setNumber: 2,
          completed: true,
        },
        {
          id: 'set_001_3',
          weight: 60,
          reps: 6,
          setNumber: 3,
          completed: true,
          note: '마지막 세트 힘들었음',
        },
      ],
      note: '오늘 컨디션 좋음',
      totalVolume: 1440,
      duration: 15,
    },
    {
      id: 'log_002',
      exerciseId: 'ex_squat',
      date: '2025-01-05T11:00:00Z',
      sets: [
        {
          id: 'set_002_1',
          weight: 80,
          reps: 12,
          setNumber: 1,
          completed: true,
        },
        {
          id: 'set_002_2',
          weight: 80,
          reps: 10,
          setNumber: 2,
          completed: true,
        },
        {
          id: 'set_002_3',
          weight: 80,
          reps: 8,
          setNumber: 3,
          completed: true,
        },
        {
          id: 'set_002_4',
          weight: 80,
          reps: 8,
          setNumber: 4,
          completed: false,
        },
      ],
      totalVolume: 3040,
      duration: 20,
    },
  ];

  getAll(date?: string): ApiResponse<WorkoutLog[]> {
    let data = this.workoutLogs;
    if (date) {
      data = this.workoutLogs.filter((log) => log.date.startsWith(date));
    }

    return {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  getOne(id: string): ApiResponse<WorkoutLog> {
    const log = this.workoutLogs.find((l) => l.id === id);
    if (!log) {
      throw new NotFoundException(`Workout log with id ${id} not found`);
    }

    return {
      success: true,
      data: log,
      timestamp: new Date().toISOString(),
    };
  }

  create(dto: CreateWorkoutLogDto): ApiResponse<WorkoutLog> {
    const sets: WorkoutSet[] = dto.sets.map((set, index) => ({
      id: `set_${Date.now()}_${index + 1}`,
      ...set,
      setNumber: index + 1,
      completed: false,
    }));

    const totalVolume = sets.reduce((sum, set) => sum + set.weight * set.reps, 0);

    const newLog: WorkoutLog = {
      id: `log_${Date.now()}`,
      exerciseId: dto.exerciseId,
      date: dto.date || new Date().toISOString(),
      sets,
      note: dto.note,
      totalVolume,
      duration: 0,
    };

    this.workoutLogs.push(newLog);

    return {
      success: true,
      data: newLog,
      message: '운동 기록이 생성되었습니다.',
      timestamp: new Date().toISOString(),
    };
  }

  update(id: string, dto: UpdateWorkoutLogDto): ApiResponse<WorkoutLog> {
    const index = this.workoutLogs.findIndex((l) => l.id === id);
    if (index === -1) {
      throw new NotFoundException(`Workout log with id ${id} not found`);
    }

    const updatedSets = dto.sets
      ? dto.sets.map((set, idx) => ({
          id: set.id || `set_${Date.now()}_${idx + 1}`,
          weight: set.weight,
          reps: set.reps,
          setNumber: idx + 1,
          completed: set.completed !== undefined ? set.completed : false,
          note: set.note,
        }))
      : this.workoutLogs[index].sets;

    const totalVolume = updatedSets.reduce((sum, set) => sum + set.weight * set.reps, 0);

    this.workoutLogs[index] = {
      ...this.workoutLogs[index],
      sets: updatedSets,
      note: dto.note !== undefined ? dto.note : this.workoutLogs[index].note,
      duration: dto.duration !== undefined ? dto.duration : this.workoutLogs[index].duration,
      totalVolume,
    };

    return {
      success: true,
      data: this.workoutLogs[index],
      message: '운동 기록이 수정되었습니다.',
      timestamp: new Date().toISOString(),
    };
  }

  remove(id: string): ApiResponse<null> {
    const index = this.workoutLogs.findIndex((l) => l.id === id);
    if (index === -1) {
      throw new NotFoundException(`Workout log with id ${id} not found`);
    }

    this.workoutLogs.splice(index, 1);

    return {
      success: true,
      data: null,
      message: '운동 기록이 삭제되었습니다.',
      timestamp: new Date().toISOString(),
    };
  }

  addSet(logId: string, dto: AddSetDto): ApiResponse<WorkoutSet> {
    const log = this.workoutLogs.find((l) => l.id === logId);
    if (!log) {
      throw new NotFoundException(`Workout log with id ${logId} not found`);
    }

    const newSet: WorkoutSet = {
      id: `set_${Date.now()}`,
      weight: dto.weight,
      reps: dto.reps,
      setNumber: log.sets.length + 1,
      completed: false,
      note: dto.note,
    };

    log.sets.push(newSet);
    log.totalVolume = log.sets.reduce((sum, set) => sum + set.weight * set.reps, 0);

    return {
      success: true,
      data: newSet,
      message: '세트가 추가되었습니다.',
      timestamp: new Date().toISOString(),
    };
  }

  removeSet(logId: string, setId: string): ApiResponse<null> {
    const log = this.workoutLogs.find((l) => l.id === logId);
    if (!log) {
      throw new NotFoundException(`Workout log with id ${logId} not found`);
    }

    const setIndex = log.sets.findIndex((s) => s.id === setId);
    if (setIndex === -1) {
      throw new NotFoundException(`Set with id ${setId} not found`);
    }

    log.sets.splice(setIndex, 1);
    log.sets = log.sets.map((set, index) => ({
      ...set,
      setNumber: index + 1,
    }));
    log.totalVolume = log.sets.reduce((sum, set) => sum + set.weight * set.reps, 0);

    return {
      success: true,
      data: null,
      message: '세트가 삭제되었습니다.',
      timestamp: new Date().toISOString(),
    };
  }
}
