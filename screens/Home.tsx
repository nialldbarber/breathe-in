import React, {useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  FlatList,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import Block from '../components/Block';
import {RootStackParamList} from '../App';
import {CONFIG} from '../constants/exercises';
import {COLORS} from '../constants/theme';

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<homeScreenProp>();
  const color = useSharedValue<string | number>(COLORS.white);
  const subColor = useSharedValue<string | number>(COLORS.white);

  const colorStyle = useAnimatedStyle(() => ({
    color: color.value,
  }));

  const subColorStyle = useAnimatedStyle(() => ({
    color: subColor.value,
  }));

  useEffect(() => {
    color.value = withTiming(COLORS.black, {duration: 1000});
    subColor.value = withDelay(
      1000,
      withTiming(COLORS.black, {duration: 1000})
    );
  }, []);

  const renderItem = ({
    item: {exerciseName, page, exercise, delay, theme},
  }: any) => (
    <Block
      title={exerciseName}
      onPress={() =>
        navigation.navigate(page, {
          exerciseName,
          exercise,
          theme,
        })
      }
      {...{theme, delay}}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.textWrapper}>
          <Animated.Text style={[styles.text, colorStyle]}>
            Hey, there!
          </Animated.Text>
          <Animated.Text style={[styles.subText, subColorStyle]}>
            Choose a breathing exercise from the list below
          </Animated.Text>
        </View>
        {CONFIG.map(({id, title, config, image}) => (
          <View key={id} style={styles.blockContainer}>
            <ImageBackground
              source={image}
              style={{
                flex: 1,
                height: hp('18%'),
                width: wp('100%'),
                justifyContent: 'center',
              }}
              resizeMode="cover"
            >
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: wp('10%'),
                  fontWeight: '500',
                  paddingLeft: 35,
                }}
              >
                {title}
              </Text>
            </ImageBackground>
            <View>
              <FlatList
                data={config}
                renderItem={renderItem}
                keyExtractor={({id}) => id}
                numColumns={3}
                columnWrapperStyle={styles.blocks}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
    fontSize: wp('12%'),
    width: 200,
    marginBottom: 70,
  },
  subText: {
    fontSize: wp('4.5%'),
  },
  blockContainer: {
    justifyContent: 'center',
    marginTop: 40,
  },
  blocks: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
  },
});
