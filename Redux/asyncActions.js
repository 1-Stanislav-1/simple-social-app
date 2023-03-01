import { sliceLocation } from "./sliceLocation";
import { sliceAccount } from "./sliceAccount";
import { sliceAccountEdit } from "./sliceAccountEdit";
import { slicePeople } from "./slicePeople";
import { sliceSignUp } from "./sliceSignUp";
import { sliceSignIn } from "./sliceSignIn";

function getAge(dateString) {
	let today = new Date();
	let birthDate = new Date(dateString);
	let age = today.getFullYear() - birthDate.getFullYear();
	let m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
}

export const asyncSignUp = () => async (dispatch, getState) => {
	const data = getState().sliceSignUp,
		{ setLocation } = sliceLocation.actions,
		{ setProperties } = sliceAccount.actions,
		{ setImage, setName } = sliceAccountEdit.actions,
		{ setMessage, setDefault } = sliceSignUp.actions;
	let response = await fetch("signUp", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			name: data.name,
			sex: data.sex,
			birthday: data.birthday,
			image: data.image,
			email: data.email,
			password: data.password1
		})
	});
	let result = await response.text();
	if (result !== "success") return dispatch(setMessage(result));
	dispatch(setProperties({
		name: data.name,
		age: getAge(data.birthday),
		image: data.image,
		email: data.email
	}));
	dispatch(setImage(data.image));
	dispatch(setName(data.name));
	dispatch(setDefault());
	return dispatch(setLocation("/account"));
}

export const asyncSignIn = () => async (dispatch, getState) => {
	const data = getState().sliceSignIn,
		{ setLocation } = sliceLocation.actions,
		{ setProperties } = sliceAccount.actions,
		{ setImage, setName } = sliceAccountEdit.actions,
		{ setMessage, setDefault } = sliceSignIn.actions;
	let response = await fetch("signIn", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			email: data.email,
			password: data.password
		})
	});
	let result = await response.json();
	if (result.message) return dispatch(setMessage(result.message));
	dispatch(setProperties({
		name: result.name,
		age: getAge(result.birthday),
		image: result.image,
		email: result.email
	}));
	dispatch(setImage(result.image));
	dispatch(setName(result.name));
	dispatch(setDefault());
	return dispatch(setLocation("/account"));
}

export const asyncChangeImage = () => async (dispatch, getState) => {
	const image = getState().sliceAccountEdit.image,
		email = getState().sliceAccount.email,
		{ setImage, setCurrent } = sliceAccount.actions;
	await fetch("changeImage", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			image,
			email
		})
	});
	dispatch(setImage(image));
	return dispatch(setCurrent());
}

export const asyncChangeName = () => async (dispatch, getState) => {
	const name = getState().sliceAccountEdit.name,
		email = getState().sliceAccount.email,
		{ setName, setCurrent } = sliceAccount.actions;
	await fetch("changeName", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			name,
			email
		})
	});
	dispatch(setName(name));
	return dispatch(setCurrent());
}

export const asyncChangePassword = () => async (dispatch, getState) => {
	const slice = getState().sliceAccountEdit,
		email = getState().sliceAccount.email,
		{ setCurrent } = sliceAccount.actions,
		{ setAccountEditSlice, setMessage } = sliceAccountEdit.actions;
	let response = await fetch("changePassword", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			email,
			oldPassword: slice.passwordOld,
			newPassword: slice.passwordNew1
		})
	});
	let result = await response.text();
	if (result === "Wrong password") return dispatch(setMessage("Wrong password"));
	dispatch(setAccountEditSlice({
		...slice,
		passwordOld: "",
		passwordNew1: "",
		passwordNew2: ""
	}));
	return dispatch(setCurrent());
}

export const asyncGetUsers = () => async (dispatch, getState) => {
	const email = getState().sliceAccount.email,
		{setProperties} = slicePeople.actions;
	let response = await fetch("getUsers", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({email})
	});
	let result = await response.json();
	let updResult = result.data.map(user => {return {...user, age: getAge(user.age)}});
	return dispatch(setProperties(updResult));
}