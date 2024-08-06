import React, { useContext, useEffect, useState } from "react"
import Page from "./Page"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"
import { TiDeleteOutline } from "react-icons/ti"
import { Container, Row, Col, Image, Card } from "react-bootstrap"
import { CartContext } from "../context/ShoppingCartContext"

function Carrito() {
    const [cart, setCart] = useContext(CartContext)

    const totalItems = cart.reduce((total, item) => total + parseInt(item.cantidad), 0)
    const totalPrice = cart.reduce((total, item) => total + item.cantidad * item.precio, 0)

    const appState = useContext(StateContext)
    const appDispatch = useContext(DispatchContext)
    const [carrito, setCarrito] = useState(JSON.parse(localStorage.getItem("carrito")) ?? {})

    // useEffect(() => {
    //     function checkCarrito() {
    //         setCarrito(JSON.parse(localStorage.getItem("carrito")))
    //     }
    //     checkCarrito()
    // }, [appState.carrito])

    const eliminarProducto_handled = id_producto => {
        // console.log("Producto a eliminar:", id_producto)
        // appDispatch({ type: "alertMessage", value: "Producto ha sido eliminado", typeAlert: "success" })
        // appDispatch({ type: "eliminarProducto", value: id_producto })
        //setCarrito(JSON.parse(localStorage.getItem("carrito")) ?? {})

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

    const actualizarCantidad = (id_producto, cantidad) => {
        //const id_producto = producto.id_producto
        //const cantidad = producto.cantidad
        //console.log("producto:", id_producto, " cantidad:", cantidad)

        setCart(currItems => {
            return currItems.map(item => {
                if (item.id_producto === id_producto) {
                    //console.log("lo encontré")
                    return { ...item, cantidad: cantidad }
                } else {
                    //console.log("no lo encontré")
                    return item
                }
            })
        })
    }

    return (
        <Container fluid>
            <h4 className="pb-4">Carrito de Compras</h4>
            <Row>
                <Col xs={9} style={{ height: "100vh", overflowY: "auto" }}>
                    {cart?.length === 0
                        ? "No hay productos en el carrito"
                        : cart?.map(producto => (
                              <div className="pb-3" key={producto.id_producto}>
                                  <Row>
                                      <Col xs={3}>
                                          <Image src={producto.imagen} style={{ width: "200px", height: "150px" }} />
                                      </Col>
                                      <Col xs={9} className="d-flex align-items-center">
                                          <Row>
                                              <Col xs={4}>
                                                  <h4>{producto.nombre}</h4>
                                              </Col>
                                              <Col xs={2}>Precio: ${producto.precio}</Col>
                                              <Col xs={2}>
                                                  Cantidad:
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
                                                  <p>
                                                      Subtotal: $<span>{producto.precio * producto.cantidad}</span>
                                                  </p>
                                              </Col>
                                              <Col xs={2} className="d-flex justify-content-center align-items-center">
                                                  <TiDeleteOutline size={25} onClick={() => eliminarProducto_handled(producto.id_producto)} title="Eliminar este producto del carrito" style={{ cursor: "pointer" }} />
                                              </Col>
                                          </Row>
                                      </Col>
                                  </Row>
                                  <hr />
                              </div>
                          ))}
                </Col>
                <Col xs={3}>
                    <div className="position-sticky" style={{ top: 70 }}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Resumen del Carrito</Card.Title>
                                <Card.Text className="pt-3">
                                    <strong>Cantidad de artículos:</strong> {totalItems}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Total a pagar:</strong> ${totalPrice.toFixed(2)}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Carrito
