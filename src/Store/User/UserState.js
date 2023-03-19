import { createSlice } from "@reduxjs/toolkit";
import utils from "../../utils";

const initialState = {
  isUserLoggedIn: false,
};
const userState = createSlice({
  name: "userState",
  initialState: initialState,
  reducers: {
    userLogin: (state) => {
      if (utils.getCurrentUserTokenFromCookie()) state.isUserLoggedIn = true;
    },
    userLogout: (state) => {
      state.isUserLoggedIn = false;
    },
  },
});

export const { userLogin, userLogout } = userState.actions;
export default userState.reducer;
