import "./PedidoCanvas.css"
import React, { useState, useEffect } from "react"
//import Page from "../../Page"
import Axios from "axios"
//import SpinnerButton from "../../Spinner/SpinnerButton"
import { Card, Col, Container, Row, Button, Modal, Table, Image } from "react-bootstrap"
import { useDrag, useDrop, DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { FaSearch } from "react-icons/fa"
import { GrNext } from "react-icons/gr"

const ItemType = "PEDIDO"

const Pedido = ({ pedido, movePedido, setPedidoStatus }) => {
    const [showModal, setShowModal] = useState(false)
    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: { id: pedido.id_pedido },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })

    const handleCloseModal = () => {
        setShowModal(false)
    }

    // Create our number formatter.
    const formatter = new Intl.NumberFormat("en-MX", {
        style: "currency",
        currency: "MXN"
    })

    const handled_NextEstatus = (id_pedido, current_estatus) => {
        var next_estatus = ""
        if (current_estatus === "Recibido") {
            next_estatus = "En proceso"
        } else if (current_estatus === "En proceso") {
            next_estatus = "Terminado"
        } else if (current_estatus === "Terminado") {
            next_estatus = "En camino"
        } else if (current_estatus === "En camino") {
            next_estatus = "Entregado"
        }
        setPedidoStatus(id_pedido, next_estatus)

        //alert(`#Pedido: ${id_pedido}, estatus actual: ${current_estatus}, siguiente estatus: ${next_estatus}`)
    }

    return (
        <>
            <Card ref={drag} className="mb-2 pedido-item" style={{ opacity: isDragging ? 0.5 : 1 }}>
                <Card.Body>
                    <Card.Title className="text-center"># Pedido: {pedido.id_pedido}</Card.Title>
                    <Card.Text>
                        <p className="fs-6 text-center" title="Lugar de Entrega">
                            {pedido.lugarDeEntrega}
                        </p>
                        <p className="text-center" title="Total pedido y cantidad de piezas">{`$${pedido.total} ( ${pedido.totalPiezas} )`}</p>
                        <p className="fs-6 text-center" title="Hora de recepción del pedido">
                            Hora
                        </p>
                        <p className="fs-6 text-center" title="Tiempo transcurrido">
                            T.Trans
                        </p>
                    </Card.Text>
                    <div className="d-flex gap-4 justify-content-between ">
                        <Button variant="btn btn-outline-primary btn-sm" style={{ width: "60px" }} onClick={() => setShowModal(true)}>
                            <FaSearch />
                        </Button>
                        <Button variant="btn btn-outline-primary btn-sm" style={{ width: "60px" }} onClick={() => handled_NextEstatus(pedido.id_pedido, pedido.estatus_pedido)}>
                            <GrNext />
                        </Button>
                    </div>
                </Card.Body>
            </Card>
            {/* Modal que muestra el contenido del pedido */}
            <div>
                <Modal size="xl" show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false} centered>
                    <Modal.Title>
                        <div className="m-3">
                            <Table striped bordered hover>
                                <thead className="fs-6">
                                    <tr>
                                        <th># Pedido</th>
                                        <th>Fecha</th>
                                        <th>Estatus</th>
                                        <th>Forma de Pago</th>
                                        <th>Lugar de Entrega</th>
                                        <th className="text-end">Saldo</th>
                                        <th className="text-end">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="fs-6">
                                    <tr key={`tr_${pedido.id_pedido}`}>
                                        <td className="align-content-center text-center">{pedido.id_pedido}</td>
                                        <td className="align-content-center">{pedido.fecha_creacion}</td>
                                        <td>{pedido.estatus_pedido}</td>
                                        <td>{pedido.formaDePago}</td>
                                        <td>{pedido.lugarDeEntrega}</td>
                                        <td className="text-end">{formatter.format(pedido.Saldo)}</td>
                                        <td className="text-end">{formatter.format(pedido.total)}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Modal.Title>
                    <Modal.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Pod. ID #</th>
                                    <th></th>
                                    <th>Descripción #</th>
                                    <th className="text-end">Cantidad</th>
                                    <th className="text-end">Precio</th>
                                    <th className="text-end">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {JSON.parse(pedido.detalle_pedido).map((partida, index) => (
                                    <tr key={`detPedKey_${index}`}>
                                        <td className="align-content-center text-center" style={{ width: "100px" }}>
                                            {partida.id_producto}
                                        </td>
                                        <td className="align-content-center text-center" style={{ width: "125px" }}>
                                            <Image src={partida.imagen} style={{ width: "120px", height: "80px" }} />
                                        </td>
                                        <td className="align-content-center">{partida.producto}</td>
                                        <td className="align-content-center text-end" style={{ width: "100px" }}>
                                            {partida.cantidad}
                                        </td>
                                        <td className="align-content-center text-end" style={{ width: "100px" }}>
                                            {formatter.format(partida.precio)}
                                        </td>
                                        <td className="align-content-center text-end" style={{ width: "100px" }}>
                                            {formatter.format(partida.subtotal)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            {/* <Button variant="primary" className="mt-3">
                                Voler a Pedir
                            </Button> */}
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        {/* {!isPedidoCreated && (
                                <Button variant="warning" onClick={handled_GenearPedido}>
                                    {isSavingPedido && "Generando pedido..."}
                                    {!isSavingPedido && "Si"}
                                </Button>
                            )} */}
                        <Button type="button" variant="primary" onClick={() => setShowModal(false)}>
                            Regresar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

const EstatusColumn = ({ estatus, pedidos, movePedido, setPedidoStatus }) => {
    const [, drop] = useDrop({
        accept: ItemType,
        drop: item => setPedidoStatus(item.id, estatus)
    })

    return (
        <Col ref={drop} className="column">
            <div className="sticky-header">
                <h5 className="text-center">{estatus}</h5>
            </div>

            <div className="pedido-list scrollable">
                {pedidos.map(pedido => (
                    <Pedido key={pedido.id_pedido} pedido={pedido} movePedido={movePedido} setPedidoStatus={setPedidoStatus} />
                ))}
            </div>
        </Col>
    )
}

function PedidoCanvas() {
    const [pedidos, setPedidos] = useState([])

    useEffect(() => {
        fetchMisPedidos()
    }, [])

    const fetchMisPedidos = async () => {
        //setIsLoaging(true)

        try {
            const response = await Axios.get("/api/getPedidoCanvas", {
                params: {
                    id_empresa: 1,
                    id_usuario: 1
                }
            })
            console.log("response pedido canvas:", response.data.pedidos)
            setPedidos(response.data.pedidos)
        } catch (error) {
            console.error("There was an error fetching the pedidos!", error)
        } finally {
            //setIsLoaging(false)
        }
    }

    const setPedidoStatus = async (id_pedido, newStatus) => {
        //alert(`Actualiza estatus pedido No: ${id_pedido} a: ${newStatus}`)

        var next_id_pedido_estatus = 0
        if (newStatus === "Recibido") {
            next_id_pedido_estatus = 1
        } else if (newStatus === "En Proceso") {
            next_id_pedido_estatus = 2
        } else if (newStatus === "Terminado") {
            next_id_pedido_estatus = 3
        } else if (newStatus === "En Camino") {
            next_id_pedido_estatus = 4
        } else if (newStatus === "Entregado") {
            next_id_pedido_estatus = 5
        }
        console.log(`Actualiza estatus pedido No: ${id_pedido} a: ${newStatus} id_estatus_pedid: ${next_id_pedido_estatus}`)

        try {
            await Axios.put("/api/putPedidoEstatus", { id_empresa: 1, id_pedido: id_pedido, id_pedido_estatus: next_id_pedido_estatus })
                .then(response => {
                    //console.log(response)
                    //setPedidos(prevPedidos => prevPedidos.map(pedido => (pedido.id_pedido === id_pedido ? { ...pedido, estatus_pedido: newStatus } : pedido)))
                    fetchMisPedidos()
                })
                .catch(error => {
                    console.log("There was an error updating pedido: ", error)
                })
        } catch (error) {
            console.log("error:", error)
        } finally {
        }

        // //Actualizar estatus del pedido en el backend
        // Axios.put(`/api/putPedidoEstatus`, { id_empresa: 1, id_pedido: id_pedido, id_pedido_estatus: next_id_pedido_estatus }).then(() => {
        //     setPedidos(prevPedidos => prevPedidos.map(pedido => (pedido.id_pedido === id_pedido ? { ...pedido, status: newStatus } : pedido)))
        // })
    }

    const estatusColumns = ["Recibido", "En Proceso", "Terminado", "En Camino", "Entregado", "Cancelado"]

    return (
        <DndProvider backend={HTML5Backend}>
            <Container fluid>
                <Row>
                    {estatusColumns.map(estatus => (
                        <EstatusColumn key={estatus} estatus={estatus} pedidos={pedidos.filter(pedido => pedido.estatus_pedido === estatus)} setPedidoStatus={setPedidoStatus} />
                    ))}
                </Row>
            </Container>

            <></>
        </DndProvider>
        // <Page title="Pedidos Canvas">
        // </Page>
    )
}

export default PedidoCanvas
