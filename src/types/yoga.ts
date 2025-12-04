export interface YogaPose {
  id: string;
  name: string;
  sanskritName: string;
  description: string;
  benefits: string[];
  instructions: string[];
  duration: number; // in seconds
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'standing' | 'seated' | 'balance' | 'twist' | 'backbend' | 'forward-fold';
  imageUrl?: string;
}

export interface PoseDetectionResult {
  confidence: number;
  keypoints: Keypoint[];
  matchedPose?: string;
  feedback: string[];
}

export interface Keypoint {
  name: string;
  x: number;
  y: number;
  score: number;
}

export interface SessionStats {
  totalTime: number;
  posesCompleted: number;
  averageAccuracy: number;
  caloriesBurned: number;
}

export type SessionState = 'idle' | 'preparing' | 'active' | 'paused' | 'completed';
