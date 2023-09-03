import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { v4 as uuivd4 } from "uuid";
import { act } from "react-dom/test-utils";

interface Note {
    ID : string,
    Title : string,
    Categories : string[],
    Body : string,
}

interface NoteDTO {
    Title : string,
    Categories : string[],
    Body : string,
}

interface notesState {
    value : Note[],
    logged: boolean,
    username: string
}

const initialState : notesState = {
    value: [],
    logged: false,
    username: ""
}

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        add : (state, action: PayloadAction<NoteDTO>) => {
            let newState = [...state.value];
            newState.push({ID: uuivd4(), ...action.payload});  
            state.value = newState;
        },
        remove : (state, action: PayloadAction<string>) => {
            let newState = [...state.value];
            state.value = newState.filter(n => n.ID != action.payload);
        },
        logIn : (state, action: PayloadAction<boolean>) => {
            state.logged = action.payload;
        },
        logOut : (state, action: PayloadAction<boolean>) => {
            state.logged = !action.payload;
        },
        setReduxUsername : (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        }
    }

})


export const {add, remove, logIn, logOut, setReduxUsername} = notesSlice.actions;

export const selectNotes = (state: RootState) => state.notes.value

export const isUserLoggedIn = (state: RootState) => state.notes.logged

export const getUsername = (state: RootState) => state.notes.username

export default notesSlice.reducer;