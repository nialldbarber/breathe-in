import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/Home';
import BreathingExercise from './screens/BreathingExercise';
import InfoModalScreen from './screens/InfoModal';
import BreathingInfoModal from './screens/BreathingInfoModal';

export type RootStackParamList = {
  Home: undefined;
  BreathingExercise: any;
  InfoModal: any;
  BreathingInfoModal: any;
};

const Stack = createNativeStackNavigator();

const options = {headerShown: false};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} {...{options}} />
        <Stack.Screen
          name="BreathingExercise"
          component={BreathingExercise}
          {...{options}}
        />
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen
            name="InfoModal"
            component={InfoModalScreen}
            {...{options}}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen
            name="BreathingInfoModal"
            component={BreathingInfoModal}
            {...{options}}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
