import React from "react";
import { Col, Row } from "react-bootstrap";
import { IconContext } from "react-icons";
import { DiMongodb, DiMsqlServer, DiPostgresql, DiMysql } from "react-icons/di";

function Databasesstack() {
	return (
		<IconContext.Provider value={{ size: "2em" }}>
			<Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
				<h1 className="project-heading">
					<strong>Databases</strong>
				</h1>
				<Col xs={4} md={2} className="tech-icons">
					<DiMsqlServer />
				</Col>
				<Col xs={4} md={2} className="tech-icons">
					<DiMysql />
				</Col>
				<Col xs={4} md={2} className="tech-icons">
					<DiMongodb />
				</Col>
				<Col xs={4} md={2} className="tech-icons">
					<DiPostgresql />
				</Col>
			</Row>
		</IconContext.Provider>
	);
}

export default Databasesstack;
