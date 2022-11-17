import axios from "axios"
const END_POINT = "http://floridatrading.online:8010"





export const addFavouritCollectionApi = ({data , token }:{data:{collectionName:string} , token:string})=>{
    return axios
    .post(`${END_POINT}/api/v1/favorites/collections/save`, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
      },
    })
  }


  export const getFavouritCollectionsApi = ({token }:{token:string})=>{
    return axios
    .get(`${END_POINT}/api/v1/favorites/collections/get-collections`, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
      },
    })
  }


  export const getFavouritCollectionsDetailsApi = ({token , id }:{token:string , id:string})=>{
    return axios
    .get(`${END_POINT}/api/v1/favorites/collections/get-favorites-details?collectionId=${id}`, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
      },
    })
  }
  
  

  
export const addCatTOFavouritCollectionApi = ({data , token }:{data:{collectionId :number ;catId :number } , token:string})=>{
    return axios
    .post(`${END_POINT}/api/v1/favorites/save`, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
      },
    })
  }


    
export const deleteCatFromFavouritCollectionApi = ({data , token }:{data:{catId :number } , token:string})=>{
    return axios
    .post(`${END_POINT}/api/v1/favorites/delete`, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
      },
    })
  }