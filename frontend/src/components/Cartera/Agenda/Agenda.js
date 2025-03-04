import React, { useState, useEffect, useRef, useContext } from "react"
import Page from "../../Page"
import { Row, Col, Modal, Button, Offcanvas, Form } from "react-bootstrap"
//import Calendar from "react-calendar"
//import "react-calendar/dist/Calendar.css"
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { es } from "date-fns/locale"
import Axios from "axios"
import { BsSave, BsBackspace, BsCalendar4Event, BsCheck, BsSend, BsEraser, BsSearch } from "react-icons/bs"
import DispatchContext from "../../../DispatchContext"

// Registra la localización en español
registerLocale("es", es)

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
    const appDispatch = useContext(DispatchContext)

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
                console.log(`There was an error ObtenerAgenda -> Status: ${error.response.status} statusText: ${error.response.statusText} Error: ${error.response.data.error}`)
            })
    }

    useEffect(() => {
        ObtenerAgenda()
    }, [])

    const handledRowClick = cita => {
        setCelulaABuscar("")
        console.log("cita seleccionada: =>", cita)
        console.log("celular a buscar =>", celularABuscar)
        console.log("nombds a buscar =>", cita.Nombre === " " ? "No hay nombre" : cita.Nombre)
        if (cita.Nombre === " ") {
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

    const handled_Cancelar = () => {
        let nuevaCita = { ...cita }
        nuevaCita = { ...nuevaCita, Estatus: "Disponible", Celular: "", Nombre: "" }
        // Añadir la cita actual al estado de agenda
        setAgenda(prevAgenda => {
            // Verificar si la cita ya existe en la agenda
            const citaExistente = prevAgenda.find(item => item.intervalo === cita.intervalo)
            if (citaExistente) {
                // Actualizar la cita existente
                return prevAgenda.map(item => (item.intervalo === nuevaCita.intervalo ? nuevaCita : item))
            } else {
                console.log("nueva")
                // Añadir una nueva cita
                return [...prevAgenda, nuevaCita]
            }
        })

        setShowPanel(false)
        setIsNewRecord(false)
    }

    const handled_Confirmar = () => {
        let nuevaCita = { ...cita }
        nuevaCita = { ...nuevaCita, Estatus: "Confirmada" }
        // Añadir la cita actual al estado de agenda
        setAgenda(prevAgenda => {
            // Verificar si la cita ya existe en la agenda
            const citaExistente = prevAgenda.find(item => item.intervalo === cita.intervalo)
            if (citaExistente) {
                // Actualizar la cita existente
                return prevAgenda.map(item => (item.intervalo === nuevaCita.intervalo ? nuevaCita : item))
            } else {
                console.log("nueva")
                // Añadir una nueva cita
                return [...prevAgenda, nuevaCita]
            }
        })

        setShowPanel(false)
        setIsNewRecord(false)
    }

    const handled_Guardar = async e => {
        e.preventDefault()

        console.log("cita a guardar =>", cita)

        // Cambiar el estatus a 'Reservado' si es un nuevo registro
        // let nuevaCita = { ...cita }
        // if (isNewRecord) {
        //     nuevaCita = { ...nuevaCita, Estatus: "Reservada" }
        // }

        if (cita.id_agenda === 0) {
            // Datos para el POST
            const postData = {
                id_empresa: 1,
                fecha: date.toLocaleDateString("en-CA", { year: "numeric", month: "2-digit", day: "2-digit" }),
                intervalo: cita.intervalo,
                id_cliente: cita.id_cliente
            }
            console.log('postData ->', postData)

            try {
                // Hacer el POST al endpoint
                try {
                    await Axios.post("/api/postAgenda", postData)
                        .then(response => {
                            console.log("POST response ->", response)

                            appDispatch({
                                type: "alertMessage",
                                value: `${response.data.message}. Folio confirmación: ${response.data.folio_confirmacion}`,
                                typeAlert: "success"
                            })

                            // Si el POST es satisfactorio, continuar con la actualización de la agenda
                            // Añadir la cita actual al estado de agenda
                            // setAgenda(prevAgenda => {
                            //     // Verificar si la cita ya existe en la agenda
                            //     const citaExistente = prevAgenda.find(item => item.intervalo === cita.intervalo)
                            //     if (citaExistente) {
                            //         console.log("existente")
                            //         // Actualizar la cita existente
                            //         return prevAgenda.map(item => (item.intervalo === nuevaCita.intervalo ? nuevaCita : item))

                            //         //return prevAgenda.map(item => (item.intervalo === cita.intervalo ? cita : item))
                            //     } else {
                            //         console.log("nueva")
                            //         // Añadir una nueva cita
                            //         return [...prevAgenda, nuevaCita]
                            //         //return [...prevAgenda, cita]
                            //     }
                            // })
                        })
                        .catch(error => {
                            console.log("There was an error updating agenda: ", error)
                        })
                } catch (error) {
                    console.log("error:", error)
                } finally {
                    //console.log("finally")
                }
            } catch (error) {
                console.log("There was an error with the POST request ->", error)
                // Manejar el error según sea necesario
            }
        } else {
            // Datos para el PUT
            const putData = {
                id_empresa: 1,
                id_agenda: cita.id_agenda,
                intervalo: cita.intervalo,
                id_cliente: cita.id_cliente,
                nombre: cita.Nombre
            }

            try {
                // Hacer el PUT al endpoint
                try {
                    await Axios.put("/api/putAgenda", putData)
                        .then(response => {
                            console.log("POST response ->", response)

                            appDispatch({
                                type: "alertMessage",
                                value: `Cita actualizada...`,
                                typeAlert: "success"
                            })
                        })
                        .catch(error => {
                            console.log("There was an error updating agenda: ", error)
                        })
                } catch (error) {
                    console.log("error:", error)
                } finally {
                }
            } catch (error) {
                console.log("There was an error with the POST request ->", error)
            }

            console.log("guardando datos ->", putData)
        }

        setShowPanel(false)
        setIsNewRecord(false)
        await ObtenerAgenda()
    }

    return (
        <Page title="Agenda" fluid={true}>
            <h3>Agenda</h3>
            <Row className="pt-2 d-flex justify-content-center">
                <Col md={12} className="text-center mb-5">
                    {/* <Calendar
                        value={date}
                        onChange={onChange}
                        minDate={new Date()} // Muestra solo los días disponibles desde hoy
                        disabled={isFetching}
                    /> */}
                    <DatePicker
                        selected={date}
                        onChange={onChange}
                        //minDate={new Date()}
                        dateFormat="dd/MM/yyyy"
                        className="form-control text-center"
                        disabled={isFetching}
                        locale="es"
                    />                    
                    {/* <p className="pt-3 text-center">Fecha seleccionada: {date.toLocaleDateString()}</p> */}
                </Col>
                <Col md={12}>
                    <Row className="fw-bold text-center">
                        {" "}
                        {/* Usa fw-bold para resaltar los encabezados */}
                        <Col className="col-3">Horario</Col>
                        <Col className="col-4">Nombre</Col>
                        <Col className="col-2">Celular</Col>
                        <Col className="col-1">Estatus</Col>
                        <Col className="col-1">Clave</Col>
                        <Col className="col-1">Id</Col>
                    </Row>
                    {agenda.length > 0 ? (
                        agenda.map((cita, index) => (
                            <Row className="text-center" key={index} style={{ borderBottom: "1px solid #dee2e6" }}>
                                <Col className="col-3" style={{ cursor: "pointer" }} onClick={() => handledRowClick(cita)}>
                                    {cita.intervalo}
                                </Col>
                                <Col className="col-4">{cita.Nombre}</Col>
                                <Col className="col-2">{cita.Celular}</Col>
                                <Col className="col-1" style={{ cursor: "pointer" }}>
                                    {cita.Estatus}
                                </Col>
                                <Col className="col-1">{cita.clave_confirmacion}</Col>
                                <Col className="col-1">{cita.id_agenda}</Col>
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
                                        onKeyDown={e => {
                                            if (!/[0-9]/.test(e.key)) {
                                                e.preventDefault()
                                            }
                                        }}
                                    />
                                </Col>
                                <Col md={3} className="d-flex align-items-end mb-1">
                                    <Button variant="primary" size="sm" onClick={() => handledBuscarCliente(celularABuscar)} title="Presione aquí para buscar el cliente por número de teléfono" disabled={isFetching}>
                                        <BsSearch /> Buscar
                                    </Button>
                                </Col>
                            </Form.Group>
                            {/* Nombre */}
                            <Form.Group className="mb-3" id="formNombre">
                                <Form.Label>Nombre:</Form.Label>
                                <Form.Control type="text" id="nombre" name="nombre" placeholder="escriba el nombre del cliente" value={cita.Nombre} autoComplete="off" onChange={e => setCita(prevCita => ({ ...prevCita, Nombre: e.target.value }))} />
                                {/* <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text> */}
                            </Form.Group>
                            {/* Botones */}
                            <Form.Group className="my-4">
                                <Row className="d-flex justify-content-between">
                                    <Col xs={6}>
                                        <Button type="submit" variant="success" size="sm" className="w-100" title="Presione aquí para reprogramar la cita" disabled={celularABuscar === " " || cita.Nombre === " "}>
                                            <BsSave /> Guardar
                                        </Button>
                                    </Col>
                                    <Col xs={6}>
                                        <Button variant="secondary" size="sm" className="w-100" title="Presione aquí para enviar un recordatorio" onClick={handledPanelClose}>
                                            <BsBackspace /> Regresar
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Group>
                            {!isNewRecord && (
                                <>
                                    <hr />
                                    <Form.Group className="my-4">
                                        <Row className="d-flex justify-content-between">
                                            <Col xs={6}>
                                                <Button variant="warning" size="sm" className="w-100" title="Presione aquí para reprogramar la cita">
                                                    <BsCalendar4Event /> Reprogramar
                                                </Button>
                                            </Col>
                                            <Col xs={6}>
                                                <Button variant="info" size="sm" className="w-100" title="Presione aquí para enviar un recordatorio">
                                                    <BsSend /> Recordatorio
                                                </Button>
                                            </Col>
                                        </Row>
                                        <Row className="d-flex justify-content-between mt-2">
                                            <Col xs={6}>
                                                <Button variant="primary" size="sm" className="w-100" title="Presione aquí para confirmar la cita" onClick={handled_Confirmar}>
                                                    <BsCheck /> Confirmar
                                                </Button>
                                            </Col>
                                            <Col xs={6}>
                                                <Button variant="danger" size="sm" className="w-100" title="Presione aquí para cancelar la cita" onClick={handled_Cancelar}>
                                                    <BsEraser /> Cancelar
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </>
                            )}

                            {/* <Form.Group className="my-4 d-flex justify-content-between">
                                <Button type="submit" variant="success" size="sm" title="Presione aquí para guardar los cambios" disabled={celularABuscar === "" || cita.Nombre === " "}>
                                    Guardar
                                </Button>
                                <Button variant="secondary" size="sm" title="Presione aquí para regresar" onClick={handledPanelClose}>
                                    Regresar
                                </Button>
                            </Form.Group> */}
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
