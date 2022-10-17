import React from "react";
import { Col, Row } from "react-bootstrap";
import { IconContext } from "react-icons";
import { SiGitlab, SiGithub, SiBitbucket, SiAzuredevops,SiGitkraken } from "react-icons/si";

function Sourcestack() {
	return (
		<IconContext.Provider value={{ size: "2em" }}>
			<Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
				<h1 className="project-heading">
					<strong>Source Control</strong>
				</h1>
				<Col xs={4} md={2} className="tech-icons">
					<SiGitlab />
				</Col>
				<Col xs={4} md={2} className="tech-icons">
					<SiGithub />
				</Col>
				<Col xs={4} md={2} className="tech-icons">
					<SiBitbucket />
				</Col>
				<Col xs={4} md={2} className="tech-icons">
					<SiAzuredevops />
				</Col>
				<Col xs={4} md={2} className="tech-icons">
					<SiGitkraken />
				</Col>
			</Row>
		</IconContext.Provider>
	);
}

export default Sourcestack;
