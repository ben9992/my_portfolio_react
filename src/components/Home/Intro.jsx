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
							LET ME{" "}
							<span className="text-container">
								<div className="text" data-text="INTRODUCE">
									INTRODUCE
								</div>
							</span>{" "}
							MYSELF
						</h1>
						<div className="home-about-body">
							My fascination with computers ignited early, a
							passion that has only grown since those first
							curious explorations as a child 👶.
						</div>
						<div className="home-about-body">
							I vividly recall the thrill of my initial encounter
							with programming: a serene evening, a glass of wine
							on the balcony, and the magical simplicity of a
							"Hello World" in C++. That moment when time ceased
							to exist, and the world narrowed to the glow of my
							screen. It was an evening where 8 PM blurred into
							the wee hours, leaving me with a sore neck, tired
							eyes, and a sense of wonder 😳.
						</div>
						<div className="home-about-body">
							Hours flew by unnoticed until a stretch and a glance
							at the clock revealed it was past midnight. In those
							hours, I had breathed life into a class, complete
							with test cases, surpassing my expectations. 🤩
						</div>
						The joy came from creating something from nothing,
						turning abstract thoughts into a tangible, working code
						through sheer mental effort.
						<div className="home-about-body">
							That night set the course for a journey of
							continuous learning and exploration, greeting{" "}
							<b className="lightblue">each new day</b> with
							renewed curiosity. 🕵️
						</div>
						<div className="home-about-body">
							My expertise now spans main languages such as{" "}
							<i>
								<b className="lightblue">
									C++, C#, JavaScript and TypeScript
								</b>
							</i>{" "}
							and also frameworks like{" "}
							<i>
								<b className="lightblue">
									Angular, React and more !
								</b>
							</i>
							.
						</div>
						<div className="home-about-body">
							I am deeply interested in developing innovative{" "}
							<i>
								<b className="lightblue">
									Web and Native Technologies
								</b>
							</i>
							, diving into{" "}
							<i>
								<b className="lightblue">
									Software Architecture
								</b>
							</i>
							, and exploring the intricacies of{" "}
							<i>
								<b className="lightblue">Multimedia Over IP</b>
							</i>
							.
						</div>
						<div className="home-about-body">
							My passion for technology also extends to
							experimenting with{" "}
							<i>
								<b className="lightblue">
									JavaScript Libraries and Frameworks
								</b>
							</i>
							, constantly seeking to incorporate new ideas into
							my projects.
						</div>
					</Col>
					<Col md={4} className="avatarImg">
						<Tilt gyroscope={true}>
							<img
								src={myImg}
								className="img-fluid"
								alt="avatar"
							/>
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
