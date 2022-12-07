import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../../styles/colors';
import { moderateScale } from '../../styles/ResponsiveDimentions';
type Props = {}

const UserManual = (props:Props) => {
    return (
        <View style={styles.screen}>
            <Text>UserManual</Text>
        </View>
    );
}

const styles = StyleSheet.create({ 
screen:{
    flex:1, 
    backgroundColor:Colors.white,
    padding:moderateScale(6)
}
});

export default UserManual;