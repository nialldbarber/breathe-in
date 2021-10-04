import React from 'react';
import {useColorScheme} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {store} from './store';
import RootNavigator from './components/Navigators/RootNavigator';
import getTheme from './styles/theme';

export default function App() {
  const scheme = useColorScheme();

  return (
    <Provider store={store}>
      <NavigationContainer theme={getTheme(scheme)}>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}
