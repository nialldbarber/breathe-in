import React, {CSSProperties, ReactNode} from 'react';
import {Text} from 'react-native';
import Animated from 'react-native-reanimated';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';

export default function T({
  text,
  children,
  weight,
  styling,
  animated,
}: {
  text?: string;
  children?: ReactNode;
  weight?: string;
  styling?: any;
  animated?: boolean;
}) {
  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  const FONT_MAP: Record<string, string> = {
    '100': 'Inter_100Thin',
    '200': 'Inter_200ExtraLight',
    '300': 'Inter_300Light',
    '400': 'Inter_400Regular',
    '500': 'Inter_500Medium',
    '600': 'Inter_600SemiBold',
    '700': 'Inter_700Bold',
    '800': 'Inter_800ExtraBold',
    '900': 'Inter_900Black',
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return animated ? (
      <Animated.Text
        style={{
          fontFamily: FONT_MAP[weight || '400'],
          ...styling,
        }}
      >
        {text || ''}
        {children || ''}
      </Animated.Text>
    ) : (
      <Text
        style={{
          fontFamily: FONT_MAP[weight || '400'],
          ...styling,
        }}
      >
        {text || ''}
        {children || ''}
      </Text>
    );
  }
}
