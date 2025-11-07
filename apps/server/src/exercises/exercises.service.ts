import { Injectable, NotFoundException } from '@nestjs/common';
import { ApiResponse, Exercise } from '../types';
import { CreateExerciseDto, UpdateExerciseDto } from './dto';

@Injectable()
export class ExercisesService {
  private exercises: Exercise[] = [
    {
      id: 'ex_bench_press',
      name: '벤치 프레스',
      nameEn: 'Bench Press',
      categoryId: 'cat_chest',
      description: '바벨을 이용한 기본 가슴 운동',
      difficulty: 'intermediate',
      targetMuscles: ['대흉근', '삼두근', '전면 삼각근'],
    },
    {
      id: 'ex_incline_bench',
      name: '인클라인 벤치 프레스',
      nameEn: 'Incline Bench Press',
      categoryId: 'cat_chest',
      description: '상부 가슴을 타겟으로 하는 벤치 프레스',
      difficulty: 'intermediate',
      targetMuscles: ['상부 대흉근', '전면 삼각근'],
    },
    {
      id: 'ex_dumbbell_fly',
      name: '덤벨 플라이',
      nameEn: 'Dumbbell Fly',
      categoryId: 'cat_chest',
      description: '가슴 근육의 스트레칭을 강조하는 운동',
      difficulty: 'beginner',
      targetMuscles: ['대흉근'],
    },
    {
      id: 'ex_pushup',
      name: '푸쉬업',
      nameEn: 'Push-up',
      categoryId: 'cat_chest',
      description: '자중을 이용한 기본 가슴 운동',
      difficulty: 'beginner',
      targetMuscles: ['대흉근', '삼두근', '코어'],
    },
    {
      id: 'ex_overhead_press',
      name: '오버헤드 프레스',
      nameEn: 'Overhead Press',
      categoryId: 'cat_shoulder',
      description: '바벨을 이용한 기본 어깨 운동',
      difficulty: 'intermediate',
      targetMuscles: ['삼각근', '승모근'],
    },
    {
      id: 'ex_lateral_raise',
      name: '레터럴 레이즈',
      nameEn: 'Lateral Raise',
      categoryId: 'cat_shoulder',
      description: '측면 삼각근을 타겟으로 하는 운동',
      difficulty: 'beginner',
      targetMuscles: ['측면 삼각근'],
    },
    {
      id: 'ex_front_raise',
      name: '프론트 레이즈',
      nameEn: 'Front Raise',
      categoryId: 'cat_shoulder',
      description: '전면 삼각근을 타겟으로 하는 운동',
      difficulty: 'beginner',
      targetMuscles: ['전면 삼각근'],
    },
    {
      id: 'ex_deadlift',
      name: '데드리프트',
      nameEn: 'Deadlift',
      categoryId: 'cat_back',
      description: '전신 근력 운동의 기본',
      difficulty: 'advanced',
      targetMuscles: ['척추기립근', '광배근', '햄스트링', '둔근'],
    },
    {
      id: 'ex_pull_up',
      name: '풀업',
      nameEn: 'Pull-up',
      categoryId: 'cat_back',
      description: '자중을 이용한 등 운동',
      difficulty: 'intermediate',
      targetMuscles: ['광배근', '이두근'],
    },
    {
      id: 'ex_barbell_row',
      name: '바벨 로우',
      nameEn: 'Barbell Row',
      categoryId: 'cat_back',
      description: '등 두께를 키우는 운동',
      difficulty: 'intermediate',
      targetMuscles: ['광배근', '승모근', '능형근'],
    },
    {
      id: 'ex_squat',
      name: '스쿼트',
      nameEn: 'Squat',
      categoryId: 'cat_legs',
      description: '하체 운동의 기본',
      difficulty: 'intermediate',
      targetMuscles: ['대퇴사두근', '둔근', '햄스트링'],
    },
    {
      id: 'ex_leg_press',
      name: '레그 프레스',
      nameEn: 'Leg Press',
      categoryId: 'cat_legs',
      description: '머신을 이용한 하체 운동',
      difficulty: 'beginner',
      targetMuscles: ['대퇴사두근', '둔근'],
    },
    {
      id: 'ex_lunge',
      name: '런지',
      nameEn: 'Lunge',
      categoryId: 'cat_legs',
      description: '균형과 하체 근력을 키우는 운동',
      difficulty: 'beginner',
      targetMuscles: ['대퇴사두근', '둔근', '햄스트링'],
    },
    {
      id: 'ex_barbell_curl',
      name: '바벨 컬',
      nameEn: 'Barbell Curl',
      categoryId: 'cat_arms',
      description: '이두근의 기본 운동',
      difficulty: 'beginner',
      targetMuscles: ['이두근'],
    },
    {
      id: 'ex_tricep_extension',
      name: '트라이셉 익스텐션',
      nameEn: 'Tricep Extension',
      categoryId: 'cat_arms',
      description: '삼두근 집중 운동',
      difficulty: 'beginner',
      targetMuscles: ['삼두근'],
    },
  ];

  getAll(categoryId?: string): ApiResponse<Exercise[]> {
    let data = this.exercises;
    if (categoryId) {
      data = this.exercises.filter((ex) => ex.categoryId === categoryId);
    }

    return {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  getOne(id: string): ApiResponse<Exercise> {
    const exercise = this.exercises.find((ex) => ex.id === id);
    if (!exercise) {
      throw new NotFoundException(`Exercise with id ${id} not found`);
    }

    return {
      success: true,
      data: exercise,
      timestamp: new Date().toISOString(),
    };
  }

  create(dto: CreateExerciseDto): ApiResponse<Exercise> {
    const newExercise: Exercise = {
      id: `ex_${Date.now()}`,
      ...dto,
    };

    this.exercises.push(newExercise);

    return {
      success: true,
      data: newExercise,
      message: '운동이 생성되었습니다.',
      timestamp: new Date().toISOString(),
    };
  }

  update(id: string, dto: UpdateExerciseDto): ApiResponse<Exercise> {
    const index = this.exercises.findIndex((ex) => ex.id === id);
    if (index === -1) {
      throw new NotFoundException(`Exercise with id ${id} not found`);
    }

    this.exercises[index] = {
      ...this.exercises[index],
      ...dto,
    };

    return {
      success: true,
      data: this.exercises[index],
      message: '운동이 수정되었습니다.',
      timestamp: new Date().toISOString(),
    };
  }

  remove(id: string): ApiResponse<null> {
    const index = this.exercises.findIndex((ex) => ex.id === id);
    if (index === -1) {
      throw new NotFoundException(`Exercise with id ${id} not found`);
    }

    this.exercises.splice(index, 1);

    return {
      success: true,
      data: null,
      message: '운동이 삭제되었습니다.',
      timestamp: new Date().toISOString(),
    };
  }
}
