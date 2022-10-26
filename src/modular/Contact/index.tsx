import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper';
import imgs from '../../assets/images';
import OutLineButton from '../../common/OutLineButton';
import Colors from '../../styles/colors';
import fontSizes from '../../styles/fontSizes';
import { moderateScale } from '../../styles/ResponsiveDimentions';
import ContactItemCard from './components/ContactItemCard';
type Props = {}

const Contact = (props:Props) => {
    return (
        <View style={styles.screen}>
            <ContactItemCard  title='Simply drop us an email at' subTitle='hello@catprice.com' icon={<Avatar.Image style={{ backgroundColor:Colors.white }} source={imgs.emailIcon} size={moderateScale(35)}/>} body='You will recevie a replay within 24 Hour'/>
            <ContactItemCard  title='Give us a ring at' subTitle='+966 23454 264' icon={<Avatar.Image  style={{ backgroundColor:Colors.white }}  source={imgs.phonIcon} size={moderateScale(35)}/>} body='Our exerts ate standing by 24 hours from 9 AM to 9 PM  REST'/>
            <OutLineButton title='Call Now' icon={<></>}   textStyle={{  }} style={{  }} outline={true} onPress={()=>{}} />
        </View>
    );
}

const styles = StyleSheet.create({
screen:{
    flex:1,
    backgroundColor:Colors.white,
    padding:moderateScale(6),
    justifyContent:'space-evenly'
}
});

export default Contact;