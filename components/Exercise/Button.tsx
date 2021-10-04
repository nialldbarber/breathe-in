import React, {useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {impactAsync} from '../../utils/haptics';
import {COLORS} from '../../constants/theme';

type ExerciseButtonProps = {
  beginExercise: boolean;
  hasBegun: boolean;
  reset: () => void;
  action: () => void;
  theme: string;
};

export default function ExerciseButton({
  beginExercise,
  hasBegun,
  reset,
  action,
  theme,
}: ExerciseButtonProps) {
  const btnOpacity = useSharedValue<number>(0);
  const msgOpacity = useSharedValue<number>(0);

  const buttonStyle = useAnimatedStyle(() => ({
    opacity: btnOpacity.value,
  }));

  const messageStyles = useAnimatedStyle(() => ({
    opacity: msgOpacity.value,
  }));

  useEffect(() => {
    msgOpacity.value = withTiming(1, {duration: 1000});
    setTimeout(() => {
      msgOpacity.value = withTiming(0);
    }, 1800);
    setTimeout(() => {
      btnOpacity.value = withTiming(1, {duration: 1000});
    }, 2000);
  }, []);

  return (
    <View style={styles.button}>
      <View
        style={{
          ...styles.buttonInnerWrap,
          backgroundColor: COLORS[`light${theme}`],
        }}
      >
        <View style={styles.buttonInnerMask}>
          <Animated.Text style={[styles.message, messageStyles]}>
            Take a breath and...
          </Animated.Text>
          {beginExercise ? (
            <Animated.View style={buttonStyle}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  reset();
                  impactAsync('heavy');
                }}
              >
                <Text style={styles.btnText}>Stop</Text>
              </TouchableOpacity>
            </Animated.View>
          ) : (
            <Animated.View style={buttonStyle}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  action();
                  impactAsync('heavy');
                }}
              >
                <Text style={styles.btnText}>Begin</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: hp('25%'),
  },
  buttonInnerWrap: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonInnerMask: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 75,
  },
  btn: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.lightGrey,
    top: hp('7.75%'),
    width: 250,
    borderRadius: 25,
  },
  btnText: {
    justifyContent: 'center',
    alignItems: 'center',
    color: COLORS.black,
    fontSize: 20,
    padding: 10,
  },
  message: {
    alignItems: 'center',
    alignSelf: 'center',
    top: hp('11.25%'),
    borderRadius: 25,
    color: COLORS.black,
    fontSize: 17,
  },
});
