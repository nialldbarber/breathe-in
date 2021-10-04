import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {feelings} from '../../constants/exercises';
import {useDispatch} from 'react-redux';
import {filterBySelectedBadge} from '../../store/slices/exercises';

export default function Badges() {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    badgeContainer: {
      marginTop: 15,
      marginBottom: 15,
      // height: 35,
    },
    badge: {
      backgroundColor: colors.primaryFaded,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      marginRight: 10,
      borderColor: colors.primary,
      borderWidth: 1,
    },
    badgeText: {
      color: colors.primary,
      fontWeight: '800',
      fontSize: wp('4%'),
    },
  });

  const dispatch = useDispatch();

  return (
    <View style={styles.badgeContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {feelings.map((item, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => {
              // console.log(feelings[i])
              dispatch(filterBySelectedBadge(feelings[i]));
            }}
            style={[
              styles.badge,
              {
                marginLeft: i === 0 ? wp('5%') : 0,
              },
            ]}
          >
            <Text style={styles.badgeText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
