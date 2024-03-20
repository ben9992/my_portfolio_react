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
						<h1 style={{ fontSize: "2.1em", marginBottom: "20px" }}>
							Discover My <strong>Universe</strong>
						</h1>

						<div className="aboutText">
							Greetings, I'm{" "}
							<span style={{ color: "#1E90FF" }}>
								Ben Mishali
							</span>
							. Armed with a Bachelor of Science in Computer
							Engineering and a Master of Business Administration
							with a focus on technology, I navigate the tech
							world with enthusiasm and expertise. 👩‍🎓
						</div>
						<div className="aboutText">
							Beyond my dedication to coding, which occupies most
							of my time, I indulge in hobbies that fuel my
							creativity and passion for exploration.
						</div>

						<ul
							style={{
								fontSize: "1.2em",
								listStyleType: "none",
								padding: 0,
							}}
						>
							<li style={{ marginBottom: "10px" }}>
								🤖 Diving into Gaming Adventures
							</li>
							<li style={{ marginBottom: "10px" }}>
								✍️ Crafting Tech Insights on Blogs
							</li>
							<li>
								🚴🏻 Pursuing Mountain Biking & Adventurous
								Travels
							</li>
						</ul>
					</Col>
					<Col
						md={5}
						style={{ paddingTop: "120px", paddingBottom: "50px" }}
						className="about-img"
					>
						<img
							style={{ padding: "30px", borderRadius: "50%" }}
							src={meImg}
							alt="about"
							className="img-fluid"
						/>
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
							<Transition />
						</div>
						<p
							style={{
								textAlign: "left",
								fontSize: "1.5em",
								paddingTop: "4em",
							}}
						>
							🧠 Albert Einstein
						</p>
					</Col>
				</Row>
			</Container>
		</Container>
	);
}

export default About;
