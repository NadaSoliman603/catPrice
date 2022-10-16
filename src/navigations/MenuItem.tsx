import React from "react";
// import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { CommonActions, useNavigation, useRoute } from "@react-navigation/native";
import Colors from "../styles/colors";
import { NavigationType } from "../types/navigationTypes";

type Props = {
    child: any;
    setMenueChild: any;
    screen: any;
    icon: any;
    title:string;
}

const MenuItem = ({ child ,setMenueChild,screen,icon,title }: Props) => {
    const navigation = useNavigation<NavigationType>()
    const menueChild = child;
    const menueChildHandler = () => {
        setMenueChild(screen);
    };
    const fontColor = screen == menueChild ? Colors.primary : "black";
    const route = useRoute();

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            style={styles.menuItemContainer}
            onPress={() => {
                navigation.reset({
                    index: 0,
                    routes: [
                        {
                            name: screen,
                            params: {
                                title: title ? title : "props.screen",
                            },
                        },
                    ],
                });
                // props.navigation.navigate(props.screen, { title: props.title ? props.title : "props.screen"});

                return;
            }}
        >
            <View
                style={{
                    ...styles.itemHeader,
                    borderRightWidth: 5,
                    borderColor: screen == menueChild ? Colors.primary : "white",
                }}
            >
                {/* <FontAwesome5
          style={{ paddingTop: 5 }}
          name={props.icon}
          size={20}
          color={Colors.primary}
        /> */}
                <Text style={{ ...styles.menuTitle, color: fontColor }}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    menuItemContainer: {
        padding: 5,
    },
    menuTitle: {
        // fontWeight: "bold",
        // fontSize: 16,
        // padding: 5,
    },
    itemHeader: {
        flexDirection: "row",
    },
});

export default MenuItem;