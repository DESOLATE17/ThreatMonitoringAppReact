import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: "filter",
    initialState: {
        lowPrice: 0,
        highPrice: 1000000,
        searchValue: "",
        accepted: false,
        formated: false,
        canceled: false,
        startDate: new Date("2019-01-16"),
        endDate: new Date(),
    },
    reducers: {
        setLowPrice: (state, action) => {
            state.lowPrice = action.payload;
        },
        setHighPrice: (state, { payload }) => {
            state.highPrice = payload;
        },
        setSearchValue: (state, { payload }) => {
            state.searchValue = payload;
        },
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

export default filterSlice.reducer;
export const { setLowPrice, setHighPrice, setSearchValue, setStatusFilter, setStartDate, setEndDate } =
    filterSlice.actions;
