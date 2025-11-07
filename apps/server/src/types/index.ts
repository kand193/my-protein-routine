export type ExerciseDifficulty = 'beginner' | 'intermediate' | 'advanced';
export type FitnessGoal = 'bulking' | 'cutting' | 'maintenance';

export interface MuscleCategory {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  color: string;
}

export interface Exercise {
  id: string;
  name: string;
  nameEn: string;
  categoryId: string;
  description: string;
  difficulty: ExerciseDifficulty;
  targetMuscles: string[];
}

export interface WorkoutSet {
  id: string;
  weight: number;
  reps: number;
  setNumber: number;
  completed: boolean;
  note?: string;
}

export interface WorkoutLog {
  id: string;
  exerciseId: string;
  date: string;
  sets: WorkoutSet[];
  note?: string;
  totalVolume: number;
  duration: number;
}

export interface RoutineTemplate {
  id: string;
  name: string;
  exerciseIds: string[];
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  weight: number;
  height: number;
  goal: FitnessGoal;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}
