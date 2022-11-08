
export type LoginData = {
    username: string,
    password: string,
}

export type Label = {
    label: string,
    value: string | number
}



export type RegisterData = {
    mobileNo: string;
    mobileCode: string;
    countryCode: string;
    countryEn: string;
    fullNameEn: string;
    defCurrency: string;
    password: string;
}

export type OTPRegiserActivationData = {
    mobileNo: string;
    mobileCode: string;
}


export type OTPUserActivationData = {
    activationCode: string;
    activationToken: string;
}


export type OrderData = {
    catId: string;
    catPrice: string;
    catSerial: string;
    catNo: string;
    catImage: string;
    catBrans: string;
}



export type MetalPrice = {
    fdPtPrice: number;
    fdPdPrice: number;
    fdRhPrice: number;
    currancy:string;
}