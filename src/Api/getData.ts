import axios from "axios";
import { BASE_END_POINT } from "../Config";

  export const getBrandData = ({path ,token}:{path:string ;token:string}) => {
    return axios 
    .get(`${BASE_END_POINT}`, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
        },
    })
  };
