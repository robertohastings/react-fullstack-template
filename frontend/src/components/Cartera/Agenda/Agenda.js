import React, { useState, useEffect, useRef, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Page from "../../Page"
import { Row, Col, Modal, Button, Offcanvas, Form } from "react-bootstrap"
//import Calendar from "react-calendar"
//import "react-calendar/dist/Calendar.css"
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { es } from "date-fns/locale"
import { format } from "date-fns"
import axios from "axios"
import axiosInstance from "../../../tools/AxiosInstance"
import { BsSave, BsBackspace, BsSend, BsEraser, BsSearch } from "react-icons/bs"
import { IoMdRefresh } from "react-icons/io";
import { GiConfirmed } from "react-icons/gi";
import { FaUserTag } from "react-icons/fa";
import DispatchContext from "../../../DispatchContext"
import StateContext from "../../../StateContext"
import { getClientePorTelefonoOCelular } from "../../../models/Cliente/Cliente"

// Registra la localización en español
registerLocale("es", es)

function Agenda() {
    const api_url = process.env.REACT_APP_API_URL
    const navigate = useNavigate()
    const appState = useContext(StateContext)
    if (!appState.loggedIn) { 
        navigate('LoggedIn')
    }

    const [date, setDate] = useState(new Date())
    const [agenda, setAgenda] = useState([])
    const [cita, setCita] = useState([])
    const [celularABuscar, setCelulaABuscar] = useState("")
    const [nombre, setNombre] = useState([])
    const [showPanel, setShowPanel] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const telefonoRef = useRef(null)
    const nombreRef = useRef(null)
    const nombreAsistenteRef = useRef(null)
    const [isFetching, setIsFetching] = useState(false)
    const [isNewRecord, setIsNewRecord] = useState(false)
    const [ayudaNombre, setAyudaNombre] = useState('')
    const appDispatch = useContext(DispatchContext)

    const onChange = date => {
        setDate(date)
        ObtenerAgenda(date)
    }

    const id_empresa = appState.idEmpresa
    // console.log('Id Empresa ->', id_empresa)
    // console.log('token ->', appState.token)

    const ObtenerAgenda = async (selectedDate) => {
        console.log('selected date', selectedDate)
        const params = {
            id_empresa: appState.idEmpresa,
            //fecha: selectedDate.toISOString().split("T")[0],
            fecha: selectedDate.toLocaleDateString("en-CA", { year: "numeric", month: "2-digit", day: "2-digit" }), // Formato YYYY-MM-DD
        }
        console.log('params:', params)
        try {
            const response = await axiosInstance.get("/getAgendaPorDia", {
                params 
            })
            console.log('response agenda:', response)
            setAgenda(response.data.agenda)
        } catch (error) {
            if (axios.isCancel(error)) {
                console.error("Solicitud cancelada:", error.message)
            } else if (error.response && error.response.status === 401) {
                // Si el token es inválido, redirige al usuario al componente LoggedIn
                appDispatch({ type: "logout" }) // Limpia el estado global
                 // Redirige al inicio de sesión
            } else if (error.response.status === 403) {
                // Si el token es válido pero no tiene permisos, redirige o muestra un mensaje
                //console.error("Acceso denegado: No tienes permisos para esta acción.");
                appDispatch({
                    type: "alertMessage",
                    value: "Acceso denegado: No tienes permisos para esta acción.",
                    typeAlert: "danger",
                });
                navigate("/"); // Opcional: Redirige al inicio de sesión o a otra página                
            } else {
                console.error("Error al obtener la agenda:", error)
            }
        }
    }

    useEffect(() => {
        ObtenerAgenda(date)
    }, [date])

    const handledRowClick = cita => {
        setCelulaABuscar("")
        //console.log("cita seleccionada: =>", cita)
        //console.log("celular a buscar =>", celularABuscar)
        //console.log("nombds a buscar =>", cita.Nombre === " " ? "No hay nombre" : cita.Nombre)
        if (cita.id_agenda === 0) {
            setIsNewRecord(true)
        } else {
            setIsNewRecord(false)
            setCelulaABuscar(cita.Celular)
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
        setIsFetching(true)  
        
        // const params = {
        //     id_empresa: id_empresa,
        //     telefono: celular
        // }
        // console.log("params ->", params)

        try {
            
            const clienteData = await getClientePorTelefonoOCelular(id_empresa, celular)

            //const data = response.data.cliente[0]
            console.log("data ->", clienteData)

            setCita(prevCita => ({ ...prevCita, Nombre: clienteData.nombre_cliente }))
            setCita(prevCita => ({ ...prevCita, id_cliente: clienteData.id_cliente }))
            setCita(prevCita => ({ ...prevCita, Celular: celular }))
            setCita(prevCita => ({ ...prevCita, nombre_asistente: clienteData.nombre_cliente }))

            if (clienteData.id_cliente === 0){
                setAyudaNombre('Cliente no encontrado...')
                setTimeout(() => {
                    nombreRef.current.focus()
                }, 100)
            } else {
                setAyudaNombre('')            
            }            

        } catch (error) {
            console.error("Error al obtener buscar cliente:", error)
            appDispatch({
                type: "alertMessage",
                value: error.message,
                typeAlert: "danger",
            });
        }

        // try {
        //     const response = await axiosInstance.get("/getClientePorTelefonoOCelular", {
        //         params
        //     })

        //     const data = response.data.cliente[0]
        //     console.log("data ->", data)

        //     setCita(prevCita => ({ ...prevCita, Nombre: data.nombre_cliente }))
        //     setCita(prevCita => ({ ...prevCita, id_cliente: data.id_cliente }))
        //     setCita(prevCita => ({ ...prevCita, Celular: celular }))
        //     setCita(prevCita => ({ ...prevCita, nombre_asistente: data.nombre_cliente }))

        //     if (data.id_cliente === 0){
        //         setAyudaNombre('Cliente no encontrado...')
        //         setTimeout(() => {
        //             nombreRef.current.focus()
        //         }, 100)
        //     } else {
        //         setAyudaNombre('')            
        //     }

        // } catch (error) {
        //     if (axios.isCancel(error)) {
        //         console.error("Solicitud cancelada:", error.message)
        //     } else if (error.response && error.response.status === 401) { // Si el token es inválido, redirige al usuario al componente LoggedIn                
        //         appDispatch({ type: "logout" }) // Limpia el estado global
        //         navigate("/") // Redirige al inicio de sesión
        //     } else if (error.response.status === 403) { //// Si el token es válido pero no tiene permisos
        //         appDispatch({
        //             type: "alertMessage",
        //             value: "Acceso denegado: No tienes permisos para esta acción.",
        //             typeAlert: "danger",
        //         });
        //         navigate("/"); // Opcional: Redirige al inicio de sesión o a otra página                
        //     } else {
        //         console.error("Error al obtener buscar cliente:", error)
        //     }
        // }

        setIsFetching(false)
    }

    const handled_CambiarEstatus = async (id_agenda_estatus) => {
        // Datos para el PUT
        const putData = {
            id_empresa: id_empresa,
            id_agenda: cita.id_agenda,
            id_agenda_estatus: id_agenda_estatus
        }

        try {
            // Hacer el PUT al endpoint
            try {
                await axiosInstance.put("/putAgendaCambiaEstatus", putData)
                    .then(response => {
                        console.log("PUT response ->", response)

                        appDispatch({
                            type: "alertMessage",
                            value: `${response.data.message}...`,
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
            console.log("There was an error with the PUT request ->", error)
        }           

        setShowPanel(false)
        setIsNewRecord(false)
        await ObtenerAgenda(date)
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
                id_empresa: id_empresa,
                fecha: date.toLocaleDateString("en-CA", { year: "numeric", month: "2-digit", day: "2-digit" }),
                intervalo: cita.intervalo,
                id_cliente: cita.id_cliente,
                nombre_cliente: cita.Nombre,
                celular: celularABuscar,
                nombre_asistente: cita.nombre_asistente,
            }
            console.log('postData ->', postData)

            try {
                // Hacer el POST al endpoint
                try {
                    await axiosInstance.post("/postAgenda", postData)
                        .then(response => {
                            console.log("POST response ->", response)

                            appDispatch({
                                type: "alertMessage",
                                value: `${response.data.message}. Folio confirmación: ${response.data.folio_confirmacion}`,
                                typeAlert: "success"
                            })
                        })
                        .catch(error => {
                            console.log(`There was an error in postAgenda -> Status: ${error}`)
                        })
                } catch (error) {
                    console.log("error:", error)
                } finally {
                    //console.log("finally")
                }
            } catch (error) {
                console.log("There was an error with the POST request ->", error)
            }
        } else {
            
            // Datos para el PUT
            const putData = {
                id_empresa: id_empresa,
                id_agenda: cita.id_agenda,
                intervalo: cita.intervalo,
                id_cliente: cita.id_cliente,
                nombre: cita.Nombre,
                fecha: date.toLocaleDateString("en-CA", { year: "numeric", month: "2-digit", day: "2-digit" }),
                celular: celularABuscar,
                nombre_asistente: cita.nombre_asistente,
            }
            console.log('putData ->', putData)

            try {
                // Hacer el PUT al endpoint
                try {
                    await axiosInstance.put("/putAgenda", putData)
                        .then(response => {
                            console.log("PUT response ->", response)

                            appDispatch({
                                type: "alertMessage",
                                value: `${response.data.message}...`,
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
                console.log("There was an error with the PUT request ->", error)
            }

            console.log("guardando datos ->", putData)
        }

        setShowPanel(false)
        setIsNewRecord(false)
        await ObtenerAgenda(date)
    }
    // Función para formatear el número de teléfono
    const formatPhoneNumber = (phoneNumber) => {
        if (!phoneNumber) return "";
        // Ejemplo de formato: 123-456-7890
        return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1.$2.$3");
    }   
    // Función para formatear la fecha en el formato deseado
    const formatDate = (date) => {
        return format(date, "EEEE d, yyyy", { locale: es })
    }
    
    // Función para obtener el estilo de la celda de estatus
    const getStatusCellStyle = (estatus) => {
        switch (estatus) {
            case "Reservada":
                return { backgroundColor: "yellow" }
            case "Confirmada":
                return { backgroundColor: "lightgreen" }
            case "Cancelada":
                return { backgroundColor: "red", color: "white" }
            default:
                return {}
        }
    }    

    return (
        <Page title="Agenda" fluid={true}>
            <h3>Agenda</h3>
            <Row className="pt-2 d-flex justify-content-center mx-1">
                <Col md={12} className="text-center mb-3">
                    {/* <Calendar
                        value={date}
                        onChange={onChange}
                        minDate={new Date()} // Muestra solo los días disponibles desde hoy
                        disabled={isFetching}
                    /> */}
                    <div className="d-flex justify-content-center gap-3">
                        <DatePicker
                            selected={date}
                            onChange={onChange}
                            //minDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                            className="form-control text-center"
                            disabled={isFetching}
                            locale="es"
                            //readOnly
                            onFocus={(e) => e.target.blur()} // Evita que el campo de fecha se enfoque
                        />
                        <Button size="md" variant="success" 
                            className="" 
                            onClick={() => ObtenerAgenda(date)}>
                                <IoMdRefresh/>
                        </Button>                    
                    </div>
                    <div>
                        <p className="pt-3 text-center" id="id_fechaSeleccionada">{`Fecha seleccionada: ${formatDate(date)}`}</p>
                    </div>
                </Col>
                <Col md={12} className="mb-5">
                    <Row className="fw-bold text-center mb-2" style={{ borderBottom: "1px solid #dee2e6" }}>
                        {" "}
                        {/* Usa fw-bold para resaltar los encabezados */}
                        <Col xs={4} md={2} xl={1}>Horario</Col>
                        <Col xs={5} md={5} xl={4}>Nombre</Col>
                        <Col md={2} xl={1} className="d-none d-sm-block">Celular</Col>
                        <Col xs={3} md={2} xl={3}>Estatus</Col>
                        <Col xl={2} className="d-none d-lg-block">Clave</Col>
                        <Col xl={1} className="d-none d-lg-block">Id</Col>
                    </Row>
                    {agenda.length > 0 ? (
                        agenda.map((cita, index) => (
                            <Row className="text-center py-2 align-items-center" key={index} style={{ borderBottom: "1px solid #dee2e6" }}>
                                <Col xs={4} md={2} xl={1} style={{ cursor: "pointer" }} onClick={() => handledRowClick(cita)}>
                                    {cita.intervalo}
                                </Col>
                                <Col xs={5} md={5} xl={4}>{cita.nombre_asistente}</Col>
                                <Col md={2} xl={1} className="d-none d-sm-block">{formatPhoneNumber(cita.Celular)}</Col>
                                <Col xs={3} md={3} xl={3} style={{ cursor: "pointer", ...getStatusCellStyle(cita.Estatus) }} 
                                    onClick={() => handledRowClick(cita)}>
                                    {cita.Estatus}
                                </Col>
                                <Col xl={2} className="d-none d-lg-block">{cita.clave_confirmacion}</Col>
                                <Col xl={1} className="d-none d-lg-block">{cita.id_agenda}</Col>
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
                        { cita.clave_confirmacion && (
                            <p>Clave: {cita.clave_confirmacion}</p>   
                        )}
                        {/* Captura de cita */}
                        <Form className="px-2 border rounded pt-3" onSubmit={handled_Guardar}>
                            <Form.Group className="mb-3" id="formHorario">
                                <Row>
                                    <Col xs={6} md={6}> 
                                        <Form.Label>Horario:</Form.Label>
                                        <Form.Control type="text" id="horario" name="horario" placeholder="confirme el horario de la cita" defaultValue={cita.intervalo} />
                                        {/* <Form.Text className="text-muted"></Form.Text> */}
                                    </Col>
                                    <Col xs={6} md={6}>
                                        <Form.Label>Estatus:</Form.Label>
                                        <Form.Control type="text" id="estatus" name="estatus" placeholder="estatus de la cita" defaultValue={cita.Estatus} />
                                        {/* <Form.Text className="text-muted"></Form.Text> */}
                                    </Col>
                                </Row>
                            </Form.Group>
                            {/* telefono */}
                            <Form.Group as={Row} className="mb-3" id="formTelefono">
                                <Col xs={9} md={9}>
                                    <Form.Label>Teléfono:</Form.Label>
                                    <Form.Control
                                        ref={telefonoRef}
                                        type="text"
                                        pattern="\d*"
                                        inputMode="numeric"
                                        id="telefono-unique"
                                        name="telefono-unique"
                                        placeholder="escriba el número de contacto del cliente"
                                        defaultValue={cita.Celular}
                                        onChange={e => setCelulaABuscar(e.target.value)}
                                        autoComplete="off"
                                        onKeyDown={e => {
                                            if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'Delete') {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                </Col>
                                <Col xs={3} md={3} className="d-flex align-items-end mb-1">
                                    <Button variant="primary" 
                                        size="sm" className="w-100"
                                        onClick={() => handledBuscarCliente(celularABuscar)} 
                                        title="Presione aquí para buscar el cliente por número de teléfono" 
                                        disabled={isFetching}>
                                        <BsSearch />
                                    </Button>
                                </Col>
                            </Form.Group>
                            {/* Nombre */}
                            <Form.Group className="mb-3" id="formNombre">
                                <Form.Label>Nombre:</Form.Label>
                                <Form.Control ref={nombreRef} type="text" id="nombre" name="nombre" placeholder="escriba el nombre del cliente" value={cita.Nombre} autoComplete="off" onChange={e => setCita(prevCita => ({ ...prevCita, Nombre: e.target.value }))} />
                                <Form.Text className="text-muted">{ayudaNombre}</Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" id="formNombre_Asistente">
                                <Form.Label>Nombre asistente(s):</Form.Label>
                                <Form.Control ref={nombreAsistenteRef} type="text" id="nombre_asistente" 
                                    name="nombreAsistente" 
                                    placeholder="escriba el nombre de los asistentes" 
                                    value={cita.nombre_asistente} autoComplete="off" 
                                    onChange={e => setCita(prevCita => ({ ...prevCita, nombre_asistente: e.target.value }))} 
                                />                            
                            </Form.Group>
                            {/* Botones */}
                            <Form.Group className="my-4">
                                <Row className="d-flex justify-content-between">
                                    <Col xs={6}>
                                        <Button type="submit" variant="success" size="sm" className="w-100" title="Presione aquí para reprogramar la cita" 
                                            disabled={celularABuscar === "" || cita.Nombre === ""}>
                                            <BsSave /> Guardar
                                        </Button>
                                    </Col>
                                    <Col xs={6}>
                                        <Button variant="primary" size="sm" className="w-100" title="Presione aquí para enviar un recordatorio" onClick={handledPanelClose}>
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
                                            {/* <Col xs={6}>
                                                <Button variant="secondary" size="sm" className="w-100" title="Presione aquí para reprogramar la cita">
                                                    <BsCalendar4Event /> Reprogramar
                                                </Button>
                                            </Col> */}

                                            <Col xs={6}>
                                                <Button variant="info" size="sm" className="w-100" title="Presione aquí para enviar un recordatorio">
                                                    <BsSend /> Recordatorio
                                                </Button>
                                            </Col>
                                            <Col xs={6}>
                                                <Button variant="success" size="sm" className="w-100" title="Presione aquí para confirmar la cita" onClick={() => handled_CambiarEstatus(3)}>
                                                    <FaUserTag /> Confirmar
                                                </Button>
                                            </Col>
                                        </Row>
                                        <Row className="d-flex justify-content-between mt-2">
                                            <Col xs={6}>
                                                <Button variant="warning" size="sm" className="w-100" title="Presione aquí para reservar la cita" onClick={() => handled_CambiarEstatus(2)}>
                                                    <GiConfirmed /> Reservar
                                                </Button>
                                            </Col>
                                            <Col xs={6}>
                                                <Button variant="danger" size="sm" className="w-100" title="Presione aquí para cancelar la cita" onClick={() => handled_CambiarEstatus(4)}>
                                                    <BsEraser /> Cancelar
                                                </Button>
                                            </Col>
                                        </Row>
                                        {/* <Row className="d-flex justify-content-between mt-2">
                                        </Row> */}
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
