
import * as React from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { Modal, Portal, Button, Provider } from 'react-native-paper';
import Colors from '../styles/colors';
import gStyles, { hp } from '../styles/globalStyle';
import { moderateScale } from '../styles/ResponsiveDimentions';
import { Label } from '../types/types';
import DropdownItem from './DropdownItem';
import AntDesign from 'react-native-vector-icons/AntDesign';
import fontSizes from '../styles/fontSizes';

type Props = {
    data: any;
    value: string | null;
    onChange: (value: any) => void;
    // visible:boolean;
    name: string;
}


const Dropdwon = ({ data, onChange, value, name }: Props) => {
    const [visible, setVisible] = React.useState(false);
    // const hideModal = () => setVisible(false);



    const onValueChange = (value: string) => {
        setVisible(false);
        onChange(value)
    }


    return (
        <>

            <Pressable onPress={() => { setVisible(true) }} style={({ pressed }) => [{
                backgroundColor: pressed ? "#eee" : "#fff"
            }, gStyles.row, gStyles.spaceBetwen, gStyles.p_4, gStyles.border, styles.button]}  >
                <Text style={[gStyles.h4 , {color:"#444"}] }>{value ? value : name}</Text>
                <AntDesign color={Colors.primary} name={"down"} size={fontSizes.font14} />
            </Pressable>



                    <Portal >
                        <Modal style={[styles.modal]} visible={visible} onDismiss={() => { }} contentContainerStyle={styles.containerStyle}>
                            {/* <View style={[styles.dropDowen]}> */}
                            <View style={styles.menuIcon}></View>
                            <Text style={[gStyles.h5 ]}>Select {name}</Text>

                            <ScrollView >
                                {data.map((item: Label) => <DropdownItem key={item.value} onChange={onValueChange} item={item} checked={item.value === value} />)}
                            </ScrollView>

                        </Modal>
                    </Portal>
           


           
        </>
    );
}

const styles = StyleSheet.create({
    modal: {
        margin: moderateScale(10),


    },
    dropDowen: {

    },
    menuIcon: {
        borderWidth: moderateScale(1),
        width: moderateScale(20),
        borderRadius: moderateScale(50),
        borderColor: Colors.primary,
        alignSelf: "center",

    },
    containerStyle: {
        backgroundColor: Colors.white,
        padding: moderateScale(8),
        borderRadius: moderateScale(3),
        maxHeight: hp(50),
        overflow: "scroll",
        zIndex:10000
    },
    button: {
        marginVertical: moderateScale(3),
        // zIndex: -1
    }
});

export default Dropdwon;
