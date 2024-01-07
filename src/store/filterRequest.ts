import { createSlice } from "@reduxjs/toolkit";

const filterRequestSlice = createSlice({
    name: "filterRequest",
    initialState: {
        accepted: false,
        formated: false,
        canceled: false,
        startDate: new Date("2019-01-16"),
        endDate: new Date(),
    },
    reducers: {
        setStatusFilter: (state, { payload }) => {
            state.accepted = payload.Accepted;
            state.formated = payload.Formated;
            state.canceled = payload.Canceled;
        },
        setStartDate: (state, { payload }) => {
            state.startDate = new Date(payload);
        },
        setEndDate: (state, { payload }) => {
            state.endDate = new Date(payload);
        },
    },
});

export default filterRequestSlice.reducer;
export const { setStatusFilter, setStartDate, setEndDate } =
    filterRequestSlice.actions;
