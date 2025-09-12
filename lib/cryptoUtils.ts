import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "fallback-key";

// Encrypt
export const encryptId = (id: string | number) => {
  return CryptoJS.AES.encrypt(String(id), SECRET_KEY).toString();
};

// Decrypt
export const decryptId = (encryptedId: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedId, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
