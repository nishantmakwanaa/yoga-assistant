import { useEffect, useState } from 'react';
import { YogaPose } from '@/types/yoga';
import { useVoiceGuidance } from '@/hooks/useVoiceGuidance';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Play, Pause, RotateCcw, CheckCircle } from 'lucide-react';

interface PoseInstructionsProps {
  pose: YogaPose;
  isActive: boolean;
  onComplete?: () => void;
  onStart?: () => void;
}

export const PoseInstructions = ({ pose, isActive, onComplete, onStart }: PoseInstructionsProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(pose.duration);
  const [isPlaying, setIsPlaying] = useState(false);

  const {
    voiceEnabled,
    isSpeaking,
    speakInstruction,
    speakPoseIntro,
    speakCountdown,
    speakEncouragement,
    stopSpeaking,
    toggleVoice,
  } = useVoiceGuidance();

  // Reset when pose changes
  useEffect(() => {
    setCurrentStep(0);
    setTimeRemaining(pose.duration);
    setIsPlaying(false);
  }, [pose]);

  // Timer effect
  useEffect(() => {
    if (!isPlaying || !isActive) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsPlaying(false);
          if (voiceEnabled) {
            speakEncouragement();
          }
          onComplete?.();
          return 0;
        }
        
        // Countdown for last 5 seconds
        if (prev <= 6 && voiceEnabled) {
          speakCountdown(prev - 1);
        }
        
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, isActive, voiceEnabled, speakCountdown, speakEncouragement, onComplete]);

  // Speak instructions when step changes
  useEffect(() => {
    if (isPlaying && voiceEnabled && pose.instructions[currentStep]) {
      speakInstruction(pose.instructions[currentStep]);
    }
  }, [currentStep, isPlaying, voiceEnabled]);

  const handleStart = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    setTimeRemaining(pose.duration);
    onStart?.();
    
    if (voiceEnabled) {
      speakPoseIntro(pose.name, pose.description);
      setTimeout(() => {
        if (pose.instructions[0]) {
          speakInstruction(pose.instructions[0]);
        }
      }, 4000);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    stopSpeaking();
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setTimeRemaining(pose.duration);
    stopSpeaking();
  };

  const handleNextStep = () => {
    if (currentStep < pose.instructions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((pose.duration - timeRemaining) / pose.duration) * 100;

  return (
    <div className="rounded-2xl bg-card p-6 shadow-soft">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="font-serif text-2xl font-medium text-foreground">
            {pose.name}
          </h2>
          <p className="text-sm italic text-muted-foreground">
            {pose.sanskritName}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleVoice}
          className={voiceEnabled ? 'text-primary' : 'text-muted-foreground'}
        >
          {voiceEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
        </Button>
      </div>

      {/* Timer */}
      <div className="mb-6">
        <div className="relative mb-2 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-sage to-sage-dark transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Time Remaining</p>
          <p className="text-2xl font-bold text-foreground">{formatTime(timeRemaining)}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="mb-6 flex justify-center gap-3">
        {!isPlaying ? (
          <Button variant="zen" size="lg" onClick={handleStart}>
            <Play className="mr-2 h-5 w-5" />
            {timeRemaining === pose.duration ? 'Start' : 'Resume'}
          </Button>
        ) : (
          <Button variant="outline" size="lg" onClick={handlePause}>
            <Pause className="mr-2 h-5 w-5" />
            Pause
          </Button>
        )}
        <Button variant="ghost" size="lg" onClick={handleReset}>
          <RotateCcw className="mr-2 h-5 w-5" />
          Reset
        </Button>
      </div>

      {/* Instructions */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">Instructions</p>
        {pose.instructions.map((instruction, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 rounded-lg p-3 transition-colors ${
              index === currentStep && isPlaying
                ? 'bg-sage/10 border border-sage/20'
                : index < currentStep
                ? 'bg-muted/50'
                : 'bg-transparent'
            }`}
            onClick={() => isPlaying && setCurrentStep(index)}
          >
            <span
              className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs ${
                index < currentStep
                  ? 'bg-sage text-primary-foreground'
                  : index === currentStep && isPlaying
                  ? 'bg-primary text-primary-foreground animate-pulse-soft'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {index < currentStep ? <CheckCircle className="h-4 w-4" /> : index + 1}
            </span>
            <p className="text-sm text-muted-foreground">{instruction}</p>
          </div>
        ))}
      </div>

      {/* Navigation */}
      {isPlaying && currentStep < pose.instructions.length - 1 && (
        <Button
          variant="outline"
          className="mt-4 w-full"
          onClick={handleNextStep}
        >
          Next Step
        </Button>
      )}

      {/* Benefits */}
      <div className="mt-6 border-t border-border pt-4">
        <p className="mb-2 text-sm font-medium text-foreground">Benefits</p>
        <div className="flex flex-wrap gap-2">
          {pose.benefits.map((benefit, index) => (
            <span
              key={index}
              className="rounded-full bg-sage/10 px-3 py-1 text-xs text-sage-dark"
            >
              {benefit}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
