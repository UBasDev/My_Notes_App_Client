const getPageYOffset = (): number => {
  return 15;
};
const getCurrentUserInfoFromCookie = (): string => {
  return (
    document.cookie
      .match("(^|;)\\s*" + "my_notes" + "\\s*=\\s*([^;]+)")
      ?.pop() || ""
  );
};
const utils = {
  getPageYOffset,
  getCurrentUserInfoFromCookie,
};
export default utils;
