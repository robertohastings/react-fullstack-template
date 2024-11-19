import React, { useContext } from "react"
import { Carousel, Container, Row, Col, Card, Button, Form, Image } from "react-bootstrap"
import Page from "./Page"
//import Card from "react-bootstrap/Card"
//import Button from "react-bootstrap/Button"
//import Container from "react-bootstrap/Container"
//import Row from "react-bootstrap/Row"
//import Col from "react-bootstrap/Col"
//import Image from "react-bootstrap/Image"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"

import { Link } from "react-router-dom"

function Home() {
    const appDispatch = useContext(DispatchContext)
    const appState = useContext(StateContext)
    console.log("appstate:", appState)

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

            {appState.landingPage.settings.mostrar_sitioEnMantenimiento === 0 && (
                // <Row className="m-4">
                //     <Col md={6}>
                //         <Card>
                //             <Card.Img variant="top" src="https://fiestatijuana.mx/image-not-available.png" />
                //             <Card.Body>
                //                 <Card.Title>Productos</Card.Title>
                //                 <Card.Text>Descripción del Producto</Card.Text>
                //                 <Link to="/">
                //                     <Button onClick={handledClick} variant="primary">
                //                         Ver
                //                     </Button>
                //                 </Link>
                //             </Card.Body>
                //         </Card>
                //     </Col>
                //     <Col md={6}>
                //         <Card>
                //             <Card.Img variant="top" src="https://fiestatijuana.mx/image-not-available.png" />
                //             <Card.Body>
                //                 <Card.Title>Servicios</Card.Title>
                //                 <Card.Text>Descripción del Servicio</Card.Text>
                //                 <Link to="/">
                //                     <Button variant="primary">Ver</Button>
                //                 </Link>
                //             </Card.Body>
                //         </Card>
                //     </Col>
                // </Row>

                <Container fluid className="landing-page">
                    {/* Carousel */}
                    <Carousel className="carousel-section">
                        <Carousel.Item>
                            <img className="d-block w-100" src="image1.jpg" alt="Slide 1" />
                            <Carousel.Caption>
                                <h3>Hosting Rápido y Seguro</h3>
                                <p>Tu sitio web siempre en línea y protegido.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="d-block w-100" src="image2.jpg" alt="Slide 2" />
                            <Carousel.Caption>
                                <h3>Registra tu Dominio</h3>
                                <p>Obtén el nombre perfecto para tu marca.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="d-block w-100" src="image3.jpg" alt="Slide 3" />
                            <Carousel.Caption>
                                <h3>Desarrollo de Aplicaciones</h3>
                                <p>Soluciones personalizadas para tu negocio.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>

                    {/* Quiénes Somos */}
                    <section className="about-section">
                        <h2>¿Quiénes Somos?</h2>
                        <p>{appState.landingPage.quienesSomos}</p>
                    </section>

                    {/* Servicios */}
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

                    {/* Productos */}
                    <section className="products-section">
                        <h2>Productos</h2>
                        <Row>
                            {["Dominio", "Hospedaje", "SSL", "Correo Corporativo", "Web", "Móvil"].map((product, index) => (
                                <Col md={3} key={index} className="mb-4">
                                    <Card>
                                        <Card.Img variant="top" src={`product${index + 1}.jpg`} />
                                        <Card.Body>
                                            <Card.Title>{product}</Card.Title>
                                            <Card.Text>Descripción breve de {product}.</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                        <Button variant="primary" className="view-more-button">
                            Ver más
                        </Button>
                    </section>

                    {/* Contáctanos */}
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

                    {/* Footer */}
                    <footer className="footer">
                        <Row>
                            <Col md={6}>
                                <p>Síguenos en:</p>
                            </Col>
                            <Col md={6} className="social-media">
                                <Link href="#" className="social-icon">
                                    Facebook
                                </Link>
                                <Link href="#" className="social-icon">
                                    Instagram
                                </Link>
                                <Link href="#" className="social-icon">
                                    Twitter
                                </Link>
                                <Link href="#" className="social-icon">
                                    YouTube
                                </Link>
                            </Col>
                        </Row>
                    </footer>
                </Container>
            )}
        </Page>
    )
}

export default Home
