import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { ExercisesModule } from './exercises/exercises.module';
import { WorkoutLogsModule } from './workout-logs/workout-logs.module';
import { RoutinesModule } from './routines/routines.module';

@Module({
  imports: [
    CategoriesModule,
    ExercisesModule,
    WorkoutLogsModule,
    RoutinesModule,
  ],
})
export class AppModule {}
