import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ActivityIndicator} from 'react-native';
import Colors from '../styles/colors';
import dimensions from '../styles/dimensions';

const Loading = () => {
  return (
    <View style={styles.screen}>
      <View
        style={styles.loaderContainer}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    zIndex: 10000000,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
  loaderContainer:{
    borderRadius: 6,
    width: dimensions.width * 0.25,
    height: dimensions.width * 0.25,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
  }
});

export default Loading;
