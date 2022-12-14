import AsyncStorage from "@react-native-async-storage/async-storage";



const addCartDataToLocalStorag = async ({catData , catQuantity , icreaseBy} :{catData:any , catQuantity:number , icreaseBy:boolean}) => {
    const cartData = await AsyncStorage.getItem("cartData")

    console.log({catData})
    if (cartData) {
      const userCartData = await JSON.parse(cartData)
      const newQuantity = userCartData.quantity + catQuantity;

      //check if the element in cart to incress the quantity
      const isExsisted = userCartData.data.findIndex((item:any)=>{
        const id = item.item.catId
        const newItemID = catData.catId
          return id === newItemID
      })

      //element is in cart
      if(isExsisted !== -1){
        console.log("the element in cart update quantity", {isExsisted} )
        const cartElement = userCartData.data[isExsisted]
        // userCartData[isExsisted] = {
        //   quantity:cartElement.quantity + catQuantity ,
        //   item: catData
        // }
        if(icreaseBy){
          userCartData.quantity= userCartData.quantity  + catQuantity
          userCartData.data[isExsisted].quantity =  catQuantity + userCartData.data[isExsisted].quantity
          
          console.log({
            data: userCartData.data,
            quantity:userCartData.quantity 
          })
          
          AsyncStorage.setItem('cartData', JSON.stringify(userCartData))
          // //=====================
          // //update state Reducer
         return  {
            data: userCartData.data,
            quantity:userCartData.quantity 
          }
        }
        userCartData.quantity= userCartData.quantity - userCartData.data[isExsisted].quantity + catQuantity
        userCartData.data[isExsisted].quantity =  catQuantity
        console.log({
          data: userCartData.data,
          quantity:userCartData.quantity 
        })
        
        AsyncStorage.setItem('cartData', JSON.stringify(userCartData))
        // //=====================
        // //update state Reducer
       return  {
          data: userCartData.data,
          quantity:userCartData.quantity 
        }

      }else{
        //add the new element  to cart
        console.log( "add the new element  to cart",{isExsisted})
        userCartData.quantity= userCartData.quantity + catQuantity
        userCartData.data.push({quantity: catQuantity, item:catData})
        AsyncStorage.setItem('cartData', JSON.stringify(userCartData))
        //=====================
        //update state Reducer
       return  {
          data: userCartData.data,
          quantity:userCartData.quantity 
        }
      }
    } else {
      //add Cart to localstorage for the firest tim
      console.log("Add Cart to Local Storag ")
      const cartData = { quantity: catQuantity, data: [{ quantity: catQuantity, item: catData }] }
      AsyncStorage.setItem('cartData', JSON.stringify(cartData))
    //     //=====================
    //     //update state Reducer
       return  {
          data:[{ quantity: catQuantity, item: catData }] ,
          quantity: catQuantity,
        }
    }
  }



  
  export const onDeletCartItems = ({catData , deleteArray} :{catData:{data:[] ,quantity:number} , deleteArray:{ids:number[] , quantity:number}})=>{
    const newQuantity = catData.quantity - deleteArray.quantity 
    console.log({deleteArray})

    console.log({catData})
    const newData = catData.data.filter((item:{item:any ,quantity:number})=> {
      console.log(item.item.catId , deleteArray.ids ,  deleteArray.ids.includes(item.item.catId) )
      return !deleteArray.ids.includes(item.item.catId)
    })

    console.log({newData})
    console.log({catData})


    AsyncStorage.setItem("cartData" ,  JSON.stringify({ data:newData,quantity:newQuantity,}))

    return {
      data:newData,
      quantity:newQuantity,
    }
}
  
  export default addCartDataToLocalStorag;