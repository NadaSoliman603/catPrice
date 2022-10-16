import {Dimensions, RegisteredStyle, StyleSheet} from 'react-native';

const {height, width} = Dimensions.get('window');

export const wp = (size: number) => {
  return (width / 100) * size;
};

export const hp = (size: number) => {
  return (height / 100) * size;
};

const globalStyle = StyleSheet.create({});

export default globalStyle;
