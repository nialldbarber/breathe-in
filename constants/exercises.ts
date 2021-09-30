const page = 'BreathingExercise';

type ConfigT = {
  id: number;
  page: string;
  exerciseName: string;
  exercise: number[];
  delay: number;
};

export const CONFIG: ConfigT[] = [
  {id: 1, page, exerciseName: 'Box', exercise: [4, 4, 4, 4], delay: 0},
  {id: 1, page, exerciseName: 'Box #2', exercise: [5, 5, 5, 5], delay: 0},
  {id: 2, page, exerciseName: 'Awake', exercise: [6, 0, 2, 0], delay: 700},
  {id: 3, page, exerciseName: 'Calm', exercise: [4, 7, 8, 0], delay: 1400},
];
