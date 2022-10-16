import Entypo  from 'react-native-vector-icons/Entypo';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Colors from '../styles/colors';

type Props = {
    Parent:string;
    name:string;
    setMenueParent:any;
    title:string;
    children: JSX.Element;
}
const MenuItems = ({Parent ,name , setMenueParent , title , children}:Props) => {
    const menueParent = Parent;

    const menueParentHandler = () => {
     name == menueParent
        ? setMenueParent("")
        : setMenueParent(name);
    };
    // const fontColor =  "black";
    const iconColor = (menueParent == name) ? "white" : Colors.primary;

    return (
      <View style={{ ...styles.menuItemsContainer }}>
        <TouchableOpacity activeOpacity={0.5} onPress={menueParentHandler}>
          <View  style={{ 
            ...styles.menuParent,
            // backgroundColor: menueParent == name ? Colors.primary : "white", 
          }}>
            <View style={styles.menuParentHeader}>
              {/* <FontAwesome5 style={{ paddingTop:5 }} name={icon} size={22} color={iconColor} /> */}
              <Text style={{ ...styles.menuTitle,}}>{title}</Text>
            </View>
            <View>
              <Entypo
                name={name == menueParent ? "chevron-small-up" : "chevron-small-down"}
                size={20}
                // color={fontColor}
              />
            </View>
          </View>
        </TouchableOpacity>
        {menueParent == name && (
          <View style={styles.menuChildsContainer}>{children}</View>
        )}
      </View>
    );
}

const styles = StyleSheet.create({
  menuItemsContainer:{
    // borderBottomWidth:2,
    // borderColor:"#ddd",
  },  
      menuParent: {
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        flex: 1,
        padding:8,
      },
      menuParentHeader: {
        flexDirection: "row",
        justifyContent: "flex-start",
      },
      menuTitle: {
        fontSize:18,
        paddingHorizontal:5

      },
      menuChildsContainer:{
          paddingLeft:20,
      }
  });

export default MenuItems;