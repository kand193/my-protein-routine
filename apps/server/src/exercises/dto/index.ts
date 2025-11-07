import { ExerciseDifficulty } from '../../types';

export class CreateExerciseDto {
  name: string;
  nameEn: string;
  categoryId: string;
  description: string;
  difficulty: ExerciseDifficulty;
  targetMuscles: string[];
}

export class UpdateExerciseDto {
  name?: string;
  nameEn?: string;
  categoryId?: string;
  description?: string;
  difficulty?: ExerciseDifficulty;
  targetMuscles?: string[];
}
