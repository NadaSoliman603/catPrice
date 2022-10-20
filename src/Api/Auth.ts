
import axios from 'axios';
import { BASE_END_POINT } from '../Config';


export const loginApi = (data:any) => {
    return axios
      .post(`${BASE_END_POINT}`, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
  };


