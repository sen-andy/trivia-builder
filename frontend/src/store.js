import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import dataReducer from './slices/dataSlice';
import appReducer from './slices/appSlice';
import { apiSlice } from './slices/apiSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        data: dataReducer,
        app: appReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devtools: true
});

export default store;