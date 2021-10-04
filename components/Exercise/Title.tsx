import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

type ExerciseTitleProps = {
  title: string;
  category: string;
};

export default function ExerciseTitle({title, category}: ExerciseTitleProps) {
  const {colors} = useTheme();

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
      marginRight: 30,
      color: colors.text,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
