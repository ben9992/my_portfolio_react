import React from "react";
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';

function CourseCard(props) {
	return (
	<Card className="text-center courses-card-view">
		<Card.Body>
			<Card.Img style={{maxHeight: "70%", maxWidth: "70%", padding: "20px"}} src={props.img}></Card.Img>
			<Card.Title><strong>{props.title}</strong></Card.Title>
			<Card.Body>
				<Card.Text className="courses-card-body-text">
					{props.description}
				</Card.Text>
			</Card.Body>
		</Card.Body>
		<Card.Img style={{maxHeight: "30%", maxWidth: "30%", alignSelf: "center"}} src={props.langImg}></Card.Img>
		<Card.Footer>
				<Button as="a" href={props.link}>
					Link
				</Button>
		</Card.Footer>
	</Card>
	);
}

export default CourseCard;
