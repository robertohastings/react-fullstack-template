import React, { useContext, useEffect, useState } from "react"
import Page from "./Page"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"
import { TiDeleteOutline } from "react-icons/ti"
import { Card, ListGroup, Row, Col } from "react-bootstrap"

function Carrito() {
    const appState = useContext(StateContext)
    const appDispatch = useContext(DispatchContext)
    const [carrito, setCarrito] = useState(JSON.parse(localStorage.getItem("carrito")) ?? {})

    useEffect(() => {
        function checkCarrito() {
            setCarrito(appState.carrito)
        }
        checkCarrito()
    }, [appState.carrito])

    const eliminarProducto_handled = id_producto => {
        //console.log("id_producto", id_producto)
        appDispatch({ type: "alertMessage", value: "Producto ha sido eliminado", typeAlert: "success" })
        appDispatch({ type: "eliminarProducto", value: id_producto })
        //setCarrito(JSON.parse(localStorage.getItem("carrito")) ?? {})
    }

    return (
        <Page title="Carrito">
            <h4 className="pb-4">Carrito de Compras</h4>
            <div className="d-flex">
                {/* {carrito.map(producto => {
                    return <p>{producto.id_producto}</p>
                })} */}

                <div className="w-75">
                    {carrito?.length === 0
                        ? "No hay productos en el carrito"
                        : carrito?.map(producto => (
                              <div className="row pb-3" key={producto.id_producto}>
                                  <div className="col">
                                      <Card style={{ width: "50%" }}>
                                          <div className="d-flex justify-content-center">
                                              <Card.Img variant="top" src={producto.imagen} style={{ width: "100%", height: "150px" }} />
                                          </div>
                                          <Card.Body>
                                              <Card.Title>{producto.nombre}</Card.Title>
                                              {/* <Card.Text>{producto.descripcion}</Card.Text> */}
                                          </Card.Body>
                                          <ListGroup className="list-group-flush">
                                              <ListGroup.Item>
                                                  <Row>
                                                      <Col>Precio:</Col>
                                                      <Col>
                                                          $<span>{producto.precio}</span>
                                                      </Col>
                                                  </Row>
                                              </ListGroup.Item>
                                              <ListGroup.Item>
                                                  <Row className="d-flex">
                                                      <Col>Cantidad:</Col>
                                                      <Col>
                                                          <select value={producto.cantidad} onChange={() => {}}>
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
                                                  </Row>
                                              </ListGroup.Item>
                                          </ListGroup>
                                          <Card.Footer>
                                              <Row>
                                                  <Col>
                                                      <p>Subtotal:</p>
                                                  </Col>
                                                  <Col>
                                                      $<span>{producto.precio * producto.cantidad}</span>
                                                  </Col>
                                              </Row>
                                              <Row>
                                                  <Col className="d-flex justify-content-center">
                                                      <TiDeleteOutline size={25} onClick={() => eliminarProducto_handled(producto.id_producto)} title="Eliminar este producto del carrito" style={{ cursor: "pointer" }} />
                                                  </Col>
                                              </Row>
                                          </Card.Footer>
                                      </Card>
                                  </div>
                              </div>
                          ))}
                </div>

                <div className="ticky-top">
                    <h3>Resumen del Pedido</h3>
                </div>
            </div>
        </Page>
    )
}

export default Carrito
