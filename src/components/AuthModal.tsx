import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, StatusBar, KeyboardAvoidingView, Platform } from "react-native";
import gStyles, { hp, wp } from "../styles/globalStyle";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { moderateScale } from "../styles/ResponsiveDimentions";
import Colors from "../styles/colors";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider } from "react-native-paper";
import fontSizes from "../styles/fontSizes";
import { ScrollView } from "react-native-gesture-handler";

type Props = {
    modalVisible: boolean;
    togleModal: (show: boolean, id: string | undefined) => void;
    setModalVisible: any;
    children: JSX.Element;
    title: string;
    height: number;
    bgColor: string | "default"
}
const ButtomMeueModal = ({ bgColor, height, modalVisible, togleModal, setModalVisible, children, title }: Props) => {
    // const [modalVisible, setModalVisible] = useState(false);
    const fulllHeight = height === 100
    return (
        <Pressable onPress={() => console.log("pressed")} style={[styles.centeredView, modalVisible && styles.showModelStyle]}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    console.log("onRequestClose")
                    setModalVisible(!modalVisible)
                }}
                style={styles.modal}
            // onDismiss={}
            >

                <StatusBar animated={false} backgroundColor={bgColor === "default" ? "#bbb" : bgColor} />
                
                    <View style={{ height: hp(100), backgroundColor: bgColor === "default" ? "#bbb" : bgColor, flex: 1, }}>
                        <View style={[styles.modalView, fulllHeight && styles.border_0, {
                            top: hp(100 - height),
                            height: hp(height),
                            flex: 1,
                            maxHeight:hp(height),
                        }]}>
                            {/* <View style={styles.menuIcon}></View> */}

                            <View style={[gStyles.row, gStyles.spaceBetwen, { paddingHorizontal: moderateScale(5), paddingVertical: 10, }]}>
                                <View style={[{ width: "90%" }]}>
                                    <Text style={[gStyles.h3, gStyles.text_Bold, gStyles.text_center]}>{title}</Text>

                                </View>
                                {!fulllHeight && <Pressable onPress={() => setModalVisible(false)} style={({ pressed }) => [{ alignSelf: 'flex-end', padding: moderateScale(2), backgroundColor: pressed ? "#fff" : "#F3F3F3", borderRadius: moderateScale(50), }]}>
                                    <AntDesign name="down" size={fontSizes.font18} />
                                </Pressable>}

                            </View>
                            <ScrollView style={{ flex: 1, }}>
                                {children}
                            </ScrollView>
                        </View>
                    </View>
            </Modal>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        position: "absolute",
    },
    modal: {
        backgroundColor: "red"
    },
    modalView: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: moderateScale(8),
        borderTopRightRadius: moderateScale(8),
        borderWidth: moderateScale(0.5),
        borderColor: "#eee",
        shadowColor: "#ccc",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    menuIcon: {
        borderWidth: 2,
        width: 40,
        borderRadius: 50,
        borderColor: "#999",
        alignSelf: "center"
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    showModelStyle: {
        zIndex: 10000000,
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(100),
        height: hp(100),
        margin: 0,
    },
    border_0: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderWidth: 0,
    }
});

export default ButtomMeueModal;