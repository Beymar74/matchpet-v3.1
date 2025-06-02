import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '../atoms/Button';

interface MatchModalProps {
  pet: string | null;
  onClose: () => void;
  onViewProfile: () => void;
}

export const MatchModal: React.FC<MatchModalProps> = ({ pet, onClose, onViewProfile }) => {
  if (!pet) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-bounce-in">
        <div className="relative">
          <div className="text-6xl mb-4">🎉</div>
          <Sparkles className="absolute top-0 right-1/4 w-6 h-6 text-yellow-400 animate-pulse" />
          <Sparkles className="absolute bottom-0 left-1/4 w-4 h-4 text-pink-400 animate-pulse delay-75" />
        </div>
        
        <h3 className="text-2xl font-bold text-[#30588C] mb-2">¡Es un Match!</h3>
        <p className="text-gray-600 mb-6">
          Tú y <span className="font-bold text-[#BF3952]">{pet}</span> son una pareja perfecta
        </p>
        
        <div className="flex gap-3">
          <Button variant="primary" size="md" onClick={onViewProfile} className="flex-1">
            Ver perfil completo
          </Button>
          <Button variant="ghost" size="md" onClick={onClose}>
            Seguir
          </Button>
        </div>
      </div>
    </div>
  );
};