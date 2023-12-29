import crypto from 'crypto'
import enviroments from './enviroments'

const { encryption_key } = enviroments

export function encryptData(data: string) {
    let iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv(
        "aes-256-cbc",
        Buffer.from(encryption_key),
        iv
    );

    let encrypted = cipher.update(data);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString("hex") + ":" + encrypted.toString("hex");
}

export function decryptData(encryptedData: string) {
    let textParts = encryptedData.split(":");
    let iv = Buffer.from(textParts.shift(), "hex");
    let encryptedText = Buffer.from(textParts.join(":"), "hex");
    let decipher = crypto.createDecipheriv(
        "aes-256-cbc",
        Buffer.from(encryption_key),
        iv
    );

    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}