import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { HistoryValue } from '../modular/History';
import Colors from '../styles/colors';
import gStyles from '../styles/globalStyle';
import {moderateScale} from '../styles/ResponsiveDimentions';
import {Label} from '../types/types';
import OutLineButton from './OutLineButton';

type Props = {
  value: HistoryValue;
  onChange: (value:HistoryValue) => void;
  buttonGropLables: {label:string; value:HistoryValue}[];
};

const ButtonGroup = ({value, onChange, buttonGropLables}: Props) => {
  return (
    <View style={styles.screen}>
      {buttonGropLables.map(item => (
        <OutLineButton
          title={item.label}
          icon={<></>}
          onPress={()=>onChange(item.value)}
          outline={item.value === value}
          style={styles.buttonStyle}
          textStyle={{...styles.textStyle , color: item.value === value ? Colors.white :Colors.textLightGray}}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexDirection: 'row',
    // flex:1,
    borderWidth: moderateScale(0.4),
    borderColor: Colors.primary,
    borderRadius: moderateScale(3),
    padding: 0,
  },
  buttonStyle: {
    flex: 1,
    borderColor: Colors.white,
    margin: 0,
    borderWidth: 0,
    borderRadius:moderateScale(2)
  },
  textStyle: {
    fontWeight:"400",
    letterSpacing:moderateScale(0.4)
  },
});

export default ButtonGroup;
