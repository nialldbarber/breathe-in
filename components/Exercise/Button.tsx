import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {impactAsync} from '../../utils/haptics';

type ExerciseButtonProps = {
  beginExercise: boolean;
  reset: () => void;
  action: () => void;
};

export default function ExerciseButton({
  beginExercise,
  reset,
  action,
}: ExerciseButtonProps) {
  return (
    <View style={styles.button}>
      <View style={styles.buttonInnerWrap}>
        <View style={styles.buttonInnerMask}>
          {beginExercise ? (
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                reset();
                impactAsync('heavy');
              }}
            >
              <Text style={styles.btnText}>Stop</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                action();
                impactAsync('heavy');
              }}
            >
              <Text style={styles.btnText}>Begin</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const purple = 'rgba(87, 92, 255, 0.5)';

const styles = StyleSheet.create({
  button: {
    flex: 0.4,
  },
  buttonInnerWrap: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: purple,
  },
  buttonInnerMask: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 75,
  },
  btn: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(12, 13, 52, 0.07)',
    top: 100,
    width: 250,
    borderRadius: 25,
  },
  btnText: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#111',
    fontSize: 20,
    padding: 10,
  },
});
