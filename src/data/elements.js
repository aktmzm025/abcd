import { Droplets, Flame, Leaf, Circle } from 'lucide-react';

export const elements = {
  water: { 
    name: '물', 
    color: 'text-blue-500', 
    bgColor: 'bg-blue-500',
    icon: Droplets, 
    weakness: 'grass', 
    strength: 'fire' 
  },
  fire: { 
    name: '불', 
    color: 'text-red-500', 
    bgColor: 'bg-red-500',
    icon: Flame, 
    weakness: 'water', 
    strength: 'grass' 
  },
  grass: { 
    name: '풀', 
    color: 'text-green-500', 
    bgColor: 'bg-green-500',
    icon: Leaf, 
    weakness: 'fire', 
    strength: 'water' 
  },
  none: { 
    name: '무속성', 
    color: 'text-gray-500', 
    bgColor: 'bg-gray-500',
    icon: Circle, 
    weakness: null, 
    strength: null 
  }
};