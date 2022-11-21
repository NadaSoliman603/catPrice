import { OrderData, OTPRegiserActivationData, OTPUserActivationData, RegisterData } from '../types/types';

import axios from 'axios';
import { BASE_END_POINT } from '../Config';
const END_POINT = "http://floridatrading.online:8010"

export const loginApi = (data: any) => {
  return axios
    .post(`${BASE_END_POINT}`, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
};

export const registerApi = ({ password, defCurrency, mobileNo, mobileCode, countryCode, countryEn, fullNameEn }: RegisterData) => {
  const data = {
    mobileNo: mobileNo,
    mobileCode: mobileCode,
    countryCode: countryCode,
    countryEn: countryEn,
    fullNameEn: fullNameEn,
    defCurrency: defCurrency,
    password: password,
  }
  return axios
    .post('http://floridatrading.online:8010/apis/v1/user/register', JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
};




export const getBrandApi = () => {
  return axios.get('http://floridatrading.online:8010/api/v1/brands/get-all-brands')
};



export const searchCatdApi = ({ search, limit , token}: { search: string; limit: string , token:null|string }) => {
  return axios.get(`http://floridatrading.online:8010/api/v1/cat/search?search=${search}&limit=${limit}`,{
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`,
    },
  })
};



export const getCatDetailsApi = ({ catID , token}: { catID: string , token:string|null}) => {
  return axios.get(`http://floridatrading.online:8010/api/v1/cat/get-cat-details?catId=${catID}`,{
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`,
    },
  })
};


export const getCatsbyBrandApi = ({ brand, limit }: { brand: string, limit: string }) => {
  return axios.get(`http://floridatrading.online:8010/api/v1/cat/get-all-cats-by-brand?brand=${brand}&limit=${limit}`)
};



export const getPlanApi = ({ path, token }: { path: string; token: string }) => {
  return axios
    .get(`${'http://floridatrading.online:8010/api/v1/plans/get-plans'}`, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
      },
    })
};



export const showPriceApi = ({ catId, token , currency }: { catId: string; token: string , currency:string}) => {
  return axios
    .get(`http://floridatrading.online:8010/api/v1/cat/show-price?id=${catId}`, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
        "Currency": currency
      },
    })
};




export const OTPForgetPasswordActivationApi = ({ mobileCode, mobileNo }: OTPRegiserActivationData) => {
  const data = {
    mobileCode: mobileCode,
    mobileNo: mobileNo,
  }
  return axios
    .post('http://floridatrading.online:8010/apis/v1/user/forgot-password', JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
};



export const OTPUserActivationApi = ({ activationCode, activationToken }: OTPUserActivationData) => {
  const data = {
    activationCode: activationCode,
    activationToken: activationToken
  }
  return axios
    .post('http://floridatrading.online:8010/apis/v1/user/user-activation', JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
};



export const OTPRegiserActivationApi = ({ mobileCode, mobileNo }: OTPRegiserActivationData) => {
  console.log("Api request",{
    mobileCode: mobileCode,
    mobileNo: mobileNo,
  })
  const data = {
    mobileCode: mobileCode,
    mobileNo: mobileNo,
  }
  return axios
    .post('http://floridatrading.online:8010/api/v1/sms/register-otp', JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
};


export const getLocationdApi = () => {
  return axios.get(`https://ipapi.co/json/`)
};



export const newOrderApi = ({data , token , currency}:{data:OrderData[] , token:string , currency:string})=>{
  return axios
  .post(`${END_POINT}/api/v1/order/save-order`, JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`,
      "Currency": currency

    },
  })
}


export const orderHistoryApi =  ({ token , currency}:{ token:string , currency:string})=>{
  return axios.get(`${END_POINT}/api/v1/order/get-orders?status=NEW` , {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`,
      "Currency": currency

    },
  })
}


export const getSystemSettingApi =  ()=>{
  return axios.get(`${END_POINT}/api/v1/settings/all`)
}



export const userUpdatInfApi =  ({ token , data}:{ token:string , data:any})=>{
  return axios.post(`${END_POINT}/apis/v1/user/update-profile` ,  JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`,

    },
  })
}


export const userBalanceApi =  ({ token }:{ token:string })=>{
  return axios.get(`${END_POINT}/api/v1/balance/user-balance` , {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`,
    },
  })
}


export const getCatsPriceApi =  ({ token , currency , data}:{ token:string , currency:string , data:any})=>{
  return axios.post(`${END_POINT}/api/v1/cart/check-cats-prices` ,JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`,
      "Currency": currency

    },
  })
}
