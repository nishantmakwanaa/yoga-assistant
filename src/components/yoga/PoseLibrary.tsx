import { useState } from 'react';
import { YogaPose } from '@/types/yoga';
import { yogaPoses } from '@/data/yogaPoses';
import { PoseCard } from './PoseCard';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface PoseLibraryProps {
  onSelectPose: (pose: YogaPose) => void;
  selectedPose?: YogaPose | null;
}

export const PoseLibrary = ({ onSelectPose, selectedPose }: PoseLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = ['all', 'standing', 'seated', 'balance', 'twist', 'backbend', 'forward-fold'];

  const filteredPoses = yogaPoses.filter(pose => {
    const matchesSearch = pose.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pose.sanskritName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || pose.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search poses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring sm:w-64"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={filterCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterCategory(category)}
              className="capitalize"
            >
              {category === 'all' ? 'All' : category.replace('-', ' ')}
            </Button>
          ))}
        </div>
      </div>

      {/* Pose Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPoses.map(pose => (
          <PoseCard
            key={pose.id}
            pose={pose}
            onSelect={onSelectPose}
            isSelected={selectedPose?.id === pose.id}
          />
        ))}
      </div>

      {filteredPoses.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No poses found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};
