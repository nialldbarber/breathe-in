import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function ExerciseTitle({title}: {title: string}) {
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
  },
  title: {
    fontSize: 55,
    color: '#fff',
  },
});
