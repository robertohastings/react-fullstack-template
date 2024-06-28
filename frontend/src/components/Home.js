import React, { useContext } from "react"
import Page from "./Page"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
//import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import DispatchContext from "../DispatchContext"

import { Link } from "react-router-dom"

function Home() {
    const appDispatch = useContext(DispatchContext)

    const handledClick = () => {
        //alert("click")
        //appDispatch({ type: "flashMessage", value: "Prueba de flash message" })
        // appDispatch({ type: "alertMessage", data: { message: "Alert", typeAlert: "warning" } })
        appDispatch({ type: "alertMessage", value: "alert", typeAlert: "danger" })
    }

    return (
        <Page title="Home">
            <Row className="m-4">
                <Col md={6}>
                    <Card>
                        <Card.Img variant="top" src="https://fiestatijuana.mx/image-not-available.png" />
                        <Card.Body>
                            <Card.Title>Sorteo Tec</Card.Title>
                            <Card.Text>Descripción del Sorteo Tec.</Card.Text>
                            <Link to="/">
                                <Button onClick={handledClick} variant="primary">
                                    Ver Boletos
                                </Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Img variant="top" src="https://fiestatijuana.mx/image-not-available.png" />
                        <Card.Body>
                            <Card.Title>Siembra Cultural</Card.Title>
                            <Card.Text>Descripción de Siembra Cultural.</Card.Text>
                            <Link to="/">
                                <Button variant="primary">Ver Boletos</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Page>
    )
}

export default Home
