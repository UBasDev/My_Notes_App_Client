import { createSlice } from "@reduxjs/toolkit";
import configs from "../../Components/configs";

const initialState = {
  isSnackbarVisible: false,
  snackbarContent: "",
};
const snackbarState = createSlice({
  name: "userState",
  initialState: initialState,
  reducers: {
    enableSnackbar: (state, action) => {
      state.snackbarContent = action.payload;
      state.isSnackbarVisible = true;
    },
    disableSnackbar: (state) => {
      state.isSnackbarVisible = false;
      //state.snackbarContent = "";
    },
  },
});
export const { enableSnackbar, disableSnackbar } = snackbarState.actions;
export default snackbarState.reducer;
