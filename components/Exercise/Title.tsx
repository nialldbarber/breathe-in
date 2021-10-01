import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

type ExerciseTitleProps = {
  title: string;
};

export default function ExerciseTitle({title}: ExerciseTitleProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 50,
    bottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 55,
    color: '#fff',
    marginRight: 30,
  },
});
