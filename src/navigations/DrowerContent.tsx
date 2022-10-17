import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Pressable, } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from './../styles/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStack } from '../types/navigationTypes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MenuItems from './MenuItms';
import MenuItem from './MenuItem';
import Button from '../common/Button';
import IconButton from '../common/IconButton';
import Feather  from 'react-native-vector-icons/Feather';
import Octicons  from 'react-native-vector-icons/Octicons';
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import fontSizes from '../styles/fontSizes';
import { hp } from '../styles/globalStyle';
type Props = {
    props: any;
};
type NavigationType = NativeStackNavigationProp<RootStack>
const DrowerContent = ({ props }: Props) => {
    const [menueParent, setMenueParent] = useState<string>("");
    const [menueChild, setMenueChild] = useState("");
    const navigation = useNavigation<NavigationType>()

    return (
        <ScrollView>
            <View style={styles.screen}>
                <Pressable onPress={() => { navigation.navigate("Home") }}>
                    <View style={styles.Logo} {...props}>
                        {/* <Image source={imgs.log} style={styles.img} /> */}
                       <View style={styles.userImag}>
                       <Feather  name='user' size={50}/>
                       </View>
                    </View>
                </Pressable>

                <IconButton  icon={<Feather color={Colors.primary} name='home' size={fontSizes.font20} />} onPress={() => { navigation.navigate("Home") }} title="Home" />
                <IconButton icon={<Octicons color={Colors.primary} name='history' size={fontSizes.font20} />} onPress={() => { navigation.navigate("History") }} title="History" />
                <IconButton icon={<AntDesign color={Colors.primary} name='hearto' size={fontSizes.font20} />} onPress={() => { navigation.navigate("Favourites") }} title="Favourites" />
                <IconButton icon={<AntDesign color={Colors.primary} name='message1' size={fontSizes.font20} />} onPress={() => { navigation.navigate("Contact") }} title="Contact Us" />
                <IconButton icon={<Feather color={Colors.primary} name='alert-circle' size={fontSizes.font20} />} onPress={() => { navigation.navigate("About") }} title="About" />
                <IconButton icon={<Feather  color={Colors.primary} name='file-text' size={fontSizes.font20} />} onPress={() => { navigation.navigate("TermsAndConditions") }} title="Terms And Conditions" />
                <IconButton icon={<Octicons color={Colors.primary} name='shield-check' size={fontSizes.font20} />} onPress={() => { navigation.navigate("Privacy") }} title="Privacy" />
                <IconButton icon={<MaterialIcons color={Colors.primary} name='logout' size={fontSizes.font20} />} onPress={() => navigation.navigate("Login")} title="Log Out" />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    Logo: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        backgroundColor:Colors.primary,
        height:hp(25)
    },
    userImag:{
        backgroundColor:"#eee",
        padding:20,
        borderRadius:50
    }

});

export default DrowerContent;
