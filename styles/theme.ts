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
      success: '#20bf6b',
      warning: '#f39c12',
      error: '#e74c3c',
      text: dark ? '#f2f2f2' : '#2D3047',
      background: dark ? '#2D3047' : '#f2f2f2',
      border: dark ? '#f2f2f2dd' : '#1a1a1add',
      button: dark ? '#1a1a1add' : '#f2f2f2dd',
    },
    font: Platform.OS === 'ios' ? 'Avenir Next' : 'Roboto',
    status: Constants.statusBarHeight,
    navbar: Constants.statusBarHeight + 44,
    normalize,
  };
}
