
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



export const getBrandApi = () => {
  return axios.get('http://floridatrading.online:8010/api/v1/brands/get-all-brands')
};
