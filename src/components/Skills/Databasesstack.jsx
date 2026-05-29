import React from "react";
import { Col, Row } from "react-bootstrap";
import { IconContext } from "react-icons";
import { DiMongodb, DiMsqlServer } from "react-icons/di";
import { SiRabbitmq, SiApachecassandra, SiElasticsearch } from "react-icons/si";

function Databasesstack() {
	return (
		<IconContext.Provider value={{ size: "2em" }}>
			<Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
				<h1 className="project-heading">
					<strong>Databases & Messaging</strong>
				</h1>
				<Col xs={4} md={2} className="tech-icons">
					<DiMsqlServer />
				</Col>
				<Col xs={4} md={2} className="tech-icons">
					<DiMongodb />
				</Col>
				<Col xs={4} md={2} className="tech-icons">
					<SiElasticsearch />
				</Col>
				<Col xs={4} md={2} className="tech-icons">
					<SiRabbitmq />
				</Col>
				<Col xs={4} md={2} className="tech-icons">
					<SiApachecassandra />
				</Col>
			</Row>
		</IconContext.Provider>
	);
}

export default Databasesstack;
