import React, {useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  withRepeat,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {ReText} from 'react-native-redash';
import {Icon} from 'react-native-elements';
import useBeginExercise from '../hooks/useBeginExercise';
import ExerciseButton from '../components/Exercise/Button';
import ExerciseTitle from '../components/Exercise/Title';
import Steps from '../components/Exercise/Steps';
import {sToM, getTime} from '../utils/time';
import {COLORS, SHADOW, WIDTH, HEIGHT, ORIGINAL_SIZE} from '../constants/theme';
import {impactAsync} from '../utils/haptics';
import {getAnimatedTextFormatted} from '../utils/animated-text';

type Instruct = number | string;

export default function BreathingExercise({route}: {route: any}) {
  const {navigate} = useNavigation() as any;
  const {exerciseName, exercise, theme} = route.params;
  const {seconds, beginExercise, handleSetSeconds, handleBeginExercise} =
    useBeginExercise();
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
          // out breath
          withTiming(WIDTH, {duration: sToM(exercise[0])}),
          // out breath
          withTiming(WIDTH, {duration: sToM(exercise[1])}),
          // in breath
          withTiming(ORIGINAL_SIZE, {duration: sToM(exercise[2])}),
          // in breath
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
          withTiming('In', {
            duration: sToM(exercise[0]),
          }),
          withTiming('Hold', {
            duration: sToM(exercise[1]),
          }),
          withTiming('Out', {
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

  function reset(): void {
    handleSetSeconds(0);
    handleBeginExercise(false);
    innerCircle.value = withSpring(ORIGINAL_SIZE);
    instructions.value = '';
  }

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

  return (
    <View style={styles.container}>
      <Steps {...{exercise, theme}} />
      <View
        style={{
          ...styles.outerCircleContainer,
          backgroundColor: COLORS[`light${theme}`],
        }}
      >
        <TouchableOpacity style={styles.back} onPress={() => navigate('Home')}>
          <Icon
            name="arrow-back"
            type="material"
            color={theme === 'yellow' ? COLORS.black : COLORS.white}
          />
        </TouchableOpacity>
        {beginExercise ? (
          <Text
            style={{
              ...styles.timer,
              color: theme === 'yellow' ? COLORS.black : COLORS.white,
            }}
          >
            {getTime(seconds)}
          </Text>
        ) : null}
        <ExerciseTitle title={exerciseName} {...{theme}} />
        <View style={{...styles.outerCircle, shadowColor: COLORS[theme]}}>
          <Animated.View
            style={[
              styles.innerCircle,
              {backgroundColor: COLORS[`darker${theme}`]},
              innerCircleStyles,
            ]}
          />
          <View style={styles.instructions}>
            {beginExercise ? (
              <ReText
                text={animatedText}
                style={{
                  color: theme === 'yellow' ? COLORS.lightBlack : COLORS.white,
                  fontSize: 25,
                }}
              />
            ) : null}
          </View>
        </View>
      </View>
      <ExerciseButton
        beginExercise={beginExercise}
        reset={() => reset()}
        action={() => handleBeginExercise(true)}
        hasBegun={beginExercise}
        theme={theme}
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
    fontSize: 20,
    top: 50,
  },
  back: {
    position: 'absolute',
    top: hp('7%'),
    left: wp('-5%'),
    width: 100,
    height: 100,
  },
  outerCircleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    ...SHADOW,
  },
  innerCircle: {
    position: 'absolute',
  },
  instructions: {
    position: 'absolute',
  },
});
