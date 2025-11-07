import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { workoutLogs, exercises, muscleCategories } from '../mockData';
import { getWeeklyStats } from '../utils/workoutRecommendation';
import { WorkoutLog, Exercise, MuscleCategory, WeeklyStats } from '../types';

export default function MyScreen() {
  const [logs, setLogs] = useState<WorkoutLog[]>([]);
  const [weeklyStats, setWeeklyStats] = useState<WeeklyStats | null>(null);

  useEffect(() => {
    setLogs(workoutLogs);
    const stats = getWeeklyStats(workoutLogs);
    setWeeklyStats(stats);
  }, []);

  const getExerciseInfo = (exerciseId: string): Exercise | undefined => {
    return exercises.find(ex => ex.id === exerciseId);
  };

  const getCategoryInfo = (categoryId: string): MuscleCategory | undefined => {
    return muscleCategories.find(cat => cat.id === categoryId);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${month}/${day} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const formatDuration = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes}분`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}시간 ${mins}분`;
  };

  const groupLogsByDate = (logs: WorkoutLog[]): Record<string, WorkoutLog[]> => {
    const grouped: Record<string, WorkoutLog[]> = {};
    logs.forEach(log => {
      const date = new Date(log.date).toISOString().split('T')[0];
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(log);
    });
    return grouped;
  };

  const groupedLogs = groupLogsByDate(logs);
  const sortedDates = Object.keys(groupedLogs).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* 헤더 */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>마이</Text>
          <Text style={styles.headerSubtitle}>운동 기록을 확인하세요</Text>
        </View>

        {/* 주간 통계 */}
        {weeklyStats && (
          <View style={styles.statsCard}>
            <Text style={styles.statsTitle}>📊 최근 7일 통계</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>총 운동</Text>
                <Text style={styles.statValue}>{weeklyStats.totalWorkouts}회</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>총 볼륨</Text>
                <Text style={styles.statValue}>{(weeklyStats.totalVolume / 1000).toFixed(1)}톤</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>총 시간</Text>
                <Text style={styles.statValue}>{formatDuration(weeklyStats.totalDuration)}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>평균 시간</Text>
                <Text style={styles.statValue}>{weeklyStats.averageWorkoutDuration}분</Text>
              </View>
            </View>

            {/* 부위별 통계 */}
            {weeklyStats.categoryStats.length > 0 && (
              <View style={styles.categoryStatsSection}>
                <Text style={styles.categoryStatsTitle}>부위별 운동 횟수</Text>
                <View style={styles.categoryStatsList}>
                  {weeklyStats.categoryStats.map((stat) => (
                    <View
                      key={stat.category.id}
                      style={[
                        styles.categoryStatItem,
                        { backgroundColor: stat.category.color + '20' },
                      ]}
                    >
                      <Text style={styles.categoryStatIcon}>{stat.category.icon}</Text>
                      <Text style={styles.categoryStatName}>{stat.category.name}</Text>
                      <Text style={styles.categoryStatCount}>{stat.count}회</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        {/* 운동 기록 목록 */}
        <View style={styles.logsSection}>
          <Text style={styles.sectionTitle}>운동 기록</Text>

          {sortedDates.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateIcon}>📝</Text>
              <Text style={styles.emptyStateText}>아직 운동 기록이 없습니다</Text>
              <Text style={styles.emptyStateSubtext}>홈에서 운동을 시작해보세요!</Text>
            </View>
          ) : (
            sortedDates.map((date) => {
              const dateLogs = groupedLogs[date];
              const totalVolume = dateLogs.reduce((sum, log) => sum + log.totalVolume, 0);
              const totalDuration = dateLogs.reduce((sum, log) => sum + log.duration, 0);

              return (
                <View key={date} style={styles.dateGroup}>
                  <View style={styles.dateHeader}>
                    <Text style={styles.dateText}>
                      {new Date(date).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        weekday: 'short',
                      })}
                    </Text>
                    <View style={styles.dateSummary}>
                      <Text style={styles.dateSummaryText}>
                        {dateLogs.length}개 운동 • {formatDuration(totalDuration)} • {(totalVolume / 1000).toFixed(1)}톤
                      </Text>
                    </View>
                  </View>

                  {dateLogs.map((log) => {
                    const exercise = getExerciseInfo(log.exerciseId);
                    const category = exercise ? getCategoryInfo(exercise.categoryId) : undefined;

                    return (
                      <TouchableOpacity key={log.id} style={styles.logCard}>
                        <View style={styles.logHeader}>
                          <View style={styles.logTitleSection}>
                            {category && (
                              <View
                                style={[
                                  styles.categoryDot,
                                  { backgroundColor: category.color },
                                ]}
                              />
                            )}
                            <View>
                              <Text style={styles.logExerciseName}>{exercise?.name}</Text>
                              <Text style={styles.logExerciseNameEn}>{exercise?.nameEn}</Text>
                            </View>
                          </View>
                          <Text style={styles.logTime}>{formatDate(log.date)}</Text>
                        </View>

                        {/* 세트 정보 */}
                        <View style={styles.setsContainer}>
                          {log.sets.map((set) => (
                            <View
                              key={set.id}
                              style={[
                                styles.setRow,
                                !set.completed && styles.setRowIncomplete,
                              ]}
                            >
                              <Text style={styles.setNumber}>{set.setNumber}세트</Text>
                              <Text style={styles.setInfo}>
                                {set.weight}kg × {set.reps}회
                              </Text>
                              <Text style={styles.setVolume}>
                                {(set.weight * set.reps).toLocaleString()}
                              </Text>
                              {set.completed ? (
                                <Text style={styles.setCompleted}>✓</Text>
                              ) : (
                                <Text style={styles.setIncomplete}>-</Text>
                              )}
                            </View>
                          ))}
                        </View>

                        {/* 총계 */}
                        <View style={styles.logFooter}>
                          <View style={styles.logStat}>
                            <Text style={styles.logStatLabel}>총 볼륨</Text>
                            <Text style={styles.logStatValue}>
                              {log.totalVolume.toLocaleString()}kg
                            </Text>
                          </View>
                          <View style={styles.logStat}>
                            <Text style={styles.logStatLabel}>소요 시간</Text>
                            <Text style={styles.logStatValue}>{log.duration}분</Text>
                          </View>
                          <View style={styles.logStat}>
                            <Text style={styles.logStatLabel}>세트 수</Text>
                            <Text style={styles.logStatValue}>{log.sets.length}세트</Text>
                          </View>
                        </View>

                        {log.note && (
                          <View style={styles.noteContainer}>
                            <Text style={styles.noteLabel}>메모:</Text>
                            <Text style={styles.noteText}>{log.note}</Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              );
            })
          )}
        </View>
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
  statsCard: {
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
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#6C757D',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
  },
  categoryStatsSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  categoryStatsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 12,
  },
  categoryStatsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    gap: 6,
  },
  categoryStatIcon: {
    fontSize: 16,
  },
  categoryStatName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212529',
  },
  categoryStatCount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#495057',
  },
  logsSection: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 12,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 4,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#6C757D',
  },
  dateGroup: {
    marginBottom: 24,
  },
  dateHeader: {
    marginBottom: 12,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  dateSummary: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateSummaryText: {
    fontSize: 12,
    color: '#6C757D',
  },
  logCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  logTitleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  logExerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
  },
  logExerciseNameEn: {
    fontSize: 11,
    color: '#6C757D',
    marginTop: 2,
  },
  logTime: {
    fontSize: 12,
    color: '#6C757D',
  },
  setsContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  setRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  setRowIncomplete: {
    opacity: 0.5,
  },
  setNumber: {
    fontSize: 13,
    fontWeight: '600',
    color: '#495057',
    width: 60,
  },
  setInfo: {
    fontSize: 14,
    color: '#212529',
    flex: 1,
  },
  setVolume: {
    fontSize: 13,
    color: '#6C757D',
    width: 60,
    textAlign: 'right',
  },
  setCompleted: {
    fontSize: 16,
    color: '#28A745',
    width: 20,
    textAlign: 'center',
  },
  setIncomplete: {
    fontSize: 16,
    color: '#CED4DA',
    width: 20,
    textAlign: 'center',
  },
  logFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  logStat: {
    alignItems: 'center',
  },
  logStatLabel: {
    fontSize: 11,
    color: '#6C757D',
    marginBottom: 4,
  },
  logStatValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#212529',
  },
  noteContainer: {
    marginTop: 12,
    padding: 10,
    backgroundColor: '#FFF9DB',
    borderRadius: 8,
  },
  noteLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#856404',
    marginBottom: 4,
  },
  noteText: {
    fontSize: 13,
    color: '#856404',
    lineHeight: 18,
  },
});
