export const IN = 'In';
export const OUT = 'Out';
export const HOLD = 'Hold';

const page = 'BreathingExercise';

export const feelings = [
  'activated',
  'alleviated',
  'awake',
  'balanced',
  'blissful',
  'calm',
  'clear',
  'cool',
  'dream',
  'euphoric',
  'energized',
  'focused',
  'pain relief',
  'peaceful',
  'recharged',
  'relaxed',
  'rise and shine',
  'sleepy',
  'stimulated',
  'tranquil',
  'uplifted',
  'unwind',
];

export const FEELINGS_COLOR_MAP: Record<string, string> = {
  calm: 'calm',
  energy: 'primary',
};

export type ConfigT = {
  id: number;
  page: string;
  exerciseName: string;
  exercise: number[];
  type?: number;
  theme: string;
  category?: string;
  tags?: string[];
};

// categories
// - calm
// - energy
// - night

// types
// - 1 = in hold out hold
// - 2 = in out hold
// - 3 = in hold out
// - 4 = in out

export const CONFIG: ConfigT[] = [
  {
    id: 1,
    page,
    exerciseName: 'Box',
    exercise: [4, 4, 4, 4],
    type: 1,
    theme: 'dark',
    category: 'calm',
    tags: [
      'alleviated',
      'balanced',
      'calm',
      'clear',
      'cool',
      'peaceful',
      'relaxed',
      'tranquil',
    ],
  },
  {
    id: 2,
    page,
    exerciseName: 'Calm',
    exercise: [4, 7, 8, 0],
    type: 2,
    theme: 'dark',
    category: 'calm',
    tags: ['uplifted'],
  },
  {
    id: 3,
    page,
    exerciseName: 'Deep',
    exercise: [5, 0, 5, 0],
    type: 4,
    theme: 'dark',
    category: 'calm',
    tags: ['uplifted'],
  },
  {
    id: 4,
    page,
    exerciseName: 'Awake',
    exercise: [6, 0, 2, 0],
    type: 4,
    theme: 'dark',
    category: 'energy',
    tags: [
      'activated',
      'awake',
      'euphoric',
      'energized',
      'rise and shine',
      'stimulated',
    ],
  },
];
