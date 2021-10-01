import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
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
    <Animated.View style={[{...styles.block}, blockStyle, blockHover]}>
      <TouchableOpacity
        style={styles.blockWrapper}
        onPress={onPress}
        onPressIn={() => (scale.value = withSpring(1.1))}
        onPressOut={() => (scale.value = withSpring(0))}
      >
        <Text style={styles.blockText}>{title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: COLORS.purple,
    width: wp('44%'),
    height: 80,
    borderRadius: 30,
    shadowColor: COLORS.purple,
    marginTop: 10,
    marginBottom: 10,
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
