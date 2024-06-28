import React, { useEffect, useState, useContext } from "react"
import HtmlReactParser from "html-react-parser"
import StateContext from "../StateContext"
import { Col, Form, Row, Card, ListGroup, Button } from "react-bootstrap"

import Page from "./Page"
import Axios from "axios"

function Products() {
    const appState = useContext(StateContext)
    console.log("appState:", appState)
    const { titulo, contenido } = appState.landinPage.products
    const dataCategories = appState.landinPage.categories

    const [categoria, setCategoria] = useState(null)
    const [productos, setProductos] = useState({})

    // const handleChange = e => {
    //     //console.log("handleSelect", e.target.value)
    //     setCategoria(e.target.value)
    // }

    useEffect(() => {
        if (categoria > 0) {
            console.log(categoria)
            async function fetchData() {
                try {
                    const response = await Axios.get("/api/inventario/obtener-productos")
                    console.log("productos", response.data)
                    setProductos(response.data)
                } catch (error) {
                    console.log("error:", error)
                }
            }
            fetchData()
        }
    }, [categoria])

    return (
        <Page title={titulo}>
            <h1 className="mb-4">{titulo}</h1>

            {/* <div style={{backgroundColor: "lightgrey"}} className="mb-5 p-3" dangerouslySetInnerHTML={{ __html: contenido }}></div> */}

            <div style={{ backgroundColor: "lightgrey" }} className="mb-5 p-3">
                {HtmlReactParser(contenido)}
            </div>

            <div className="mt-5">
                <Form>
                    <Form.Group as={Row} controlId="selectorCategoria">
                        <Form.Label column sm={3}>
                            Seleccione una Categoria
                        </Form.Label>
                        <Col sm={9} className="d-flex align-items-center">
                            <Form.Select onChange={e => setCategoria(e.target.value)}>
                                <option value={0}>Seleccione</option>
                                {dataCategories.map(categorie => {
                                    return <option value={categorie.id}>{categorie.descripcion}</option>
                                })}
                            </Form.Select>
                        </Col>
                    </Form.Group>
                </Form>
            </div>

            {/* Cards de productos */}
            {productos.length > 0 && (
                <div className="mt-4 mb-4">
                    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                        {productos.map(producto => {
                            return (
                                <Col key={producto.id}>
                                    <Card>
                                        <Card.Img variant="top" src={producto.pict1} />
                                        <Card.Body>
                                            <Card.Title>{producto.nombre}</Card.Title>
                                            <Card.Text>{producto.descripcion}</Card.Text>
                                        </Card.Body>
                                        <ListGroup className="list-group-flush">
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Precio:</Col>
                                                    <Col>${producto.precio}</Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Existencia:</Col>
                                                    <Col>{producto.existencia}</Col>
                                                </Row>
                                            </ListGroup.Item>
                                        </ListGroup>
                                        <Card.Footer>
                                            <Row>
                                                <Col className="mb-1">
                                                    <Button variant="outline-success" size="sm">
                                                        Ver Producto
                                                    </Button>
                                                </Col>
                                                <Col>
                                                    <Button variant="outline-warning" size="sm">
                                                        Agregar al Carrito
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                </div>
            )}
        </Page>
    )
}

export default Products
