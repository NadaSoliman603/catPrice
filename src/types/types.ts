
export type LoginData = {
    username: string,
    password: string,
}
 
export type Label = {
    label:string ,
    value:string|number
}



export type RegisterData = {
    mobileNo: string;
    mobileCode: string;
    countryCode : string;
    countryEn: string;
    fullNameEn : string;
    defCurrency : string;
    password : string;
}