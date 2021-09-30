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
const getTime = (time: number): string =>
  new Date(time * 1000).toISOString().substr(11, 8);

export default function BreathingExercise({route}: {route: any}) {
  const [seconds, setSeconds] = useState(0);

  const {exerciseName, exercise} = route.params;
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

  useEffect(() => {
    if (beginExercise) {
      const interval = setInterval(() => {
        setSeconds(seconds + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [beginExercise, seconds]);

  return (
    <View style={styles.container}>
      <View style={styles.outerCircleContainer}>
        {beginExercise ? (
          <Text style={styles.timer}>{getTime(seconds)}</Text>
        ) : null}
        <Text style={styles.exerciseTitle}>{exerciseName}</Text>
        <View style={styles.outerCircle}>
          <Animated.View style={[{...styles.innerCircle}, innerCircleStyles]} />
          <View style={styles.instructions}>
            {/* <ReText text={animatedText} /> */}
          </View>
        </View>
      </View>
      <View style={styles.button}>
        <View style={styles.buttonInnerWrap}>
          <View style={styles.buttonInnerMask}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => setBeginExercise(!beginExercise)}
            >
              <Text style={styles.btnText}>
                {beginExercise ? 'Stop' : 'Begin'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
  exerciseTitle: {
    position: 'absolute',
    top: 480,
    right: -10,
    fontSize: 60,
    transform: [{rotate: '-90deg'}],
    color: '#fff',
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
  button: {
    flex: 0.4,
  },
  buttonInnerWrap: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: purple,
  },
  buttonInnerMask: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 75,
  },
  btn: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: darkerPurple,
    top: 100,
    width: 300,
    borderRadius: 5,
    color: '#fff',
  },
  btnText: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontSize: 25,
    padding: 10,
  },
});
