import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    gameData: localStorage.getItem('gameData')
        && localStorage.getItem('gameData') !== 'undefined'
            ? JSON.parse(localStorage.getItem('gameData')) : null,
    contestantsData: localStorage.getItem('contestantsData')
        && localStorage.getItem('contestantsData') !== 'undefined'
            ? JSON.parse(localStorage.getItem('contestantsData')) : null
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setGameData: (state, action) => {
            state.gameData = action.payload
            localStorage.setItem('gameData', JSON.stringify(action.payload))
        },
        setContestantsData: (state, action) => {
            state.contestantsData = action.payload
            localStorage.setItem('contestantsData', JSON.stringify(action.payload))
        }
    }
})

export const { setGameData, setContestantsData } = appSlice.actions

export default appSlice.reducer