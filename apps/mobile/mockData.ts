import {
  MuscleCategory,
  Exercise,
  WorkoutLog,
  RoutineTemplate,
  UserProfile,
  ApiResponse,
} from './types';

/**
 * Mock 데이터
 * 실제 API 응답 형태로 설계
 */

// 운동 부위 카테고리
export const muscleCategories: MuscleCategory[] = [
  {
    id: 'cat_chest',
    name: '가슴',
    nameEn: 'Chest',
    icon: '💪',
    color: '#FF6B6B',
  },
  {
    id: 'cat_shoulder',
    name: '어깨',
    nameEn: 'Shoulder',
    icon: '🏋️',
    color: '#4ECDC4',
  },
  {
    id: 'cat_back',
    name: '등',
    nameEn: 'Back',
    icon: '🦾',
    color: '#45B7D1',
  },
  {
    id: 'cat_legs',
    name: '하체',
    nameEn: 'Legs',
    icon: '🦵',
    color: '#96CEB4',
  },
  {
    id: 'cat_arms',
    name: '팔',
    nameEn: 'Arms',
    icon: '💪',
    color: '#FFEAA7',
  },
  {
    id: 'cat_core',
    name: '코어',
    nameEn: 'Core',
    icon: '🎯',
    color: '#DFE6E9',
  },
];

// 운동 종목
export const exercises: Exercise[] = [
  // 가슴 운동
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

  // 어깨 운동
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

  // 등 운동
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

  // 하체 운동
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

  // 팔 운동
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

// 운동 기록 예시
export const workoutLogs: WorkoutLog[] = [
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
    totalVolume: 1440, // (60*10) + (60*8) + (60*6)
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
    totalVolume: 3040, // (80*12) + (80*10) + (80*8) + (80*8)
    duration: 20,
  },
];

// 루틴 템플릿
export const routineTemplates: RoutineTemplate[] = [
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

// 사용자 프로필
export const userProfile: UserProfile = {
  id: 'user_001',
  name: '홍길동',
  weight: 75,
  height: 175,
  goal: 'bulking',
};

/**
 * API 응답 형식
 */

// GET /api/categories
export const getCategoriesResponse: ApiResponse<MuscleCategory[]> = {
  success: true,
  data: muscleCategories,
  timestamp: new Date().toISOString(),
};

// GET /api/exercises
export const getExercisesResponse: ApiResponse<Exercise[]> = {
  success: true,
  data: exercises,
  timestamp: new Date().toISOString(),
};

// GET /api/exercises?categoryId=cat_chest
export const getExercisesByCategoryResponse: ApiResponse<Exercise[]> = {
  success: true,
  data: exercises.filter(ex => ex.categoryId === 'cat_chest'),
  timestamp: new Date().toISOString(),
};

// GET /api/workout-logs?date=2025-01-05
export const getWorkoutLogsByDateResponse: ApiResponse<WorkoutLog[]> = {
  success: true,
  data: workoutLogs,
  timestamp: new Date().toISOString(),
};

// POST /api/workout-logs (운동 기록 생성)
export const createWorkoutLogRequest = {
  exerciseId: 'ex_bench_press',
  date: new Date().toISOString(),
  sets: [
    {
      weight: 60,
      reps: 10,
      setNumber: 1,
    },
  ],
};

export const createWorkoutLogResponse: ApiResponse<WorkoutLog> = {
  success: true,
  data: {
    id: 'log_new',
    exerciseId: createWorkoutLogRequest.exerciseId,
    date: createWorkoutLogRequest.date,
    sets: createWorkoutLogRequest.sets.map((set, index) => ({
      ...set,
      id: `set_new_${index + 1}`,
      completed: false,
    })),
    totalVolume: 600,
    duration: 0,
  },
  message: '운동 기록이 생성되었습니다.',
  timestamp: new Date().toISOString(),
};

// PUT /api/workout-logs/:id (운동 기록 수정)
export const updateWorkoutLogRequest = {
  sets: [
    {
      id: 'set_001_1',
      weight: 65,
      reps: 10,
      completed: true,
    },
  ],
  note: '무게 증량',
};

export const updateWorkoutLogResponse: ApiResponse<WorkoutLog> = {
  success: true,
  data: {
    ...workoutLogs[0],
    sets: updateWorkoutLogRequest.sets.map((set, index) => ({
      ...set,
      setNumber: index + 1,
    })),
    note: updateWorkoutLogRequest.note,
  },
  message: '운동 기록이 수정되었습니다.',
  timestamp: new Date().toISOString(),
};

// POST /api/workout-logs/:id/sets (세트 추가)
export const addSetRequest = {
  weight: 60,
  reps: 8,
};

export const addSetResponse: ApiResponse<{ id: string; weight: number; reps: number; setNumber: number; completed: boolean }> = {
  success: true,
  data: {
    id: 'set_001_4',
    ...addSetRequest,
    setNumber: 4,
    completed: false,
  },
  message: '세트가 추가되었습니다.',
  timestamp: new Date().toISOString(),
};

// DELETE /api/workout-logs/:logId/sets/:setId (세트 삭제)
export const deleteSetResponse: ApiResponse<null> = {
  success: true,
  data: null,
  message: '세트가 삭제되었습니다.',
  timestamp: new Date().toISOString(),
};

// GET /api/routines
export const getRoutinesResponse: ApiResponse<RoutineTemplate[]> = {
  success: true,
  data: routineTemplates,
  timestamp: new Date().toISOString(),
};

// GET /api/user/profile
export const getUserProfileResponse: ApiResponse<UserProfile> = {
  success: true,
  data: userProfile,
  timestamp: new Date().toISOString(),
};
