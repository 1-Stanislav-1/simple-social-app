import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sliceSignUp } from "../Redux/sliceSignUp";
import { asyncSignUp } from "../Redux/asyncActions";

export default function SignUp() {

	const [slice, selectedForm, message, selected, location] = useSelector(state => [
		state.sliceSignUp,
		state.sliceSignUp.selectedForm,
		state.sliceSignUp.message,
		state.sliceHome.selected,
		state.sliceLocation.location
	]);
	const {selectForm, setMessage, setSignUpSlice} = sliceSignUp.actions;
	const dispatch = useDispatch();

	function loadImage(event) {
		let fileReader = new FileReader();
		fileReader.readAsDataURL(event.target.files[0]);
		fileReader.onload = () => dispatch(setSignUpSlice({...slice, message: "", image: fileReader.result}));
	}

	function checkRadio(event) {
		dispatch(setSignUpSlice({...slice, message: "", sex: event.target.value}))
	}

	function inputName(event) {
		dispatch(setSignUpSlice({...slice, message: "", name: event.target.value}));
	}

	function inputBirthday(event) {
		dispatch(setSignUpSlice({...slice, message: "", birthday: event.target.value}));
	}

	function inputEmail(event) {
		dispatch(setSignUpSlice({...slice, message: "", email: event.target.value}));
	}

	function inputPassword1(event) {
		dispatch(setSignUpSlice({...slice, message: "", password1: event.target.value}));
	}

	function inputPassword2(event) {
		dispatch(setSignUpSlice({...slice, message: "", password2: event.target.value}));
	}

	function signUpClick() {
		if (!slice.name || !slice.sex || !slice.birthday || !slice.image || !slice.email || !slice.password1 || !slice.password2) dispatch(setMessage("form not completed"));
		else if (slice.password1.length < 8) dispatch(setMessage("Passwords must contain at least 8 characters"));
		else if (slice.password1 !== slice.password2) dispatch(setMessage("Passwords do not match"));
		else dispatch(asyncSignUp());
	}

	function nextClick() {
		dispatch(selectForm(2));
	}

	function backClick() {
		dispatch(selectForm(1));
	}

	return <div className={`SignUp ${selected === "Sign Up" ? "" : "hidden"}`}>
		
		{(location === "/account") ? <Navigate to="/account"/> : ""}
		
		<form className={`SignUp-firstForm ${selectedForm === 1 ? "" : "hidden"}`} onSubmit={event => event.preventDefault()}>
			<div className="SignUp-imageRadioContainer">
				<label className="SignUp-labelImage">
					Profile image
					<p>use .jpg with 1:1 aspect ratio</p>
					<input type="file" accept="image/jpeg" onChange={loadImage}/>
					<img className={slice.image ? "" : "hidden"} src={slice.image}/>
				</label>
				<div className="SignUp-radioContainer">
					<p>Choose sex:</p>
					<label>
						M
						<input type="radio" name="sex" value="M" checked={slice.sex === "M" ? true : false} onChange={checkRadio} />
					</label>
					<label>
						F
						<input type="radio" name="sex" value="F" checked={slice.sex === "F" ? true : false} onChange={checkRadio} />
					</label>
				</div>
			</div>
			<label className="SignUp-labelText">
				Enter name:
				<input type="text" placeholder="Name" value={slice.name} onChange={inputName}/>
			</label>
			<label className="SignUp-labelText">
				Enter birthday:
				<input type="date" max={new Date().toISOString().split("T")[0]} value={slice.birthday} onChange={inputBirthday}/>
			</label>
			<button onClick={nextClick}>Next</button>
		</form>

		<form className={`SignUp-secondForm ${selectedForm === 2 ? "" : "hidden"}`} onSubmit={event => event.preventDefault()}>
			<label className="SignUp-labelText">
				Enter email:
				<input type="email" placeholder="Email" value={slice.email} onChange={inputEmail}/>
			</label>
			<label className="SignUp-labelText">
				Enter password:
				<input type="password" placeholder="Password" value={slice.password1} onChange={inputPassword1}/>
			
			</label>
			<label className="SignUp-labelText">
				Confirm password:
				<input type="password" placeholder="Password" value={slice.password2} onChange={inputPassword2}/>
			</label>
			<p className="SignUp-message">{message}</p>
			<div className="SignUp-buttons">
				<button onClick={backClick}>Back</button>
				<button onClick={signUpClick}>Confirm</button>
			</div>
		</form>

	</div>
}