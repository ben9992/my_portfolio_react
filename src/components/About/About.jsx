import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Aboutcard from "./AboutCard";
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
						<h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
							Welcome To My <span className="text-container">
								<div className="text" data-text="world">world</div>
							</span>
						</h1>

						<p style={{ textAlign: "left", fontSize: "1.5em" }}>
							So again, I am <span className="darkblue">Ben Mishali ,</span> {" "}
							I have a bachelor of Science (BSc) in Computer Engineering and
							Master of Business Administration (MBA) Specializing in technologies
							👩‍🎓
							<br />
							<br />
							Apart from coding (99.9%), some other activities that I love to
							do...
						</p>
						<ul>
							<li className="about-activity">🤖 Playing Games</li>
							<li className="about-activity">✍️ Writting Tech Blogs</li>
							<li className="about-activity">🚴🏻 Mountain biking & Travelling</li>
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
				<Aboutcard />
			</Container>
		</Container>
	);
}

export default About;
