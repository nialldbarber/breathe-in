import React, {useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import AnimatedText from '../Text';
import {FEELINGS_COLOR_MAP} from '../../constants/exercises';

type BlockProps = {
  title: string;
  delay: number;
  category: string;
  onPress?: () => void;
};

export default function Block({title, category, delay, onPress}: BlockProps) {
  const {colors} = useTheme();

  console.log({delay});

  const styles = StyleSheet.create({
    block: {
      position: 'relative',
      width: wp('42%'),
      height: hp('17%'),
      backgroundColor: colors.background,
      padding: 10,
      borderRadius: 30,
      shadowColor: colors.border,
      marginHorizontal: 10,
      marginVertical: 10,

      shadowOffset: {
        width: 1,
        height: 3,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    blockWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
    },
    blockText: {
      position: 'absolute',
      color: colors.text,
      top: 15,
      left: 5,
      fontSize: wp('5%'),
      fontWeight: '300',
    },
    blockIndicator: {
      position: 'absolute',
      width: 50,
      height: 50,
      borderRadius: 40,
      bottom: 5,
      right: 5,
      backgroundColor: colors[FEELINGS_COLOR_MAP[category]],
      transform: [{rotate: '180deg'}],
    },
  });

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
      withTiming(1, {
        duration: 1000,
      })
    );
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      scale.value = withTiming(1);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Animated.View style={[{...styles.block}, blockStyle, blockHover]}>
      <Animated.View style={[styles.blockIndicator]} />
      <TouchableOpacity
        style={styles.blockWrapper}
        activeOpacity={1}
        onPress={() => {
          onPress && onPress();
          scale.value = withSpring(1);
        }}
        onPressIn={() => (scale.value = withSpring(1.05))}
        onPressOut={() => (scale.value = withSpring(1))}
      >
        <AnimatedText style={styles.blockText}>{title}</AnimatedText>
      </TouchableOpacity>
    </Animated.View>
  );
}
