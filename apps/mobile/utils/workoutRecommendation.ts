import {
  WorkoutLog,
  Exercise,
  MuscleCategory,
  WorkoutRecommendation,
  RecommendedExercise,
  WeeklyStats,
  CategoryStat,
} from '../types';
import { workoutLogs, exercises, muscleCategories } from '../mockData';

/**
 * 전날 운동 기록을 분석하여 오늘의 추천 운동을 생성
 */
export const getWorkoutRecommendation = (allLogs: WorkoutLog[] = workoutLogs): WorkoutRecommendation => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // 어제 날짜 (YYYY-MM-DD 형식)
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  // 어제 운동 기록 필터링
  const yesterdayLogs = allLogs.filter(log => {
    const logDate = new Date(log.date).toISOString().split('T')[0];
    return logDate === yesterdayStr;
  });

  if (yesterdayLogs.length === 0) {
    // 어제 운동 기록이 없으면 기본 추천 (가슴 운동)
    return getDefaultRecommendation();
  }

  // 어제 운동한 카테고리 분석
  const yesterdayCategoryCount: Record<string, number> = {};
  const yesterdayExerciseDetails: Record<string, {
    exercise: Exercise;
    maxWeight: number;
    totalSets: number;
  }> = {};

  yesterdayLogs.forEach(log => {
    const exercise = exercises.find(ex => ex.id === log.exerciseId);
    if (exercise) {
      const categoryId = exercise.categoryId;
      yesterdayCategoryCount[categoryId] = (yesterdayCategoryCount[categoryId] || 0) + 1;

      // 각 운동별 최대 무게 기록
      if (!yesterdayExerciseDetails[log.exerciseId]) {
        yesterdayExerciseDetails[log.exerciseId] = {
          exercise,
          maxWeight: 0,
          totalSets: 0,
        };
      }

      log.sets.forEach(set => {
        if (set.weight > yesterdayExerciseDetails[log.exerciseId].maxWeight) {
          yesterdayExerciseDetails[log.exerciseId].maxWeight = set.weight;
        }
      });
      yesterdayExerciseDetails[log.exerciseId].totalSets += log.sets.length;
    }
  });

  // 어제 운동한 부위 개수
  const categoryCount = Object.keys(yesterdayCategoryCount).length;

  // 추천 로직
  if (categoryCount === 1) {
    // 하나의 부위만 집중적으로 운동 -> 다른 부위 추천
    return getSingleCategoryRecommendation(yesterdayCategoryCount, yesterdayExerciseDetails);
  } else {
    // 여러 부위를 조금씩 운동 -> 비슷하게 여러 부위 추천
    return getMultiCategoryRecommendation(yesterdayCategoryCount, yesterdayExerciseDetails);
  }
};

/**
 * 기본 추천 (운동 기록이 없을 때)
 */
const getDefaultRecommendation = (): WorkoutRecommendation => {
  const chestExercises = exercises.filter(ex => ex.categoryId === 'cat_chest').slice(0, 3);

  return {
    type: 'default',
    title: '오늘의 추천 운동',
    description: '운동을 시작해보세요! 가슴 운동으로 시작하는 것을 추천합니다.',
    recommendedExercises: chestExercises.map(ex => ({
      ...ex,
      recommendedSets: 3,
      recommendedWeight: 0, // 초기 무게는 사용자가 설정
      recommendedReps: 10,
      reason: '기본 추천',
    })),
  };
};

/**
 * 단일 부위 집중 운동 후 추천
 */
