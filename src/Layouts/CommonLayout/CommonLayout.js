import { Outlet, useNavigation } from "react-router-dom";
import HeaderComponent from "../../Components/Header/HeaderComponent";
import SpinnerComponent from "../../Components/Spinner/SpinnerComponent";

export default function CommonLayout() {
  const navigation = useNavigation();
  return (
    <>
      <div>
        {navigation.state === "loading" || navigation.state === "submitting" ? (
          <SpinnerComponent />
        ) : null}
      </div>
      <HeaderComponent>
        <Outlet />
      </HeaderComponent>
      <main style={{ padding: "0 1rem" }}></main>
    </>
  );
}
