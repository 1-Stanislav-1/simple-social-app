import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home.jsx";
import Account from "./Components/Account.jsx";
import People from "./Components/People.jsx";

function App() {

	return <Router>
		<Routes>
			<Route path="/" element={<Home/>}/>
			<Route path="/account" element={<Account/>}/>
			<Route path="/people" element={<People/>}/>
		</Routes>
	</Router>
}

export default App;