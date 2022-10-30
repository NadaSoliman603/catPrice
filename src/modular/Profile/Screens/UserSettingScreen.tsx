
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-paper';
import imgs from '../../../assets/images';
import Colors from '../../../styles/colors';
import { moderateScale } from '../../../styles/ResponsiveDimentions';
type Props = {}

const UserSettingScreen = (props:Props) => {
    const imgUri = "https://img.freepik.com/free-photo/handsome-confident-smiling-man-with-hands-crossed-chest_176420-18743.jpg?w=2000"

    return (
        <View style={styles.screen}>
            <View style={[styles.profilImg]}>
                <Avatar.Image size={moderateScale(20)} source={{ uri: imgUri}}/>
                <Avatar.Image style={[styles.editButton , { backgroundColor:Colors.white }]} size={moderateScale(10)} source={imgs.edit}/>
            </View>
            <Text></Text>
        </View>
    );
}

const styles = StyleSheet.create({
screen:{
    flex:1,
    backgroundColor:Colors.white,
    padding:moderateScale(6)
},
profilImg:{
    flexDirection:"row",
    alignContent:"center",
    alignItems:"center"
},
editButton:{
}
});

export default UserSettingScreen;
