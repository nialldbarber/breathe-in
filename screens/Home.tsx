import React, {useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  FlatList,
  ImageBackground,
  TouchableOpacity,
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
import {Icon} from 'react-native-elements';
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
    item: {exerciseName, page, exercise, type, delay, theme},
  }: any) => (
    <Block
      title={exerciseName}
      onPress={() =>
        navigation.navigate(page, {
          exerciseName,
          exercise,
          theme,
          type,
        })
      }
      {...{theme, delay}}
    />
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          onPress={() => {
            console.log('hello');
            navigation.navigate('Modal');
          }}
          style={styles.modal}
        >
          <Icon name="info" type="material" color={COLORS.black} />
        </TouchableOpacity>
        <View style={styles.textWrapper}>
          <Animated.Text style={[styles.text, colorStyle]}>
            Hey, there!
          </Animated.Text>
          <Animated.Text style={[styles.subText, subColorStyle]}>
            Choose a breathing exercise from the list below
          </Animated.Text>
        </View>
        {CONFIG.map(({id, title, config, theme}) => (
          <View key={id} style={styles.blockContainer}>
            <View
              style={{
                ...styles.imageBackground,
              }}
            >
              <Text style={styles.header}>{title}</Text>
            </View>
            <View style={styles.mask} />
            <View style={styles.flatListContainer}>
              <FlatList
                data={config}
                renderItem={renderItem}
                keyExtractor={({id}) => id}
                numColumns={2}
                columnWrapperStyle={styles.blocks}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    position: 'absolute',
    top: hp('7%'),
    right: wp('5%'),
    zIndex: 999,
  },
  textWrapper: {
    flex: 2,
    marginTop: hp('8%'),
    paddingLeft: wp('7%'),
    paddingRight: wp('7%'),
  },
  text: {
    fontSize: wp('12%'),
    width: 200,
    marginBottom: 70,
  },
  subText: {
    fontSize: wp('4.5%'),
  },
  imageBackground: {
    // flex: 1,
    // height: hp('12%'),
    // width: wp('100%'),
    // justifyContent: 'center',
    // opacity: 0.75,
  },
  header: {
    color: COLORS.black,
    fontSize: wp('10%'),
    fontWeight: '400',
    paddingLeft: 35,
  },
  mask: {
    position: 'absolute',
    top: hp('7.5%'),
    left: wp('-150%'),
    backgroundColor: COLORS.white,
    height: hp('250%'),
    width: wp('400%'),
    borderRadius: wp('250%'),
    borderBottomRightRadius: 0,
  },
  blockContainer: {
    justifyContent: 'center',
    marginTop: 40,
  },
  blocks: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  flatListContainer: {
    margin: wp('5%'),
    paddingBottom: 0,
  },
});
