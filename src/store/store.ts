import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {rtkAPI} from "../api/rtkAPI";
import usersReducer from './slices/UsersSlice';

const rootReducer = combineReducers({
    usersReducer,
    [rtkAPI.reducerPath]: rtkAPI.reducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(rtkAPI.middleware)
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];