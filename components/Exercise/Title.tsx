import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {COLORS} from '../../constants/theme';

type ExerciseTitleProps = {
  title: string;
  theme: string;
};

export default function ExerciseTitle({title, theme}: ExerciseTitleProps) {
  return (
    <View style={styles.container}>
      <Text
        style={{
          ...styles.title,
          color: theme === 'yellow' ? COLORS.black : COLORS.white,
        }}
      >
        {title}
      </Text>
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
    marginRight: 30,
  },
});
