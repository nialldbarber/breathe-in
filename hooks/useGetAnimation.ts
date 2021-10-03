import {useState, useEffect} from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import {sToM} from '../utils/time';
import {WIDTH, ORIGINAL_SIZE} from '../constants/theme';
import {Instruct} from '../screens/BreathingExercise';

export default function useGetAnimation(type: number, exercise: number[]) {
  const [seconds, setSeconds] = useState<number>(0);
  const [beginExercise, setBeginExercise] = useState<boolean>(false);
  const innerCircle = useSharedValue<number>(ORIGINAL_SIZE);
  const instructions = useSharedValue<Instruct>('');

  const innerCircleStyles = useAnimatedStyle(() => ({
    width: innerCircle.value,
    height: innerCircle.value,
    borderRadius: innerCircle.value / 2,
  }));

  const animatedText = useDerivedValue<string>((): string => {
    let str: Instruct = instructions.value;
    str = str.toString().replace(/NaN/g, '');
    return str;
  }, [beginExercise]);

  useEffect(() => {
    if (beginExercise) {
      innerCircle.value = withRepeat(
        withSequence(
          // in breath
          withTiming(WIDTH, {duration: sToM(exercise[0])}),
          // hold
          withTiming(WIDTH, {duration: sToM(exercise[1])}),
          // out breath
          withTiming(ORIGINAL_SIZE, {duration: sToM(exercise[2])}),
          // hold
          withTiming(ORIGINAL_SIZE, {duration: sToM(exercise[3])})
        ),
        -1,
        false
      );
    }
  }, [beginExercise]);

  useEffect(() => {
    if (beginExercise) {
      if (type === 4) {
        instructions.value = withRepeat(
          withSequence(
            withTiming('In', {duration: sToM(exercise[0])}),
            withTiming('Hold', {duration: sToM(exercise[1])}),
            withTiming('Out', {duration: sToM(exercise[2])}),
            withTiming('Hold', {duration: sToM(exercise[3])})
          ),
          -1,
          false
        );
      } else if (type === 3) {
        instructions.value = withRepeat(
          withSequence(
            withTiming('In', {duration: sToM(exercise[0])}),
            withTiming('Out', {duration: sToM(exercise[2])}),
            withTiming('Hold', {duration: sToM(exercise[3])})
          ),
          -1,
          false
        );
      } else if (type === 2) {
        instructions.value = withRepeat(
          withSequence(
            withTiming('In', {duration: sToM(exercise[0])}),
            withTiming('Hold', {duration: sToM(exercise[1])}),
            withTiming('Out', {duration: sToM(exercise[2])})
          ),
          -1,
          false
        );
      } else if (type === 1) {
        instructions.value = withRepeat(
          withSequence(
            withTiming('In', {duration: sToM(exercise[0])}),
            withTiming('Out', {duration: sToM(exercise[2])})
          ),
          -1,
          false
        );
      }
    }
  }, [beginExercise]);

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
    innerCircle,
    instructions,
    innerCircleStyles,
    animatedText,
  };
}
