import React from "react";
import { Col, Row } from "react-bootstrap";
import { IconContext } from "react-icons";
import { DiJenkins, DiDocker, DiGroovy } from "react-icons/di";
import { SiJfrog } from "react-icons/si";

function DevOpsstack() {
	return (
		<IconContext.Provider value={{ size: "2em" }}>
			<Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
				<h1 className="project-heading">
					<strong>DevOps</strong>
				</h1>
				<Col xs={4} md={2} className="tech-icons">
					<DiJenkins />
				</Col>
				<Col xs={4} md={2} className="tech-icons">
					<DiDocker />
				</Col>
				<Col xs={4} md={2} className="tech-icons">
					<DiGroovy />
				</Col>
				<Col xs={4} md={2} className="tech-icons">
					<SiJfrog />
				</Col>
			</Row>
		</IconContext.Provider>
	);
}

export default DevOpsstack;
