import React, { useState, useEffect } from "react"
import { Button, Col, Form, Row, Spinner } from "react-bootstrap"
import Page from "../Page"

import { TbRefresh } from "react-icons/tb"
import SpinnerButton from "../Spinner/SpinnerButton"
import { gettingFormasDePago, updatingFormasDePago } from "../services/Landing.service"
import { useEmpresaID } from "../../tools/StateUtils"

function FormasDePago() {
    const id_empresa = useEmpresaID()
    const [data, setData] = useState([])
    const [isLoading, setIsLoaging] = useState(false)
    const [sending, setSending] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setIsLoaging(true)

        try {
            const params = {
                id_empresa
            }

            const response = await gettingFormasDePago(params)
            if (response.success){
                console.log("response formas de pago:", response.formasDePago)
                setData(response.formasDePago)
            }
        } catch (error) {
            console.error("There was an error fetching the products!", error.message)
        } finally {
            setIsLoaging(false)
        }
    }

    const Refrescar_handled = () => fetchData()

    const submit_handled = e => {
        e.preventDefault()
        //console.log("form data:", e)
        const dataUpdated = {
            id_empresa,
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
                },
                {
                    id_forma_de_pago: 7,
                    activo: e.target[12].checked === true ? 1 : 0,
                    informacion_adicional: e.target[13].value
                },
                {
                    id_forma_de_pago: 8,
                    activo: e.target[14].checked === true ? 1 : 0,
                    informacion_adicional: e.target[15].value
                },
                {
                    id_forma_de_pago: 9,
                    activo: e.target[16].checked === true ? 1 : 0,
                    informacion_adicional: e.target[17].value
                }
            ]
        }

        //console.log(dataUpdated)
        putFormasDePago(dataUpdated)
    }

    const putFormasDePago = async dataUpdated => {
        setSending(true)
        try {
            const response = await updatingFormasDePago(dataUpdated)
            if (response.success){
                console.log(response.message)
            }
            fetchData()
            //console.log(response)
            //setSending(false)

        } catch (error) {
            console.log("error:", error)
        } finally {
            setSending(false)
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

                {isLoading ? (
                    <div className="d-flex justify-content-center">
                        <Spinner animation="grow" />
                    </div>
                ) : (
                    <div className="mb-3">
                        <Form onSubmit={submit_handled}>
                            {data.map((formaDePago, index) => (
                                <div key={index}>
                                    <Row>
                                        <Col xs={4} className="p-0">
                                            <Form.Check type="checkbox" id="forma_de_pago" className="pb-3">
                                                <Form.Check.Input
                                                    type="checkbox"
                                                    id={`opt-${index}`}
                                                    name="forma_de_pago"
                                                    defaultChecked={formaDePago.defaultChecked === "true"}
                                                    onChange={e => {
                                                        // Manejar el cambio de estado del checkbox
                                                        const updatedData = data.map(d => (d.id_forma_de_pago === formaDePago.id_forma_de_pago ? { ...d, defaultChecked: e.target.checked.toString() } : d))
                                                        setData(updatedData)
                                                    }}
                                                />
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
                )}
            </div>
        </Page>
    )
}

export default FormasDePago
