import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../screens/Home';
import InfoModalScreen from '../../screens/InfoModal';
import BreathingExerciseScreen from '../../screens/BreathingExercise';
import BreathingInfoModalScreen from '../../screens/BreathingInfoModal';

export type RootStackParamList = {
  Home: undefined;
  BreathingExercise: any;
  InfoModal: any;
  BreathingInfoModal: any;
};

const options = {headerShown: false};

export default function RootNavigator() {
  const Stack = createNativeStackNavigator();

  const fadeScreen = ({current}: {current: any}) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  const bookTransition = {
    animation: 'spring',
    config: {
      mass: 3,
      damping: 300,
      stiffness: 1000,
      overshootClamping: false,
      restDisplacementThreshold: 10,
      restSpeedThreshold: 10,
    },
  };

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} {...{options}} />
      <Stack.Screen
        name="BreathingExercise"
        component={BreathingExerciseScreen}
        options={{
          gestureEnabled: false,
          cardStyleInterpolator: fadeScreen,
          headerShown: false,
          transitionSpec: {
            open: bookTransition,
            close: bookTransition,
          },
        }}
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
          component={BreathingInfoModalScreen}
          {...{options}}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
