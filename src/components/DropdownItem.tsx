import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Divider } from 'react-native-paper';
import TextButton from '../common/TextButton';
import Colors from '../styles/colors';
import fontSizes from '../styles/fontSizes';
import gStyles from '../styles/globalStyle';
import { moderateScale } from '../styles/ResponsiveDimentions';
import { Label } from '../types/types';
type Props = {
    checked:boolean;
    item:any;
    onChange:(value:string)=>void;
}

const DropdownItem = ({checked ,item , onChange}:Props) => {

    return (
      <View style={{  }}>
          <TextButton onPress={()=>{onChange(item.value || item)}}>
            <Text style={[checked && styles.checked , !checked && styles.unChecked]}>{item.value || item.collectionName}</Text>
        </TextButton>
      </View>
    );
}

const styles = StyleSheet.create({
screen:{
    // borderBottomWidth:moderateScale(0.3),
    // borderColor:Colors.primary,
    justifyContent:"center",
    flexDirection:"row",
},
checked:{
    backgroundColor:Colors.primary,
    flex:1,
    padding:moderateScale(3),
    justifyContent:"center",
    flexDirection:"row",
    textAlign:"center",
    fontWeight:"bold",
    color:Colors.white,
    fontSize:fontSizes.font18,
    letterSpacing:moderateScale(0.3),
    borderRadius:5,
    
},
unChecked:{
    padding:moderateScale(5),
    justifyContent:"center",
    flexDirection:"row",
    textAlign:"center",
    flex:1,
}
});

export default DropdownItem;