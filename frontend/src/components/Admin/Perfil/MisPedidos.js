import React, { useState, useEffect } from "react"
import Axios from "axios"
//import SpinnerButton from "../../Spinner/SpinnerButton"
import { Accordion, Button, Spinner, Table, Image } from "react-bootstrap"

function MisPedidos() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoaging] = useState(false)

    const fetchMisPedidos = async () => {
        setIsLoaging(true)

        try {
            const response = await Axios.get("/api/getPedidoDetalle", {
                params: {
                    id_empresa: 1,
                    id_usuario: 1
                }
            })
            console.log("response:", response.data.direcciones)
            setData(response.data.pedidos)
        } catch (error) {
            console.error("There was an error fetching the pedidos!", error)
        } finally {
            setIsLoaging(false)
        }
    }

    useEffect(() => {
        fetchMisPedidos()
    }, [])

    // Create our number formatter.
    const formatter = new Intl.NumberFormat("en-MX", {
        style: "currency",
        currency: "MXN"

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    })

    //TODO:
    // - GENERAR CODIDO DEL BOTÓN: VOLVER A COMPRAR.

    return (
        <div>
            <h4 className="pt-4">Mis Pedidos</h4>
            <hr />
            <Accordion defaultActiveKey={0}>
                {isLoading && (
                    <>
                        <div className="d-flex justify-content-center">
                            <Spinner animation="grow" />
                        </div>
                    </>
                )}
                {!isLoading && (
                    <>
                        {data.map((row, index) => (
                            <Accordion.Item eventKey={index}>
                                <Accordion.Header>{`Pedido #:  ${("0000" + row.id_pedido.toString()).slice(-4)}`}</Accordion.Header>
                                <Accordion.Body>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Fecha</th>
                                                <th>Estatus</th>
                                                <th>Forma de Pago</th>
                                                <th>Lugar de Entrega</th>
                                                <th className="text-end">Saldo</th>
                                                <th className="text-end">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr key={`tr_${index}`}>
                                                <td className="align-content-center">{row.fecha_creacion}</td>
                                                <td>{JSON.parse(row.estatus).descripcion}</td>
                                                <td>{JSON.parse(row.formaDePago).descripcion}</td>
                                                <td>{row.lugarDeEntrega}</td>
                                                <td className="text-end">{formatter.format(row.Saldo)}</td>
                                                <td className="text-end">{formatter.format(row.total)}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Poducto ID #</th>
                                                <th></th>
                                                <th>Descripción #</th>
                                                <th className="text-end">Cantidad</th>
                                                <th className="text-end">Precio</th>
                                                <th className="text-end">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {JSON.parse(row.detalle_pedido).map((partida, index) => (
                                                <tr key={`detPedKey_${index}`}>
                                                    <td className="align-content-center text-center">{partida.id_producto}</td>
                                                    <td>
                                                        <Image src={partida.imagen} style={{ width: "120px", height: "80px" }} />
                                                    </td>
                                                    <td className="align-content-center">{partida.producto}</td>
                                                    <td className="align-content-center text-end">{partida.cantidad}</td>
                                                    <td className="align-content-center text-end">{formatter.format(partida.precio)}</td>
                                                    <td className="align-content-center text-end">{formatter.format(partida.subtotal)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <Button variant="primary" className="mt-3">
                                            Voler a Pedir
                                        </Button>
                                    </Table>
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </>
                )}
            </Accordion>

            {/* <Table striped bordered hover>
                <thead>
                    <tr>
                        <th># Pedido</th>
                        <th>Fecha</th>
                        <th>Total</th>
                        <th>Saldo</th>
                    </tr>
                </thead>
                {isLoading && (
                    <>
                        <div className="d-flex justify-content-center">
                            <Spinner animation="grow" />
                        </div>
                    </>
                )}
                {!isLoading && (
                    <tbody>
                        {data.map(row => (
                            <tr key={row.id_pedido}>
                                <td className="align-content-center">{row.id_pedido}</td>
                                <td className="align-content-center">{row.fecha_creacion}</td>
                                <td className="align-content-center">{row.total}</td>
                                <td className="align-content-center">{row.Saldo}</td>
                            </tr>
                        ))}
                    </tbody>
                )}
            </Table> */}
        </div>
    )
}

export default MisPedidos
