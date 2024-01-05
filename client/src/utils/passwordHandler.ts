import CryptoJS from 'crypto-js'

const encryptText = (text: string, encryptionKey: string) => {
    return CryptoJS.AES.encrypt(text, encryptionKey).toString();
};

const decryptText = (ciphertext: string, decryptionKey: string) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, decryptionKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
};

export { encryptText, decryptText };