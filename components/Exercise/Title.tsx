import React from 'react';
import {StyleSheet, Text} from 'react-native';

export default function ExerciseTitle({title}: {title: string}) {
  return <Text style={styles.exerciseTitle}>{title}</Text>;
}

const styles = StyleSheet.create({
  exerciseTitle: {
    position: 'absolute',
    top: 480,
    right: -10,
    fontSize: 60,
    transform: [{rotate: '-90deg'}],
    color: '#fff',
  },
});
