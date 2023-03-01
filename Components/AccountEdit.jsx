import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import {sliceAccount} from "../Redux/sliceAccount";
import {sliceAccountEdit} from "../Redux/sliceAccountEdit";
import { asyncChangeImage, asyncChangeName, asyncChangePassword } from "../Redux/asyncActions";

function AccountEdit() {

	const [slice, message, current] = useSelector(state => [
		state.sliceAccountEdit,
		state.sliceAccountEdit.message,
		state.sliceAccount.current
	]),
		{ setCurrent } = sliceAccount.actions,
		{ setAccountEditSlice, setImage, setName, setMessage } = sliceAccountEdit.actions,
		dispatch = useDispatch();

	function loadImage(event) {
		let fileReader = new FileReader();
		fileReader.readAsDataURL(event.target.files[0]);
		fileReader.onload = () => dispatch(setImage(fileReader.result));
	}

	function inputName(event) {
		dispatch(setName(event.target.value));
	}

	function inputPasswordOld(event) {
		dispatch(setAccountEditSlice({...slice, message: "", passwordOld: event.target.value}));
	}

	function inputPasswordNew1(event) {
		dispatch(setAccountEditSlice({...slice, message: "", passwordNew1: event.target.value}));
	}

	function inputPasswordNew2(event) {
		dispatch(setAccountEditSlice({...slice, message: "", passwordNew2: event.target.value}));
	}

	function applyImageClick() { 
		dispatch(asyncChangeImage());
	}

	function applyNameClick() {
		dispatch(asyncChangeName());
	}

	function applyNamePassword() {
		if (!slice.passwordOld || !slice.passwordNew1 || !slice.passwordNew2) return dispatch(setMessage("Complete all password fields"));
		else if (slice.passwordNew1.length < 8) return dispatch(setMessage("Passwords must contain at least 8 characters"));
		else if (slice.passwordNew1 !== slice.passwordNew2) return dispatch(setMessage("Passwords do not match"));
		else if (slice.passwordOld === slice.passwordNew1) return dispatch(setMessage("Old and new passwords must not be equal"));
		dispatch(asyncChangePassword());
	}

	function switchCurrentClick() {
		dispatch(setCurrent());
	}

	return <form className={`AccountEdit ${current === "edit" ? "" : "hidden"}`} onSubmit={event => event.preventDefault()}>
		<label className="AccountEdit-labelImage">
			<input type="file" accept="image/jpeg" onChange={loadImage}/>
			<img src={slice.image}/>
			<span>Change image</span>
		</label>
		<button className="AccountEdit-imageButton" onClick={applyImageClick}>Apply image</button>
		<div className="AccountEdit-nameContainer">
			<h3>Change name</h3>
			<input type="text" placeholder="Name" value={slice.name} onChange={inputName}/>
			<button className="AccountEdit-nameButton" onClick={applyNameClick}>Apply name</button>
		</div>
		<div className="AccountEdit-passwordsContainer">
			<h3>Change password</h3>
			<input type="password" placeholder="Old password" value={slice.passwordOld} onChange={inputPasswordOld} />
			<input type="password" placeholder="New password" value={slice.passwordNew1} onChange={inputPasswordNew1} />
			<input type="password" placeholder="Confirm new password" value={slice.passwordNew2} onChange={inputPasswordNew2} />
			<button className="AccountEdit-passwordButton" onClick={applyNamePassword}>Apply password</button>
		</div>
		<p className="AccountEdit-message">{message}</p>
		<button className="AccountEdit-backButton" onClick={switchCurrentClick}>back</button>
	</form>
}

export default AccountEdit;