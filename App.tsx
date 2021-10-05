import React, {useState, useEffect} from 'react';
import {View, Text, useColorScheme} from 'react-native';
import {Provider} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {store} from './store';
import RootNavigator from './components/Navigators/RootNavigator';
import getTheme from './styles/theme';

export default function App() {
  const scheme = useColorScheme();

  const [firstLaunch, setFirstLaunch] = useState<null | boolean>(null);

  useEffect(() => {
    async function getStuff() {
      const firstLaunch = await AsyncStorage.getItem('isFirstLaunch');
      if (firstLaunch !== null) {
        setFirstLaunch(false);
      } else {
        await AsyncStorage.setItem('isFirstLaunch', 'true');
        setFirstLaunch(true);
      }
    }
    getStuff();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer theme={getTheme(scheme)}>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}
