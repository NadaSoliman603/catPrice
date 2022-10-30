
import * as React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import Colors from '../../../styles/colors';
import gStyles from '../../../styles/globalStyle';
import Entypo from 'react-native-vector-icons/Entypo';
import { moderateScale } from '../../../styles/ResponsiveDimentions';
type Props = {
    title:string;
    value:string;
    onChange: ()=>void;
}

const ProfileItem = ({onChange ,title ,value}: Props) => {
    return (
        <Pressable onPress={onChange} style={({ pressed }) => [{
            backgroundColor: pressed ? Colors.primaryPresedButton : "#fff"
        }, gStyles.row, gStyles.spaceBetwen, gStyles.p_4, gStyles.border ,styles.screen]}  >
            <Text style={[gStyles.h4]}>{title}</Text>
            <View style={[gStyles.row]}>
                <Text>{value}</Text>
                <Entypo style={[gStyles.text_Bold]} color={Colors.primary} name="chevron-small-right" size={moderateScale(10)} />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    screen: {
        marginVertical:moderateScale(3)
    }
});

export default ProfileItem;
