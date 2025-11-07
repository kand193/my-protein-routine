import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { getWorkoutRecommendation } from '../utils/workoutRecommendation';
import { workoutLogs } from '../mockData';
import { WorkoutRecommendation, RecommendedExercise } from '../types';

export default function HomeScreen() {
  const [recommendation, setRecommendation] = useState<WorkoutRecommendation | null>(null);

  useEffect(() => {
    // 추천 운동 로드
    const rec = getWorkoutRecommendation(workoutLogs);
    setRecommendation(rec);
  }, []);

  const handleStartWorkout = (exercise: RecommendedExercise) => {
    // TODO: 운동 시작 화면으로 이동
    console.log('운동 시작:', exercise.name);
  };

  if (!recommendation) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>로딩 중...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* 헤더 */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>홈</Text>
          <Text style={styles.headerSubtitle}>오늘도 운동을 시작해보세요!</Text>
        </View>

        {/* 추천 운동 카드 */}
        <View style={styles.recommendationCard}>
          <View style={styles.recommendationHeader}>
            <Text style={styles.recommendationTitle}>{recommendation.title}</Text>
            <Text style={styles.recommendationType}>
              {recommendation.type === 'default' && '🎯'}
              {recommendation.type === 'single_category' && '💪'}
              {recommendation.type === 'multi_category' && '🔥'}
            </Text>
          </View>
          <Text style={styles.recommendationDescription}>{recommendation.description}</Text>

          {/* 전날 운동 정보 */}
          {recommendation.trainedYesterday && (
            <View style={styles.yesterdayInfo}>
              <Text style={styles.yesterdayLabel}>어제 운동:</Text>
              <View style={[styles.categoryBadge, { backgroundColor: recommendation.trainedYesterday.color + '30' }]}>
                <Text style={styles.categoryBadgeText}>
                  {recommendation.trainedYesterday.icon} {recommendation.trainedYesterday.name}
                </Text>
              </View>
            </View>
          )}

          {recommendation.trainedCategories && (
            <View style={styles.yesterdayInfo}>
              <Text style={styles.yesterdayLabel}>어제 운동:</Text>
              <View style={styles.categoryList}>
                {recommendation.trainedCategories.map(cat => (
                  <View
                    key={cat.id}
                    style={[styles.categoryBadge, { backgroundColor: cat.color + '30' }]}
                  >
                    <Text style={styles.categoryBadgeText}>
                      {cat.icon} {cat.name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* 추천 운동 목록 */}
        <View style={styles.exerciseSection}>
          <Text style={styles.sectionTitle}>추천 운동 목록</Text>

          {recommendation.recommendedExercises.map((exercise) => (
            <TouchableOpacity
              key={exercise.id}
              style={styles.exerciseCard}
              onPress={() => handleStartWorkout(exercise)}
            >
              <View style={styles.exerciseCardHeader}>
                <View>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <Text style={styles.exerciseNameEn}>{exercise.nameEn}</Text>
                </View>
                <View style={styles.difficultyBadge}>
                  <Text style={styles.difficultyText}>
                    {exercise.difficulty === 'beginner' && '🟢 초급'}
                    {exercise.difficulty === 'intermediate' && '🟡 중급'}
                    {exercise.difficulty === 'advanced' && '🔴 고급'}
                  </Text>
                </View>
              </View>

              <Text style={styles.exerciseDescription}>{exercise.description}</Text>

              <View style={styles.exerciseTarget}>
                <Text style={styles.targetLabel}>타겟 근육:</Text>
                <Text style={styles.targetMuscles}>{exercise.targetMuscles.join(', ')}</Text>
              </View>

              <View style={styles.recommendationDetails}>
                <View style={styles.recommendationItem}>
                  <Text style={styles.recommendationLabel}>세트</Text>
                  <Text style={styles.recommendationValue}>{exercise.recommendedSets}</Text>
                </View>
                <View style={styles.recommendationItem}>
                  <Text style={styles.recommendationLabel}>횟수</Text>
                  <Text style={styles.recommendationValue}>{exercise.recommendedReps}</Text>
                </View>
                <View style={styles.recommendationItem}>
                  <Text style={styles.recommendationLabel}>무게</Text>
                  <Text style={styles.recommendationValue}>
                    {exercise.recommendedWeight > 0
                      ? `${exercise.recommendedWeight}kg`
                      : '설정필요'}
                  </Text>
                </View>
              </View>

              {exercise.reason && (
                <View style={styles.reasonBadge}>
                  <Text style={styles.reasonText}>{exercise.reason}</Text>
                </View>
              )}

              <TouchableOpacity style={styles.startButton} onPress={() => handleStartWorkout(exercise)}>
                <Text style={styles.startButtonText}>운동 시작</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* 빠른 시작 버튼 */}
        <TouchableOpacity style={styles.quickStartButton}>
          <Text style={styles.quickStartButtonText}>🎯 전체 루틴으로 시작하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#212529',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6C757D',
    marginTop: 4,
  },
  recommendationCard: {
    margin: 16,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  recommendationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
  },
  recommendationType: {
    fontSize: 24,
  },
  recommendationDescription: {
    fontSize: 14,
    color: '#6C757D',
    lineHeight: 20,
    marginBottom: 12,
  },
  yesterdayInfo: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  yesterdayLabel: {
    fontSize: 12,
    color: '#6C757D',
    marginBottom: 8,
  },
  categoryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
  },
  exerciseSection: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 12,
  },
  exerciseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  exerciseCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
  },
  exerciseNameEn: {
    fontSize: 12,
    color: '#6C757D',
    marginTop: 2,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: '600',
  },
  exerciseDescription: {
    fontSize: 14,
    color: '#6C757D',
    lineHeight: 20,
    marginBottom: 8,
  },
  exerciseTarget: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  targetLabel: {
    fontSize: 12,
    color: '#6C757D',
    marginRight: 8,
  },
  targetMuscles: {
    fontSize: 12,
    color: '#212529',
    fontWeight: '500',
  },
  recommendationDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    marginBottom: 8,
  },
  recommendationItem: {
    alignItems: 'center',
  },
  recommendationLabel: {
    fontSize: 11,
    color: '#6C757D',
    marginBottom: 4,
  },
  recommendationValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
  },
  reasonBadge: {
    backgroundColor: '#E7F5FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 8,
  },
  reasonText: {
    fontSize: 12,
    color: '#1971C2',
    fontWeight: '500',
  },
  startButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  quickStartButton: {
    margin: 16,
    backgroundColor: '#28A745',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 32,
  },
  quickStartButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
