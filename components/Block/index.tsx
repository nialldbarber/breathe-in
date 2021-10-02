import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {COLORS} from '../../constants/theme';

export default function Block({
  title,
  theme,
  delay,
  onPress,
}: {
  title: string;
  delay: number;
  theme: string;
  onPress?: () => void;
}) {
  const navigation = useNavigation() as any;
  const block = useSharedValue<number>(0);
  const scale = useSharedValue<number>(1);

  const blockStyle = useAnimatedStyle(() => ({
    opacity: block.value,
  }));

  const blockHover = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      scale.value = withSpring(1, {stiffness: 120});
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Animated.View
      style={[
        {
          ...styles.block,
          backgroundColor: COLORS[theme],
          shadowColor: COLORS[theme],
        },
        blockStyle,
        blockHover,
      ]}
    >
      <TouchableOpacity
        style={styles.blockWrapper}
        onPress={() => {
          onPress && onPress();
          scale.value = withSpring(0);
        }}
        onPressIn={() => (scale.value = withSpring(1.05))}
        onPressOut={() => (scale.value = withSpring(1))}
      >
        <Text
          style={{
            ...styles.blockText,
            color: theme === 'yellow' ? COLORS.black : COLORS.white,
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  block: {
    width: wp('44%'),
    height: 80,
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 10,
  },
  blockWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  blockText: {
    fontSize: 20,
  },
});