const getSingleCategoryRecommendation = (
  yesterdayCategoryCount: Record<string, number>,
  yesterdayExerciseDetails: Record<string, { exercise: Exercise; maxWeight: number; totalSets: number }>
): WorkoutRecommendation => {
  const trainedCategoryId = Object.keys(yesterdayCategoryCount)[0];
  const trainedCategory = muscleCategories.find(cat => cat.id === trainedCategoryId);

  // 어제 운동하지 않은 카테고리들
  const availableCategories = muscleCategories.filter(cat => cat.id !== trainedCategoryId);

  // 랜덤으로 하나 선택 (실제로는 더 스마트한 로직 가능)
  const recommendedCategory = availableCategories[0]; // 첫 번째 카테고리 선택

  // 해당 카테고리의 운동 3개 선택
  const recommendedExercises: RecommendedExercise[] = exercises
    .filter(ex => ex.categoryId === recommendedCategory.id)
    .slice(0, 3)
    .map(ex => {
      // 이전에 같은 운동을 했다면 무게 증가
      const previousDetail = yesterdayExerciseDetails[ex.id];
      const recommendedWeight = previousDetail
        ? Math.round(previousDetail.maxWeight * 1.025) // 2.5% 증가
        : 0;

      return {
        ...ex,
        recommendedSets: 3,
        recommendedWeight,
        recommendedReps: 10,
        reason: previousDetail
          ? `전날 ${previousDetail.maxWeight}kg → ${recommendedWeight}kg (+2.5%)`
          : '새로운 운동',
      };
    });

  return {
    type: 'single_category',
    title: `${recommendedCategory.name} 운동 추천`,
    description: `어제 ${trainedCategory!.name} 운동을 하셨네요! 오늘은 ${recommendedCategory.name}을 운동하는 것을 추천합니다.`,
    trainedYesterday: trainedCategory,
    recommendedCategory,
    recommendedExercises,
  };
};

/**
 * 다중 부위 운동 후 추천
 */
const getMultiCategoryRecommendation = (
  yesterdayCategoryCount: Record<string, number>,
  yesterdayExerciseDetails: Record<string, { exercise: Exercise; maxWeight: number; totalSets: number }>
): WorkoutRecommendation => {
  // 어제 운동한 카테고리들을 오늘도 추천 (전신 운동 스타일)
  const recommendedExercises: RecommendedExercise[] = [];

  Object.keys(yesterdayCategoryCount).forEach(categoryId => {
    // 각 카테고리별로 1-2개 운동 선택
    const categoryExercises = exercises.filter(ex => ex.categoryId === categoryId);

    // 어제 한 운동이면 무게 증가, 안 한 운동이면 그대로
    const selectedExercises = categoryExercises.slice(0, 2).map(ex => {
      const previousDetail = yesterdayExerciseDetails[ex.id];
      const recommendedWeight = previousDetail
        ? Math.round(previousDetail.maxWeight * 1.025) // 2.5% 증가
        : 0;

      return {
        ...ex,
        recommendedSets: 3,
        recommendedWeight,
        recommendedReps: 10,
        reason: previousDetail
          ? `전날 ${previousDetail.maxWeight}kg → ${recommendedWeight}kg (+2.5%)`
          : '새로운 운동',
      };
    });

    recommendedExercises.push(...selectedExercises);
  });

  const categories = Object.keys(yesterdayCategoryCount)
    .map(id => muscleCategories.find(cat => cat.id === id))
    .filter((cat): cat is MuscleCategory => cat !== undefined);

  return {
    type: 'multi_category',
    title: '전신 운동 추천',
    description: `어제 여러 부위를 운동하셨네요! 오늘도 ${categories.map(c => c.name).join(', ')} 운동을 추천합니다.`,
    trainedCategories: categories,
    recommendedExercises: recommendedExercises.slice(0, 6), // 최대 6개
  };
};

/**
 * 최근 7일간 운동 통계
 */
export const getWeeklyStats = (allLogs: WorkoutLog[] = workoutLogs): WeeklyStats => {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentLogs = allLogs.filter(log => {
    const logDate = new Date(log.date);
    return logDate >= sevenDaysAgo && logDate <= today;
  });

  // 부위별 운동 횟수
  const categoryStatsMap: Record<string, CategoryStat> = {};
  let totalVolume = 0;
  let totalDuration = 0;

  recentLogs.forEach(log => {
    const exercise = exercises.find(ex => ex.id === log.exerciseId);
    if (exercise) {
      const categoryId = exercise.categoryId;
      const category = muscleCategories.find(cat => cat.id === categoryId);

      if (category) {
        if (!categoryStatsMap[categoryId]) {
          categoryStatsMap[categoryId] = {
            category,
            count: 0,
            volume: 0,
          };
        }
        categoryStatsMap[categoryId].count += 1;
        categoryStatsMap[categoryId].volume += log.totalVolume;
      }
    }
    totalVolume += log.totalVolume;
    totalDuration += log.duration;
  });

  return {
    totalWorkouts: recentLogs.length,
    totalVolume,
    totalDuration,
    categoryStats: Object.values(categoryStatsMap),
    averageWorkoutDuration: recentLogs.length > 0 ? Math.round(totalDuration / recentLogs.length) : 0,
  };
};
