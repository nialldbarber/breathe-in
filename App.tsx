import React from 'react';
import {useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './components/Navigators/RootNavigator';
import getTheme from './styles/theme';

export default function App() {
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={getTheme(scheme)}>
      <RootNavigator />
    </NavigationContainer>
  );
}
