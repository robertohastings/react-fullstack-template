import React, { useState, useEffect } from "react"
import Axios from "axios"
import { Button, Col, Form, Row } from "react-bootstrap"
import Page from "../Page"

import { TbRefresh } from "react-icons/tb"
import SpinnerButton from "../Spinner/SpinnerButton"

function FormasDePago() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoaging] = useState(false)
    const [sending, setSending] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setIsLoaging(true)

        try {
            const response = await Axios.get("/api/getFormasDePago", {
                params: {
                    id_empresa: 1
                }
            })
            console.log("response:", response.data.formasDePago)
            setData(response.data.formasDePago)
        } catch (error) {
            console.error("There was an error fetching the products!", error.message)
        } finally {
            setIsLoaging(false)
        }
    }

    const Refrescar_handled = () => fetchData()

    const submit_handled = e => {
        e.preventDefault()
        console.log("form data:", e)
        const data = {
            id_empresa: 1,
            formasDePago: [
                {
                    id_forma_de_pago: 1,
                    activo: e.target[0].checked === true ? 1 : 0,
                    informacion_adicional: e.target[1].value
                },
                {
                    id_forma_de_pago: 2,
                    activo: e.target[2].checked === true ? 1 : 0,
                    informacion_adicional: e.target[3].value
                },
                {
                    id_forma_de_pago: 3,
                    activo: e.target[4].checked === true ? 1 : 0,
                    informacion_adicional: e.target[5].value
                },
                {
                    id_forma_de_pago: 4,
                    activo: e.target[6].checked === true ? 1 : 0,
                    informacion_adicional: e.target[7].value
                },
                {
                    id_forma_de_pago: 5,
                    activo: e.target[8].checked === true ? 1 : 0,
                    informacion_adicional: e.target[9].value
                },
                {
                    id_forma_de_pago: 6,
                    activo: e.target[10].checked === true ? 1 : 0,
                    informacion_adicional: e.target[11].value
                }
            ]
        }

        console.log(data)
        putFormasDePago(data)
    }

    const putFormasDePago = async data => {
        setSending(true)
        try {
            await Axios.put("/api/putFormasDePago", data)
                .then(response => {
                    console.log(response)
                    setSending(false)
                })
                .catch(error => {
                    console.log("There was an error updating formas de pago: ", error)
                    setSending(false)
                })
        } catch (error) {
            console.log("error:", error)
        } finally {
            setSending(false)
            //setShow(false)
            fetchData()
        }
    }

    return (
        <Page title="Landing Page">
            <h4 className="pb-1">Formas de Pago</h4>
            <div className="gap-2">
                <div>
                    <Button className="mx-2 my-3" size="sm" variant="outline-primary" onClick={Refrescar_handled}>
                        <TbRefresh />
                        {isLoading ? ` Refrescando...` : ` Refrescar`}
                    </Button>
                    {/* <Button className="mx-2 my-3" size="sm" variant="outline-primary" onClick={() => {}}>
                        {sending && <SpinnerButton mensaje="Guardando..." />}
                        {!sending && "Guardar"}
                    </Button> */}
                </div>

                <div className="mb-3">
                    <Form onSubmit={submit_handled}>
                        {data.map((formaDePago, index) => (
                            <div key={index}>
                                <Row>
                                    <Col xs={4} className="p-0">
                                        <Form.Check type="checkbox" id="forma_de_pago" className="pb-3" onChange={() => {}}>
                                            <Form.Check.Input type="checkbox" id={`opt-${index}`} name="forma_de_pago" />
                                            <Form.Check.Label for={`opt-${index}`}>{`${formaDePago.descripcion}`}</Form.Check.Label>
                                        </Form.Check>
                                    </Col>
                                    <Col xs={8} className="mb-3">
                                        <Form.Control size="md" type="text" placeholder="Datos adicionales" defaultValue={formaDePago.informacion_adicional} name="formaDePago" />
                                    </Col>
                                </Row>
                            </div>
                        ))}
                        <Button className="mx-2 my-3" size="sm" variant="outline-primary" type="submit">
                            {sending && <SpinnerButton mensaje="Guardando..." />}
                            {!sending && "Guardar"}
                        </Button>
                    </Form>
                </div>
            </div>
        </Page>
    )
}

export default FormasDePago
