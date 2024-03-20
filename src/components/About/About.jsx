import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Transition from "./Transition";
import meImg from "../../assets/me.jpg";

function About() {
	return (
		<Container fluid className="about-section">
			<Particle />
			<Container>
				<Row style={{ justifyContent: "center", padding: "10px" }}>
					<Col
						md={7}
						style={{
							justifyContent: "center",
							paddingTop: "30px",
							paddingBottom: "50px",
						}}
					>
						<h1 style="font-size: 2.1em; margin-bottom: 20px;">
						    Discover My <strong>Universe</strong>
						</h1>
						
						<p style="text-align: left; font-size: 1.5em;">
						    Greetings, I'm <span style="color: #1E90FF;">Ben Mishali</span>. Armed with a Bachelor of Science in Computer Engineering and a Master of Business Administration with a focus on technology, I navigate the tech world with enthusiasm and expertise. 👩‍🎓
						    <br>
						    <br>
						    Beyond my dedication to coding, which occupies most of my time, I indulge in hobbies that fuel my creativity and passion for exploration.
						</p>
						
						<ul style="font-size: 1.2em; list-style-type: none; padding: 0;">
						    <li style="margin-bottom: 10px;">🤖 Diving into Gaming Adventures</li>
						    <li style="margin-bottom: 10px;">✍️ Crafting Tech Insights on Blogs</li>
						    <li>🚴🏻 Pursuing Mountain Biking & Adventurous Travels</li>
						</ul>
					</Col>
					<Col
						md={5}
						style={{ paddingTop: "120px", paddingBottom: "50px" }}
						className="about-img"
					>
						<img style={{ padding: "30px", borderRadius: "50%" }} src={meImg} alt="about" className="img-fluid" />
					</Col>
				</Row>
				<Row style={{ justifyContent: "center", padding: "10px" }}>
					<Col
						md={7}
						style={{
							justifyContent: "center",
							paddingTop: "30px",
							paddingBottom: "50px",
						}}
					>
						<div>
							<Transition/>
						</div>
						<p style={{ textAlign: "left", fontSize: "1.5em", paddingTop:"4em" }}>
						🧠 Albert Einstein
						</p>
					</Col>
				</Row>
			</Container>
		</Container>
	);
}

export default About;
