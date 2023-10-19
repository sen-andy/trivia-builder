import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    boardData: localStorage.getItem('boardData')
        ? JSON.parse(localStorage.getItem('boardData'))
        : null,
    clueData: localStorage.getItem('clueData')
        ? JSON.parse(localStorage.getItem('clueData'))
        : null
}

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setBoardData: (state, action) => {
            state.boardData = action.payload;
            localStorage.setItem('boardData', JSON.stringify(action.payload));
        },
        setClueData: (state, action) => {
            state.clueData = action.payload;
            localStorage.setItem('clueData', JSON.stringify(action.payload));
        }
    }
});

export const { setBoardData, setClueData } = dataSlice.actions;

export default dataSlice.reducer;