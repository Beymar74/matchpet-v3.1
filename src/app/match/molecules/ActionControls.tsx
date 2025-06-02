import React from 'react';
import { Heart, XCircle, Undo2 } from 'lucide-react';
import { Button } from '../atoms/Button';
import { AnimatedIcon } from '../atoms/AnimatedIcon';

interface ActionControlsProps {
  onDislike: () => void;
  onUndo: () => void;
  onLike: () => void;
  canUndo: boolean;
  isAnimating: boolean;
}

export const ActionControls: React.FC<ActionControlsProps> = ({ 
  onDislike, 
  onUndo, 
  onLike, 
  canUndo, 
  isAnimating 
}) => {
  return (
    <div className="flex justify-center items-center gap-6">
      <Button
        variant="danger"
        size="icon-lg"
        onClick={onDislike}
        disabled={isAnimating}
        className="group"
      >
        <AnimatedIcon icon={XCircle} className="w-7 h-7" />
      </Button>

      <Button
        variant="secondary"
        size="icon"
        onClick={onUndo}
        disabled={isAnimating || !canUndo}
      >
        <Undo2 className="w-5 h-5" />
      </Button>

      <Button
        variant="success"
        size="icon-lg"
        onClick={onLike}
        disabled={isAnimating}
        className="group"
      >
        <AnimatedIcon icon={Heart} className="w-7 h-7" />
      </Button>
    </div>
  );
};