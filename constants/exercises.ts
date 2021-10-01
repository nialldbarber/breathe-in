const page = 'BreathingExercise';

type ConfigT = {
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
];

export const AWAKE_CONFIG: ConfigT[] = [
  {
    id: 4,
    page,
    exerciseName: 'Awake',
    exercise: [6, 0, 2, 0],
    delay: 1200,
    theme: 'yellow',
  },
];

export const CONFIG = [
  {
    id: 100,
    title: 'Calm',
    config: CALM_CONFIG,
    image: require('../assets/exercises/calm.jpg'),
  },
  {
    id: 101,
    title: 'Awake',
    config: AWAKE_CONFIG,
    image: require('../assets/exercises/awake.jpg'),
  },
];
