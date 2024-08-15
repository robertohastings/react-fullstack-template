import React, { useContext, useEffect, useState } from "react"
import Axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"
import { TiDeleteOutline } from "react-icons/ti"
import { Container, Row, Col, Image, Card } from "react-bootstrap"
import { CartContext } from "../context/ShoppingCartContext"

function Carrito() {
    const navigate = useNavigate()
    const [cart, setCart] = useContext(CartContext)
    const [isLoading, setIsLoaging] = useState(false)
    const [seccion, setSeccion] = useState("resumen")
    const [puntosDeEntrega, setPuntosDeEntrega] = useState({})

    const totalItems = cart.reduce((total, item) => total + parseInt(item.cantidad), 0)
    const totalPrice = cart.reduce((total, item) => total + item.cantidad * item.precio, 0)

    const appState = useContext(StateContext)
    console.log("appState:", appState)
    const appDispatch = useContext(DispatchContext)
    //const [carrito, setCarrito] = useState(JSON.parse(localStorage.getItem("carrito")) ?? {})

    const eliminarProducto_handled = id_producto => {
        setCart(currItems => {
            if (currItems.find(item => item.id_producto === id_producto)?.cantidad === 1) {
                return currItems.filter(item => item.id_producto !== id_producto)
            } else {
                return currItems.map(item => {
                    if (item.id_producto === id_producto) {
                        return { ...item, cantidad: item.cantidad - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }
    const fetchPuntosDeEntrega = async () => {
        setIsLoaging(true)
        try {
            const response = await Axios.get("/api/getPuntosDeEntregaCarrito", {
                params: {
                    id_empresa: 1,
                    id_direccion_tipo_identidad: 1,
                    identidad: 1
                }
            })
            console.log("response puntos de entrega:", response.data)
            setPuntosDeEntrega(response.data.puntosDeEntrega)
        } catch (error) {
            console.error("There was an error fetching Puntos de Entrega!", error)
        } finally {
            setIsLoaging(false)
        }
    }

    const actualizarCantidad = (id_producto, cantidad) => {
        setCart(currItems => {
            return currItems.map(item => {
                if (item.id_producto === id_producto) {
                    return { ...item, cantidad: cantidad }
                } else {
                    return item
                }
            })
        })
    }

    const handled_PuntoDeEntrega = async () => {
        //appDispatch({ type: "showLoggedIn", value: true })
        setSeccion("puntoDeEntrega")
        await fetchPuntosDeEntrega()
        console.log("puntos de entega:", puntosDeEntrega)
    }

    const handled_RegresarAlCarrito = () => {
        setSeccion("resumen")
    }

    return (
        <Container fluid>
            <h4 className="pb-4 pt-5">{seccion === "resumen" ? "Carrito de Compras" : seccion === "puntoDeEntrega" ? "Punto de Entrega" : ""}</h4>
            <Row>
                {seccion === "resumen" && (
                    <>
                        <Col xs={9} style={{ height: "100vh", overflowY: "auto" }}>
                            {cart?.length === 0
                                ? "No hay productos en el carrito"
                                : cart?.map(producto => (
                                      <div className="pb-3 px-4" key={producto.id_producto}>
                                          <Row className="d-flex align-items-center" style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
                                              <Col xs={2}>
                                                  <Image src={producto.imagen} style={{ width: "150px", height: "100px" }} />
                                              </Col>
                                              <Col xs={3}>
                                                  <h5>{producto.nombre}</h5>
                                              </Col>
                                              <Col xs={2} className="justify-text-center">
                                                  Precio: ${producto.precio}
                                              </Col>
                                              <Col xs={2}>
                                                  Cantidad:{" "}
                                                  <select value={producto.cantidad} onChange={e => actualizarCantidad(producto.id_producto, e.target.value)}>
                                                      <option value="1">1</option>
                                                      <option value="2">2</option>
                                                      <option value="3">3</option>
                                                      <option value="4">4</option>
                                                      <option value="5">5</option>
                                                      <option value="6">6</option>
                                                      <option value="7">7</option>
                                                      <option value="8">8</option>
                                                      <option value="9">9</option>
                                                      <option value="10">10</option>
                                                  </select>
                                              </Col>
                                              <Col xs={2}>
                                                  Subtotal: $<span>{producto.precio * producto.cantidad}</span>
                                              </Col>
                                              <Col xs={1} className="d-flex justify-content-center align-items-center">
                                                  <TiDeleteOutline size={25} onClick={() => eliminarProducto_handled(producto.id_producto)} title="Eliminar este producto del carrito" style={{ cursor: "pointer" }} />
                                              </Col>
                                          </Row>
                                          {/* <hr /> */}
                                      </div>
                                  ))}
                        </Col>
                    </>
                )}

                {seccion === "puntoDeEntrega" && (
                    <>
                        <Col xs="9">
                            <h5>Seleccione un Punto de Entrega:</h5>
                        </Col>
                        <Col xs="9">
                            <h5>Seleccione un Punto de Entrega:</h5>
                        </Col>
                    </>
                )}

                {/* Menú izquierdo */}
                <Col xs={3}>
                    <div className="position-sticky" style={{ top: 70 }}>
                        <Card>
                            <Card.Header as="h5">Resumen del Carrito</Card.Header>
                            <Card.Body>
                                {/* <Card.Title>Este es el resumen de compras</Card.Title> */}
                                <Card.Text className="pt-3">
                                    <strong>Cantidad de artículos:</strong> {totalItems}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Total a pagar:</strong> ${totalPrice.toFixed(2)}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Link to={"/Products"}>Seguir comprando</Link>
                                {seccion === "puntoDeEntrega" && (
                                    <>
                                        <br />
                                        <Link onClick={handled_RegresarAlCarrito}>Regresar al carrito</Link>
                                        <br />
                                        <br />
                                        <Link onClick={handled_RegresarAlCarrito}>Continuar con el Método de Pago</Link>
                                    </>
                                )}
                                <br />
                                {appState.loggedIn && seccion === "resumen" && <Link onClick={handled_PuntoDeEntrega}>Continuar con el punto de entrega</Link>}
                            </Card.Footer>
                        </Card>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Carrito
