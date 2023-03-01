import React from 'react';
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {sliceLocation} from "../Redux/sliceLocation";
import Account from "./Components/Account.jsx";
import People from "./Components/People.jsx";

function Main() {

	const location = useSelector(state => state.sliceLocation.location),
		{setLocation} = sliceLocation.actions,
		dispatch = useDispatch();

	function navigateToAccaunt() {
		dispatch(setLocation("/account"));
	}

	function navigateToPeople() {
		dispatch(setLocation("/people"));
	}

	return <div className="Main">

		{(location === "/account") ? <Navigate to="/account"/> : ""}

		{(location === "/people") ? <Navigate to="/people"/> : ""}

		<div className="Main-panel">
			<nav className="Main-navigation">
				<button onClick={navigateToAccaunt}>Profile</button>
				<button onClick={navigateToPeople}>Users</button>
			</nav>
		</div>
	</div>

}

export default Main;