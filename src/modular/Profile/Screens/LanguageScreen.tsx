
import * as React from 'react';
import { StyleSheet, View, Text , Pressable } from 'react-native';
import { Divider } from 'react-native-paper';
import Colors from '../../../styles/colors';
import gStyles from '../../../styles/globalStyle';
import { moderateScale } from '../../../styles/ResponsiveDimentions';
import Feather  from 'react-native-vector-icons/Feather';
import useDrower from './useDrower';
type Props = {}

const LanguageScreen = (props: Props) => {
    useDrower("Language")

    return (
        <View style={styles.screen}>
            <Pressable style={[styles.lang]}>
                <Text style={[gStyles.text_Primary , styles.title]}>English</Text>
                <Feather color={Colors.primary} name='check'  size={moderateScale(7)}/>
            </Pressable>
            <Divider />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: moderateScale(6)
    },
    lang:{
        paddingVertical:moderateScale(3),
        flexDirection:"row",
        justifyContent:"space-between"
    },
    title:{
        letterSpacing:moderateScale(0.5)
    }
});

export default LanguageScreen;
