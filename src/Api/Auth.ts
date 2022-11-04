import { OTPRegiserActivationData, OTPUserActivationData, RegisterData } from '../types/types';

import axios from 'axios';
import { BASE_END_POINT } from '../Config';


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



export const searchCatdApi = ({ search, limit }: { search: string; limit: string }) => {
  return axios.get(`http://floridatrading.online:8010/api/v1/cat/search?search=${search}&limit=${limit}`)
};



export const getCatDetailsApi = ({ catID }: { catID: string }) => {
  return axios.get(`http://floridatrading.online:8010/api/v1/cat/get-cat-details?catId=${catID}`)
};


export const getCatsbyBrandApi = ({ brand, limit }: { brand: string, limit: string }) => {
  return axios.get(`http://floridatrading.online:8010/api/v1/cat/get-all-cats-by-brand?brand=${brand}&limit=${limit}`)
};



export const getPlanApi = ({ path, token }: { path: string; token: string }) => {
  return axios
    .get(`${'http://floridatrading.online:8010/api/v1/plans/get-plans'}`, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYmRhYnVnaGF6YWxlaEBob3RtYWlsLmNvbSIsImV4cCI6MTY2NzEzNDAyNCwiaWF0IjoxNjY2Nzc0MDI0fQ.g6MHTnY6qGaaDkaXSVYlPOpsAPmoMHPOLpYmaS9TLOgdyWhhEUs8OlOdPk6hbL0v2F6oGpk4u7NWzDsHwtmYlw'}`,
      },
    })
};



export const showPriceApi = ({ catId, token }: { catId: string; token: string }) => {
  return axios
    .get(`http://floridatrading.online:8010/api/v1/cat/show-price?id=${catId}`, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
        "Currency": "SAR"
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


