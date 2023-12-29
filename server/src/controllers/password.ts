import Password from "../models/Password";
import { decryptData, encryptData } from "../utils/encryption";

const getAllPasswords = async (uid: string) => {
    try {
        const password = await Password.find({ uid });
        return { status: 200, data: password }
    } catch (error) {
        return { status: 500, data: null }
    }
}

const createNewPassword = async (uid: string, name: string, password: string) => {
    try {
        const encryptedPassword = encryptData(password);
        let passwordData = await Password.create({ uid, name, password: encryptedPassword });
        passwordData.password = decryptData(passwordData.password);
        return { status: 201, data: passwordData };
    } catch (error) {
        console.log(error);
        return { status: 500, data: null }
    }
}

export { getAllPasswords, createNewPassword };