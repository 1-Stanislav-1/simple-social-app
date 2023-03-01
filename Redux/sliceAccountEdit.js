import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	image: "",
	name: "",
	passwordOld: "",
	passwordNew1: "",
	passwordNew2: "",
	message: ""
}

export const sliceAccountEdit = createSlice({
	name: "profileEdit",
	initialState,
	reducers: {
		setImage(state, action) {
			state.image = action.payload;
		},
		setName(state, action) {
			state.name = action.payload;
		},
		setMessage(state, action) {
			state.message = action.payload;
		},
		setAccountEditSlice(state, action) {
			state.image = action.payload.image;
			state.name = action.payload.name;
			state.passwordOld = action.payload.passwordOld;
			state.passwordNew1 = action.payload.passwordNew1;
			state.passwordNew2 = action.payload.passwordNew2;
			state.message = action.payload.message;
		}
	}
})

export default sliceAccountEdit.reducer;