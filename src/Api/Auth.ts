
import axios from 'axios';
const BASE_END_POINT = 'http://floridatrading.online:8010/apis/v1/user/login'


export const loginApi = (data:any) => {
    return axios
      .post(`${BASE_END_POINT}`, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
  };

