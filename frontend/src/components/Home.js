import "./home.css"
import React, { useContext } from "react"
import HTMLReactParser from "html-react-parser/lib/index"
import { Carousel, Container, Row, Col, Card, Button, Form, Image } from "react-bootstrap"
import Page from "./Page"
//import Card from "react-bootstrap/Card"
//import Button from "react-bootstrap/Button"
//import Container from "react-bootstrap/Container"
//import Row from "react-bootstrap/Row"
//import Col from "react-bootstrap/Col"
//import Image from "react-bootstrap/Image"
//import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"
import CardImagenConFallback from "../tools/CardImagenConFallback"

import { Link } from "react-router-dom"

function Home() {
    //const appDispatch = useContext(DispatchContext)
    const appState = useContext(StateContext)
    console.log("appstate:", appState)

    // const handledClick = () => {
    //     //alert("click")
    //     //appDispatch({ type: "flashMessage", value: "Prueba de flash message" })
    //     // appDispatch({ type: "alertMessage", data: { message: "Alert", typeAlert: "warning" } })
    //     appDispatch({ type: "alertMessage", value: "alert", typeAlert: "danger" })
    // }

    return (
        <Page title="Home" fluid={true}>
            {(appState.landingPage.settings.mostrar_sitioEnMantenimiento === 1 || 
                appState.landingPage.settings.mostrar_landingPage === 0) && (
                <>
                    <Row className="m-3">
                        <Col className="d-flex justify-content-center align-items-center pt-5">
                            <Image src="/img/website-maintenance.jpg" fluid />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center align-items-center">
                            <p>Sitio en Mantenimiento</p>
                        </Col>
                    </Row>
                </>
            )}

            {(appState.landingPage.settings.mostrar_sitioEnMantenimiento === 0 && 
                appState.landingPage.settings.mostrar_landingPage === 1) && (
                <Container fluid>
                    {/* Carousel */}
                    <Carousel className="carousel-section pt-5">
                        {appState.landingPage.categorias.map((categoria, index) => (
                            <Carousel.Item>
                                {/* <img className="d-block w-100" src="image1.jpg" alt="Slide 1" /> */}
                                <CardImagenConFallback src={categoria.imagen} alt={categoria.nombre} width="100%" />
                                <Carousel.Caption>
                                    <h3>{categoria.nombre}</h3>
                                    <p>{categoria.nombre}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))}
                    </Carousel>

                    {/* Quiénes Somos */}
                    <section className="about-section">
                        <h2>¿Quiénes Somos?</h2>
                        <p>{appState.landingPage.quienesSomos ? HTMLReactParser(appState.landingPage.quienesSomos) : ""}</p>
                    </section>

                    {/* Servicios */}
                    {appState.landingPage.settings.mostrar_servicios === 1 && (
                        <>
                            <section className="services-section">
                                <h2>Servicios</h2>
                                <Row>
                                    <Col md={4}>
                                        <h4>Registro de Dominio</h4>
                                        <p>Obtén el nombre ideal para tu sitio con un dominio personalizado.</p>
                                    </Col>
                                    <Col md={4}>
                                        <h4>Hospedaje</h4>
                                        <p>Ofrecemos servidores rápidos, seguros y siempre disponibles.</p>
                                    </Col>
                                    <Col md={4}>
                                        <h4>SSL</h4>
                                        <p>Asegura la confianza de tus usuarios con certificados SSL.</p>
                                    </Col>
                                    <Col md={4}>
                                        <h4>Correo Corporativo</h4>
                                        <p>Crea credibilidad con emails personalizados para tu negocio.</p>
                                    </Col>
                                    <Col md={4}>
                                        <h4>Desarrollo Web</h4>
                                        <p>Desarrollamos sitios web adaptados a tus necesidades.</p>
                                    </Col>
                                    <Col md={4}>
                                        <h4>Desarrollo de Apps Móviles</h4>
                                        <p>Soluciones móviles para conectar mejor con tus clientes.</p>
                                    </Col>
                                </Row>
                            </section>
                        </>
                    )}

                    {/* Productos */}
                    {appState.landingPage.settings.mostrar_productos === 1 && (
                        <>
                            <section className="products-section">
                                <h2 className="pb-3">Nuestros Productos</h2>
                                <p className="pb-4">{appState.landingPage.productos ? HTMLReactParser(appState.landingPage.productos) : ""}</p>
                                <Row className="justify-content-center">
                                    {/* {["Dominio", "Hospedaje", "SSL", "Correo Corporativo", "Web", "Móvil"].map((product, index) => (
                                        <Col md={3} key={index} className="mb-4">
                                            <Card>
                                                <Card.Img variant="top" src={`product${index + 1}.jpg`} />
                                                <Card.Body>
                                                    <Card.Title>{product}</Card.Title>
                                                    <Card.Text>Descripción breve de {product}.</Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))} */}

                                    {appState.landingPage.categorias.map((categoria, index) => (
                                        <Col xs={12} sm={6} md={3} lg={2} key={index} className="mb-4 d-flex align-items-stretch">
                                            <Card className="flex-grow-1">
                                                {/* <Card.Img
                                                    variant="top"
                                                    src={categoria.imagen}
                                                    onError={e => {
                                                        e.target.src = imageNotAvailabe
                                                    }}
                                                /> */}

                                                <CardImagenConFallback src={categoria.imagen} alt={categoria.nombre} width="100%" />

                                                <Card.Body className="d-flex flex-column">
                                                    <Card.Title className="mt-3">{categoria.nombre}</Card.Title>
                                                    {/* <Card.Text>{categoria.nombre}.</Card.Text> */}
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                                {appState.landingPage.settings.mostrar_productos_verMas === 1 && (
                                    <Button variant="primary" className="view-more-button">
                                        Ver más
                                    </Button>
                                )}
                            </section>
                        </>
                    )}

                    {/* Contáctanos */}
                    {appState.landingPage.settings.mostrar_contactanos === 1 && (
                        <>
                            <section className="contact-section">
                                <h2>Contáctanos</h2>
                                <Form>
                                    <Form.Group controlId="formName">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control type="text" placeholder="Tu nombre" />
                                    </Form.Group>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Tu email" />
                                    </Form.Group>
                                    <Form.Group controlId="formPhone">
                                        <Form.Label>Teléfono</Form.Label>
                                        <Form.Control type="text" placeholder="Tu teléfono" />
                                    </Form.Group>
                                    <Form.Group controlId="formComments">
                                        <Form.Label>Comentarios</Form.Label>
                                        <Form.Control as="textarea" rows={3} placeholder="Tus comentarios" />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Enviar
                                    </Button>
                                </Form>
                            </section>
                        </>
                    )}

                    {/* Footer */}

                    {/* <footer className="footer">

                    </footer> */}
                </Container>
            )}
        </Page>
    )
}

export default Home
