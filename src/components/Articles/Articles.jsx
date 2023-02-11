import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import ArticleCard from "./ArticleCard";
import { GetArticlesDataList } from "./ArticlesData";

function Articles() {
	return (
		<Container fluid className="articles-section">
		<Particle />
		<Container>
		  <h1 className="articles-heading">
			My Recent <strong>Articles </strong>
		  </h1>
		  <br/>
		  <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
		{
			GetArticlesDataList().map(el => 
				<Col key={el.key} md={4}>
					<ArticleCard 
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

export default Articles;
