import { createBrowserRouter } from "react-router-dom";
import CommonLayout from "../Layouts/CommonLayout/CommonLayout";
import NotFoundComponent from "../Components/NotFound/NotFoundComponent";
import CommonErrorComponent from "../Components/Errors/CommonError";
import HomepageComponent from "../Pages/Homepage/HomepageComponent";
import RegisterAction from "../Router/RouterActions/RegisterAction";
import ProtectedRoute from "./ProtectedRoute";
import { lazy, Suspense } from "react";
import AuthLayoutComponent from "../Layouts/AuthLayout/AuthLayoutComponent";
import SpinnerComponent from "../Components/Spinner/SpinnerComponent";
import { Box, CircularProgress, LinearProgress } from "@mui/material";
import LazyLoaderComponent from "../Components/LazyLoader/LazyLoaderComponent";

const MyNotesComponent = lazy(() =>
  import("../Pages/MyNotes/MyNotesComponent")
);
const LoginComponent = lazy(() => import("../Pages/Auth/Login/LoginComponent"));
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
            auth: true,
            lazyLoading: true,
            element: <MyNotesComponent />,
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayoutComponent />,
    children: [
      {
        lazyLoading: true,
        path: "login",
        element: <LoginComponent />,
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
  {
    path: "*",
    element: <NotFoundComponent />,
  },
];

const authMap = (routes) => {
  return routes.map((route) => {
    if (route?.auth) {
      console.log(route);
      route.element = <ProtectedRoute>{route.element}</ProtectedRoute>;
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
