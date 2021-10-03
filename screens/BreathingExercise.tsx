import React, {useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Animated, {withSpring} from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {ReText} from 'react-native-redash';
import {Icon} from 'react-native-elements';
import useGetAnimation from '../hooks/useGetAnimation';
import useGetHaptics from '../hooks/useGetHaptics';
import ExerciseButton from '../components/Exercise/Button';
import ExerciseTitle from '../components/Exercise/Title';
import Steps from '../components/Exercise/Steps';
import {getTime} from '../utils/time';
import {COLORS, SHADOW, WIDTH, HEIGHT, ORIGINAL_SIZE} from '../constants/theme';

export type Instruct = number | string;

export default function BreathingExercise({route}: {route: any}) {
  const {navigate} = useNavigation() as any;
  const {exerciseName, exercise, type, theme} = route.params;
  const {
    seconds,
    beginExercise,
    handleBeginExercise,
    reset,
    instructions,
    innerCircleStyles,
    animatedText,
  } = useGetAnimation(type, exercise);

  useGetHaptics(instructions);

  return (
    <View style={styles.container}>
      {/* <Steps {...{exercise, theme}} /> */}
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
        <TouchableOpacity
          style={styles.info}
          onPress={() => navigate('BreathingInfoModal')}
        >
          <Icon
            name="info"
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
  info: {
    position: 'absolute',
    top: hp('7%'),
    right: wp('-5%'),
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
