import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import fontSizes from '../styles/fontSizes';
import { moderateScale } from '../styles/ResponsiveDimentions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import gStyles from '../styles/globalStyle';
import Colors from '../styles/colors';
type Props = {
    message: string;
}
const Error = ({ message }: Props) => {
    return (
        <View style={[gStyles.row_Center , {backgroundColor:Colors.bg_Error , borderRadius:5}]}>
            <Ionicons name='alert-circle' color={"red"} />
            <Text style={styles.error}> {message} </Text>
        </View>

    );
}

const styles = StyleSheet.create({
    error: {
        color: "#000",
        marginLeft: moderateScale(1),
        fontSize: fontSizes.font12
    }
});

export default Error;