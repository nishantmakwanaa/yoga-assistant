import { useState, useCallback } from 'react';
import { YogaPose, SessionState, SessionStats } from '@/types/yoga';
import { yogaPoses } from '@/data/yogaPoses';
import { CameraView } from './CameraView';
import { PoseInstructions } from './PoseInstructions';
import { PoseLibrary } from './PoseLibrary';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy, Timer, Flame, Target } from 'lucide-react';

interface YogaSessionProps {
  onBack: () => void;
}

export const YogaSession = ({ onBack }: YogaSessionProps) => {
  const [selectedPose, setSelectedPose] = useState<YogaPose | null>(null);
  const [sessionState, setSessionState] = useState<SessionState>('idle');
  const [stats, setStats] = useState<SessionStats>({
    totalTime: 0,
    posesCompleted: 0,
    averageAccuracy: 0,
    caloriesBurned: 0,
  });
  const [currentAccuracy, setCurrentAccuracy] = useState(0);
  const [currentFeedback, setCurrentFeedback] = useState<string[]>([]);

  const handleSelectPose = (pose: YogaPose) => {
    setSelectedPose(pose);
    setSessionState('preparing');
  };

  const handleStartPose = () => {
    setSessionState('active');
  };

  const handleCompletePose = useCallback(() => {
    setStats((prev) => ({
      ...prev,
      posesCompleted: prev.posesCompleted + 1,
      totalTime: prev.totalTime + (selectedPose?.duration || 0),
      caloriesBurned: prev.caloriesBurned + Math.round((selectedPose?.duration || 0) * 0.15),
      averageAccuracy: (prev.averageAccuracy * prev.posesCompleted + currentAccuracy) / (prev.posesCompleted + 1),
    }));
    setSessionState('completed');
  }, [selectedPose, currentAccuracy]);

  const handlePoseUpdate = useCallback((confidence: number, feedback: string[]) => {
    setCurrentAccuracy(Math.round(confidence * 100));
    setCurrentFeedback(feedback);
  }, []);

  const handleNextPose = () => {
    const currentIndex = yogaPoses.findIndex((p) => p.id === selectedPose?.id);
    const nextPose = yogaPoses[(currentIndex + 1) % yogaPoses.length];
    setSelectedPose(nextPose);
    setSessionState('preparing');
  };

  const handleBackToLibrary = () => {
    setSelectedPose(null);
    setSessionState('idle');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Button variant="ghost" onClick={selectedPose ? handleBackToLibrary : onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {selectedPose ? 'All Poses' : 'Home'}
          </Button>

          {/* Session Stats */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm">
              <Timer className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">{Math.floor(stats.totalTime / 60)}m</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Trophy className="h-4 w-4 text-terracotta" />
              <span className="text-foreground">{stats.posesCompleted}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Flame className="h-4 w-4 text-accent" />
              <span className="text-foreground">{stats.caloriesBurned} cal</span>
            </div>
            {stats.posesCompleted > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <Target className="h-4 w-4 text-sage" />
                <span className="text-foreground">{Math.round(stats.averageAccuracy)}%</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!selectedPose ? (
          <>
            <div className="mb-8 text-center">
              <h1 className="font-serif text-3xl font-medium text-foreground md:text-4xl">
                Choose Your Pose
              </h1>
              <p className="mt-2 text-muted-foreground">
                Select a pose to begin your practice
              </p>
            </div>
            <PoseLibrary onSelectPose={handleSelectPose} selectedPose={selectedPose} />
          </>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Camera Section */}
            <div className="order-2 lg:order-1">
              <CameraView
                onPoseUpdate={handlePoseUpdate}
                isActive={sessionState === 'active'}
              />

              {/* Completion Overlay */}
              {sessionState === 'completed' && (
                <div className="mt-4 rounded-2xl bg-sage/10 p-6 text-center animate-fade-in">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sage">
                    <Trophy className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-serif text-xl font-medium text-foreground">
                    Pose Complete!
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    Great work on {selectedPose.name}
                  </p>
                  <div className="flex justify-center gap-3">
                    <Button variant="outline" onClick={handleBackToLibrary}>
                      Choose Another
                    </Button>
                    <Button variant="zen" onClick={handleNextPose}>
                      Next Pose
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Instructions Section */}
            <div className="order-1 lg:order-2">
              <PoseInstructions
                pose={selectedPose}
                isActive={sessionState === 'active'}
                onComplete={handleCompletePose}
                onStart={handleStartPose}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
