import { Dimensions, RegisteredStyle, StyleSheet } from 'react-native';
import Colors from './colors';
import fontSizes from './fontSizes';
import { moderateScale } from './ResponsiveDimentions';

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
    shadowColor: "#ccc",
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  circle: {
    borderRadius: 50
  },
  p_2: {
    padding: 2
  },
  py_2: {
    paddingVertical: 2,
  },
  text_Bold: {
    fontWeight: "bold"
  },
  bg_white: {
    backgroundColor: "#fff"
  },
  p_6: { padding: moderateScale(6), },
  text_black: { color: "#565656" },
  mh_15: { marginHorizontal: moderateScale(15) },
  text_darkGray: { color: Colors.darkGray },
  pt_10: { paddingTop: moderateScale(10) },
  pv_6: { paddingVertical: moderateScale(6) },
  space_around: { justifyContent: "space-around" },
  self_End:{alignSelf:"flex-end"},
  space_between:{justifyContent:"space-between"},
  ph_4:{paddingHorizontal:moderateScale(4)},
  pt_6:{paddingTop:moderateScale(6)},
  pb_6:{paddingBottom:moderateScale(6)},
  pl_3:{paddingLeft:moderateScale(3)},
  circleBorder:{
    borderColor: '#eee',
    borderWidth: moderateScale(0.5),
    // padding: moderateScale(1),
    borderRadius: moderateScale(50),
  },
  card:{
    borderColor: '#eee',
    borderWidth: moderateScale(1),
    padding: moderateScale(1),
    borderRadius: moderateScale(50),
  },
  borderPimary:{
    borderWidth:moderateScale(0.8),
    borderColor:Colors.primary,
    paddingVertical:moderateScale(4),
    borderRadius:moderateScale(3),
    margin:moderateScale(8)
  },
  text_dark_gray:{
    color:"#565656"
  },
  text_lightGray:{
    color:Colors.textLightGray
  },
  pt_2:{
    paddingTop:moderateScale(2)
  },
  border: {
    borderWidth: moderateScale(0.5),
    borderColor: "#eee",
    borderRadius: moderateScale(2)
  },
  p_4:{padding:moderateScale(4)},
  textDarkBlack:{color:Colors.textDarkBlack},
  disableButon:{
    backgroundColor:Colors.primaryPresedButton,
    // opacity:0.8
  }
});

export default gStyles;
