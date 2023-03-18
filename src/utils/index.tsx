import * as CryptoJS from "crypto-js";

const getPageYOffset = (): number => {
  return 15;
};
const getCurrentUserInfoFromCookie = (): string => {
  return (
    document.cookie
      .match(
        "(^|;)\\s*" +
          process.env.REACT_APP_USER_INFO_COOKIE_NAME?.toString() +
          "\\s*=\\s*([^;]+)"
      )
      ?.pop() || ""
  );
};
const getTotalMillisecondsUntilNow = (): number => {
  return Date.now();
};
function setHashedValueToLocalStorage(key: string, value: any): void {
  if (key && value)
    window.localStorage.setItem(
      key,
      CryptoJS.AES.encrypt(
        JSON.stringify(value),
        process.env.REACT_APP_CRYPTOJS_SECRET_KEY as string
      ).toString()
    );
}
function getHashedValueFromLocalStorageAndConvertToString(key: string): any {
  if (window.localStorage.getItem(key)) {
    const bytes = CryptoJS.AES.decrypt(
      window.localStorage.getItem(key) as any,
      process.env.REACT_APP_CRYPTOJS_SECRET_KEY as string
    );
    const decryptedData: string = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }
}
function setHashedValueToSessionStorage(key: string, value: any): void {
  if (key && value)
    window.sessionStorage.setItem(
      key,
      CryptoJS.AES.encrypt(
        JSON.stringify(value),
        process.env.REACT_APP_CRYPTOJS_SECRET_KEY as string
      ).toString()
    );
}
function getHashedValueFromSessionStorageAndConvertToString(key: string): any {
  if (window.sessionStorage.getItem(key)) {
    const bytes = CryptoJS.AES.decrypt(
      window.sessionStorage.getItem(key) as any,
      process.env.REACT_APP_CRYPTOJS_SECRET_KEY as string
    );
    const decryptedData: string = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }
}
function removeValueFromSessionStorage(key: string): void {
  window.sessionStorage.removeItem(key);
}
const utils = {
  getPageYOffset,
  getCurrentUserInfoFromCookie,
  getTotalMillisecondsUntilNow,
  setHashedValueToLocalStorage,
  getHashedValueFromLocalStorageAndConvertToString,
  setHashedValueToSessionStorage,
  getHashedValueFromSessionStorageAndConvertToString,
  removeValueFromSessionStorage,
};
export default utils;
