import React from 'react';
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {sliceAccount} from "../Redux/sliceAccount";
import {sliceLocation} from "../Redux/sliceLocation";
import AccountEdit from "./AccountEdit.jsx";

function Account() {

	const [image, name, age, current, location] = useSelector(state => [
		state.sliceAccount.image,
		state.sliceAccount.name,
		state.sliceAccount.age,
		state.sliceAccount.current,
		state.sliceLocation.location
	]),
		{setCurrent} = sliceAccount.actions,
		{setLocation} = sliceLocation.actions,
		dispatch = useDispatch();

	function switchCurrentClick() {
		dispatch(setCurrent());
	}

	function navigateToPeople() {
		dispatch(setLocation("/people"));
	}

	return <div className="Account">

		{(location === "/people") ? <Navigate to="/people"/> : ""}

		<div className="Account-panel">
			<h1>Profile</h1>
			<nav className="Account-navigation">
				<button>Profile</button>
				<button onClick={navigateToPeople}>Users</button>
			</nav>
			<div className={`Account-userCard ${current === "view" ? "" : "hidden"}`}>
				<img className="Account-image" src={image} />
				<p className="Account-name">Name: {name}</p>
				<p className="Account-age">Age: {age}</p>
				<button onClick={switchCurrentClick}>...edit</button>
			</div>
			<AccountEdit/>
		</div>
	</div>
}

export default Account;