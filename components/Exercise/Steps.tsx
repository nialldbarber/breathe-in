import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

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
    top: 470,
    right: -55,
  },
  exerciseNode: {
    color: '#575CFF',
    fontSize: 35,
    fontWeight: '500',
    letterSpacing: 3,
  },
});
