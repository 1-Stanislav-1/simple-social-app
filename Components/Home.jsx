import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { sliceHome } from "../Redux/sliceHome";
import SignIn from "./SignIn.jsx";
import SignUp from './SignUp.jsx';

function Home() {

	const selected = useSelector(state => state.sliceHome.selected),
		{ selectSignUp, selectSignIn } = sliceHome.actions,
		dispatch = useDispatch();

	function signUpClick() {
		dispatch(selectSignUp());
	}

	function signInClick() {
		dispatch(selectSignIn());
	}

	return <div className="Home">
		<div className="Home-panel">
			<nav>
				<h2 className={selected === "Sign Up" ? "selected" : ""} onClick={signUpClick}>Sign Up</h2>
				<h2 className={selected === "Sign In" ? "selected" : ""} onClick={signInClick}>Sign In</h2>
			</nav>
			<SignIn/>
			<SignUp/>
		</div>
	</div>
}

export default Home;