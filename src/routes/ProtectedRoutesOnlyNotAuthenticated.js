import { Navigate } from "react-router-dom";
import utils from "../utils";

export default function ProtectedRoutesOnlyNotAuthenticated(props) {
  const user = utils.getCurrentUserTokenFromCookie();
  const currentPathName = window.location.pathname;

  if (user && currentPathName.includes("auth")) {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }
  return props.children;
}
