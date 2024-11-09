import "./LandingPagePreview.css"
import React, { useContext, useState } from "react"
import { Carousel, Container, Row, Col, Card, Button, Form, FloatingLabel } from "react-bootstrap"
import * as Yup from "yup"
import { Formik, useFormik } from "formik"
//import Page from "./Page"
//import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"

import { Link } from "react-router-dom"
import SpinnerButton from "./Spinner/SpinnerButton"

const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre es requerido"),
    email: Yup.string().required("El email es requerido").email("Email no valido"),
    telefono: Yup.string().required("El teléfono es requerido").min(10, "La longitud del teléfono debe ser mínimo 10 números"),
    comentarios: Yup.string().required("Los comentarios son requeridos")
})

function LandingPagePreview() {
    const [sending, setSending] = useState(false)
    //const appDispatch = useContext(DispatchContext)
    const appState = useContext(StateContext)
    //console.log("appstate:", appState)

    const formik = useFormik({
        //Lo que necesita el formulario
        initialValues: {
            nombre: "",
            email: "",
            telefono: "",
            comentarios: ""
        },
        //La validación que hacemos con YUP
        validationSchema: validationSchema,
        //Lo que pasa cuando se envia el formulario
        onSubmit: values => {
            console.log("values")
            setSending(true)
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2))
                console.log("values:", values)
                setSending(false)
            }, 3000)
        }
    })

    return (
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
                <p>{appState.landingPage.servicios}</p>
                <Row className="pt-3">
                    {["Registro de Dominio", "Hospedaje", "SSL", "Correo Corporativo", "Desarrollo Web", "Desarrollo de Apps Moviles"].map((product, index) => (
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
            </section>

            {/* Productos */}
            <section className="products-section">
                <h2>Productos</h2>
                <p>{appState.landingPage.productos}</p>
                <Row className="pt-3">
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
                <p className="mt-3">¡Queremos saber de ti!. Favor de llenar el siguiente formulario y en breve lo contactaremos</p>

                <div className="border rounded-3 mt-4">
                    <div className="p-4">
                        <Form onSubmit={formik.handleSubmit}>
                            <FloatingLabel controlId="floatingName" label="Nombre" className="mb-3">
                                <Form.Control type="text" placeholder="Nombre" id="nombre" name="nombre" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.nombre} />
                                {formik.touched.nombre && formik.errors.nombre ? <div className="text-danger">{formik.errors.nombre}</div> : null}
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3">
                                <Form.Control type="email" placeholder="name@example.com" id="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                                {formik.touched.email && formik.errors.email ? <div className="text-danger">{formik.errors.email}</div> : null}
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingPassword" label="Teléfono" className="mb-3">
                                <Form.Control type="number" placeholder="Telefono" id="telefono" name="telefono" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.telefono} />
                                {formik.touched.telefono && formik.errors.telefono ? <div className="text-danger">{formik.errors.telefono}</div> : null}
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingComentarios" label="Comentarios">
                                <Form.Control as="textarea" placeholder="Comentarios" style={{ height: "150px" }} id="comentarios" name="comentarios" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.comentarios} />
                                {formik.touched.comentarios && formik.errors.comentarios ? <div className="text-danger">{formik.errors.comentarios}</div> : null}
                            </FloatingLabel>

                            <div className="text-end mt-3">
                                <Button type="submit" className="btn btn-warning px-5" disabled={sending}>
                                    {sending && <SpinnerButton mensaje="Espere..." />}
                                    {!sending && "Enviar"}
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <Row>
                    <Col md={6}>
                        <p>&nbsp;</p>
                    </Col>
                    <Col md={6} className="social-media">
                        Síguenos en:{" "}
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
    )
}

export default LandingPagePreview
