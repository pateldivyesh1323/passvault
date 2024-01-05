export interface PassInterface {
    name: string;
    _id: string;
    password: string;
}

export interface PassFormInterface {
    name: string;
    password: string;
    encryptionKey: string;
}

export interface PassViewInterface {
    name: string;
    encyptedPassword: string;
    decryptedPassword?: string;
}