import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  useDerivedValue,
} from 'react-native-reanimated';
import {ReText} from 'react-native-redash';

const WIDTH = 300;
const HEIGHT = 300;

const sToM = (seconds: number): number => seconds * 1000;

export default function BreathingExercise({route}: {route: any}) {
  const {exercise} = route.params;
  const [beginExercise, setBeginExercise] = useState(false);
  const innerCircle = useSharedValue<number>(WIDTH / 3);
  const instructions = useSharedValue<number>(0);

  const innerCircleStyles = useAnimatedStyle(() => ({
    width: innerCircle.value,
    height: innerCircle.value,
    borderRadius: innerCircle.value / 2,
  }));

  const INSTRUCTION_MAP: Record<number, string> = {
    1: 'Breathe in',
    2: 'Hold',
    3: 'Breathe out',
    4: 'Hold',
  };

  const animatedText = useDerivedValue(() => {
    return INSTRUCTION_MAP[instructions.value];
  }, [beginExercise]);

  useEffect(() => {
    if (beginExercise) {
      innerCircle.value = withRepeat(
        withSequence(
          // out breath
          withTiming(WIDTH, {
            duration: sToM(exercise[0]),
            easing: Easing.linear,
          }),
          // out breath
          withTiming(WIDTH, {duration: sToM(exercise[1])}),
          // in breathe
          withTiming(WIDTH / 3, {
            duration: sToM(exercise[2]),
            easing: Easing.linear,
          }),
          // in breathe
          withTiming(WIDTH / 3, {duration: sToM(exercise[3])})
        ),
        -1,
        false
      );
    }
  }, [beginExercise]);

  useEffect(() => {
    if (beginExercise) {
      instructions.value = withRepeat(
        withSequence(
          withTiming(1, {duration: sToM(exercise[0])}), // out breath
          withTiming(2, {duration: sToM(exercise[1])}), // out breath
          withTiming(3, {duration: sToM(exercise[2])}), // in breathe
          withTiming(4, {duration: sToM(exercise[3])}) // in breathe
        ),
        -1,
        false
      );
    }
  }, [beginExercise]);

  return (
    <View style={styles.container}>
      <View style={styles.outerCircle}>
        <Animated.View style={[{...styles.innerCircle}, innerCircleStyles]} />
        <View style={styles.instructions}>
          {/* <ReText text={instructions.value} /> */}
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={() => setBeginExercise(!beginExercise)}>
          <Text>Begin</Text>
          <ReText text={animatedText} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerCircle: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: 'pink',
    borderRadius: WIDTH / 2,
  },
  innerCircle: {
    position: 'absolute',
    backgroundColor: 'dodgerblue',
  },
  instructions: {
    position: 'absolute',
  },
});
