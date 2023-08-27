import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { v4 as uuivd4 } from "uuid";

interface Note {
    id : string,
    title : string,
    categories : string[],
    body : string,
}

interface NoteDTO {
    title : string,
    categories : string[],
    body : string,
}

interface notesState {
    value : Note[],
    logged: boolean
}

const initialState : notesState = {
    value: [],
    logged: false
}

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        add : (state, action: PayloadAction<NoteDTO>) => {
            let newState = [...state.value];
            newState.push({id: uuivd4(), ...action.payload});  
            state.value = newState;
        },
        remove : (state, action: PayloadAction<string>) => {
            let newState = [...state.value];
            state.value = newState.filter(n => n.id != action.payload);
        },
        logIn : (state) => {
            state.logged = true;
        },
        logOut : (state) => {
            state.logged = false;
        }
    }

})


export const {add, remove, logIn, logOut} = notesSlice.actions;

export const selectNotes = (state: RootState) => state.notes.value

export const isUserLoggedIn = (state: RootState) => state.notes.logged

export default notesSlice.reducer;