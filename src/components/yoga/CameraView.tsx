import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, CameraOff, Loader2, RefreshCw } from 'lucide-react';

interface CameraViewProps {
  onPoseUpdate?: (confidence: number, feedback: string[]) => void;
  isActive: boolean;
}

export const CameraView = ({ onPoseUpdate, isActive }: CameraViewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle camera toggle
  const handleStartCamera = async () => {
    if (!videoRef.current) return;

    try {
      setIsLoading(true);
      setCameraError(null);
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user',
        },
      });
      
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setCameraActive(true);
      setIsLoading(false);
      
      // Simulate pose detection feedback
      if (onPoseUpdate) {
        onPoseUpdate(0.75, ['Great posture! Keep your shoulders relaxed.']);
      }
    } catch (err) {
      setCameraError('Unable to access camera. Please check permissions.');
      setCameraActive(false);
      setIsLoading(false);
    }
  };

  const handleStopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  // Auto-start camera when session is active
  useEffect(() => {
    if (isActive && !cameraActive && !isLoading) {
      handleStartCamera();
    } else if (!isActive && cameraActive) {
      handleStopCamera();
    }
  }, [isActive]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      handleStopCamera();
    };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-card shadow-lg border border-border">
      {/* Video Container */}
      <div className="relative aspect-[4/3] w-full bg-muted">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ transform: 'scaleX(-1)' }}
          playsInline
          muted
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full pointer-events-none"
          style={{ transform: 'scaleX(-1)' }}
        />

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
              <p className="mt-2 text-sm text-muted-foreground">Starting camera...</p>
            </div>
          </div>
        )}

        {/* Camera Off Overlay */}
        {!cameraActive && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-card shadow-md">
                <Camera className="h-10 w-10 text-primary" />
              </div>
              <p className="mb-4 text-muted-foreground">Camera is off</p>
              <Button variant="default" onClick={handleStartCamera} disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Camera className="mr-2 h-4 w-4" />}
                Start Camera
              </Button>
            </div>
          </div>
        )}

        {/* Error Overlay */}
        {cameraError && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm">
            <div className="text-center px-4">
              <p className="text-destructive mb-4">{cameraError}</p>
              <Button variant="outline" onClick={handleStartCamera}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry
              </Button>
            </div>
          </div>
        )}

        {/* Confidence Indicator */}
        {cameraActive && (
          <div className="absolute left-4 top-4 rounded-lg bg-card/90 px-4 py-2 backdrop-blur-sm border border-border">
            <p className="text-xs text-muted-foreground">Pose Confidence</p>
            <p className="text-2xl font-bold text-primary">75%</p>
          </div>
        )}

        {/* Camera Toggle Button */}
        {cameraActive && (
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-4 top-4"
            onClick={handleStopCamera}
          >
            <CameraOff className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Feedback Section */}
      {cameraActive && (
        <div className="border-t border-border p-4">
          <p className="mb-2 text-sm font-medium text-foreground">Feedback</p>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">• Great posture! Keep your shoulders relaxed.</p>
            <p className="text-sm text-muted-foreground">• Stay in frame for best detection.</p>
          </div>
        </div>
      )}
    </div>
  );
};
