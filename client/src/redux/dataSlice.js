import {createSlice,configureStore} from "@reduxjs/toolkit";

export const dataSlice = createSlice({
    name: "class",
    initialState: {
        navClass: "Class1",
        navSubject: "English"
    },
    reducers: {
        update1: (state, action) => {
            state.navClass = action.payload.navClass;
        },
        update2: (state, action) => {
            state.navSubject = action.payload.navSubject;
        }
    }
});

export const { update1, update2 } = dataSlice.actions;
export default dataSlice.reducer;