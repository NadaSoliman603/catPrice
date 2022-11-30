
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
    path:"api/v1/sms/register-otp" | "apis/v1/user/forgot-password"
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
    currancy: string;
}


export type Plan = {
    planId: number;
    planName: string;
    planCode: string;
    planDescription: string;
    planCredit: number;
    planPrice: number;
    validDays: number;
    planImage: null | string;
    createdAt: Date;
    updatedAt: Date;
    planStatus: string
}


export type Alert = { message: string;
     onCancel: () => void | null;
     onConfairm: () => void;
     showCancelButton: boolean;
     type: "delete" | "success" | "error" |"warning" |"login";
     suTitle:string | undefined

}