import * as React from 'react';
import Animated, {useAnimatedProps} from 'react-native-reanimated';
import {TextInput} from 'react-native-gesture-handler';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default function AnimatedText({text}: {text: any}) {
  const INSTRUCTION_MAP: Record<number, string> = {
    1: 'Breathe in',
    2: 'Hold',
    3: 'Breathe out',
    4: 'Hold',
  };

  const animatedProps = useAnimatedProps<any>(() => {
    return {
      text: INSTRUCTION_MAP[text.value],
    };
  });

  return (
    <AnimatedTextInput
      editable={false}
      value={text.value}
      animatedProps={animatedProps}
    />
  );
}
