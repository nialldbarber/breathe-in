import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
