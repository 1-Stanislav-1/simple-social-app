import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	name: "",
	age: "",
	image: "",
	email: "",
	current: "view"
}

export const sliceAccount = createSlice({
	name: "profile",
	initialState,
	reducers: {
		setProperties(state, action) {
			state.name = action.payload.name;
			state.age = action.payload.age;
			state.image = action.payload.image;
			state.email = action.payload.email;
		},
		setName(state, action) {
			state.name = action.payload;
		},
		setImage(state, action) {
			state.image = action.payload;
		},
		setCurrent(state) {
			if (state.current === "view") state.current = "edit";
			else if (state.current === "edit") state.current = "view";
		}
	}
})

export default sliceAccount.reducer;