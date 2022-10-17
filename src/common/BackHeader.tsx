import * as React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import gStyles from '../styles/globalStyle';
import Feather from 'react-native-vector-icons/Feather';
import fontSizes from '../styles/fontSizes';
import Colors from '../styles/colors';
import {useNavigation } from '@react-navigation/native';
import { NavigationType } from '../types/navigationTypes';

type Props = {
    title:string
}

const BackHeader = ({title}: Props) => {
    const navigation = useNavigation<NavigationType>()
    const goBack = () => {
        navigation.goBack()
    }
    return (
        <View style={[gStyles.row ,styles.screen]}>
            <Pressable style={({ pressed }) => [
                {
                    backgroundColor: pressed ? Colors.bg : "#fff"
                },
            ]} onPress={goBack} >
                <Feather color={Colors.primary} name='arrow-left' size={fontSizes.font22} />
            </Pressable>
            <View style={[styles.headerContainer]}>
                <Text style={[gStyles.h3, styles.title]}> {title}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen:{
        paddingBottom:35,
        zIndex:10
    },
    headerContainer: {
        flex: 1
    },
    title: {
        textAlign: "center",
        alignSelf: "center",
        fontWeight: '600'
    }
});

export default BackHeader;