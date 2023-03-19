import React, { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { CommonRouter } from "./routes/CommonRouter";
import ScrollToTopComponent from "./Components/ScrollToTop/ScrollToTopComponent";
import UseWindowHeightCustomHook from "./CustomHooks/UseWindowHeightCustomHook";
import { Provider } from "react-redux";
import store from "./Store/index";
import SnackbarComponent from "./Components/Snackbar/SnackbarComponent";
import SendMeEmailNotificationComponent from "./Components/WelcomeNotification/SendMeEmailNotificationComponent";

export default function App() {
  const currentPageYOffset: number = UseWindowHeightCustomHook();

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={CommonRouter}></RouterProvider>
        <SnackbarComponent />
      </Provider>
      <ScrollToTopComponent currentWindowHeight={currentPageYOffset} />
      <SendMeEmailNotificationComponent />
    </>
  );
}
