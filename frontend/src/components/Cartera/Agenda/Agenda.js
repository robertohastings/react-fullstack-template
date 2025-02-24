import React, { useState} from 'react'
import Page from '../../Page'
import { Row, Col } from 'react-bootstrap'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

function Agenda() {

    const [ date, setDate ] = useState(new Date())

    const onChange = (date) => {
        setDate(date)
    }

  return (
    <Page title='Agenda'>
      <h3>Agenda</h3>
      <Row className='pt-5 d-flex justify-content-center'>
        <Col md={3}>
            <Calendar
                value={date}
                onChange={onChange}
                minDate={new Date()} // Muestra solo los días disponibles desde hoy            
            />
            <p className='pt-3 text-center'>Fecha seleccionada: {date.toLocaleDateString()}</p>
        </Col>
        <Col md={9}>
        </Col>

      </Row>
    </Page>
  )
}

export default Agenda
