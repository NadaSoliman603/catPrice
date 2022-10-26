

import * as React from 'react';
import { StyleSheet, View, Text , Pressable} from 'react-native';
import { Divider } from 'react-native-paper';
import Colors from '../../../styles/colors';
import gStyles from '../../../styles/globalStyle';
import { moderateScale } from '../../../styles/ResponsiveDimentions';
type Props = {
    title: string;
    value: string;
    link:boolean;
}

const KeyValue = ({ title, value , link}: Props) => {
    return (
        <View >
            <View style={[styles.container, gStyles.row, gStyles.spaceBetwen, { paddingVertical: moderateScale(4) }]}>
                <View style={styles.titleContainer}>
                <Text style={[gStyles.text_Bold, styles.title]}>{title}</Text>

                </View>
                <Pressable onPress={()=>{}} style={styles.valueContainer}>
                    <Text  numberOfLines={2} style={[styles.value , link && styles.link]}>{value}</Text>
                </Pressable>
            </View>
            <Divider style={styles.divider} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: moderateScale(6)
    },
    title: {
        color: "#565656"
    },
    value: {
        color: "#949494",
    },
    divider: {
        height: moderateScale(0.5),
        backgroundColor: "#ddd"
    },
    valueContainer:{
        maxWidth:"40%"
    },
    titleContainer:{
    },
    link:{
        color:Colors.link,
       textDecorationLine: 'underline'
    }
});

export default KeyValue;