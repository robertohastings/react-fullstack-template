import React from "react"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import { Link } from "react-router-dom"

const Main = () => {
    return (
        <Container>
            <Row className="mt-4">
                <Col md={6}>
                    <Card>
                        <Card.Img variant="top" src="sorteo-tec.jpg" />
                        <Card.Body>
                            <Card.Title>Sorteo Tec</Card.Title>
                            <Card.Text>Descripción del Sorteo Tec.</Card.Text>
                            <Link to="/boletos">
                                <Button variant="primary">Ver Boletos</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Img variant="top" src="siembra-cultural.jpg" />
                        <Card.Body>
                            <Card.Title>Siembra Cultural</Card.Title>
                            <Card.Text>Descripción de Siembra Cultural.</Card.Text>
                            <Link to="/boletos">
                                <Button variant="primary">Ver Boletos</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Main
