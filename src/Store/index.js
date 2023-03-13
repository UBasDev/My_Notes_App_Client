import { configureStore } from "@reduxjs/toolkit";
import apiResponseErrorMessageState from "./ApiResponseErrorMessage/ApiResponseErrorMessageState";
import snackbarState from "./Snackbar/SnackbarState";

const store = configureStore({
  reducer: {
    apiResponseErrorMessageState,
    snackbarState,
  },
});
export default store;
