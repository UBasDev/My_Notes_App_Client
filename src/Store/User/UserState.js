import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userState: false,
};
const userState = createSlice({
  name: "userState",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = false;
    },
  },
});
