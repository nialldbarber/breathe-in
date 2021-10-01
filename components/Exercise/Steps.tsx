import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../constants/theme';

type StepsProps = {
  exercise: number[];
};

export default function Steps({exercise}: StepsProps) {
  const stringMap = exercise.join('-');

  return (
    <View style={styles.exercise}>
      <Text style={styles.exerciseNode}>{stringMap}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  exercise: {
    position: 'absolute',
    transform: [{rotate: '-90deg'}],
    top: hp('50%'),
    right: wp('-12%'),
  },
  exerciseNode: {
    color: COLORS.purple,
    fontSize: wp('8%'),
    fontWeight: '500',
    letterSpacing: 3,
  },
});
