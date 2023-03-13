import { Outlet, useNavigation } from "react-router-dom";
import useWindowSizeCustomHook from "../../CustomHooks/UseWindowSizeCustomHook";
import SpinnerComponent from "../../Components/Spinner/SpinnerComponent";
import "./AuthLayoutComponent.css";

export default function AuthLayoutComponent() {
  const navigation = useNavigation();
  const { width } = useWindowSizeCustomHook();
  return (
    <>
      {navigation.state === "loading" || navigation.state === "submitting" ? (
        <SpinnerComponent />
      ) : null}

      <div className="AuthLayoutComponentWrapper">
        <div
          className="AuthLayoutComponentContainer"
          style={{
            width: width > 1400 ? "30%" : width > 768 ? "50%" : "75%",
          }}
        >
          <h2>UCB NOTES</h2>
          <Outlet />
        </div>
      </div>
    </>
  );
}
