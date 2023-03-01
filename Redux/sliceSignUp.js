import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	selectedForm: 1,
	name: "",
	sex: "",
	birthday: "",
	image: "",
	email: "",
	password1: "",
	password2: "",
	message: ""
}

export const sliceSignUp = createSlice({
	name: "manage",
	initialState,
	reducers: {
		selectForm(state, action) {
			state.selectedForm = action.payload;
		},
		setMessage(state, action) {
			state.message = action.payload;
		},
		setSignUpSlice(state, action) {
			state.selectedForm = action.payload.selectedForm;
			state.name = action.payload.name;
			state.sex = action.payload.sex;
			state.birthday = action.payload.birthday;
			state.image = action.payload.image;
			state.email = action.payload.email;
			state.password1 = action.payload.password1;
			state.password2 = action.payload.password2;
			state.message = action.payload.message;
		},
		setDefault(state) {
			state.selectedForm = 1;
			state.name = "";
			state.sex = "";
			state.birthday = "";
			state.image = "";
			state.email = "";
			state.password1 = "";
			state.password2 = "";
			state.message = "";
		}
	}
})

export default sliceSignUp.reducer;