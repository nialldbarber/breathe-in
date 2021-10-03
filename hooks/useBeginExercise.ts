import {useState, useEffect} from 'react';

export default function useBeginExercise() {
  const [seconds, setSeconds] = useState(0);
  const [beginExercise, setBeginExercise] = useState<boolean>(false);

  useEffect(() => {
    if (beginExercise) {
      const interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [beginExercise, seconds]);

  const handleBeginExercise = (cond: boolean) => setBeginExercise(cond);
  const handleSetSeconds = (cond: number) => setSeconds(cond);

  return {
    seconds,
    beginExercise,
    handleBeginExercise,
    handleSetSeconds,
  };
}
