import  React , {useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import OutLineButton from '../common/OutLineButton';
import Fontisto  from 'react-native-vector-icons/Fontisto';
import fontSizes from '../styles/fontSizes';
import Colors from '../styles/colors';
import gStyles from '../styles/globalStyle';
import { moderateScale } from '../styles/ResponsiveDimentions';
type Props = {
    quantity :number;
    setQuantity:any;
    buttonStyle:object,
    handelChange :  ()=>Promise<void>  | any
}

const Quantity = ({quantity , setQuantity , buttonStyle , handelChange}:Props) => {

        const onAdd =async ()=>{
            setQuantity(quantity+1)
            if(handelChange !== undefined) await handelChange()

        }

        const onMinus = async()=>{
            if(quantity >1) {
                setQuantity(quantity-1)
                if(handelChange !== undefined) await handelChange()
               
            }
        }

    return (
        <View style={[gStyles.row  ,    ]}>
            <OutLineButton textStyle={{  }} style={{ ...gStyles.center ,...styles.button , ...buttonStyle}} icon={<Fontisto name='minus-a' size={fontSizes.font10}  color={Colors.primary}/>} onPress={onMinus} outline={false} title={''} />
            <Text>{quantity}</Text>
            <OutLineButton textStyle={{  }} style={{ ...gStyles.center , ...styles.button , ...buttonStyle}} icon={<Fontisto name='plus-a' size={fontSizes.font10}  color={"#fff"} />} onPress={onAdd} outline={true} title={''} />

        </View>
    );
}

const styles = StyleSheet.create({
button:{
    paddingHorizontal:moderateScale(2),
    // paddingVertical:1,
}
});

export default Quantity;