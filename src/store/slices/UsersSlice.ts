import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../../api/rtkAPI.types";

export type FetchPayload = {
    users: User[];
    nextFetchURL: string | null;
};

type UsersState = {
    users: User[];
    fetchURL: string | null;
};

const initialState: UsersState = {
    users: [],
    fetchURL: ''
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<FetchPayload>) {
            state.users = action.payload.users;
            state.fetchURL = action.payload.nextFetchURL;
        },
        setFetchURL(state, action) {
            state.fetchURL = action.payload;
        },
        addUsers(state, action: PayloadAction<FetchPayload>) {
            state.users = [...state.users, ...action.payload.users];
            state.fetchURL = action.payload.nextFetchURL;
        },
    }
});

export default usersSlice.reducer;

export const {
    setUsers,
    addUsers,
    setFetchURL
} = usersSlice.actions;