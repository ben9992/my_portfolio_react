import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../assets/avatar.png";
import Tilt from "react-parallax-tilt";
import { AiFillGithub, AiOutlineLink, AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Intro() {
	return (
		<Container fluid className="home-about-section" id="about">
			<Container>
				<Row>
					<Col md={8} className="home-about-description">
						<h1 style={{ fontSize: "2.6em" }}>
							LET ME <span className="text-container">
								<div className="text" data-text="INTRODUCE">INTRODUCE</div>
							</span> MYSELF
						</h1>
						<p className="home-about-body">
							Computers has always been my passion from a young age 👶
							<br />
							<br />
							I remember the first time as it was yesterday, with a glass of wine on the balcony and the first task of "Hello World" in C++.
							<br />
							It’s like you sit down at 8 PM, suddenly you notice that your neck hurts, your eyes are sore 😳, you blink and stretch, look at the time 🕙, and it’s 12:30 AM.
							<br />
							Where did the time go? 🤔
							<br />
							You’ve coded a whole class with test cases and it works better than you imagined it. 🤩
							<br />
							You feel like you really created something out of thin air, crystallized knowledge into executable form using the awesome power of your mind alone.
							<br />
							<br />
							Since that day I continue to learn and explore{" "}
							<b className="lightblue"> every day anew </b> 🕵️
							<br />
							<br />My main languages are
							<i>
								<b className="lightblue"> C++, .net & Javascript | Typescript </b>
							</i>
							<br />
							<br />
							My field of Interest's are building new &nbsp;
							<i>
								<b className="lightblue">Web & Native Technologies </b> and also
								in areas related to{" "}
								<b className="lightblue">Software architecture</b> and <b className="lightblue">Video Processing OverIP.</b>
							</i>
							<br />
							<br />
							I also apply my passion for developing products
							with new things like
							<i>
								<b className="lightblue">
									{" "}
									Javascript Libraries and Frameworks
								</b>
							</i>
						</p>
					</Col>
					<Col md={4} className="avatarImg">
						<Tilt gyroscope={true}>
							<img src={myImg} className="img-fluid" alt="avatar" />
						</Tilt>
					</Col>
				</Row>
				<Row>
					<Col md={12} className="home-about-social">
						<h1>FIND ME ON</h1>
						<ul className="home-about-social-links">
							<li className="social-icons">
								<a
									href="https://github.com/ben9992"
									target="_blank"
									rel="noreferrer"
									className="icon-colour  home-social-icons"
								>
									<AiFillGithub />
								</a>
							</li>
							<li className="social-icons">
								<a
									href="https://linktr.ee/ben.dev.io"
									style={{ color: "white" }}
									target="_blank"
									rel="noreferrer"
									className="icon-colour  home-social-icons"
								>
									<AiOutlineLink />
								</a>
							</li>
							<li className="social-icons">
								<a
									href="https://www.linkedin.com/in/ben-mishali-46b59913a/"
									target="_blank"
									rel="noreferrer"
									className="icon-colour  home-social-icons"
								>
									<FaLinkedinIn />
								</a>
							</li>
							<li className="social-icons">
								<a
									href="https://www.instagram.com/ben.dev.io/"
									target="_blank"
									rel="noreferrer"
									className="icon-colour home-social-icons"
								>
									<AiFillInstagram />
								</a>
							</li>
						</ul>
					</Col>
				</Row>
			</Container>
		</Container>
	);
}
export default Intro;
