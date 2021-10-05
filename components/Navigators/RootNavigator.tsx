import React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import HomeScreen from '../../screens/Home';
import BreathingExerciseScreen from '../../screens/BreathingExercise';

export type RootStackParamList = {
  Home: undefined;
  BreathingExercise: any;
  InfoModal: any;
  BreathingInfoModal: any;
};

const options = {headerShown: false};

export default function RootNavigator() {
  const Stack = createSharedElementStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} {...{options}} />
      <Stack.Screen
        name="BreathingExercise"
        component={BreathingExerciseScreen}
        options={{headerShown: false}}
        sharedElements={(route, otherRoute, showing) => {
          if (otherRoute.name === 'Home' && showing) {
            const {exerciseName, id} = route.params;
            return [exerciseName, `${id}`];
          }
        }}
      />
    </Stack.Navigator>
  );
}
