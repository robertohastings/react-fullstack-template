import React, { useContext, useEffect, useState } from "react"
import Axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"
import { TiDeleteOutline } from "react-icons/ti"
import { Container, Row, Col, Image, Card, Form } from "react-bootstrap"
import { CartContext } from "../context/ShoppingCartContext"

function Carrito() {
    const navigate = useNavigate()
    const [cart, setCart] = useContext(CartContext)
    const [isLoading, setIsLoaging] = useState(false)
    const [seccion, setSeccion] = useState("resumen")
    const [puntosDeEntrega, setPuntosDeEntrega] = useState([])
    const [puntoDeEntregaSeleccionado, setPuntoDeEntregaSeleccionado] = useState({})
    const [formasDePago, setFormasDePago] = useState([])
    const [formaDePagoSeleccionada, setFormaDePagoSeleccionada] = useState({})

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
            //console.log("response puntos de entrega:", response.data.puntosDeEntrega)
            setPuntosDeEntrega(response.data.puntosDeEntrega)
        } catch (error) {
            console.error("There was an error fetching Puntos de Entrega!", error)
        } finally {
            setIsLoaging(false)
        }
    }
    const fetchFormasDePago = async () => {
        setIsLoaging(true)
        try {
            const response = await Axios.get("/api/getFormasDePago", {
                params: {
                    id_empresa: 1
                }
            })
            console.log("response formas de Pago:", response.data.formasDePago)
            setFormasDePago(response.data.formasDePago)
        } catch (error) {
            console.error("There was an error fetching Formas De Pago!", error)
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
        //console.log("puntos de entega:", puntosDeEntrega)
    }

    const handled_FormasDePago = async () => {
        setSeccion("formasDePago")
        await fetchFormasDePago()
    }

    const handled_RegresarAlCarrito = () => {
        setSeccion("resumen")
    }

    const handled_PuntoSeleccionado = puntoEntrega => {
        console.log("Punto entrega seleccionado", puntoEntrega)
        setPuntoDeEntregaSeleccionado(puntoEntrega)
    }

    const handled_FormaDePagoSeleccionada = formaDePago => {
        console.log("Forma de pago seleccionada", formaDePago)
        setPuntoDeEntregaSeleccionado(puntoEntrega)
    }

    return (
        <Container fluid>
            <h4 className="pb-4 pt-5">{seccion === "resumen" ? "Carrito de Compras" : seccion === "puntoDeEntrega" ? "Seleccione el Punto de Entrega o el Domicilio" : ""}</h4>
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
                        <Col xs={9} style={{ height: "100vh", overflowY: "auto" }}>
                            {/* {puntosDeEntrega?.length === 0
                                ? "No hay puntos de entrega y/o direcciones de entrega"
                                : puntosDeEntrega?.map((puntoEntrega, index) => (
                                      <div className="pb-3 px-4" key={index}>
                                          <Row className="d-flex align-items-center" style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
                                              <Col xs={12}>
                                                  <p>{puntoEntrega.puntoentrega}</p>
                                              </Col>
                                          </Row>
                                      </div>
                                  ))} */}
                            {puntosDeEntrega?.length === 0 && <p>No hay puntos de entrega y/o direcciones de entrega</p>}
                            {puntosDeEntrega?.length !== 0 && (
                                <>
                                    <Form className="px-5">
                                        {puntosDeEntrega.map((puntoEntrega, index) => (
                                            <>
                                                <Form.Check type="radio" id={`puntoEntrega-${index}`} className="pb-3" key={index}>
                                                    <Form.Check.Input type="radio" id={`opt-${index}`} name="punto_entrega" onChange={e => handled_PuntoSeleccionado(puntoEntrega)} />
                                                    <Form.Check.Label for={`opt-${index}`}>{`${puntoEntrega.TipoDeEntrega} en: ${puntoEntrega.puntoentrega}`}</Form.Check.Label>
                                                </Form.Check>
                                            </>
                                        ))}
                                    </Form>
                                </>
                            )}
                        </Col>
                    </>
                )}

                {seccion === "formasDePago" && (
                    <>
                        <Col xs={9} style={{ height: "100vh", overflowY: "auto" }}>
                            {formasDePago?.length === 0 && <p>No hay formas de pago definidas</p>}
                            {formasDePago?.length !== 0 && (
                                <>
                                    <Form className="px-5">
                                        {formasDePago.map((formaDePago, index) => (
                                            <>
                                                <Form.Check type="radio" id={`formaDePago-${index}`} className="pb-3" key={index}>
                                                    <Form.Check.Input type="radio" id={`opt-${index}`} name="forma de pago" onChange={e => handled_PuntoSeleccionado(formaDePago)} />
                                                    <Form.Check.Label for={`opt-${index}`}>{`${formaDePago.descripcion} : ${formaDePago.informacion_adicional}`}</Form.Check.Label>
                                                </Form.Check>
                                            </>
                                        ))}
                                    </Form>
                                </>
                            )}
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
                                {puntoDeEntregaSeleccionado && (
                                    <>
                                        <Card.Text>
                                            <strong>Punto de Entrega Seleccionado:</strong>
                                            <p className="mt-1">{puntoDeEntregaSeleccionado.puntoentrega}</p>
                                        </Card.Text>
                                    </>
                                )}
                            </Card.Body>
                            <Card.Footer>
                                {appState.loggedIn && seccion === "resumen" && (
                                    <>
                                        <Link onClick={handled_PuntoDeEntrega}>Continuar con el punto de entrega</Link>
                                        <br />
                                        <br />
                                    </>
                                )}

                                {seccion === "puntoDeEntrega" && (
                                    <>
                                        <Link onClick={handled_FormasDePago}>Continuar con la forma de pago</Link>
                                        <br />
                                        <br />
                                        <Link onClick={handled_RegresarAlCarrito}>Regresar al carrito</Link>
                                        <br />
                                    </>
                                )}

                                <Link to={"/Products"}>Seguir comprando</Link>

                                <br />
                            </Card.Footer>
                        </Card>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Carrito
