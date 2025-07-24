import React, { useState, useRef } from "react";
import { Table, Button, Row, Col, Form, Modal } from "react-bootstrap";
import { getMovimientosDeCaja, getPedidosPorIdCaja } from "../../../models/Pedido/Pedido";
import { useEmpresaID } from "../../../tools/StateUtils";
import { TbListDetails, TbFileInvoice } from 'react-icons/tb';
import { PiCashRegisterLight } from 'react-icons/pi';
import { LuFileSpreadsheet } from 'react-icons/lu';
import TicketMov from "./TicketMov";
import { useReactToPrint } from "react-to-print"

function MovimientosCaja() {
    const today = new Date().toISOString().slice(0, 10);
    const id_empresa = useEmpresaID()
    const [fechaInicial, setFechaInicial] = useState(today);
    const [fechaFinal, setFechaFinal] = useState(today);
    const [movimientos, setMovimientos] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    const [pedidoTicket, setPedidoTicket] = useState([])
    const [detalle_pedido, setDetalle_pedido] = useState([]);
    const [detalle_formas_de_pago, setDetalle_formas_de_pago] = useState([]);
    const [expandedDetallePedidos, setExpandedDetallePedidos] = useState({});
    const [pedidosCajaId, setPedidosCajaId] = useState(null);
    const [expandedMovs, setExpandedMovs] = useState({});
    const [expandedPagos, setExpandedPagos] = useState({});
    const [expandedPedidos, setExpandedPedidos] = useState({});
    const [showDetalleModal, setShowDetalleModal] = useState(false);
    const [idPedido, setIdPedido] = useState(null);
    const [detalleDelPago, setDetalleDelPago] = useState(null);
    const [cajeros, setCajeros] = useState([]);
    const [cajeroSeleccionado, setCajeroSeleccionado] = useState(null);
    const [domicilioTicket, setDomicilioTicket] = useState([]);
    const [cargoDelivery, setCargoDelivery] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [detallePedido, setDetallePedido] = useState([])
    const contentRef = React.useRef();
    const reactToPrintFn = useReactToPrint({contentRef})


    const handleBuscar = async () => {
        try {
            const data = await getMovimientosDeCaja(id_empresa, fechaInicial, fechaFinal);
            setMovimientos(Array.isArray(data) ? data : [data]);
            setExpandedMovs({});
            setExpandedPagos({});
            setExpandedPedidos({});
        } catch (err) {
            alert("Error al obtener movimientos de caja");
        }
    };
    const handleObtenerPedidos = async (id_caja) => {
        try {
            const data = await getPedidosPorIdCaja(id_empresa, id_caja);
            console.log("Pedidos obtenidos:", data);
            console.log("Pedidos detalle:", data[0].detalle_pedido);
            setPedidos(Array.isArray(data) ? data : [data]);

            setPedidosCajaId(id_caja);
            setExpandedPedidos({});
            togglePedidos(id_caja);
        } catch (err) {
            alert("Error al obtener movimientos de caja");
        }
    };

    const toggleDetalleMovs = (id_caja) => {
        setExpandedMovs((prev) => ({
            ...prev,
            [id_caja]: !prev[id_caja]
        }));
    };

    const toggleFormasPago = (id_caja) => {
        setExpandedPagos((prev) => ({
            ...prev,
            [id_caja]: !prev[id_caja]
        }));
    };  
    const togglePedidos = (id_caja) => {
        setExpandedPedidos((prev) => ({
            ...prev,
            [id_caja]: !prev[id_caja]
        }));
    };  
    const toggleDetallePedidos = (id_pedido, idx) => {
        setExpandedDetallePedidos((prev) => ({
            ...prev,
            [id_pedido]: !prev[id_pedido]
        }));

        setDetalle_pedido(
            pedidos[idx] && pedidos[idx].detalle_pedido
                ? Array.isArray(pedidos[idx].detalle_pedido)
                    ? pedidos[idx].detalle_pedido
                    : JSON.parse(pedidos[idx].detalle_pedido)
                : []
        );

        setDetalle_formas_de_pago(
            pedidos[idx] && pedidos[idx].detalle_formas_de_pago
                ? Array.isArray(pedidos[idx].detalle_formas_de_pago)
                    ? pedidos[idx].detalle_formas_de_pago
                    : JSON.parse(pedidos[idx].detalle_formas_de_pago)
                : []
        );
        console.log("Detalle pedido:",  pedidos[idx].detalle_pedido);
    };

    const handleTicket = (pedido) => {      
        console.log('pedido:', pedido)
        setPedidoTicket(pedido)
        setShowDetalleModal(true)
    }

    return (
        <>
            <div>
                <Row className="mt-5 mb-4 justify-content-center">
                    <Col md={3} className="text-center">
                        <Form.Label>Fecha Inicial</Form.Label>
                        <Form.Control
                            type="date"
                            value={fechaInicial}
                            onChange={e => setFechaInicial(e.target.value)}
                        />
                    </Col>
                    <Col md={3} className="text-center">
                        <Form.Label>Fecha Final</Form.Label>
                        <Form.Control
                            type="date"
                            value={fechaFinal}
                            onChange={e => setFechaFinal(e.target.value)}
                        />
                    </Col>
                    <Col md="auto" className="d-flex align-items-end justify-content-center">
                        <Button variant="primary" onClick={handleBuscar}>Buscar</Button>
                    </Col>
                </Row>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr className="text-center">
                            <th rowSpan={2}>Acciones</th>
                            <th rowSpan={2}>No. Caja</th>
                            <th rowSpan={2}>IP</th>
                            <th colSpan={2} className="text-center">Fechas</th>
                            <th colSpan={2} className="text-center">Ingresos</th>

                            <th rowSpan={2}>Retiros </th>
                            <th rowSpan={2}>Dif.</th>
                            <th rowSpan={2}>Formas de Pago</th>
                            
                            <th colSpan={2} className="text-center">Cajeros</th>
                        </tr>
                        <tr className="text-center">
                            <th>Apertura</th>
                            <th>Cierre</th>
                            <th>Inicial</th>
                            <th>Otros</th>                                                
                            <th>Abre</th>
                            <th>Cierra</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movimientos.map((mov) => {
                            // Parsear los detalles y formas de pago si son string
                            let detalleMovs = [];
                            let formasPago = [];
                            try {
                                detalleMovs = mov.detalle_movimientos
                                    ? (typeof mov.detalle_movimientos === "string"
                                        ? JSON.parse(mov.detalle_movimientos)
                                        : mov.detalle_movimientos)
                                    : [];
                            } catch { detalleMovs = []; }
                            try {
                                formasPago = mov.formas_de_pago
                                    ? (typeof mov.formas_de_pago === "string"
                                        ? JSON.parse(mov.formas_de_pago)
                                        : mov.formas_de_pago)
                                    : [];
                            } catch { formasPago = []; }

                            return (
                                <React.Fragment key={mov.id_caja}>
                                    <tr>
                                        <td>
                                            <Button
                                                size="sm"
                                                variant="info"
                                                onClick={() => toggleDetalleMovs(mov.id_caja)}
                                                className="me-1"
                                                title="Detalle de Movimientos"
                                            >
                                                {expandedMovs[mov.id_caja] ? "▼" : ""} <TbListDetails/>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                onClick={() => toggleFormasPago(mov.id_caja)}
                                                className="me-1"
                                                title="Formas de Pago"
                                            >
                                                {expandedPagos[mov.id_caja] ? "▼" : ""} <PiCashRegisterLight/>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="success"
                                                onClick={() => {
                                                    if (pedidosCajaId === mov.id_caja) {
                                                        togglePedidos(mov.id_caja);
                                                    } else {
                                                        handleObtenerPedidos(mov.id_caja);
                                                    }
                                                }}
                                                title="Pedidos"
                                            >
                                                {expandedPedidos[mov.id_caja] ? "▼" : ""} <TbFileInvoice/>
                                            </Button>
                                        </td>
                                        <td className="text-center">{mov.id_caja}</td>
                                        <td>{mov.ip}</td>
                                        <td>{mov.fecha_apertura ? mov.fecha_apertura.substring(0, 10) : ""}</td>
                                        <td>{mov.fecha_cierre ? mov.fecha_cierre.substring(0, 10) : ""}</td>
                                        <td className="text-end">${mov.importe_inicial ? mov.importe_inicial : ""}</td>
                                        <td className="text-end">${mov.importe_otros_ingresos ? mov.importe_otros_ingresos : ""}</td>
                                        <td className="text-end">${mov.importe_retiros ? mov.importe_retiros : ""}</td>
                                        <td className="text-end">${mov.importe_diferencia ? mov.importe_diferencia : ""}</td>
                                        <td className="text-end">${mov.importe_formasDePago ? mov.importe_formasDePago : ""}</td>                       
                                        <td>{mov.nombre_cajero_abre}</td>
                                        <td>{mov.nombre_cajero_cierra}</td>
                                    </tr>
                                    {expandedMovs[mov.id_caja] && (
                                        <tr>
                                            <td colSpan={12}>
                                                <b>Detalle Movimientos</b>
                                                <Table size="sm" bordered className="mt-2">
                                                    <thead>
                                                        <tr className="text-center">
                                                            <th>#</th>
                                                            <th>F. Registro</th>
                                                            
                                                            <th>Motivo</th>
                                                            <th>Ingreso</th>
                                                            <th>Egreso</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {detalleMovs.map((det, idx) => (
                                                            <tr key={idx} className="text-center">
                                                                <td>{det.partida}</td>
                                                                <td>{det.fregistro}</td>
                                                                
                                                                <td>{det.motivo}</td>
                                                                {det.ingresoOEgreso === "ingreso" ? (
                                                                    <td className="text-end pe-2">${det.importe}</td>
                                                                ) : (
                                                                    <td className="text-end pe-2">-</td>
                                                                )}
                                                                {det.ingresoOEgreso === "egreso" ? (
                                                                    <td className="text-end pe-2">${det.importe}</td>
                                                                ) : (
                                                                    <td className="text-end pe-2">-</td>
                                                                )}
                                                                
                                                            </tr>                                                        
                                                        ))}
                                                        <tr>
                                                            <td colSpan={3} className="text-end fw-bold">Total:</td>
                                                            <td className="text-end fw-bold">
                                                                ${detalleMovs
                                                                    .filter(det => det.ingresoOEgreso === "ingreso")
                                                                    .reduce((acc, det) => acc + Number(det.importe), 0)
                                                                    .toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                                            </td>
                                                            <td className="text-end fw-bold">
                                                                ${detalleMovs
                                                                    .filter(det => det.ingresoOEgreso === "egreso")
                                                                    .reduce((acc, det) => acc + Number(det.importe), 2)
                                                                    .toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                                            </td>
                                                        </tr>                                                    
                                                    </tbody>
                                                </Table>
                                            </td>
                                        </tr>
                                    )}
                                    {expandedPagos[mov.id_caja] && (
                                        <tr>
                                            <td colSpan={12}>
                                                <b>Formas de Pago</b>
                                                <Table size="sm" bordered className="mt-2">
                                                    <thead>
                                                        <tr className="text-center">
                                                            <th>Id</th>
                                                            <th>Forma de Pago</th>
                                                            <th>Importe</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {formasPago.map((fp, idx) => (
                                                            <tr key={idx}>
                                                                <td className="text-center">{fp.id_forma_de_pago}</td>
                                                                <td>{fp.forma_de_pago}</td>
                                                                <td className="text-end">${fp.importe}</td>
                                                            </tr>
                                                        ))}
                                                        <tr>
                                                            <td colSpan={2} className="text-end fw-bold">Total:</td>
                                                            <td className="text-end fw-bold">
                                                                ${formasPago.reduce((acc, fp) => acc + Number(fp.importe), 0)
                                                                .toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </td>
                                        </tr>
                                    )}
                                    {expandedPedidos[mov.id_caja] && (
                                        <tr>
                                            <td colSpan={12}>
                                                <b>Pedidos</b>
                                                <Table size="sm" bordered className="mt-2">
                                                    <thead>
                                                        <tr className="text-center">
                                                            <th>Acciones</th>
                                                            <th># Pedido</th>
                                                            <th>Fecha</th>
                                                            <th>Cajero</th>
                                                            <th>Tipo Pedido</th>
                                                            <th>Nombre</th>
                                                            <th>Celular</th>
                                                            <th>Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {pedidos.length === 0 ? (
                                                            <tr>   
                                                                <td colSpan={7} className="text-center">Aún no hay pedidos para esta caja</td>
                                                            </tr>) : (
                                                                pedidos.map((pedido, idx) => (
                                                                    <>
                                                                        <tr key={idx} className="text-center">
                                                                            <td>
                                                                                <Button
                                                                                    size="sm"
                                                                                    variant="dark"
                                                                                    onClick={() => toggleDetallePedidos(pedido.id_pedido, idx)}
                                                                                    className="me-1"
                                                                                    title="Detalle de Pedidos"
                                                                                >
                                                                                    {expandedDetallePedidos && expandedDetallePedidos[pedido.id_pedido] ? "▼" : ""} <LuFileSpreadsheet/>
                                                                                </Button>                                                                    
                                                                            </td>
                                                                            <td>
                                                                                <Button
                                                                                    size="sm"
                                                                                    title="Ver ticket"
                                                                                    onClick={() => handleTicket(pedido)}
                                                                                >
                                                                                    {pedido.id_pedido}
                                                                                </Button>
                                                                                

                                                                            </td>
                                                                            <td>{pedido.fecha_creacion ? pedido.fecha_creacion.substring(0, 19).replace("T", " ") : ""}</td>
                                                                            <td>{pedido.cajero}</td>
                                                                            <td>{pedido.id_tipo_pedido}</td>
                                                                            <td>{pedido.nombre}</td>
                                                                            <td>{pedido.celular}</td>
                                                                            <td className="text-end">${Number(pedido.total).toLocaleString('es-MX', { minimumFractionDigits: 2 })}</td>
                                                                        </tr>
                                                                        {expandedDetallePedidos && expandedDetallePedidos[pedido.id_pedido] && (
                                                                            <tr>
                                                                                <td colSpan={8}>
                                                                                    <b>Detalle de Pedido</b>
                                                                                    <Table size="sm" bordered className="mt-2">
                                                                                        <thead>
                                                                                            <tr className="text-center" style={{ background: "#e3f2fd" }}>
                                                                                                <th>Producto</th>
                                                                                                <th>Cantidad</th>
                                                                                                <th>Precio</th>
                                                                                                <th>Subtotal</th>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                            {console.log('detalle_pedido:', detalle_pedido, Array.isArray(detalle_pedido))}
                                                                                            {Array.isArray(detalle_pedido) && detalle_pedido.length > 0 ? (
                                                                                                detalle_pedido.map((detalle, jdx) => (
                                                                                                    <tr key={jdx} className="text-center">
                                                                                                        <td>{detalle.producto}</td>
                                                                                                        <td>{detalle.cantidad}</td>
                                                                                                        <td className="text-end">${Number(detalle.precio).toLocaleString('es-MX', { minimumFractionDigits: 2 })}</td>
                                                                                                        <td className="text-end">${Number(detalle.subtotal).toLocaleString('es-MX', { minimumFractionDigits: 2 })}</td>
                                                                                                    </tr>
                                                                                                ))
                                                                                            ) : (
                                                                                                <tr>
                                                                                                    <td colSpan={4} className="text-center">Sin detalle de productos</td>
                                                                                                </tr>
                                                                                            )}
                                                                                        </tbody>
                                                                                    </Table>
                                                                                    <b>Detalle Formas de Pago</b>
                                                                                    <Table size="sm" bordered className="mt-2">
                                                                                        <thead>
                                                                                            <tr className="text-center" style={{ background: "#e3f2fd" }}>
                                                                                                <th>Id Forma de Pago</th>
                                                                                                <th>Monto Pagado</th>
                                                                                                <th>Saldo</th>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                            {Array.isArray(detalle_formas_de_pago) && detalle_formas_de_pago.length > 0 ? (
                                                                                                detalle_formas_de_pago.map((fp, kdx) => (
                                                                                                    <tr key={kdx} className="text-center">
                                                                                                        <td>{fp.forma_de_pago}</td>
                                                                                                        <td className="text-end">${Number(fp.monto_pagado).toLocaleString('es-MX', { minimumFractionDigits: 2 })}</td>
                                                                                                        <td className="text-end">${Number(fp.saldo).toLocaleString('es-MX', { minimumFractionDigits: 2 })}</td>
                                                                                                    </tr>
                                                                                                ))
                                                                                            ) : (
                                                                                                <tr>
                                                                                                    <td colSpan={3} className="text-center">Sin detalle de formas de pago</td>
                                                                                                </tr>
                                                                                            )}
                                                                                        </tbody>
                                                                                    </Table>
                                                                                </td>
                                                                            </tr>
                                                                        )}
                                                                    </>
                                                                ))
                                                            )}
                                                    </tbody>
                                                </Table>
                                            </td>
                                        </tr>
                                    )}                             
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        
            {/* Segundo modal para mostrar detalle del pedido */}
            <Modal
                show={showDetalleModal}
                onHide={() => setShowDetalleModal(false)}
                size="lg"
                centered
                container={document.body} // Asegura que el modal esté en el árbol DOM principal
            >
                <Modal.Header closeButton>
                    <Modal.Title>Detalle del Pedido No: {pedidoTicket.id_pedido} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {pedidoTicket ? (
                        <div ref={contentRef} className="m-3">
                            <TicketMov
                                pedidoTicket={pedidoTicket}
                                // detalle_pedido={detalle_pedido}
                                // detalle_formas_de_pago={detalle_formas_de_pago}
                            />                      
                        </div>
                    ) : (
                        <p>No hay detalles disponibles.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                            //console.log("Ref:", contentRef.current)
                            reactToPrintFn()
                         }}>
                            Imprimir Ticket
                    </Button>  

                    <Button 
                        variant="secondary" 
                        onClick={() => {  
                                setDetallePedido([]) 
                                setShowDetalleModal(false)  
                            }                    
                    }>
                        Cerrar
                    </Button>

                </Modal.Footer>
            </Modal>        
        </>        
    );
}

export default MovimientosCaja