import React from "react";
import { Col, Row } from "react-bootstrap";
import { CgCPlusPlus } from "react-icons/cg";
import { IconContext } from "react-icons";
import { DiPython } from "react-icons/di";
import { SiQt, SiCsharp, SiDotnet } from "react-icons/si";

function Nativestack() {
	return (
		<IconContext.Provider value={{ size: "2em" }}>
			<Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
				<h1 className="project-heading">
					<strong>Native Ecosystems</strong>
				</h1>
				<Col xs={4} md={2} className="tech-icons">
					<CgCPlusPlus />
				</Col>
				<Col xs={4} md={2} className="tech-icons">
					<SiQt />
				</Col>
				<Col xs={4} md={2} className="tech-icons">
					<SiCsharp />
				</Col>
				<Col xs={4} md={2} className="tech-icons">
					<SiDotnet />
				</Col>
				<Col xs={4} md={2} className="tech-icons">
					<DiPython />
				</Col>
			</Row>
		</IconContext.Provider>
	);
}

export default Nativestack;
