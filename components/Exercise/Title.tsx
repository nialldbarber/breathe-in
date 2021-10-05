import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {useTheme} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type ExerciseTitleProps = {
  title: string;
  category: string;
  hasBegun: boolean;
};

export default function ExerciseTitle({
  title,
  category,
  hasBegun,
}: ExerciseTitleProps) {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: hp('6%'),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      fontSize: wp('10%'),
      color: colors.text,
    },
  });

  const top = useSharedValue(hp('6%'));

  const topStyles = useAnimatedStyle(() => ({
    top: top.value,
  }));

  useEffect(() => {
    if (hasBegun) {
      top.value = withSpring(hp('10%'));
    } else {
      top.value = withSpring(hp('6%'));
    }
  }, [hasBegun]);

  return (
    <Animated.View style={[styles.container, topStyles]}>
      <Text style={styles.title}>{title}</Text>
    </Animated.View>
  );
}
