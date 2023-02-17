import React, { useState, useEffect } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Footer from "./components/Footer";
import GithubCorner from 'react-github-corner';
import Resume from "./components/Resume/Resume";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Skills from "./components/Skills/Skills";
import Courses from "./components/Courses/Courses";
import Articles from "./components/Articles/Articles";
        
function App() {
	const [load, upadateLoad] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			upadateLoad(false);
		}, 1200);

		return () => clearTimeout(timer);
	}, []);

	return (
		<Router>
			<Preloader load={load} />
			<div className="App" id={load ? "no-scroll" : "scroll"}>
				<Navbar />
        <GithubCorner href="https://github.com/ben9992/my_portfolio_react" />
				<ScrollToTop />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/skills" element={<Skills />} />
					<Route path="/resume" element={<Resume />} />
					<Route path="/courses" element={<Courses />} />
					<Route path="/articles" element={<Articles />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
