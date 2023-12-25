import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        lowPrice: 0,
        highPrice: 1000000,
        searchValue: '',
    },
    reducers: {
        setLowPrice: (state, action) => {
            console.log(state)
            state.lowPrice = action.payload;
            console.log(state.lowPrice)
        },
        setHighPrice: (state, { payload }) => {
            state.highPrice = payload;
        },
        setSearchValue: (state, { payload }) => {
            console.log("here")
            state.searchValue = payload;
            console.log(state.searchValue)
        },
    },
});

export default filterSlice.reducer;
export const { setLowPrice, setHighPrice, setSearchValue } = filterSlice.actions;