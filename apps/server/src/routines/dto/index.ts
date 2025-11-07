export class CreateRoutineDto {
  name: string;
  exerciseIds: string[];
  categoryId: string;
}

export class UpdateRoutineDto {
  name?: string;
  exerciseIds?: string[];
  categoryId?: string;
}
