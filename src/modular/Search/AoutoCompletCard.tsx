import * as React from 'react';
import { StyleSheet, View, Text , Pressable , ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Avatar } from 'react-native-paper';
import AppImage from '../../common/AppImage';
import Colors from '../../styles/colors';
import fontSizes from '../../styles/fontSizes';
import { moderateScale } from '../../styles/ResponsiveDimentions';
type Props = {
    item:any,
    onPress : (item:any)=>void
}

//source={{   uri:{item?.makerImage}}}


const AoutoCompletCard = ({item , onPress}:Props) => {
    console.log("=============>",item?.brands?.[0]?.makerImage)
    console.log("search result item , aoutoComplet" , item)
    return (
        <Pressable onPress={()=>onPress(item)}  style={({pressed})=>[{
            backgroundColor:pressed?Colors.primaryPresedButton:"transparent"
        },styles.screen]}>
           <View style={styles.container}>
           {item?.brands?.map((item:any, index:number)=> {
                // if(item?.makerImage === "https://floridatrading.co.za/catalog/images/car_models/null"){
                //     console.log( "notFound",item.brandId)
                // }
                
                return (<FastImage
                    resizeMode='contain'
                     key={index} 
                     style={styles.logImg} 
                    source={{ uri: item?.makerImage}}
                        
                     />)
            })
             }
            <Text style={styles.title}>{(item?.catNo && item?.catNo !== "0") ? item?.catNo :item?.catSn }</Text>
           </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
screen:{
    flex:1,
   borderBottomWidth:moderateScale(0.5),
   borderColor:Colors.lightGray
},
logImg:{
    width:moderateScale(12),
    height:moderateScale(12),
    // paddingRight:moderateScale(6)
},
container:{
    flexDirection:"row" ,
    alignContent:"center",
    alignItems:"center",
    paddingHorizontal:moderateScale(6),
    paddingVertical:moderateScale(3),

},
title:{
    paddingHorizontal:moderateScale(3),
    fontFamily: 'Montserrat',
    color:Colors.textBlack,
    fontSize:fontSizes.font18,
    fontWeight:'700'
}
});

export default AoutoCompletCard;