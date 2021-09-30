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
  withSpring,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {ReText} from 'react-native-redash';
import {Icon} from 'react-native-elements';
import ExerciseButton from '../components/Exercise/Button';
import ExerciseTitle from '../components/Exercise/Title';
import {sToM, getTime} from '../utils/time';

const WIDTH = 300;
const HEIGHT = 300;
const ORIGINAL_SIZE = WIDTH / 3;

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
          withTiming('Breathe in', {
            duration: sToM(exercise[2]),
          }),
          withTiming('Breathe in', {
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
      <View style={styles.outerCircleContainer}>
        <TouchableOpacity style={styles.back} onPress={() => navigate('Home')}>
          <Icon name="arrow-back" type="material" color="#fff" />
        </TouchableOpacity>
        {beginExercise ? (
          <Text style={styles.timer}>{getTime(seconds)}</Text>
        ) : null}
        <ExerciseTitle title={exerciseName} />
        <View style={styles.outerCircle}>
          <Animated.View style={[styles.innerCircle, innerCircleStyles]} />
          <View style={styles.instructions}>
            {/* <ReText text={instructions} /> */}
            {/* <Animated.Text>{instructions.value}</Animated.Text> */}
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

const purple = 'rgba(87, 92, 255, 0.5)';
const darkerPurple = 'rgba(87, 92, 255, 0.9)';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  timer: {
    position: 'absolute',
    color: '#fff',
    fontSize: 20,
    top: 50,
  },
  back: {
    position: 'absolute',
    top: 60,
    left: 0,
    zIndex: 999,
    width: 100,
    height: 100,
  },
  outerCircleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: purple,
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
    backgroundColor: '#fff',
    shadowColor: '#575CFF',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  innerCircle: {
    position: 'absolute',
    backgroundColor: darkerPurple,
  },
  instructions: {
    position: 'absolute',
  },
});
