import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: "application",

    initialState: {
        applicants: null,
    },

    reducers: {
        setAllApplicants: (state, action) => {
            state.applicants = action.payload;
        },
    },
});
console.log("SLICE:", applicationSlice);
console.log("REDUCER:", applicationSlice.reducer);

export const { setAllApplicants } = applicationSlice.actions;

export default applicationSlice.reducer;