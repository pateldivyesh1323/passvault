import Password from "../models/Password";
import { decryptData, encryptData } from "../utils/encryption";

const isUserOwner = async (uid: string, id: string) => {
    const passwordData = await Password.findById(id);
    return passwordData.uid === uid;
}

const getAllPasswords = async (uid: string) => {
    try {
        let passwords = await Password.find({ uid });
        passwords = passwords.map((pass) => {
            pass.password = decryptData(pass.password);
            return pass;
        })
        return { status: 200, data: passwords }
    } catch (error) {
        return { status: 500, data: null }
    }
}

const getOnePassword = async (uid: string, id: string) => {
    try {
        if (await isUserOwner(uid, id)) {
            let passwordData = await Password.findById(id);
            passwordData.password = decryptData(passwordData.password);
            return { status: 200, data: passwordData };
        }
        else {
            return { status: 401, data: null };
        }
    } catch (error) {
        return { status: 500, data: null };
    }
}

const createNewPassword = async (uid: string, name: string, password: string) => {
    try {
        const encryptedPassword = encryptData(password);
        let passwordData = await Password.create({ uid, name, password: encryptedPassword });
        passwordData.password = decryptData(passwordData.password);
        return { status: 201, data: passwordData };
    } catch (error) {
        return { status: 500, data: null }
    }
}

const updatePassword = async (uid: string, id: string, name: string | null, password: string | null) => {
    try {
        if (await isUserOwner(uid, id)) {
            let updatedPassword = await Password.findByIdAndUpdate(id,
                {
                    ...name && { name },
                    ...password && { password: encryptData(password) },
                },
                {
                    new: true
                }
            );
            updatedPassword.password = decryptData(updatedPassword.password);
            return { status: 201, data: updatedPassword };
        }
        else {
            return { status: 401, data: null };
        }
    } catch (error) {
        return { status: 500, data: null }
    }
}

const deletePassword = async (uid: string, id: string) => {
    try {
        if (await isUserOwner(uid, id)) {
            let deletedPassword = await Password.findByIdAndDelete(id);
            return { status: 200, data: deletePassword };
        }
        else {
            return { status: 401, data: null };
        }
    } catch (error) {
        return { status: 500, data: null }
    }
}

export { getAllPasswords, createNewPassword, getOnePassword, updatePassword, deletePassword };