import React, {useEffect} from 'react';
import {StyleSheet, SafeAreaView, View, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import Block from '../components/Block';
import {RootStackParamList} from '../App';
import {CONFIG} from '../constants/exercises';

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

  const renderItem = ({item: {exerciseName, page, exercise, delay}}: any) => (
    <Block
      title={exerciseName}
      onPress={() =>
        navigation.navigate(page, {
          exerciseName,
          exercise,
        })
      }
      {...{delay}}
    />
  );

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
        <FlatList
          data={CONFIG}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
          columnWrapperStyle={{flex: 1, justifyContent: 'center'}}
        />
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
    justifyContent: 'space-between',
  },
});
