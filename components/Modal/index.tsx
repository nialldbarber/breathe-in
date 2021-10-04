import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Icon} from 'react-native-elements';

type ModalIconProps = {
  modalScreen: any;
  mode: string;
};

export default function ModalIcon({modalScreen, mode}: ModalIconProps) {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    modal: {
      position: 'absolute',
      top: hp('7%'),
      right: wp('5%'),
      zIndex: 3,
    },
  });

  const {navigate} = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigate(modalScreen)}
      style={styles.modal}
    >
      <Icon
        name="info"
        type="material"
        color={mode === 'dark' ? colors.text : colors.white}
        size={25}
      />
    </TouchableOpacity>
  );
}
