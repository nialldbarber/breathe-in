import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {impactAsync} from '../../utils/haptics';
import {COLORS, SHADOW} from '../../constants/theme';
import {FEELINGS_COLOR_MAP} from '../../constants/exercises';

type ExerciseButtonProps = {
  beginExercise: boolean;
  hasBegun: boolean;
  reset: () => void;
  action: () => void;
  category: string;
};

export default function ExerciseButton({
  beginExercise,
  hasBegun,
  reset,
  action,
  category,
}: ExerciseButtonProps) {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    button: {
      alignSelf: 'center',
      height: hp('20%'),
      backgroundColor: colors.background,
      width: wp('100%'),
      shadowColor: colors.border,
      shadowOffset: {
        width: 1,
        height: 3,
      },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 5,
      borderRadius: 30,
    },
    buttonInnerWrap: {
      ...StyleSheet.absoluteFillObject,
    },
    buttonInnerMask: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    btn: {
      alignItems: 'center',
      alignSelf: 'center',
      width: 250,
      borderRadius: 25,
      backgroundColor: colors.text,
    },
    btnText: {
      justifyContent: 'center',
      alignItems: 'center',
      color: colors.white,
      fontSize: 20,
      padding: 10,
    },
  });

  return (
    <View style={styles.button}>
      <View style={styles.buttonInnerWrap}>
        <View style={styles.buttonInnerMask}>
          {beginExercise ? (
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={1}
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
              activeOpacity={1}
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
