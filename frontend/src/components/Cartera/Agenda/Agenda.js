import React, { useState, useEffect } from "react"
import Page from "../../Page"
import { Row, Col } from "react-bootstrap"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import Axios from "axios"

function Agenda() {
    const [date, setDate] = useState(new Date())
    const [agenda, setAgenda] = useState([])

    const onChange = date => {
        setDate(date)
        ObtenerAgenda()
    }

    const ObtenerAgenda = async () => {
        
        await Axios
            .get("/api/getAgendaPorDia", {
                params: {
                    id_empresa: 1,
                    fecha: date.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' })
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

    return (
        <Page title="Agenda" fluid={true}>
            <h3>Agenda</h3>
            <Row className="pt-5 d-flex justify-content-center">
                <Col md={4}>
                    <Calendar
                        value={date}
                        onChange={onChange}
                        minDate={new Date()} // Muestra solo los días disponibles desde hoy
                    />
                    <p className="pt-3 text-center">Fecha seleccionada: {date.toLocaleDateString()}</p>
                </Col>
                <Col md={8}>
                    <Row className="fw-bold text-center"> {/* Usa fw-bold para resaltar los encabezados */}
                        <Col className="col-3">Horario</Col>
                        <Col className="col-5">Nombre</Col>
                        <Col className="col-2">Celular</Col>
                        <Col className="col-2">Estatus</Col>
                    </Row>                
                    {agenda.length > 0 ? (
                        agenda.map((cita, index) => ( 
                            <Row className="text-center" key={index} style={{ borderBottom: "1px solid #dee2e6" }}>
                                <Col className="col-3" style={{cursor: 'pointer'}}>{cita.intervalo}</Col>
                                <Col className="col-5">{cita.Nombre}</Col>
                                <Col className="col-2">{cita.Celular}</Col>
                                <Col className="col-2" style={{cursor: 'pointer'}}>{cita.Estatus}</Col>
                            </Row>                                                
                        ))
                    ) : (
                        <p>No hay citas para esta fecha.</p>
                    )}
                </Col>
            </Row>
        </Page>
    )
}

export default Agenda
