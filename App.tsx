import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

function Block({delay}: {delay: number}) {
  const block = useSharedValue<number>(0);

  const blockStyle = useAnimatedStyle(() => ({
    opacity: block.value,
  }));

  useEffect(() => {
    block.value = withDelay(
      delay,
      withDelay(
        1000,
        withTiming(1, {
          duration: 1000,
        })
      )
    );
  }, []);

  return (
    <Animated.View style={[{...styles.block}, blockStyle]}>
      <Text style={styles.blockText}>Test</Text>
    </Animated.View>
  );
}

export default function App() {
  const color = useSharedValue<any>('#fff');

  const colorStyle = useAnimatedStyle(() => ({
    color: color.value,
  }));

  useEffect(() => {
    color.value = withTiming('#111', {duration: 1000});
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Animated.Text style={[{...styles.text}, colorStyle]}>
        Hey, there!
      </Animated.Text>
      <View style={styles.blockContainer}>
        <Block delay={0} />
        <Block delay={1000} />
        <Block delay={2000} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#111',
    fontSize: 30,
    width: 100,
    position: 'absolute',
    top: 100,
    left: 40,
  },
  blockContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  block: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#575CFF',
    width: '25%',
    height: 100,
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  blockText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
});
