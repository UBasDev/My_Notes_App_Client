import { Navigate } from "react-router-dom";
import utils from "../utils";

export default function ProtectedRoutesOnlyAuthenticated(props) {
  const user = utils.getCurrentUserTokenFromCookie();
  const currentPathName = window.location.pathname;

  if (!user && !currentPathName.includes("auth")) {
    return <Navigate to={"/auth/login"} replace={true}></Navigate>;
  }
  return props.children;
}
