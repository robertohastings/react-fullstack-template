import React, { useContext } from "react"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import StateContext from "./StateContext"

import { Link } from "react-router-dom"

const Main = () => {
    const appState = useContext(StateContext)

    return (
        <Container>
            {appState.landingPage.settings.mostrar_sitioEnMantenimiento === 1 && (
                <>
                    <Row>
                        <Col>
                            <Image src="https://goldit.com.my/wp-content/uploads/2020/01/website-maintenance.png" roundedCircle />
                        </Col>
                    </Row>
                </>
            )}

            {appState.landingPage.settings.mostrar_sitioEnMantenimiento === 0 && (
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
            )}
        </Container>
    )
}

export default Main
