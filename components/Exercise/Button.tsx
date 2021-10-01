import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
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
  return (
    <View style={styles.button}>
      <View
        style={{
          ...styles.buttonInnerWrap,
          backgroundColor: COLORS[`light${theme}`],
        }}
      >
        <View style={styles.buttonInnerMask}>
          <Text style={[{...styles.message}, {opacity: hasBegun ? 0 : 1}]}>
            Take a breath and...
          </Text>
          {beginExercise ? (
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                reset();
                impactAsync('heavy');
              }}
            >
              <Text style={styles.btnText}>Stop</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                action();
                impactAsync('heavy');
              }}
            >
              <Text style={styles.btnText}>Begin</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 0.35,
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
    top: hp('9%'),
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
    top: hp('8%'),
    borderRadius: 25,
    color: COLORS.black,
    fontSize: 17,
  },
});
