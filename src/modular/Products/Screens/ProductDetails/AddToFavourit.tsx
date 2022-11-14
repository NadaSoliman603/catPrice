import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, Keyboard, StatusBar } from 'react-native';
import { Portal } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import OutLineButton from '../../../../common/OutLineButton';
import Dropdwon from '../../../../components/Dropdwon';
import Colors from '../../../../styles/colors';
import fontSizes from '../../../../styles/fontSizes';
import { moderateScale } from '../../../../styles/ResponsiveDimentions';
import CustomButtomMeueModal from '../../../../components/AuthModal';
import gStyles from '../../../../styles/globalStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Label } from '../../../../types/types';
import DropdownItem from '../../../../components/DropdownItem';
import { useForm } from 'react-hook-form';
import CustomTextInput from '../../../../common/CustomTextInput';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import OverLayLoading from '../../../../common/OverLayLoading';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/store/store';
import { addCatTOFavouritCollectionApi, addFavouritCollectionApi, getFavouritCollectionsApi } from '../../../../Api/Favourits';
import Error from '../../../../common/Error';

type Props = {
    cancelModal: () => void;
    catId:number;  
    setIsFavourit:any
}

const AddToFavourit = (props: Props) => {
    const token = useSelector((state: RootState) => state.Auth.token)
    const { control, register, handleSubmit, watch, formState: { errors } , reset} = useForm();
    const name = "Select Favourit Collection"
    const [favColection, setFavCollection] = useState<any | null>(null)
    const [faveCollectionData, setFaveCollectionData] = useState<any[]>([])
    const [selectCollectionValidationError , setSelectCollectionValidationError] = useState<null | string>(null)


    const addNewColection = () => {
        console.log("add new collection")
    }
    const selectFavCollection = (value: string | number) => {

    }


    //sellection Modal
    const [selectionodal, setSllectionModal] = useState<boolean>(false)

    const togleFavModal = (value: boolean) => {
        setSllectionModal(value)
    }

    const onValueChange = (value: any) => {
        setFavCollection(value)
        setSllectionModal(false)
        setSelectCollectionValidationError(null)
    }


    //====================================
    //add New Favourit Colection Modal 
    //=================================
    const [modalHeight, setModalHeight] = useState<number>(40)
    const [addNewFaveModal, setaddNewFaveModal] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const togelAddNewFaveModal = (value: boolean) => {setaddNewFaveModal(value) }
    const [collectionNameValidationError , setCollectionNameValidationError] = useState<null | string>(null)


    const onSaveCollection = async (data: any) => {
        const isCollectionWithSameName =  faveCollectionData.findIndex((item)=> item.collectionName === data.collectionName)       
        //if colection Name unique
        if(isCollectionWithSameName === -1){
            if (token) {
                try {
                    setLoading(true)
                    const res = await addFavouritCollectionApi({
                        data: { collectionName: data.collectionName },
                        token: token
                    })
                    if (res.data.header.headerMessage === "SUCCESS") {
                        const newcollection = res?.data?.body
                        setFaveCollectionData([...faveCollectionData, newcollection])
                        setFavCollection(newcollection)
                        setaddNewFaveModal(false)
                        setCollectionNameValidationError(null)
                        reset({collectionName:""})
                    }
                } catch (error) {
                    console.log("error", error)
                }

                setLoading(false)
            }
        }else{
             //if colection Name unique
             setCollectionNameValidationError("You Have a Collection with The Same Name")
        }
        
    }
    useEffect(() => {

        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setModalHeight(80)
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setModalHeight(40)
        });

        return () => {
            hideSubscription.remove();
            showSubscription.remove();

        };
    }, []);
    console.log({ faveCollectionData })
    //===================================
    //get favourits collection Data data
    //===================================
    const getFavouritsCollectionData = async () => {
        if (token) {
            try {
                setLoading(true)
                const res = await getFavouritCollectionsApi({ token: token })
                console.log("collection data =>>", res)
                if (res.data.header.headerMessage === "SUCCESS") {
                    const faveColections = res?.data?.body
                    console.log(faveColections.length)
                    setFaveCollectionData(faveColections)
                    setaddNewFaveModal(false)
                }
            } catch (error) {
                console.log("error", error)
                
            }

            setLoading(false)
        }
    }
    useEffect(() => {
        getFavouritsCollectionData()

    }, [])

    //===================================
    //Add Product To Favourit Colection
    //===================================
    const addProductToFacouritCollection = async()=>{
        if(favColection === null){
            setSelectCollectionValidationError("Please Select a Collection")
        }else{
            try {
                if(token){
                    setLoading(true)
                    const res = await addCatTOFavouritCollectionApi({data:{catId:props.catId ,  collectionId:favColection.collectionId} ,token:token})
                    if (res?.data?.header?.headerMessage === "SUCCESS"){
                        props.setIsFavourit(true)
                    }else{
                        setSelectCollectionValidationError(res?.data?.header?.headerMessage)
                    }
                    setLoading(false)
                    props.cancelModal()
                    
                }
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
    }

    return (
        <>
            <View style={styles.screen}>
                {/* start sellect Collection Dropdwon Button */}
                <View style={{ marginVertical: moderateScale(10) }}>
                <Pressable onPress={() => { faveCollectionData.length ? setSllectionModal(true) : setaddNewFaveModal(true) }} style={({ pressed }) => [{
                    backgroundColor: pressed ? "#eee" : "#fff",
                    width: "100%",
                    

                }, gStyles.row, gStyles.spaceBetwen, gStyles.p_6, gStyles.border,]}  >

                    <Text style={[gStyles.h4, { color: "#444" }]}>{favColection !== null ? favColection.collectionName : name}</Text>
                    <AntDesign color={Colors.primary} name={"down"} size={fontSizes.font14} />
                </Pressable>
                {selectCollectionValidationError !== null && <Error message={selectCollectionValidationError} />}
                </View>
                {/* end sellect Collection Dropdwon Button */}

                <Pressable onPress={() => setaddNewFaveModal(true)} style={({ pressed }) => [{
                    backgroundColor: pressed ? Colors.primaryPresedButton : "transparent",
                    padding:moderateScale(3)
                }, styles.button]}>
                    <Text style={styles.buttonText}>Create a new collection </Text>
                    <Feather style={styles.buttonText} color={Colors.primary} size={fontSizes.font22} name='plus' />
                </Pressable>

                <OutLineButton textStyle={{}} title="Save" icon={<Text></Text>} onPress={addProductToFacouritCollection} outline={true} style={{ margin: 0, padding: 0, marginVertical: moderateScale(10) }} />
                {loading && <OverLayLoading />}

            </View>


            {/* start sellect Collection modal */}
            <CustomButtomMeueModal bgColor='rgba(0, 0, 0, 0.0)' height={40} title="Select Favourit Collection" togleModal={togleFavModal} modalVisible={selectionodal} setModalVisible={togleFavModal}>
                <View style={styles.screen}>
                    <StatusBar animated={false} backgroundColor='rgba(0, 0, 0, 0.6)' />
                    {faveCollectionData.map((item: any) => <DropdownItem key={item?.collectionId} onChange={onValueChange} item={item} checked={item?.collectionId === favColection?.collectionId} />)}
                    {loading && <OverLayLoading />}
                </View>
            </CustomButtomMeueModal>
            {/* end sellect Collection modal */}


            {/* start add new Collection modal */}
            <CustomButtomMeueModal bgColor='rgba(0, 0, 0, 0.0)' height={modalHeight} title="Create Favourit Collection" togleModal={togelAddNewFaveModal} modalVisible={addNewFaveModal} setModalVisible={togelAddNewFaveModal}>
                <>
                    <ScrollView style={styles.screen}>
                        <StatusBar animated={false} backgroundColor='rgba(0, 0, 0, 0.6)' />

                        <CustomTextInput
                            secureTextEntry={false}
                            keyboard={"default"}
                            label='Colection Name'
                            control={control}
                            error={errors.collectionName}
                            name="collectionName"
                            icon={() => <></>}
                            rightIcon={false}
                            rules={{
                                required: true,
                                // minLength : 4
                            }}
                        />
                        {collectionNameValidationError !== null && <Error message={collectionNameValidationError} />}
                        <OutLineButton textStyle={{}} title="Add" icon={<Text></Text>} onPress={handleSubmit(onSaveCollection)} outline={true} style={{ margin: 0, padding: 0, marginVertical: moderateScale(10) }} />
                    </ScrollView>
                    {loading && <OverLayLoading />}
                </>
            </CustomButtomMeueModal>
            {/* start add new Collection modal */}
        </>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: moderateScale(6),
        flex:1
    },
    button: {
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",

    },
    buttonText: {
        fontWeight: "600",
        fontSize: fontSizes.font16,
        color: Colors.primary,
    }
});

export default AddToFavourit;