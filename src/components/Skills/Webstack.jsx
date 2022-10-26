import React from "react";
import { Col, Row } from "react-bootstrap";
import { IconContext } from "react-icons";
import {
	DiJavascript1,
	DiReact,
	DiNodejs,
	DiHtml5,
	DiCss3,
	DiAngularSimple,
	DiNpm,
} from "react-icons/di";

function Webstack() {
	return (
		<IconContext.Provider value={{ size: "2em" }}>
			<Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
				<h1 className="project-heading">
					<strong>Web Ecosystems</strong>
				</h1>
				<Col xs={4} md={2} className="tech-icons">
					<DiAngularSimple />
				</Col>
				<Col xs={4} md={2} className="tech-icons">
					<DiReact />
				</Col>
				<Col xs={4} md={2} className="tech-icons">
					<DiNodejs />
				</Col>
				<Col xs={4} md={2} className="tech-icons">
					<DiNpm />
				</Col>
				<Col xs={4} md={2} className="tech-icons">
					<DiJavascript1 />
				</Col>
				<Col xs={4} md={2} className="tech-icons">
					<DiHtml5 />
				</Col>
				<Col xs={4} md={2} className="tech-icons">
					<DiCss3 />
				</Col>
			</Row>
		</IconContext.Provider>
	);
}

export default Webstack;
