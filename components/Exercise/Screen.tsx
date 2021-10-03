import React from 'react';

export default function ExerciseScreen() {
  return (
    <View style={styles.container}>
      <Steps {...{exercise, theme}} />
      <View
        style={{
          ...styles.outerCircleContainer,
          backgroundColor: COLORS[`light${theme}`],
        }}
      >
        <TouchableOpacity style={styles.back} onPress={() => navigate('Home')}>
          <Icon
            name="arrow-back"
            type="material"
            color={theme === 'yellow' ? COLORS.black : COLORS.white}
          />
        </TouchableOpacity>
        {beginExercise ? (
          <Text
            style={{
              ...styles.timer,
              color: theme === 'yellow' ? COLORS.black : COLORS.white,
            }}
          >
            {getTime(seconds)}
          </Text>
        ) : null}
        <ExerciseTitle title={exerciseName} {...{theme}} />
        <View style={{...styles.outerCircle, shadowColor: COLORS[theme]}}>
          <Animated.View
            style={[
              styles.innerCircle,
              {backgroundColor: COLORS[`darker${theme}`]},
              ,
              innerCircleStyles,
            ]}
          />
          <View style={styles.instructions}>
            {beginExercise ? (
              <ReText
                text={animatedText}
                style={{
                  color: theme === 'yellow' ? COLORS.lightBlack : COLORS.white,
                  fontSize: 25,
                }}
              />
            ) : null}
          </View>
        </View>
      </View>
      <ExerciseButton
        beginExercise={beginExercise}
        reset={() => reset()}
        action={() => setBeginExercise(true)}
        hasBegun={beginExercise}
        theme={theme}
      />
    </View>
  );
}
