import React, {useEffect} from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StatusBar} from 'expo-status-bar';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import Block from '../components/Block';
import {RootStackParamList} from '../App';

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<homeScreenProp>();
  const color = useSharedValue<string | number>('#fff');
  const subColor = useSharedValue<string | number>('#fff');

  const colorStyle = useAnimatedStyle(() => ({
    color: color.value,
  }));

  const subColorStyle = useAnimatedStyle(() => ({
    color: subColor.value,
  }));

  useEffect(() => {
    color.value = withTiming('#111', {duration: 1000});
    subColor.value = withDelay(1000, withTiming('#111', {duration: 1000}));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textWrapper}>
        <Animated.Text style={[styles.text, colorStyle]}>
          Hey, there!
        </Animated.Text>
        <Animated.Text style={[styles.subText, subColorStyle]}>
          Choose a breathing exercise from the list below
        </Animated.Text>
      </View>
      <View style={styles.blockContainer}>
        <Block
          title="Box"
          onPress={() =>
            navigation.navigate('BreathingExercise', {exercise: [4, 4, 4, 4]})
          }
          delay={0}
        />
        <Block title="Awake" delay={700} />
        <Block title="Calm" delay={1400} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrapper: {
    flex: 2,
    marginTop: 30,
    paddingLeft: 40,
    paddingRight: 40,
  },
  text: {
    fontSize: 30,
    width: 100,
    marginBottom: 150,
  },
  subText: {
    fontSize: 20,
  },
  blockContainer: {
    flex: 3,
    display: 'flex',
    flexDirection: 'row',
  },
});
