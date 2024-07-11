import React, { useContext } from "react"
import Page from "./Page"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
//import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"

import { Link } from "react-router-dom"

function Home() {
    const appDispatch = useContext(DispatchContext)
    const appState = useContext(StateContext)

    const handledClick = () => {
        //alert("click")
        //appDispatch({ type: "flashMessage", value: "Prueba de flash message" })
        // appDispatch({ type: "alertMessage", data: { message: "Alert", typeAlert: "warning" } })
        appDispatch({ type: "alertMessage", value: "alert", typeAlert: "danger" })
    }

    return (
        <Page title="Home">
            {appState.landingPage.settings.mostrar_sitioEnMantenimiento === 1 && (
                <>
                    <Row className="m-3">
                        <Col className="d-flex justify-content-center align-items-center">
                            <Image src="https://goldit.com.my/wp-content/uploads/2020/01/website-maintenance.png" roundedCircle />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center align-items-center">
                            <p>Sitio en Mantenimiento</p>
                        </Col>
                    </Row>
                </>
            )}

            {appState.landingPage.settings.mostrar_sitioEnMantenimiento === 0 && (
                <Row className="m-4">
                    <Col md={6}>
                        <Card>
                            <Card.Img variant="top" src="https://fiestatijuana.mx/image-not-available.png" />
                            <Card.Body>
                                <Card.Title>Productos</Card.Title>
                                <Card.Text>Descripción del Producto</Card.Text>
                                <Link to="/">
                                    <Button onClick={handledClick} variant="primary">
                                        Ver
                                    </Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card>
                            <Card.Img variant="top" src="https://fiestatijuana.mx/image-not-available.png" />
                            <Card.Body>
                                <Card.Title>Servicios</Card.Title>
                                <Card.Text>Descripción del Servicio</Card.Text>
                                <Link to="/">
                                    <Button variant="primary">Ver</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </Page>
    )
}

export default Home
