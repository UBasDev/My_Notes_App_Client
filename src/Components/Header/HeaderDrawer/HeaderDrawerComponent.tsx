import AuthorizedHeaderDrawerComponent from "./AuthorizedHeader/AuthorizedHeaderComponent";
import UnauthorizedHeaderDrawerComponent from "./UnauthorizedHeader/UnauthorizedHeaderComponent";

const HeaderDrawerComponent = (props: any): JSX.Element => {
  return props.isUserLoggedIn ? (
    <AuthorizedHeaderDrawerComponent />
  ) : (
    <UnauthorizedHeaderDrawerComponent />
  );
};
export default HeaderDrawerComponent;
