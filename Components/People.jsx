import React, {useEffect} from 'react';
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {sliceLocation} from "../Redux/sliceLocation";
import {asyncGetUsers} from "../Redux/asyncActions";

function People() {

	useEffect(() => {
		dispatch(asyncGetUsers());
	}, []);

	const [location, users] = useSelector(state => [state.sliceLocation.location, state.slicePeople]),
		{setLocation} = sliceLocation.actions,
		dispatch = useDispatch();

	function navigateToAccaunt() {
		dispatch(setLocation("/account"));
	}

	return <div className="People">

		{(location === "/account") ? <Navigate to="/account"/> : ""}

		<div className="People-panel">
			<h1>Users</h1>
			<nav className="People-navigation">
				<button onClick={navigateToAccaunt}>Profile</button>
				<button>Users</button>
			</nav>
			<ul className="People-container">
				{users.map((user, i) => 
					<li className="People-userCard" key={`${i}_${user.name}`}>
						<img src={user.image}/>
						<span>Name: {user.name}</span>
						<span>Age: {user.age}</span>
					</li>
				)}
			</ul>
		</div>
	</div>
}

export default People;