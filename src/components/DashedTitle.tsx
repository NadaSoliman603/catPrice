import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StyleProps } from 'react-native-reanimated';
import gStyles from '../styles/globalStyle';
import { moderateScale } from '../styles/ResponsiveDimentions';
type Props = {
    title: string;
    lineStyle:StyleProps;
    textStyle:object;
}

const DashedTitle = ({ title ,lineStyle ,textStyle }: Props) => {
    return (
        <View style={[gStyles.row_Center, gStyles.space_around , ]}>
            <View style={[styles.borderLine , lineStyle]}></View>
            <Text style={[gStyles.h2, gStyles.text_Primary , textStyle]}>{title}</Text>
            <View style={[styles.borderLine , lineStyle]}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    borderLine: {
        flex: 1,
        borderBottomWidth: moderateScale(0.4),        
    },
});

export default DashedTitle;