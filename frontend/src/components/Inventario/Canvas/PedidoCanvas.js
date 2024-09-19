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

const Pedido = ({ pedido, movePedido }) => {
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
                        <Button variant="btn btn-outline-primary btn-sm" style={{ width: "60px" }}>
                            <GrNext />
                        </Button>
                    </div>
                </Card.Body>
            </Card>
            {/* Modal que muestra el contenido del pedido */}
            <div>
                <Modal size="xl" show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false} centered>
                    <Modal.Title>
                        {/* <p className="p-3">{`# Pedido: ${pedido.id_pedido}`}</p> */}
                        <Table striped bordered hover>
                            <thead className="fs-6">
                                <tr>
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
                                    <td className="align-content-center">{pedido.fecha_creacion}</td>
                                    <td>{pedido.estatus_pedido}</td>
                                    <td>{pedido.formaDePago}</td>
                                    <td>{pedido.lugarDeEntrega}</td>
                                    <td className="text-end">{formatter.format(pedido.Saldo)}</td>
                                    <td className="text-end">{formatter.format(pedido.total)}</td>
                                </tr>
                            </tbody>
                        </Table>
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
        drop: item => setPedidoStatus(item.id_pedido, estatus)
    })

    return (
        <Col ref={drop} className="column">
            <div className="sticky-header">
                <h5 className="text-center">{estatus}</h5>
            </div>

            <div className="pedido-list scrollable">
                {pedidos.map(pedido => (
                    <Pedido key={pedido.id_pedido} pedido={pedido} movePedido={movePedido} />
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

    const setPedidoStatus = (id, newStatus) => {
        alert("Actualiza estatus pedido")
        // Actualizar estatus del pedido en el backend
        // Axios
        //   .put(`/api/pedidos/${id}/putActualizaPedidoEstatus`, { status: newStatus })
        //   .then(() => {
        //     setPedidos((prevPedidos) =>
        //       prevPedidos.map((pedido) =>
        //         pedido.id === id ? { ...pedido, status: newStatus } : pedido
        //       )
        //     );
        //   });
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
