import React from "react";
import { Container } from "react-bootstrap";
import Particle from "../Particle";
import Nativestack from "./Nativestack";
import Webstack from "./Webstack";
import Databasesstack from "./Databasesstack";
import DevOpsstack from "./DevOpsstack";
import Toolstack from "./Toolstack";
import Sourcestack from "./Sourcestack";

function Skills() {
	return (
		<Container fluid className="about-section">
			<Particle />
			<Container>
				<h1 className="courses-heading">
					My <strong>Skills</strong>
				</h1>
				<br/>
				<br/>
				<Webstack />
				<Nativestack />
				<Databasesstack />
				<DevOpsstack />
				<Toolstack />
				<Sourcestack />
			</Container>
		</Container>
	);
}

export default Skills;
