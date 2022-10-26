
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



export const searchCatdApi = ({search , limit}:{search:string ; limit:string}) => {
  return axios.get(`http://floridatrading.online:8010/api/v1/cat/search?search=${search}&limit=${limit}`)
};



export const getCatDetailsApi = ({catID}:{catID:string}) => {
  return axios.get(`http://floridatrading.online:8010/api/v1/cat/get-cat-details?catId=${catID}`)
};



export const getPlanApi = ({path ,token}:{path:string ;token:string}) => {
  return axios 
  .get(`${'http://floridatrading.online:8010/api/v1/plans/get-plans'}`, {
      headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYmRhYnVnaGF6YWxlaEBob3RtYWlsLmNvbSIsImV4cCI6MTY2NzEzNDAyNCwiaWF0IjoxNjY2Nzc0MDI0fQ.g6MHTnY6qGaaDkaXSVYlPOpsAPmoMHPOLpYmaS9TLOgdyWhhEUs8OlOdPk6hbL0v2F6oGpk4u7NWzDsHwtmYlw'}`,
      },
  })
};