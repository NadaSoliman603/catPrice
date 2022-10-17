import { Dimensions, RegisteredStyle, StyleSheet } from 'react-native';
import Colors from './colors';
import fontSizes from './fontSizes';

const { height, width } = Dimensions.get('window');

export const wp = (size: number) => {
  return (width / 100) * size;
};

export const hp = (size: number) => {
  return (height / 100) * size;
};

const gStyles = StyleSheet.create({
  center: {
    justifyContent: "center"
  },
  text_Primary: {
    color: Colors.primary
  },
  text_sm: {
    fontSize: fontSizes.font14
  },
  bg_Primary: {
    backgroundColor: Colors.primary
  },
  text_White: {
    color: Colors.white,
  },
  text_center: {
    textAlign: "center"
  },
  alignCenter: {
    alignSelf: "center",
  },
  h1: {
    fontSize: fontSizes.font22,
    fontWeight: "bold"
  },
  h2: { fontSize: fontSizes.font20, },
  h3: { fontSize: fontSizes.font18, },
  h4: { fontSize: fontSizes.font16, },
  h5: { fontSize: fontSizes.font14, },
  h6: { fontSize: fontSizes.font12, },
  pt_20: { paddingTop: 20 },
  pt_15: { paddingTop: 15 },

  spaceBetwen: {
    justifyContent: "space-between"
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  row_Center: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center"
  },
  selfCenter: {
    alignSelf: "center"
  },
  width_250: {
    width: 250,
  },
  width_270: {
    width: 270
  },
  width_230: {
    width: 210,
  },
  alin_justify: {
    textAlign: "justify"
  },
  shadow: {
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 30.84,

elevation: 5,
  }
  // font_Bold:{
  //   font
  // }

});

export default gStyles;
