import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Icon} from 'react-native-elements';
import {COLORS} from '../constants/theme';

export default function BreathingInfoModalScreen() {
  const {goBack} = useNavigation() as any;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.exit} onPress={goBack}>
        <Icon name="close" type="material" color={COLORS.black} />
      </TouchableOpacity>
      <Text style={styles.title}>Breathing info</Text>
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  exit: {
    position: 'absolute',
    top: hp('2%'),
    right: hp('2%'),
  },
});
