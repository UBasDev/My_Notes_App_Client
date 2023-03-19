import { createBrowserRouter } from "react-router-dom";
import CommonLayout from "../Layouts/CommonLayout/CommonLayout";
import NotFoundComponent from "../Components/NotFound/NotFoundComponent";
import CommonErrorComponent from "../Components/Errors/CommonError";
import HomepageComponent from "../Pages/Homepage/HomepageComponent";
import RegisterAction from "../Router/RouterActions/RegisterAction";
import { lazy, Suspense } from "react";
import AuthLayoutComponent from "../Layouts/AuthLayout/AuthLayoutComponent";
import LazyLoaderComponent from "../Components/LazyLoader/LazyLoaderComponent";
import LoginStep1Action from "../Router/RouterActions/LoginStep1Action";
import LoginStep2Action from "../Router/RouterActions/LoginStep2Action";
import ProtectedRoutesOnlyAuthenticated from "./ProtectedRoutesOnlyAuthenticated";
import ProtectedRoutesOnlyNotAuthenticated from "./ProtectedRoutesOnlyNotAuthenticated";

const MyNotesComponent = lazy(() =>
  import("../Pages/MyNotes/MyNotesComponent")
);
const LoginStep1Component = lazy(() =>
  import("../Pages/Auth/Login/LoginStep1/LoginStep1Component")
);
const LoginStep2Component = lazy(() =>
  import("../Pages/Auth/Login/LoginStep2/LoginStep2Component")
);
const RegisterComponent = lazy(() => import("../Pages/Register/Register"));
const ForgetPasswordComponent = lazy(() =>
  import("../Pages/Auth/ForgetPassword/ForgetPasswordComponent")
);

const CommonRoutes = [
  {
    path: "/",
    element: <CommonLayout />,
    errorElement: <CommonErrorComponent />,
    children: [
      {
        errorElement: <CommonErrorComponent />,
        children: [
          {
            index: true,
            element: <HomepageComponent />,
          },
          {
            path: "my_notes",
            onlyAuthenticated: true,
            lazyLoading: true,
            element: <MyNotesComponent />,
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    onlyNotAuthenticated: true,
    element: <AuthLayoutComponent />,
    errorElement: <CommonErrorComponent />,
    children: [
      {
        errorElement: <CommonErrorComponent />,
        children: [
          {
            lazyLoading: true,
            path: "login_step1",
            element: <LoginStep1Component />,
            action: LoginStep1Action,
          },
          {
            lazyLoading: true,
            path: "login_step2",
            element: <LoginStep2Component />,
            action: LoginStep2Action,
          },
          {
            lazyLoading: true,
            path: "register",
            element: <RegisterComponent />,
            action: RegisterAction,
          },
          {
            lazyLoading: true,
            path: "forget-password",
            element: <ForgetPasswordComponent />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundComponent />,
  },
];

const authMap = (routes) => {
  return routes.map((route) => {
    if (route?.onlyAuthenticated) {
      route.element = (
        <ProtectedRoutesOnlyAuthenticated>
          {route.element}
        </ProtectedRoutesOnlyAuthenticated>
      );
    }
    if (route?.onlyNotAuthenticated) {
      route.element = (
        <ProtectedRoutesOnlyNotAuthenticated>
          {route.element}
        </ProtectedRoutesOnlyNotAuthenticated>
      );
    }
    if (route?.lazyLoading) {
      route.element = (
        <Suspense fallback={<LazyLoaderComponent />}>{route.element}</Suspense>
      );
    }
    if (route?.children) {
      route.children = authMap(route.children);
    }
    return route;
  });
};

export const CommonRouter = createBrowserRouter(authMap(CommonRoutes));
