import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	location: "/"
}

export const sliceLocation = createSlice({
	name: "location",
	initialState,
	reducers: {
		setLocation(state, action) {
			state.location = action.payload;
		}
	}
})

export default sliceLocation.reducer;