import React from "react";
import "./about.css";
import turningImg from "../../../images/turningTools.jpg";
import headerImg from "../../../images/woodTurningbk.jpg";
import gobbletImg from "../../../images/wood gobblet.jpg";
import woodSelection from "../../../images/exoticSelection.jpg";
import { Carousel } from "react-bootstrap";
const About = () => {
  return (
    <div className="aboutHeader">
        <img height='700px' width='100%' src={headerImg} alt='wood turning' />
      <div className="aboutComponent">
        <Carousel>
          <Carousel.Item style={{height: '50em'}}>
            <img 
            className="d-block w-100" 
            src={turningImg} 
            alt="First slide"
            style={{height: '50em'}}
            />
            <Carousel.Caption>
              <h3>Turning Services</h3>
              <p>
                Full size wood lathe, capible of turning piecs up to 30" long
                and 8" diameter
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item style={{height: '50em'}}>
            <img
              className="d-block w-100"
              src={gobbletImg}
              alt="Second slide"
              style={{height: '50em'}}
            />

            <Carousel.Caption>
              <h3>Custom Projects</h3>
              <p>Projects designed by you, for you</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item style={{height: '50em'}}>
            <img
              className="d-block w-100"
              src={woodSelection}
              alt="Third slide"
              style={{height: '50em'}}
            />

            <Carousel.Caption>
              <h3>Exotic Wood Selection</h3>
              <p>Vast library of different kinds of wood species</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default About;

/*
<img height='700px' width='100%' src={headerImg} alt='wood turning' />
            <CardGroup className="cardGroup">
                <Row className='justify-content-center'>

                    <Col>
                        <Card border="secondary" style={{ width: '18rem', margin: '0 auto', height: '50em' }}>
                            <Card.Img variant='top' src={turningImg} style={{ height: '50em' }} />
                            <Card.Body>
                                <Card.Title>Turning Services</Card.Title>
                                <Card.Text>Full size wood lathe, capible of turning piecs up to 30" long and 8" diameter</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card border="secondary" style={{ width: '18rem', margin: '0 auto', height: '50em' }}>
                            <Card.Img variant='top' src={gobbletImg} style={{ height: '41.5em' }} />
                            <Card.Body>
                                <Card.Title>Custom Projects</Card.Title>
                                <Card.Text>Projects designed by you, for you</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card border="secondary" style={{ width: '18rem', margin: '0 auto', height: '50em' }}>
                            <Card.Img variant='top' src={woodSelection} style={{ height: '41.5em' }} />
                            <Card.Body>
                                <Card.Title>Exotic Wood Selection</Card.Title>
                                <Card.Text>Vast library of different kinds of wood species</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>


                </Row>


            </CardGroup>
            */
