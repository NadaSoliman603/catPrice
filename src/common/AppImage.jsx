import React, { useEffect , useState ,useLayoutEffect} from 'react'
import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native'
import { wp, hp } from '../../utils/dimensions'
import Loading from './Loading'
import FastImage from 'react-native-fast-image'
import { moderateScale } from '../styles/ResponsiveDimentions'
import History from '../modular/History'


const AppImage = ({uri , style , imgWidth , maxheight }) => {
    const [imgHeight , setimgHeight]= useState(imgWidth)
 
    useEffect(() => {
        getImageSize()
    },[])

    // let imgHeight = imgWidth

    const getImageSize = () => {
        Image.getSize(uri, (width, height) => { 
            if(width && height){
                const pre =  width/height
                const imageWidth = imgWidth
                setimgHeight(imageWidth/pre)
                // console.log("imgHeight",imgWidth,  imgHeight , pre , width , height)

            }
         });
    }


    return (
       <>
        {/* {console.log(imgHeight)} */}
        <FastImage source={{ uri: uri }}  resizeMode='contain' style={[style , {height:imgHeight , width:imgWidth , maxHeight:maxheight}]} />
        </>
    )
}

export default AppImage

const styles = StyleSheet.create({
    img:{
        width: moderateScale(20),
        height: moderateScale(20),
       
    }
})
