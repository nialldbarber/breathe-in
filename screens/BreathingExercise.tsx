import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {ReText} from 'react-native-redash';
import {Icon} from 'react-native-elements';
import ExerciseButton from '../components/Exercise/Button';
import ExerciseTitle from '../components/Exercise/Title';
import Steps from '../components/Exercise/Steps';
import {sToM, getTime} from '../utils/time';
import {COLORS, SHADOW, WIDTH, HEIGHT, ORIGINAL_SIZE} from '../constants/theme';

export default function BreathingExercise({route}: {route: any}) {
  const {navigate} = useNavigation() as any;
  const [seconds, setSeconds] = useState(0);

  const {exerciseName, exercise} = route.params;
  const [beginExercise, setBeginExercise] = useState(false);
  const innerCircle = useSharedValue<number>(ORIGINAL_SIZE);
  const instructions = useSharedValue<number | string>('');

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

  // const animatedText = useDerivedValue(() => {
  //   return INSTRUCTION_MAP[instructions.value];
  // }, [beginExercise]);

  // const animatedText = useDerivedValue(() => {
  //   return instructions.replace(/NaN/g, '');
  // }, [beginExercise]);

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
          withTiming(ORIGINAL_SIZE, {
            duration: sToM(exercise[2]),
            easing: Easing.linear,
          }),
          // in breathe
          withTiming(ORIGINAL_SIZE, {duration: sToM(exercise[3])})
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
          withTiming('Breathe in', {
            duration: sToM(exercise[0]),
          }),
          withTiming('Hold', {
            duration: sToM(exercise[1]),
          }),
          withTiming('Breathe out', {
            duration: sToM(exercise[2]),
          }),
          withTiming('Hold', {
            duration: sToM(exercise[3]),
          })
        ),
        -1,
        false
      );
    }
  }, [beginExercise]);

  useEffect(() => {
    if (beginExercise) {
      const interval = setInterval(() => {
        setSeconds(seconds + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [beginExercise, seconds]);

  function reset() {
    setSeconds(0);
    setBeginExercise(false);
    innerCircle.value = withSpring(ORIGINAL_SIZE);
  }

  return (
    <View style={styles.container}>
      <Steps {...{exercise}} />
      <View style={styles.outerCircleContainer}>
        <TouchableOpacity style={styles.back} onPress={() => navigate('Home')}>
          <Icon name="arrow-back" type="material" color={COLORS.white} />
        </TouchableOpacity>
        {beginExercise ? (
          <Text style={styles.timer}>{getTime(seconds)}</Text>
        ) : null}
        <ExerciseTitle title={exerciseName} />
        <View style={styles.outerCircle}>
          <Animated.View style={[styles.innerCircle, innerCircleStyles]} />
          <View style={styles.instructions}>
            {beginExercise ? <ReText text={instructions} /> : null}
          </View>
        </View>
      </View>
      <ExerciseButton
        beginExercise={beginExercise}
        reset={() => reset()}
        action={() => setBeginExercise(true)}
        hasBegun={beginExercise}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  timer: {
    position: 'absolute',
    color: COLORS.white,
    fontSize: 20,
    top: 50,
  },
  back: {
    position: 'absolute',
    top: 60,
    left: 0,
    width: 100,
    height: 100,
  },
  outerCircleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.lightPurple,
    borderBottomRightRadius: 75,
  },
  outerCircle: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH,
    height: HEIGHT,
    borderRadius: WIDTH / 2,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.purple,
    ...SHADOW,
  },
  innerCircle: {
    position: 'absolute',
    backgroundColor: COLORS.darkerPurple,
  },
  instructions: {
    position: 'absolute',
  },
});
