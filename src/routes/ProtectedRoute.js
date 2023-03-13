import { Navigate } from "react-router-dom";
import utils from "../utils";

export default function ProtectedRoute(props) {
  const user = utils.getCurrentUserInfoFromCookie();
  const currentPathName = window.location.pathname;
  console.log(currentPathName);
  if (!user && !currentPathName.includes("auth")) {
    return <Navigate to={"/auth/login"} replace={true}></Navigate>;
  }
  return props.children;
}
