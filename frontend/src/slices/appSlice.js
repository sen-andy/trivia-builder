import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    gameData: localStorage.getItem('gameData') ? JSON.parse(localStorage.getItem('gameData')) : null
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setGameData: (state, action) => {
            console.log('gameData set')
            state.gameData = action.payload
            localStorage.setItem('gameData', JSON.stringify(action.payload))
        }
    }
})

export const { setGameData } = appSlice.actions

export default appSlice.reducer