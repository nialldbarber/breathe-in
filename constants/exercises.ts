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

export type ConfigT = {
  id: number;
  page: string;
  exerciseName: string;
  exercise: number[];
  type?: number;
  delay: number;
  theme: string;
  tags?: string[];
};

export const CONFIG: ConfigT[] = [
  {
    id: 1,
    page,
    exerciseName: 'Box',
    exercise: [4, 4, 4, 4],
    type: 4,
    delay: 0,
    theme: 'blue',
    tags: [
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
    ],
  },
  {
    id: 2,
    page,
    exerciseName: 'Box #2',
    exercise: [5, 5, 5, 5],
    type: 4,
    delay: 400,
    theme: 'blue',
    tags: ['uplifted'],
  },
  {
    id: 3,
    page,
    exerciseName: 'Calm',
    exercise: [4, 7, 8, 0],
    type: 2,
    delay: 800,
    theme: 'blue',
    tags: ['uplifted'],
  },
  {
    id: 4,
    page,
    exerciseName: 'Deep',
    exercise: [5, 0, 5, 0],
    type: 1,
    delay: 1200,
    theme: 'blue',
    tags: ['uplifted'],
  },
];
