import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StatusBar} from 'expo-status-bar';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Block from '../components/Block';
import {RootStackParamList} from '../App';

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<homeScreenProp>();

  const color = useSharedValue<string | number>('#fff');

  const colorStyle = useAnimatedStyle(() => ({
    color: color.value,
  }));

  useEffect(() => {
    color.value = withTiming('#111', {duration: 1000});
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Animated.Text style={[{...styles.text}, colorStyle]}>
        Hey, there!
      </Animated.Text>
      <View style={styles.blockContainer}>
        <Block
          onPress={() =>
            navigation.navigate('BreathingExercise', {exercise: [4, 4, 4, 4]})
          }
          delay={0}
        />
        <Block delay={700} />
        <Block delay={1400} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#111',
    fontSize: 30,
    width: 100,
    position: 'absolute',
    top: 100,
    left: 40,
  },
  blockContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});
