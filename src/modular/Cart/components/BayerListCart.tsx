
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-paper';
import Colors from '../../../styles/colors';
import gStyles from '../../../styles/globalStyle';
import { moderateScale } from '../../../styles/ResponsiveDimentions';
import KeyValue from './KeyValue';
type Props = {}

const BayerListCart = (props: Props) => {
    const imgUri = "https://img.freepik.com/free-photo/handsome-confident-smiling-man-with-hands-crossed-chest_176420-18743.jpg?w=2000"
    return (
        <View style={styles.screen}>
            <View style={[styles.buttomBorder]} >
                <View style={[gStyles.row, styles.header]}>
                    <Avatar.Image size={moderateScale(15)} source={{ uri: imgUri }} />
                    <Text style={[gStyles.text_Bold, gStyles.text_black, gStyles.pl_3]}>M.Ahmad</Text>
                </View>
            </View>

            <KeyValue link={false}  title='Phone'  value='+201 18559 3680'/>
            <KeyValue link={false} title='Adress'  value='Arar ,  AlAl M'/>
            <KeyValue link={true} title='Location Map'  value='https://www.google.com/maps'/>

        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        // padding: moderateScale(6),
        borderColor: Colors.primary,
        borderWidth: moderateScale(0.5),
        marginVertical: moderateScale(6),
        borderRadius: moderateScale(3)
    },
    buttomBorder: {
        borderColor: Colors.primary,
        borderBottomWidth: moderateScale(0.5),
    },
    header: {
        paddingHorizontal: moderateScale(6),
        paddingVertical: moderateScale(2),
        borderRadius: moderateScale(3),
    }
});

export default BayerListCart;