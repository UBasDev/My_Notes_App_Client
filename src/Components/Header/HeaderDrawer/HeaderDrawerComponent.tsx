import { useEffect, useState } from "react";
import AuthorizedHeaderDrawerComponent from "./AuthorizedHeader/AuthorizedHeaderComponent";
import UnauthorizedHeaderDrawerComponent from "./UnauthorizedHeader/UnauthorizedHeaderComponent";
import utils from "../../../utils";

const HeaderDrawerComponent = (props: any): JSX.Element => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

  const chooseNavItemsIfUserLoggedIn = () => {
    const isUserLoggedIn: boolean = utils.getCurrentUserTokenFromCookie()
      ? true
      : false;
    setIsUserLoggedIn(isUserLoggedIn ? true : false);
  };

  useEffect(() => {
    chooseNavItemsIfUserLoggedIn();
  }, []);

  return isUserLoggedIn ? (
    <AuthorizedHeaderDrawerComponent />
  ) : (
    <UnauthorizedHeaderDrawerComponent />
  );
};
export default HeaderDrawerComponent;
