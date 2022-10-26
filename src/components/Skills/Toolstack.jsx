import React from "react";
import { Col, Row } from "react-bootstrap";
import { IconContext } from "react-icons";
import {
	SiUbuntu,
	SiCentos,
	SiWindows,
	SiVisualstudiocode,
	SiVisualstudio,
	SiPostman,
	SiJira,
} from "react-icons/si";

function Toolstack() {
	return (
		<IconContext.Provider value={{ size: "2em" }}>
			<Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
				<h1 className="project-heading">
					<strong>DevTools | IDEs | OS</strong>
				</h1>
				<Col xs={4} md={2} className="tech-icons">
					<SiUbuntu />
				</Col>
				<Col xs={4} md={2} className="tech-icons">
					<SiCentos />
				</Col>
				<Col xs={4} md={2} className="tech-icons">
					<SiWindows />
				</Col>
				<Col xs={4} md={2} className="tech-icons">
					<SiVisualstudiocode />
				</Col>
				<Col xs={4} md={2} className="tech-icons">
					<SiVisualstudio />
				</Col>
				<Col xs={4} md={2} className="tech-icons">
					<SiPostman />
				</Col>
				<Col xs={4} md={2} className="tech-icons">
					<SiJira />
				</Col>
			</Row>
		</IconContext.Provider>
	);
}

export default Toolstack;
