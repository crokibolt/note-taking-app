import {configureStore} from "@reduxjs/toolkit"
import notesReducer from "../slices/noteSlice.ts"

const store = configureStore({
    reducer: {
        notes : notesReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch