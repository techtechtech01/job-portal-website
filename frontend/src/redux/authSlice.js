import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    loading: false,
  isAuthenticated: false,
  user: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;
export const authSliceReducer = authSlice.reducer;