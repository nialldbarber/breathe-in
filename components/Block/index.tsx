import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {COLORS, SHADOW} from '../../constants/theme';

export default function Block({
  title,
  delay,
  onPress,
}: {
  title: string;
  delay: number;
  onPress?: () => void;
}) {
  const block = useSharedValue<number>(0);

  const blockStyle = useAnimatedStyle(() => ({
    opacity: block.value,
  }));

  useEffect(() => {
    block.value = withDelay(
      delay,
      withDelay(
        2000,
        withTiming(1, {
          duration: 1000,
        })
      )
    );
  }, []);

  return (
    <Animated.View style={[{...styles.block}, blockStyle]}>
      <TouchableOpacity style={styles.blockWrapper} onPress={onPress}>
        <Text style={styles.blockText}>{title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: COLORS.purple,
    width: '25%',
    height: 80,
    borderRadius: 30,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 15,
    shadowColor: COLORS.purple,
    ...SHADOW,
  },
  blockWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  blockText: {
    color: COLORS.white,
    fontSize: 20,
  },
});
