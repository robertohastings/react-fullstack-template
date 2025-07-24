import React, { useEffect, useState } from 'react';
import { Table, Row, Col } from 'react-bootstrap';

function TicketMov({pedidoTicket}) {
        const [detalle_pedido, setDetalle_pedido ] = useState([])
        const [formasDePago, setFormasDePago ] = useState([])

        useEffect(() => {
            //console.log('detalle_pedido prop:', detalle_pedido)
            console.log('pedidoTicket prop:', pedidoTicket)
            obtieneDetallePedido()
            
        }, [])

        const obtieneDetallePedido = () => {
            setDetalle_pedido(JSON.parse(pedidoTicket.detalle_pedido))
            setFormasDePago(JSON.parse(pedidoTicket.detalle_formas_de_pago))
        }

  return (

       <div>
            <h5>Pedido: {pedidoTicket.id_pedido}</h5>
            <Row>
                <Col sm={2}><strong>Celular:</strong>:</Col>
                <Col sm={10}>{pedidoTicket.celular}</Col>
            </Row>
            <Row>
                <Col sm={2}><strong>Nombre:</strong>:</Col>
                <Col sm={10}>{pedidoTicket.nombre}</Col>
            </Row>
            <Row>
                <Col sm={2}><strong>Cajero:</strong>:</Col>
                <Col sm={10}>{pedidoTicket.cajero}</Col>
            </Row>
            <Row>
                <Col sm={2}><strong>Tipo Pedido:</strong>:</Col>
                <Col sm={10}>{pedidoTicket.tipo_pedido}</Col>
            </Row>
            {pedidoTicket.domicilio && 
                <Row>
                    <Col sm={2}><strong>Domicilio:</strong>:</Col>
                    <Col sm={10}>{pedidoTicket.domicilio}</Col>
                </Row>            
            }               


            {/* <p className='pt-2' style={{ display: 'flex', gap: 16 }}><strong>Celular:</strong> </p> */}
            {/* <p style={{ display: 'flex', gap: 16 }}><strong>Nombre:</strong> {pedidoTicket.nombre}</p> */}
            {/* <p><strong>Cajero:</strong> {pedidoTicket.cajero}</p>
            <p><strong>Tipo Pedido:</strong> {pedidoTicket.tipo_pedido}</p> */}
            {/* {pedidoTicket.domicilio && 
                <p><strong>Domicilio:</strong>
                    {pedidoTicket.domicilio}
                </p>
            } */}

            <h6 className='pt-3'>Productos:</h6>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th className="text-center">Cantidad</th>
                        <th>Producto</th>
                        <th className="text-end px-3">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {console.log('Detalle pedido map:', detalle_pedido)}
                    {detalle_pedido.map((producto, index) => (
                        <tr key={index}>
                            <td className="text-center">{producto.cantidad}</td>
                            <td>{producto.producto}</td>
                            <td className="text-end px-3">${(producto.subtotal).toFixed(2)}</td>
                        </tr>
                    ))}

                    {pedidoTicket.importe_envio > 0 ? (
                        <>
                            <tr>
                                <td className="text-center">1</td>
                                <td>Envio</td>
                                <td className="text-end px-3">${pedidoTicket.importe_envio.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td colSpan={2} className="text-end">Total:</td>
                                <td className="text-end px-3">${(pedidoTicket.total + pedidoTicket.importe_envio).toFixed(2)}</td>
                            </tr>                                                
                        </>
                    ) : (
                        <tr>
                            <td colSpan={2} className="text-end">Total:</td>
                            <td className="text-end px-3">${pedidoTicket.total.toFixed(2)}</td>
                        </tr>
                    )}
                </tbody>                
            </Table>

            <h6>Pagos:</h6>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Tipo de Pago</th>
                        <th className="text-end px-3">Pagado</th>
                    </tr>
                </thead>
                <tbody>
                    {formasDePago.map((pago, index) => (
                        <tr key={index}>
                            <td>{pago.forma_de_pago} - {pago.monto_pagado}</td>
                            <td className="text-end px-3">${pago.monto_pagado.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
  )
}

export default TicketMov