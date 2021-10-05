import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {ReText} from 'react-native-redash';
import {Icon} from 'react-native-elements';
import {RootStackParamList} from '../components/Navigators/RootNavigator';
import useGetAnimation from '../hooks/useGetAnimation';
import useGetHaptics from '../hooks/useGetHaptics';
import ExerciseButton from '../components/Exercise/Button';
import ExerciseTitle from '../components/Exercise/Title';
import ModalIcon from '../components/Modal';
import InstructionsContainer from '../components/Exercise/Icons/InstructionContainer';
import {getTime} from '../utils/time';
import {SHADOW, WIDTH, HEIGHT} from '../constants/theme';
import {FEELINGS_COLOR_MAP} from '../constants/exercises';

export type Instruct = number | string;
type breathingScreenProp = StackNavigationProp<
  RootStackParamList,
  'BreathingExercise'
>;

export default function BreathingExerciseScreen({route}: {route: any}) {
  const {exerciseName, exercise, type, category} = route.params;
  const {colors} = useTheme();

  const FADED_BACKGROUND: Record<string, string> = {
    calm: colors.calmFaded,
    energy: colors.primaryFaded,
  };

  const DEEP_BACKGROUND: Record<string, string> = {
    calm: colors.calmDeep,
    energy: colors.primaryDeep,
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    timer: {
      position: 'absolute',
      fontSize: 20,
      top: 50,
      color: colors.text,
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
      backgroundColor: colors.background,
    },
    outerCircle: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: WIDTH,
      height: HEIGHT,
      borderRadius: WIDTH / 2,
      backgroundColor: colors.background,
      shadowColor: colors.text,
      ...SHADOW,
    },
    innerCircle: {
      position: 'absolute',
      borderWidth: 3,
      borderColor: colors[FEELINGS_COLOR_MAP[category]],
      backgroundColor: FADED_BACKGROUND[category],
    },
    innerText: {
      color: DEEP_BACKGROUND[category],
      fontSize: 20,
      fontWeight: '700',
    },
    instructions: {
      position: 'absolute',
    },
  });

  const {navigate} = useNavigation<breathingScreenProp>();
  const {
    seconds,
    beginExercise,
    handleBeginExercise,
    instructions,
    reset,
    innerCircleStyles,
    animatedText,
  } = useGetAnimation(type, exercise);

  useGetHaptics(instructions);

  return (
    <View style={styles.container}>
      {/* <Steps {...{exercise, theme}} /> */}
      <View style={styles.outerCircleContainer}>
        <TouchableOpacity
          style={styles.back}
          activeOpacity={1}
          onPress={() => navigate('Home')}
        >
          <Icon name="arrow-back" type="material" color={colors.text} />
        </TouchableOpacity>
        <ModalIcon modalScreen="BreathingInfoModal" mode="dark" />
        {beginExercise ? (
          <Text style={styles.timer}>{getTime(seconds)}</Text>
        ) : null}
        <ExerciseTitle
          title={exerciseName}
          hasBegun={beginExercise}
          {...{category}}
        />
        <View style={styles.outerCircle}>
          <Animated.View style={[styles.innerCircle, innerCircleStyles]} />
          <View style={styles.instructions}>
            {beginExercise ? (
              <ReText text={animatedText} style={styles.innerText} />
            ) : null}
          </View>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: hp('26%'),
          left: wp('0%'),
          right: wp('0%'),
        }}
      >
        <InstructionsContainer {...{type, exercise}} />
      </View>
      <ExerciseButton
        {...{beginExercise, reset, category}}
        action={() => handleBeginExercise(true)}
        hasBegun={beginExercise}
      />
    </View>
  );
}
