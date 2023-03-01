import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sliceSignIn } from "../Redux/sliceSignIn";
import { asyncSignIn } from "../Redux/asyncActions";

export default function SignIn() {

	const [slice, selected, location] = useSelector(state => [
		state.sliceSignIn, 
		state.sliceHome.selected, 
		state.sliceLocation.location
	]);
	const {setSignInSlice, setMessage} = sliceSignIn.actions;
	const dispatch = useDispatch();

	function inputEmail(event) {
		dispatch(setSignInSlice({...slice, message: "", email: event.target.value}));
	}

	function inputPassword(event) {
		dispatch(setSignInSlice({...slice, message: "", password: event.target.value}));
	}

	function signInClick() {
		if (!slice.email || !slice.password) return dispatch(setMessage("form not completed"));
		else dispatch(asyncSignIn());
	}

	return <div className={`SignIn ${selected === "Sign In" ? "" : "hidden"}`}>
		
		{(location === "/account") ? <Navigate to="/account"/> : ""}
		
		<form onSubmit={event => event.preventDefault()}>
			<label>
				Enter Email:
				<input type="email" placeholder="Email" value={slice.email} onChange={inputEmail}/>
			</label>
			<label>
				Enter Password:
				<input type="password" placeholder="Password" value={slice.password} onChange={inputPassword}/>
			</label>
			<p className="SignIn-message">{slice.message}</p>
			<button onClick={signInClick}>Confirm</button>
		</form>
	</div>
}