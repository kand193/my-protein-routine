export class CreateWorkoutLogDto {
  exerciseId: string;
  date?: string;
  sets: {
    weight: number;
    reps: number;
    note?: string;
  }[];
  note?: string;
}

export class UpdateWorkoutLogDto {
  sets?: {
    id?: string;
    weight: number;
    reps: number;
    completed?: boolean;
    note?: string;
  }[];
  note?: string;
  duration?: number;
}

export class AddSetDto {
  weight: number;
  reps: number;
  note?: string;
}
