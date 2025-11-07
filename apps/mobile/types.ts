/**
 * 데이터 타입 정의
 */

/**
 * 운동 부위 카테고리
 */
export interface MuscleCategory {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  color: string;
}

/**
 * 운동 난이도
 */
export type ExerciseDifficulty = 'beginner' | 'intermediate' | 'advanced';

/**
 * 운동 종목
 */
export interface Exercise {
  id: string;
  name: string;
  nameEn: string;
  categoryId: string;
  description: string;
  difficulty: ExerciseDifficulty;
  targetMuscles: string[];
}

/**
 * 운동 세트
 */
export interface WorkoutSet {
  id: string;
  weight: number;
  reps: number;
  setNumber: number;
  completed: boolean;
  note?: string;
}

/**
 * 운동 기록 (특정 날짜의 특정 운동)
 */
export interface WorkoutLog {
  id: string;
  exerciseId: string;
  date: string;
  sets: WorkoutSet[];
  note?: string;
  totalVolume: number;
  duration: number;
}

/**
 * 운동 루틴 템플릿
 */
export interface RoutineTemplate {
  id: string;
  name: string;
  exerciseIds: string[];
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * 운동 목표 타입
 */
export type FitnessGoal = 'bulking' | 'cutting' | 'maintenance';

/**
 * 사용자 프로필
 */
export interface UserProfile {
  id: string;
  name: string;
  weight: number;
  height: number;
  goal: FitnessGoal;
}

/**
 * API 응답 공통 타입
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

/**
 * 추천 운동 타입
 */
export type RecommendationType = 'default' | 'single_category' | 'multi_category';

/**
 * 추천 운동 정보
 */
export interface RecommendedExercise extends Exercise {
  recommendedSets: number;
  recommendedWeight: number;
  recommendedReps: number;
  reason: string;
}

/**
 * 운동 추천 결과
 */
export interface WorkoutRecommendation {
  type: RecommendationType;
  title: string;
  description: string;
  trainedYesterday?: MuscleCategory;
  trainedCategories?: MuscleCategory[];
  recommendedCategory?: MuscleCategory;
  recommendedExercises: RecommendedExercise[];
}

/**
 * 주간 통계
 */
export interface WeeklyStats {
  totalWorkouts: number;
  totalVolume: number;
  totalDuration: number;
  categoryStats: CategoryStat[];
  averageWorkoutDuration: number;
}

/**
 * 카테고리별 통계
 */
export interface CategoryStat {
  category: MuscleCategory;
  count: number;
  volume: number;
}
