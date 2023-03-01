import {createSlice} from "@reduxjs/toolkit";

const initialState = [];

export const slicePeople = createSlice({
	name: "users",
	initialState,
	reducers: {
		setProperties(state, action) {
            action.payload.forEach(user => {
                state.push(user);
            });
		}
	}
})

export default slicePeople.reducer;