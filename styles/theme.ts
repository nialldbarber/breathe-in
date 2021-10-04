import {useWindowDimensions, Platform} from 'react-native';
import Constants from 'expo-constants';

export default function getTheme(scheme: any) {
  const {width, height} = useWindowDimensions();
  const dark = scheme === 'dark';
  const normalize = (size: number, max: number) =>
    Math.min(size * (width / 375), max);

  return {
    dark,
    width,
    height,
    ios: Platform.OS === 'ios',
    margin: normalize(20, 35),
    colors: {
      white: '#ffffff',
      primary: '#ff6b6b',
      primaryFaded: 'rgba(255, 107, 107, 0.45)',
      success: '#20bf6b',
      warning: '#f39c12',
      error: '#e74c3c',
      calm: '#9CE2FF',
      text: dark ? '#FFFFFF' : '#2D3047',
      background: dark ? '#2D3047' : '#FFFFFF',
      border: dark ? '#FFFFFF' : '#1a1a1a',
      button: dark ? '#1a1a1a' : '#FFFFFF',
    },
    font: Platform.OS === 'ios' ? 'Avenir Next' : 'Roboto',
    status: Constants.statusBarHeight,
    navbar: Constants.statusBarHeight + 44,
    normalize,
  };
}
