import { YogaPose } from '@/types/yoga';
import { Button } from '@/components/ui/button';
import { Clock, Sparkles } from 'lucide-react';

interface PoseCardProps {
  pose: YogaPose;
  onSelect: (pose: YogaPose) => void;
  isSelected?: boolean;
}

export const PoseCard = ({ pose, onSelect, isSelected }: PoseCardProps) => {
  const difficultyColors = {
    beginner: 'bg-sage-light text-sage-dark',
    intermediate: 'bg-terracotta-light text-terracotta',
    advanced: 'bg-accent/20 text-accent',
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-card p-6 shadow-soft transition-all duration-300 hover:shadow-float cursor-pointer ${
        isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
      }`}
      onClick={() => onSelect(pose)}
    >
      {/* Decorative element */}
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-sage/10 transition-transform duration-500 group-hover:scale-150" />
      
      <div className="relative">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="font-serif text-xl font-medium text-foreground">
              {pose.name}
            </h3>
            <p className="text-sm italic text-muted-foreground">
              {pose.sanskritName}
            </p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${difficultyColors[pose.difficulty]}`}>
            {pose.difficulty}
          </span>
        </div>

        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
          {pose.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{pose.duration}s</span>
          </div>
          <div className="flex items-center gap-1">
            <Sparkles className="h-4 w-4" />
            <span className="capitalize">{pose.category}</span>
          </div>
        </div>

        <Button
          variant="zen"
          size="sm"
          className="mt-4 w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(pose);
          }}
        >
          Practice This Pose
        </Button>
      </div>
    </div>
  );
};
