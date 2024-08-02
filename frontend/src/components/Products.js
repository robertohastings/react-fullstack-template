import React, { useEffect, useState, useContext } from "react"
import HtmlReactParser from "html-react-parser"
import StateContext from "../StateContext"
import { Col, Form, Row, Card, ListGroup, Button, Container } from "react-bootstrap"
import DispatchContext from "../DispatchContext"

import Page from "./Page"
import Axios from "axios"

import SpinnerDot from "./Spinner/SpinnerDot"

function Products() {
    const appDispatch = useContext(DispatchContext)
    const appState = useContext(StateContext)
    console.log("appState:", appState.landingPage.productos)
    //const { productos } = appState.landinPage.productos
    const dataCategories = appState.landingPage.categorias

    const [categoria, setCategoria] = useState(null)
    const [productos, setProductos] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    // const handleChange = e => {
    //     //console.log("handleSelect", e.target.value)
    //     setCategoria(e.target.value)
    // }

    useEffect(() => {
        if (categoria > 0) {
            //console.log(categoria)
            setIsLoading(true)
            async function fetchData() {
                try {
                    await Axios.get("/api/getProductosByCategoria", {
                        params: {
                            id_empresa: 1,
                            id_categoria: categoria
                        }
                    })
                        .then(response => {
                            if ((response.status = 200)) {
                                console.log("productos encontrados:", response.data.productos)
                                setProductos(response.data.productos)
                            } else {
                                console.log("There was an error fetching data", response.error.statusText)
                            }
                        })
                        .catch(error => {
                            console.log("There was an error fetching data", error)
                        })
                    // console.log("productos", response.data)
                    // setProductos(response.data)
                } catch (error) {
                    console.log("error:", error)
                } finally {
                    setIsLoading(false)
                }
            }
            fetchData()
        }
    }, [categoria])

    const agregarCarrito_handled = producto => {
        const data = {
            id_producto: producto.id_producto,
            nombre: producto.nombre,
            cantidad: 1,
            precio: producto.precio_promocion > 0 ? producto.precio_promocion : producto.precio,
            imagen: producto.image1
        }
        console.log("producto", data)
        appDispatch({
            type: "agregarCarrito",
            data: data
        })
        appDispatch({ type: "alertMessage", value: "Producto agregado al carrito", typeAlert: "success" })
    }

    return (
        <Page title="Productos">
            <h2 className="mt-0 mb-0">Productos</h2>

            {/* <div style={{backgroundColor: "lightgrey"}} className="mb-5 p-3" dangerouslySetInnerHTML={{ __html: contenido }}></div> */}

            <div className="mt-1 d-flex justify-content-center">
                <Form>
                    <Form.Group as={Col} controlId="selectorCategoria">
                        <Form.Label column>Seleccione una Categoria</Form.Label>
                        <Col className="d-flex align-items-center">
                            <Form.Select onChange={e => setCategoria(e.target.value)}>
                                <option value={0}>Seleccione</option>
                                {dataCategories.map(categoria => {
                                    return <option value={categoria.id_categoria}>{categoria.nombre}</option>
                                })}
                            </Form.Select>
                        </Col>
                    </Form.Group>
                </Form>
            </div>

            {isLoading && <SpinnerDot />}

            {!isLoading && (
                <>
                    {/* Cards de productos */}

                    {productos.length > 0 && (
                        <div className="mt-4 mb-4">
                            <Container className="d-flex justify-content-center">
                                <Row xs={1} sm={1} md={productos.length === 1 ? 8 : 4} lg={4} className="g-4 d-flex justify-content-center w-100">
                                    {productos.map(producto => {
                                        return (
                                            <Col key={producto.id} className="d-flex">
                                                <Card className="h-100">
                                                    <div className="d-flex justify-content-center">
                                                        <Card.Img variant="top" src={producto.image1 !== null || producto.image1 !== "" ? producto.image1 : "https://fiestatijuana.mx/image-not-available.png"} style={{ width: "100%", height: "150px" }} />
                                                    </div>
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
                                                                <Button variant="outline-warning" size="sm" onClick={() => agregarCarrito_handled(producto)}>
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
                            </Container>
                        </div>
                    )}
                </>
            )}

            <Container>
                <div style={{ backgroundColor: "lightgrey" }} className="mb-5 p-3">
                    {HtmlReactParser(appState.landingPage.productos)}
                </div>
            </Container>
        </Page>
    )
}

export default Products
