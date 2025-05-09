import React from 'react';
import { Table } from 'react-bootstrap';

const Ticket = ({ detalleDelPago, detallePedido, totalPrice, domicilioTicket }) => {
    return (
        <div>
            <p><strong>Celular:</strong> {detalleDelPago.celular}</p>
            <p><strong>Nombre:</strong> {detalleDelPago.nombre}</p>
            {domicilioTicket.length > 0 && 
                <p><strong>Domicilio:</strong>
                    {` ${domicilioTicket.calle} No. ${domicilioTicket.numero_exterior}, ${domicilioTicket.colonia} ${domicilioTicket.entre_calles ? `entre ${domicilioTicket.entre_calles}` : ''} ${domicilioTicket.referencia ? `(${domicilioTicket.referencia})` : ''}`}  
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
                    <tr>
                        <td colSpan={2} className="text-end">Total:</td>
                        <td className="text-end px-3">${totalPrice.toFixed(2)}</td>
                    </tr>
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