import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/Home';
import BreathingExercise from './screens/BreathingExercise';
import ModalScreen from './screens/Modal';

export type RootStackParamList = {
  Home: undefined;
  BreathingExercise: any;
  Modal: any;
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BreathingExercise"
          component={BreathingExercise}
          options={{headerShown: false}}
        />
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen
            name="Modal"
            component={ModalScreen}
            options={{headerShown: false}}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
