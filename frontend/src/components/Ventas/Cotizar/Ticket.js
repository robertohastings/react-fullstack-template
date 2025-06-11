import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';

const Ticket = ({ idPedido, detalleDelPago, detallePedido, totalPrice, domicilioTicket, cargoDelivery, nombreCajero }) => {

    useEffect(() => {
        console.log("cargoDelivery:", cargoDelivery);
        console.log("domicilioTicket:", domicilioTicket);
    }, []);

    return (
        <div>
            <h5>Pedido: {idPedido}</h5>
            <p><strong>Celular:</strong> {detalleDelPago.celular}</p>
            <p><strong>Nombre:</strong> {detalleDelPago.nombre}</p>
            <p><strong>Cajero:</strong> {nombreCajero}</p>
            {domicilioTicket.length > 0 && 
                <p><strong>Domicilio:</strong>
                    {` ${domicilioTicket[0].calle} No. ${domicilioTicket[0].numero_exterior}, ${domicilioTicket[0].colonia} ${domicilioTicket[0].entre_calles ? `entre ${domicilioTicket[0].entre_calles}` : ''} ${domicilioTicket[0].referencia ? `(${domicilioTicket[0].referencia})` : ''}`}  
                </p>
            }

            <h6>Productos:</h6>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th className="text-center">Cantidad</th>
                        <th>Producto</th>
                        <th className="text-end px-3">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {detallePedido.map((producto, index) => (
                        <tr key={index}>
                            <td className="text-center">{producto.cantidad}</td>
                            <td>{producto.nombre}</td>
                            <td className="text-end px-3">${(producto.cantidad * producto.precio).toFixed(2)}</td>
                        </tr>
                    ))}

                    {cargoDelivery > 0 ? (
                        <>
                            <tr>
                                <td className="text-center">1</td>
                                <td>Envio</td>
                                <td className="text-end px-3">${cargoDelivery.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td colSpan={2} className="text-end">Total:</td>
                                <td className="text-end px-3">${(totalPrice + cargoDelivery).toFixed(2)}</td>
                            </tr>                                                
                        </>
                    ) : (
                        <tr>
                            <td colSpan={2} className="text-end">Total:</td>
                            <td className="text-end px-3">${totalPrice.toFixed(2)}</td>
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
                    {detalleDelPago.pagos.map((pago, index) => (
                        <tr key={index}>
                            <td>{pago.tipoPago} - {pago.pagoParcialoTotal}</td>
                            <td className="text-end px-3">${pago.cantidadAPagar.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
};

export default Ticket;