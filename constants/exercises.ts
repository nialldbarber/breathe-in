const page = 'BreathingExercise';

export type ConfigT = {
  id: number;
  page: string;
  exerciseName: string;
  exercise: number[];
  delay: number;
  theme: string;
};

export const CALM_CONFIG: ConfigT[] = [
  {
    id: 1,
    page,
    exerciseName: 'Box',
    exercise: [4, 4, 4, 4],
    delay: 0,
    theme: 'blue',
  },
  {
    id: 2,
    page,
    exerciseName: 'Box #2',
    exercise: [5, 5, 5, 5],
    delay: 400,
    theme: 'blue',
  },
  {
    id: 3,
    page,
    exerciseName: 'Calm',
    exercise: [4, 7, 8, 0],
    delay: 800,
    theme: 'blue',
  },
  {
    id: 4,
    page,
    exerciseName: 'Deep',
    exercise: [5, 0, 5, 0],
    delay: 1200,
    theme: 'blue',
  },
];

export const AWAKE_CONFIG: ConfigT[] = [
  {
    id: 200,
    page,
    exerciseName: 'Awake',
    exercise: [6, 0, 2, 0],
    delay: 1600,
    theme: 'yellow',
  },
  {
    id: 201,
    page,
    exerciseName: 'Bliss',
    exercise: [6, 0, 2, 0],
    delay: 2000,
    theme: 'yellow',
  },
  {
    id: 200,
    page,
    exerciseName: 'Awake',
    exercise: [6, 0, 2, 0],
    delay: 1600,
    theme: 'yellow',
  },
  {
    id: 201,
    page,
    exerciseName: 'Bliss',
    exercise: [6, 0, 2, 0],
    delay: 2000,
    theme: 'yellow',
  },
];

export const NIGHT_TIME_CONFIG: ConfigT[] = [
  {
    id: 300,
    page,
    exerciseName: 'Sleep',
    exercise: [6, 0, 2, 0],
    delay: 2400,
    theme: 'purple',
  },
];

export const CONFIG = [
  {
    id: 1000,
    title: 'Calm',
    config: CALM_CONFIG,
    theme: 'blue',
  },
  {
    id: 1001,
    title: 'Awake',
    config: AWAKE_CONFIG,
    theme: 'yellow',
  },
  {
    id: 1002,
    title: 'Night',
    config: NIGHT_TIME_CONFIG,
    theme: 'purple',
  },
];
