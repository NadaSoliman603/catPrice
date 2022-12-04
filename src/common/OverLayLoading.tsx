import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ActivityIndicator} from 'react-native';
import Colors from '../styles/colors';
import dimensions from '../styles/dimensions';

const OverLayLoading = () => {
  return (
    <View style={[styles.screen ]}>
      <View
        style={styles.loaderContainer}>
        <ActivityIndicator color={Colors.white} size="large" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    zIndex: 10000000,
    // elevation: 10,
    // shadowOffset: {height: 0, width: 2},
    // shadowOpacity: 0.2,
    // shadowColor: 'black',
    // shadowRadius: 2.62,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
   
  },
  loaderContainer:{
    backgroundColor: Colors.primary,
    borderRadius: 6,
    width: dimensions.width * 0.25,
    height: dimensions.width * 0.25,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.3,
  }
});

export default OverLayLoading;
