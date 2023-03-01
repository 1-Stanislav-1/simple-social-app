import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	selected: "Sign Up"
}

export const sliceHome = createSlice({
	name: "home",
	initialState,
	reducers: {
		selectSignUp(state) {
			state.selected = "Sign Up";
		},
		selectSignIn(state) {
			state.selected = "Sign In";
		}
	}
})

export default sliceHome.reducer;