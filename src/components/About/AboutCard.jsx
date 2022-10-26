import React from "react";
import Card from "react-bootstrap/Card";
import programmer from "../../assets/about.png";
import { Col, Row, Container } from "react-bootstrap";
function AboutCard() {
	return (
	<Row style={{ justifyContent: "center", padding: "10px" }}>
		<Col
			md={7}
			style={{
				justifyContent: "center",
				paddingTop: "80px"
			}}
		>
		<blockquote className="blockquote mb-0">
		<p className="darkblue quoteeffect">
			“Computers are incredibly fast, accurate, and stupid, humans are
			incredibly slow, inaccurate and brilliant, together they are
			powerful beyond imagination!”{" "}
		</p>
		<footer className="blockquote-footer darkblue">
			Albert Einstein
		</footer>
		</blockquote>
		</Col>
		<Col
			md={5}
			className="about-img"
		>
			<img
				src={programmer}
				alt=""
				className="img-fluid"
			/>
		</Col>
	</Row>
	);
}

export default AboutCard;
