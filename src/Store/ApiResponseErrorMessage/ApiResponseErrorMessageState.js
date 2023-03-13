import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  apiResponseErrorMessageState: false,
};
const apiResponseErrorMessageState = createSlice({
  name: "apiResponseErrorMessageState",
  initialState: initialState,
  reducers: {
    addApiResponseErrorMessage: (state, action) => {
      state.apiResponseErrorMessageState = action.payload;
    },
    clearApiResponseErrorMessage: (state) => {
      state.apiResponseErrorMessageState = false;
    },
  },
});
export const { addApiResponseErrorMessage, clearApiResponseErrorMessage } =
  apiResponseErrorMessageState.actions;
export default apiResponseErrorMessageState.reducer;
