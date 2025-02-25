import React, { useState, useEffect } from "react"
import Page from "../../Page"
import { Row, Col } from "react-bootstrap"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import axios from "axios"
import { response } from "express"

function Agenda() {
    const [date, setDate] = useState(new Date())
    const [agenda, setAgenda] = useState({})

    const onChange = date => {
        setDate(date)
    }

    const ObtenerAgenda = () => {
        axios
            .get("/api/getAgendaPorDia", {
                params: {
                    id_empresa: 1,
                    fecha: date
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
        <Page title="Agenda">
            <h3>Agenda</h3>
            <Row className="pt-5 d-flex justify-content-center">
                <Col md={3}>
                    <Calendar
                        value={date}
                        onChange={onChange}
                        minDate={new Date()} // Muestra solo los días disponibles desde hoy
                    />
                    <p className="pt-3 text-center">Fecha seleccionada: {date.toLocaleDateString()}</p>
                </Col>
                <Col md={9}></Col>
            </Row>
        </Page>
    )
}

export default Agenda
