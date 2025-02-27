import React, { useState, useEffect, useRef } from "react"
import Page from "../../Page"
import { Row, Col, Modal, Button, Offcanvas, Form } from "react-bootstrap"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import Axios from "axios"

function Agenda() {
    const [date, setDate] = useState(new Date())
    const [agenda, setAgenda] = useState([])
    const [cita, setCita] = useState([])
    const [celularABuscar, setCelulaABuscar] = useState("")
    const [nombre, setNombre] = useState([])
    const [showPanel, setShowPanel] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const telefonoRef = useRef(null)
    const [isFetching, setIsFetching] = useState(false)
    const [isNewRecord, setIsNewRecord] = useState(false)

    const onChange = date => {
        setDate(date)
        ObtenerAgenda()
    }

    const ObtenerAgenda = async () => {
        await Axios.get("/api/getAgendaPorDia", {
            params: {
                id_empresa: 1,
                fecha: date.toLocaleDateString("en-CA", { year: "numeric", month: "2-digit", day: "2-digit" })
            }
        })
            .then(response => {
                setAgenda(response.data.agenda)
                console.log("ObtenerAgenda ->", response.data.agenda)
            })
            .catch(error => {
                setAgenda({})
                console.log("There was an error ObtenerAgenda->", error)
            })
    }

    useEffect(() => {
        ObtenerAgenda()
    }, [])

    const handledRowClick = cita => {
        setCelulaABuscar('')
        console.log("celular a buscar =>", celularABuscar)
        console.log("nombds a buscar =>", cita.Nombre === ' ' ? 'No hay nombre' : cita.Nombre)
        if (cita.Nombre === ' ') {
            setIsNewRecord(true)
        }
        setCita(cita)
        //setCita({})
        setShowPanel(true)
        setTimeout(() => {
            telefonoRef.current.focus()
        }, 100)
    }

    const handledPanelClose = () => {
        setShowPanel(false)
    }
    const handledBuscarCliente = async celular => {
        // alert(`Celular a buscar: ${celular}`)
        setIsFetching(true)
        try {
            const response = await Axios.get("/api/getClientePorTelefonoOCelular", {
                params: {
                    id_empresa: 1,
                    telefono: celular
                }
            })
            const data = response.data.cliente[0].nombre_cliente
            //setNombre(data.cliente.nombre_cliente)
            setCita(prevCita => ({ ...prevCita, Nombre: data }))
            setCita(prevCita => ({ ...prevCita, Celular: celular }))
            //setCita(prevCita => ({ ...prevCita, Estatus: cita.Estatus === "Disponible" ? "Reservada" : cita.Estatus }))

            console.log("Cliente encontrado ->", data)
        } catch (error) {
            console.log("There was an error handledBuscarCliente->", error)
        }
        setIsFetching(false)
    }

    const handled_Guardar = e => {
        e.preventDefault()
        setShowPanel(false)
        setIsNewRecord(false)

        setCita(prevCita => ({ ...prevCita, Estatus: 'Reservada' }))
        // Añadir la cita actual al estado de agenda
        setAgenda(prevAgenda => {
            // Verificar si la cita ya existe en la agenda
            const citaExistente = prevAgenda.find(item => item.intervalo === cita.intervalo)
            if (citaExistente) {
                console.log('existente')
                // Actualizar la cita existente
                //setCita(prevCita => ({ ...prevCita, Estatus: 'Reservada' }))
                
                return prevAgenda.map(item => (item.intervalo === cita.intervalo ? cita : item))
            } else {
                console.log('nueva')
                // Añadir una nueva cita
                
                return [...prevAgenda, cita]
            }
        })        
        //alert("Cambios guardado")
    }

    return (
        <Page title="Agenda" fluid={true}>
            <h3>Agenda</h3>
            <Row className="pt-5 d-flex justify-content-center">
                <Col md={4}>
                    <Calendar
                        value={date}
                        onChange={onChange}
                        minDate={new Date()} // Muestra solo los días disponibles desde hoy
                        disabled={isFetching}
                    />
                    <p className="pt-3 text-center">Fecha seleccionada: {date.toLocaleDateString()}</p>
                </Col>
                <Col md={8}>
                    <Row className="fw-bold text-center">
                        {" "}
                        {/* Usa fw-bold para resaltar los encabezados */}
                        <Col className="col-3">Horario</Col>
                        <Col className="col-5">Nombre</Col>
                        <Col className="col-2">Celular</Col>
                        <Col className="col-2">Estatus</Col>
                    </Row>
                    {agenda.length > 0 ? (
                        agenda.map((cita, index) => (
                            <Row className="text-center" key={index} style={{ borderBottom: "1px solid #dee2e6" }}>
                                <Col className="col-3" style={{ cursor: "pointer" }} onClick={() => handledRowClick(cita)}>
                                    {cita.intervalo}
                                </Col>
                                <Col className="col-5">{cita.Nombre}</Col>
                                <Col className="col-2">{cita.Celular}</Col>
                                <Col className="col-2" style={{ cursor: "pointer" }}>
                                    {cita.Estatus}
                                </Col>
                            </Row>
                        ))
                    ) : (
                        <p>No hay citas para esta fecha.</p>
                    )}
                </Col>
            </Row>

            <div>
                <Offcanvas show={showPanel} onHide={handledPanelClose} placement="end">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Agendar cita: {cita.intervalo}</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {/* Captura de cita */}
                        <Form className="px-2 border rounded pt-3" onSubmit={handled_Guardar}>
                            <Form.Group className="mb-3" id="formHorario">
                                <Form.Label>Horario:</Form.Label>
                                <Form.Control type="text" id="horario" name="horario" placeholder="confirme el horario de la cita" defaultValue={cita.intervalo} />
                                {/* <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text> */}
                            </Form.Group>
                            {/* telefono */}
                            <Form.Group as={Row} className="mb-3" id="formTelefono">
                                <Col md={9}>
                                    <Form.Label>Teléfono:</Form.Label>
                                    <Form.Control 
                                        ref={telefonoRef} 
                                        type="text"
                                        pattern="\d*" 
                                        inputMode="numeric"
                                        id="telefono" 
                                        name="telefono" 
                                        placeholder="escriba el número de contacto del cliente" 
                                        defaultValue={cita.Celular} 
                                        onChange={e => setCelulaABuscar(e.target.value)} 
                                        autoComplete="off"                                         
                                        onKeyDown={(e) => {
                                            if (!/[0-9]/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        />
                                </Col>
                                <Col md={3} className="d-flex align-items-end mb-1">
                                    <Button variant="primary" size="sm" onClick={() => handledBuscarCliente(celularABuscar)} title="Presione aquí para buscar el cliente por número de teléfono" disabled={isFetching}>
                                        Buscar
                                    </Button>
                                </Col>
                            </Form.Group>
                            {/* Nombre */}
                            <Form.Group className="mb-3" id="formNombre">
                                <Form.Label>Nombre:</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    id="nombre" 
                                    name="nombre" 
                                    placeholder="escriba el nombre del cliente" 
                                    value={cita.Nombre} 
                                    autoComplete="off" 
                                    onChange={(e) => setCita(prevCita => ({ ...prevCita, Nombre: e.target.value }))}                                    
                                    />
                                {/* <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text> */}
                            </Form.Group>
                            {/* Botones */}
                            <Form.Group className="my-4 d-flex justify-content-between">
                                <Button 
                                    type="submit" 
                                    variant="success" 
                                    size="sm" 
                                    title="Presione aquí para guardar los cambios" 
                                    disabled={celularABuscar === "" || cita.Nombre === ' '}>
                                    Guardar
                                </Button>
                                <Button variant="secondary" size="sm" title="Presione aquí para regresar"
                                    onClick={handledPanelClose}
                                >
                                    Regresar
                                </Button>
                                {!isNewRecord && (
                                    <>
                                        <Button variant="warning" size="sm" title="Presione aquí para reprogramar la cita">
                                            Reprogramar cita
                                        </Button>

                                        <Button variant="info" size="sm" title="Presione aquí para enviar un recordatorio">
                                            Recordatorio
                                        </Button>
                                    
                                        <Button variant="primary" size="sm" title="Presione aquí para confirmar la cita"
                                            onClick={() => alert("Cita confirmada")}
                                        >
                                            Confirmar cita
                                        </Button>
                                        <Button variant="danger" size="sm" title="Presione aquí para cancelar la cita"
                                            onClick={() => alert("Cita cancelada")}
                                        >
                                            Cancelar cita
                                        </Button>                                   
                                    </>
                                )}
                            </Form.Group>
                        </Form>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>

            <div>
                <Modal show={showModal} onHide={() => setShowModal(false)} animation={false} centered scrollable={true}>
                    <Modal.Header closeButton={false}>
                        <Modal.Title>Tarea Completada. 01/07/2024</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => {}}>
                            Eliminar
                        </Button>
                        <Button variant="secondary" onClick={() => {}}>
                            Marcar como leído
                        </Button>
                        <Button variant="primary" onClick={() => setShowModal(false)}>
                            Regresar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </Page>
    )
}

export default Agenda
