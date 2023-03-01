import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	email: "",
	password: "",
	message: ""
}

export const sliceSignIn = createSlice({
	name: "users",
	initialState,
	reducers: {
		setMessage(state, action) {
			state.message = action.payload;
		},
		setSignInSlice(state, action) {
			state.email = action.payload.email;
			state.password = action.payload.password;
			state.message = action.payload.message;
		},
		setDefault(state) {
			state.email = "";
			state.password = "";
			state.message = "";
		}
	}
})

export default sliceSignIn.reducer;