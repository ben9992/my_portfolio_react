import React from "react";
import Card from "react-bootstrap/Card";
import meImg from "../../assets/me.jpg";
import { Col, Container } from "react-bootstrap";
function AboutCard() {
	return (
		<Card className="quote-card-view">
			<Card.Body>
				<blockquote className="blockquote mb-0">
					<p style={{ textAlign: "left" }}>
						So again, I am <span className="darkblue">Ben Mishali .</span>
						<Container>
							<Col className="me-container">
								<img
									style={{ padding: "30px", borderRadius: "50%" }}
									src={meImg}
									alt=""
									className="img-fluid"
								/>
							</Col>
						</Container>
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

					<p className="darkblue">
						“Computers are incredibly fast, accurate, and stupid, humans are
						incredibly slow, inaccurate and brilliant, together they are
						powerful beyond imagination!”{" "}
					</p>
					<footer className="blockquote-footer darkblue">
						Albert Einstein
					</footer>
				</blockquote>
			</Card.Body>
		</Card>
	);
}

export default AboutCard;
