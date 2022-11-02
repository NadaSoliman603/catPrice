import CountryPicker from 'react-native-country-picker-modal'
import  React , {useState} from 'react';
import { StyleSheet, View, Text, Pressable, } from 'react-native';
import { moderateScale } from '../../../../styles/ResponsiveDimentions';
import Colors from '../../../../styles/colors';
import gStyles from '../../../../styles/globalStyle';
import fontSizes from '../../../../styles/fontSizes';
import Entypo from 'react-native-vector-icons/Entypo';
import { Image } from 'react-native-animatable';
import imgs from '../../../../assets/images';
import Ionicons from 'react-native-vector-icons/Ionicons';


type Props ={
    currancy:any, 
    setcurrancy:(value:object)=>void
}

const CurrancyButton = ({currancy, setcurrancy}:Props) => {
    const [visable, setVisable] = useState(false)
   

    return (
        <Pressable onPress={() => { setVisable(true) }} style={({ pressed }) => [{
            backgroundColor: pressed ?"#eee" : "#fff"
        }, gStyles.row, gStyles.spaceBetwen, gStyles.border, styles.screen]}  >


            <View style={[gStyles.row]}>
                <Ionicons name='caret-down-outline' size={fontSizes.font12} />

                <CountryPicker
                    countryCode={currancy.cca2}
                    withFilter={true}
                    withFlag={true}
                    withCountryNameButton={true}
                    withAlphaFilter={true}
                    // withCallingCode={true}
                    withEmoji={true}
                    onSelect={(country) => {setcurrancy(country)  }}
                    withCurrency={true}
                    visible={visable}
                    
                />
                <Text style={[gStyles.textDarkBlack]}>{currancy.currency}</Text>
            </View>


            <Image source={imgs.currancy} />


        </Pressable>

    );
}

const styles = StyleSheet.create({
    screen: {
        marginVertical: moderateScale(4),
        padding: moderateScale(3),
        paddingHorizontal: moderateScale(6)
    }
});

export default CurrancyButton;