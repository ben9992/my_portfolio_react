import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import CourseCard from "./CourseCard";
import { GetCoursesDataList } from "./CoursesData";

function Courses() {
	return (
		<Container fluid className="courses-section">
		<Particle />
		<Container>
		  <h1 className="courses-heading">
			My Recent <strong className="purple">Courses </strong>
		  </h1>
		  <br/>
		  <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
		{
			GetCoursesDataList().map(el => 
				<Col key={el.key} md={4}>
					<CourseCard 
						key={el.key}
						title={el.title}
						description={el.desc}
						link={el.link}
						img={el.img}
						langImg={el.langImg}
					/>
				</Col>	
			)
		}
			
		  </Row>
		</Container>
	  </Container>
	);  
}

export default Courses;
