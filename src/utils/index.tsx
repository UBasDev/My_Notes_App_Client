import * as CryptoJS from "crypto-js";

const getPageYOffset = (): number => {
  return 15;
};
const getCurrentUserTokenFromCookie = (): string => {
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
const getCurrentUserEmail = (): string => {
  const currentUserToken: string = getCurrentUserTokenFromCookie();
  var base64Url: string = currentUserToken.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload).email;
};
const clearAllCookies = () => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
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
  getCurrentUserTokenFromCookie,
  getCurrentUserEmail,
  getTotalMillisecondsUntilNow,
  setHashedValueToLocalStorage,
  getHashedValueFromLocalStorageAndConvertToString,
  setHashedValueToSessionStorage,
  getHashedValueFromSessionStorageAndConvertToString,
  removeValueFromSessionStorage,
  clearAllCookies,
};
export default utils;
