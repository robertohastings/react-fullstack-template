import React, { useContext, useEffect, useState } from "react"
import Axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"
import { TiDeleteOutline } from "react-icons/ti"
import { Container, Row, Col, Image, Card, Form, Modal, Button } from "react-bootstrap"
import { CartContext } from "../context/ShoppingCartContext"
import styles from "./Carrito.module.css"
import { useEmpresaID, useUsuarioID, useUsuarioData } from "../tools/StateUtils"
//import Header2 from "../LandingPages/Header2"

function Carrito() {
    
    const navigate = useNavigate()
    const [cart, setCart] = useContext(CartContext)
    const [isLoading, setIsLoaging] = useState(false)
    const [seccion, setSeccion] = useState("resumen")
    const [puntosDeEntrega, setPuntosDeEntrega] = useState([])
    const [puntoDeEntregaSeleccionado, setPuntoDeEntregaSeleccionado] = useState({})
    const [formasDePago, setFormasDePago] = useState([])
    const [formaDePagoSeleccionada, setFormaDePagoSeleccionada] = useState({})
    const [pedido, setPedido] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [isSavingPedido, setIsSavingPedido] = useState(false)
    const [isPedidoCreated, setIsPedidoCreated] = useState(false)
    const id_empresa = useEmpresaID()
    const id_usuario = useUsuarioID()
    const usuarioData = useUsuarioData()
    console.log('Usuario data:',usuarioData)

    const totalItems = cart.reduce((total, item) => total + parseInt(item.cantidad), 0)
    const totalPrice = cart.reduce((total, item) => total + item.cantidad * item.precio, 0)

    const appState = useContext(StateContext)
    console.log("appState:", appState)
    const appDispatch = useContext(DispatchContext)
    console.log('logged In?', appState.loggedIn)

    const eliminarProducto_handled = id_producto => {
        // setCart(currItems => {
        //     if (currItems.find(item => item.id_producto === id_producto)?.cantidad === 1) {
        //         return currItems.filter(item => item.id_producto !== id_producto)
        //     } else {
        //         return currItems.map(item => {
        //             if (item.id_producto === id_producto) {
        //                 return { ...item, cantidad: item.cantidad - 1 }
        //             } else {
        //                 return item
        //             }
        //         })
        //     }
        // })
        setCart(currItems => {
            // Simplemente filtramos el array para excluir el producto con el id_producto coincidente.
            return currItems.filter(item => item.id_producto !== id_producto);
        });        
    }
    const fetchPuntosDeEntrega = async () => {
        setIsLoaging(true)
        try {
            const response = await Axios.get("/api/getPuntosDeEntregaCarrito", {
                params: {
                    id_empresa,
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
                    id_empresa
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
        setSeccion("puntoDeEntrega")
        //setPuntoDeEntregaSeleccionado({})
        //setFormaDePagoSeleccionada({})
        await fetchPuntosDeEntrega()
    }

    const handled_FormasDePago = async () => {
        setSeccion("formasDePago")
        await fetchFormasDePago()
    }

    const handled_RegresarAlCarrito = () => {
        setSeccion("resumen")
        setPuntoDeEntregaSeleccionado({})
        setFormaDePagoSeleccionada({})
    }

    const handled_PuntoSeleccionado = puntoEntrega => {
        console.log("Punto entrega seleccionado", puntoEntrega)
        setPuntoDeEntregaSeleccionado(puntoEntrega)
    }

    const handled_FormaDePagoSeleccionada = formaDePago => {
        console.log("Forma de pago seleccionada", formaDePago)
        setFormaDePagoSeleccionada(formaDePago)
    }

    const handled_LoggedIn = () => {
        //alert("Click")
        //appDispatch({ type: "showLoggedIn", value: true })
        appDispatch({ type: "alertMessage", value: "ADVERTENCIA: Es necesario estar registrado para generar el pedido", typeAlert: "warning" })
        console.log("despueés del dispatch")
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handled_ConfirmarPedido = () => {
        console.log("Punto de Entrega Selecconado:", puntoDeEntregaSeleccionado)
        console.log("Forma de Pago Seleccionada:", formaDePagoSeleccionada)
        console.log("cart:", cart)
        setPedido({
            id_empresa,
            id_usuario,
            id_cliente: usuarioData.id_cliente,
            tipo_de_entrega: puntoDeEntregaSeleccionado.TipoDeEntrega,
            identidad_tipo_de_entrega: puntoDeEntregaSeleccionado.Identidad,
            id_forma_de_pago: formaDePagoSeleccionada.id_forma_de_pago,
            partidas_pedido: cart.map(item => ({
                id_producto: item.id_producto,
                cantidad: item.cantidad,
                precio: item.precio
            }))
        })
        setShowModal(true)
    }

    const handled_GenearPedido = () => {
        //setShowModal(false)
        console.log("Pedido:", pedido)
        handled_GenerarPedido()

        //DONE: hacer el postPedido
        //DONE: Mostrar un modal con el número de pedido generado
        //TODO: Redirigir a la pantalla de perfil despues de dar salir
        //TODO: Eliminar carrito de compras
        //TODO: Agregar en el menú usuarios/perfil => Pedidos, con el detalle del pedido.
    }
    const handled_GenerarPedido = async e => {
        setIsSavingPedido(true)
        console.log('Pedido:', pedido)

        // try {
        //     await Axios.post("/api/postPedido", pedido)
        //         .then(response => {
        //             setIsPedidoCreated(true)
        //             console.log(response)
        //             setCart([])
        //             navigate("/crm/perfil")
        //         })
        //         .catch(error => {
        //             console.log("There was an error updating pedido: ", error)
        //         })
        // } catch (error) {
        //     console.log("error:", error)
        // } finally {
        //     setIsSavingPedido(false)
        // }
    }
    const handled_CerrarModal = () => {
        setShowModal(false)

        // if (isPedidoCreated) {
        //TODO: Implementar el vaciado del carrito -> DONE!
        //TODO: Implementar el navigate a Admin/Perfil -> DONE!
        //TODO: AGREGAR el id_puntoDeEntrega en la creación del pedido.
        // }
    }

    return (
        <div className={styles.cartPage}>
            <Container>
                <h2 className={styles.pageTitle}>
                    {seccion === "resumen" ? "Carrito de Compras" : seccion === "puntoDeEntrega" ? "Selecciona el Punto de Entrega" : "Selecciona la Forma de Pago"}
                </h2>
                <Row>
                    <Col lg={8}>
                        {seccion === "resumen" && (
                            <>
                                {cart?.length === 0 ? (
                                    <div className={styles.emptyCartMessage}>Tu carrito está vacío.</div>
                                ) : (
                                    cart?.map(producto => (
                                        <div className={styles.cartItem} key={producto.id_producto}>
                                            <img src={producto.imagen} alt={producto.nombre} className={styles.itemImage} />
                                            <div className={styles.itemDetails}>
                                                <h5 className={styles.itemName}>{producto.nombre}</h5>
                                                <div className={styles.itemPrice}>${producto.precio}</div>
                                                <select className={styles.quantitySelector} value={producto.cantidad} onChange={e => actualizarCantidad(producto.id_producto, e.target.value)}>
                                                    {[...Array(10).keys()].map(i => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
                                                </select>
                                                <div className={styles.itemSubtotal}>${(producto.precio * producto.cantidad).toFixed(2)}</div>
                                            </div>
                                            <button className={styles.deleteButton} onClick={() => eliminarProducto_handled(producto.id_producto)} title="Eliminar producto">
                                                <TiDeleteOutline size={25} />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </>
                        )}

                        {seccion === "puntoDeEntrega" && (
                            <div className={styles.selectionSection}>
                                {puntosDeEntrega?.length === 0 ? <p>No hay puntos de entrega disponibles.</p> : (
                                    <Form>
                                        {puntosDeEntrega.map((punto, index) => (
                                            <Form.Check 
                                                key={index} 
                                                type="radio" 
                                                id={`punto-${index}`} 
                                                name="punto_entrega" 
                                                label={`${punto.TipoDeEntrega} en: ${punto.puntoentrega}`} 
                                                onChange={() => handled_PuntoSeleccionado(punto)} 
                                                checked={punto.Identidad === puntoDeEntregaSeleccionado.Identidad}
                                                className={styles.radioOption} />
                                        ))}
                                    </Form>
                                )}
                            </div>
                        )}

                        {seccion === "formasDePago" && (
                            <div className={styles.selectionSection}>
                                {formasDePago?.length === 0 ? <p>No hay formas de pago disponibles.</p> : (
                                    <Form>
                                        {formasDePago.map((forma, index) => (
                                            <Form.Check 
                                                key={index} 
                                                type="radio" 
                                                id={`pago-${index}`} 
                                                name="forma_pago" 
                                                label={forma.informacion_adicional ? `${forma.descripcion}: ${forma.informacion_adicional}` : forma.descripcion} 
                                                onChange={() => handled_FormaDePagoSeleccionada(forma)} 
                                                checked={forma.id_forma_de_pago === formaDePagoSeleccionada.id_forma_de_pago}
                                                className={styles.radioOption} />
                                        ))}
                                    </Form>
                                )}
                            </div>
                        )}
                    </Col>

                    <Col lg={4}>
                        <Card className={styles.summaryCard}>
                            <Card.Header as="h5" className={styles.cardHeader}>Resumen del Pedido</Card.Header>
                            <Card.Body>
                                <p><strong>Artículos:</strong> <span>{totalItems}</span></p>
                                {puntoDeEntregaSeleccionado.puntoentrega && <p><strong>Entrega:</strong> <span>{puntoDeEntregaSeleccionado.TipoDeEntrega}</span></p>}
                                {formaDePagoSeleccionada.id_forma_de_pago && <p><strong>Pago:</strong> <span>{formaDePagoSeleccionada.descripcion}</span></p>}
                                <p className={`${styles.totalPrice}`}>
                                    <strong className="pe-2">Total:</strong> 
                                    <span key={totalPrice} className={`${styles.totalPriceValue} animate-pop`}>${totalPrice.toFixed(2)}</span>
                                </p>
                            </Card.Body>
                            <Card.Footer>
                                {seccion === "resumen" && cart.length > 0 && <Button onClick={handled_PuntoDeEntrega}>Continuar con la Entrega</Button>}
                                {seccion === "puntoDeEntrega" && puntoDeEntregaSeleccionado.puntoentrega && 
                                    <>
                                        <Button className="mt-2" onClick={handled_FormasDePago}>Continuar con el Pago</Button>
                                        <br/>
                                    </>
                                }
                                {seccion === "formasDePago" && formaDePagoSeleccionada.id_forma_de_pago && 
                                    <Button className="mt-2" onClick={appState.loggedIn ? handled_ConfirmarPedido : handled_LoggedIn}>Generar Pedido
                                    </Button>
                                }
                                
                                <br/>
                                {seccion === "puntoDeEntrega" && 
                                <>
                                    
                                    <a className={styles.summaryLink} onClick={handled_RegresarAlCarrito}>Regresar al Carrito</a>
                                    <br/>

                                </>
                                }
                                <br/>
                                {seccion === "formasDePago" && 
                                    <>  
                                        <a className={styles.summaryLink} onClick={handled_PuntoDeEntrega}>Regresar a Puntos de Entrega</a>
                                        <br/>
                                    </>
                                }

                                <br/>
                                <Link to="/crm/products" className={styles.summaryLink}>Seguir comprando</Link>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Modal size="sm" show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false} centered>
                <Modal.Body><p className="text-center fs-5 p-2 m-0">{isPedidoCreated ? "Pedido Generado" : "¿Desea generar el pedido?"}</p></Modal.Body>
                <Modal.Footer>
                    {!isPedidoCreated && <Button variant="warning" onClick={handled_GenerarPedido}>{isSavingPedido ? "Generando..." : "Sí"}</Button>}
                    <Button variant="primary" onClick={handled_CerrarModal}>{isPedidoCreated ? "Salir" : "Regresar"}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Carrito
