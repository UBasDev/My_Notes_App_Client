import { configureStore } from "@reduxjs/toolkit";
import apiResponseErrorMessageState from "./ApiResponseErrorMessage/ApiResponseErrorMessageState";
import snackbarState from "./Snackbar/SnackbarState";
import userState from "./User/UserState";

const store = configureStore({
  reducer: {
    apiResponseErrorMessageState,
    snackbarState,
    userState,
  },
});
export default store;
