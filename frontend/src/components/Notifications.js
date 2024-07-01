import React, { useContext, useState } from "react"
import { Offcanvas, Table, Modal, Button } from "react-bootstrap"
import DispatchContext from "../DispatchContext"

function Notifications(props) {
    const appDispatch = useContext(DispatchContext)
    const [showNotification, setShowNotification] = useState(false)

    const handledClose = () => {
        appDispatch({ type: "notifications", value: false })
    }

    const handleRowClick = () => {
        //alert("Rowc clicked")
        setShowNotification(true)
    }

    return (
        <>
            <div>
                <Offcanvas show={props.show} onHide={handledClose} placement="end">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Notificaciones</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Fecha</th>
                                    <th>Título</th>
                                    <th>Estatus</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr onClick={handleRowClick} style={{ cursor: "pointer" }}>
                                    <td>1</td>
                                    <td>01/07/2024</td>
                                    <td>Tarea completada</td>
                                    <td>Sin Leer</td>
                                </tr>
                                <tr onClick={handleRowClick} style={{ cursor: "pointer" }}>
                                    <td>2</td>
                                    <td>01/07/2024</td>
                                    <td>Pedido enviado</td>
                                    <td>Sin Leer</td>
                                </tr>
                                <tr onClick={handleRowClick} style={{ cursor: "pointer" }}>
                                    <td>3</td>
                                    <td>01/07/2024</td>
                                    <td>Pedido Recibido</td>
                                    <td>Sin Leer</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>

            <div>
                <Modal show={showNotification} onHide={() => setShowNotification(false)} animation={false} centered scrollable={true}>
                    <Modal.Header closeButton={false}>
                        <Modal.Title>Tarea Completada. 01/07/2024</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => setShowNotification(false)}>
                            Eliminar
                        </Button>
                        <Button variant="secondary" onClick={() => setShowNotification(false)}>
                            Marcar como leído
                        </Button>
                        <Button variant="primary" onClick={() => setShowNotification(false)}>
                            Regresar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default Notifications
