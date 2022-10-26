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
							Computers, and specific programming has always been my passion
							from a young age 👶
							<br />
							Since then, I'm studing and research new technologies{" "}
							<b className="lightblue"> every single day </b> 🕵️
							<br />
							<br />I am fluent in classics like
							<i>
								<b className="lightblue"> C++, JS & .Net </b>
							</i>
							<br />
							<br />
							My field of Interest's are building new &nbsp;
							<i>
								<b className="lightblue">Web & Native Technologies </b> and also
								in areas related to{" "}
								<b className="lightblue">Video Processing OverIP.</b>
							</i>
							<br />
							<br />
							In my free time, I also apply my passion for developing products
							with new things like
							<i>
								<b className="lightblue">
									{" "}
									Javascript Libraries and Frameworks
								</b>
							</i>
						</p>
					</Col>
					<Col md={4} className="myAvtar">
						<Tilt>
							<img src={myImg} className="img-fluid" alt="avatar" />
						</Tilt>
					</Col>
				</Row>
				<Row>
					<Col md={12} className="home-about-social">
						<h1>FIND ME ON</h1>
						<p>
							Feel free to <span className="lightblue">connect </span> me
						</p>
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
