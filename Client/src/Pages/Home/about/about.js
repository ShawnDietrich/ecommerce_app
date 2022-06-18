import React from "react"
import "./about.css"
import Card from 'react-bootstrap/Card'
import turningImg from '../../../images/turningTools.jpg'
import headerImg from '../../../images/woodTurningbk.jpg'
import gobbletImg from '../../../images/wood gobblet.jpg'
import woodSelection from '../../../images/exoticSelection.jpg'
import CardGroup from 'react-bootstrap/CardGroup'
const About = () => {
    return (
        <div className="aboutComponent">
            <img height='700px' width='100%' src={headerImg} alt='wood turning' />
            <CardGroup className="cardGroup">
                <Card border="secondary" style={{ width: '30rem' }}>
                    <Card.Img variant='top' src={turningImg} style={{height: '50em'}}/>
                    <Card.Body>
                        <Card.Title>Turning Services</Card.Title>
                        <Card.Text>Full size wood lathe, capible of turning piecs up to 30" long and 8" diameter</Card.Text>
                    </Card.Body>
                </Card>
                <Card border="secondary" style={{ width: '30rem' }}>
                    <Card.Img variant='top' src={gobbletImg} style={{height: '50em'}}/>
                    <Card.Body>
                        <Card.Title>Custom Projects</Card.Title>
                        <Card.Text>Projects designed by you, for you</Card.Text>
                    </Card.Body>
                </Card>
                <Card border="secondary" style={{ width: '30rem' }}>
                    <Card.Img variant='top' src={woodSelection} style={{height: '50em'}} />
                    <Card.Body>
                        <Card.Title>Exotic Wood Selection</Card.Title>
                        <Card.Text>Vast library of different kinds of wood species</Card.Text>
                    </Card.Body>
                </Card>

            </CardGroup>

        </div>
    )
}

export default About