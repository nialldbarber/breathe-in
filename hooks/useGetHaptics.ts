import {useEffect} from 'react';
import Animated from 'react-native-reanimated';
import {getAnimatedTextFormatted} from '../utils/animated-text';
import {impactAsync} from '../utils/haptics';
import {Instruct} from '../screens/BreathingExercise';

export default function useGetHaptics(
  instructions: Animated.SharedValue<Instruct>
) {
  useEffect(() => {
    const str = getAnimatedTextFormatted(instructions.value);

    if (str === 'In' || str === 'Out') {
      impactAsync('medium');
      setTimeout(() => {
        impactAsync('medium');
      }, 50);
      setTimeout(() => {
        impactAsync('medium');
      }, 100);
    }
  }, [instructions.value]);
}
