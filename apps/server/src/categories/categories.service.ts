import { Injectable } from '@nestjs/common';
import { ApiResponse, MuscleCategory } from '../types';

@Injectable()
export class CategoriesService {
  private categories: MuscleCategory[] = [
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

  getAll(): ApiResponse<MuscleCategory[]> {
    return {
      success: true,
      data: this.categories,
      timestamp: new Date().toISOString(),
    };
  }
}
