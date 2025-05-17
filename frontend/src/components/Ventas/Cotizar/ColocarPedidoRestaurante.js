import React, { useState, useEffect, useRef, useContext } from 'react'
import { Modal, Row, Col, Form, Button, ButtonGroup, Badge, Table, Tab, Tabs } from "react-bootstrap";
import { crearPedido, getTipoCliente } from '../../../models/Pedido/Pedido';
import StateContext from '../../../StateContext';
import DispatchContext from '../../../DispatchContext';
import { BsSearch } from "react-icons/bs"
import { getClientePorTelefonoOCelular } from "../../../models/Cliente/Cliente"
import { useTipoPedido, useFormasDePagoEnSitio, useUsuarioID, useEmpresaID } from '../../../tools/StateUtils';
import './colocarPedidoRestaurante.css'

export default function ColocarPedidoRestaurante({ show, onHide, onResetPagos, totalPrice, 
    currencyFormat, onGuardarDetalleDelPago, detallePedido, onSetIdPedido, colonias, setDomicilioTicket,
    pedidoPreview, setPedidoPreview, cargoDelivery, setCargoDelivery }) {
  
    const [tipoPago, setTipoPago] = useState("efectivo"); 
    const [pagoParcialoTotal, setPagoParcialoTotal] = useState("total"); 
    const cantidadAPagarRef = useRef(null)
    const celularRef = useRef(null)
    const nombreRef = useRef(null)
    const motivoCancelacionRef = useRef(null)
    const coloniaNuevaRef = useRef(null)
    const [idPedido, setIdPedido] = useState(0)
    const [celular, setCelular] = useState(0)
    const [nombreCliente, setNombreCliente] = useState('')
    const [id_cliente, setId_cliente] = useState(0)
    const [tipoPedidoSeleccionado, setTipoPedidoSeleccionado] = useState(1);
    //const [tipoPedidoDescripcion, setTipoPedidoDescripcion] = useState('')
    const [id_direccion, setId_direccion] = useState(0);
    const [formaDePagoSeleccionada, setFormaDePagoSeleccionada] = useState(1);
    const [colonia, setColonia] = useState('');
    const [coloniaNueva, setColoniaNueva] = useState('');
    const [coloniaNuevaCargoEnvio, setColoniaNuevaCargoEnvio] = useState(0);
    const [coloniaNombreSeleccionada, setColoniaNombreSeleccionada] = useState('');
    const [calle, setCalle] = useState('');
    const [numero, setNumero] = useState('');
    const [entreCalles, setEntreCalles] = useState('');
    const [referencia, setReferencia] = useState('');
    const [cantidadAPagar, setCantidadAPagar] = useState(0)
    const [cargoColonia, setCargoColonia] = useState(0) // Cargo de la colonia, lo obtengo de buscar cliente
    //const [cargoDelivery, setCargoDelivery] = useState(0) // Lo asigno cuando se selecciona envio a domicilio y es con el que se calcula el total a pagar
    const [pagos, setPagos] = useState([]); // Estado para almacenar los pagos realizados
    const totalPagos = pagos.reduce((total, item) => total + item.cantidadAPagar, 0)
    const [saldo, setSaldo] = useState(0)
    const appState = useContext(StateContext)
    const appDispatch = useContext(DispatchContext)
    const [ayudaNombre, setAyudaNombre] = useState('')
    const [ isFetching, setIsFetching] = useState(false)
    const tipoPedido = useTipoPedido() 
    const formasDePago = useFormasDePagoEnSitio() 
    const id_usuario = useUsuarioID()
    const [key, setKey] = useState('cliente');
    const [showCancelarPedido, setShowCancelarPedido] = useState(false)
    const [motivoCancelacion, setMotivoCancelacion] = useState('')
    const [pedidoCancelado, setPedidoCancelado] = useState(false)
    const [tipoCliente, setTipoCliente] = useState(getTipoCliente());
    const [tipoClienteSeleccionado, setTipoClienteSeleccionado] = useState(0)
    const [subtotal, setSubTotal] = useState(0)


const handledBuscarCliente = async celular => {
        setIsFetching(true)  

        if (celular === '0'){
            setNombreCliente('Cliente Mostrador')
            //setTipoPedidoSeleccionado(1)
            //setFormaDePagoSeleccionada(1)
        } else {

            try {
                
                const clienteData = await getClientePorTelefonoOCelular(appState.idEmpresa, celular)
    
                //const data = response.data.cliente[0]
                console.log("data cliente ->", clienteData)
    
    
                if (clienteData.id_cliente === 0){
                    setAyudaNombre('Cliente no encontrado...')
                    setCargoColonia(0)
                    setTimeout(() => {
                        setEntreCalles(clienteData.entre_calles)
                        setReferencia(clienteData.referencia)
                        nombreRef.current.focus()
                    }, 100)
                } else {
                    setAyudaNombre('')    
                    setNombreCliente(clienteData.nombre_cliente)
                    setId_direccion(clienteData.id_direccion)
                    setId_cliente(clienteData.id_cliente)
                    setCalle(clienteData.calle)
                    setNumero(clienteData.numero_exterior)
                    setColonia(clienteData.id_colonia  === 0 ? null : clienteData.id_colonia)
                    setColoniaNombreSeleccionada(clienteData.colonia)
                    setEntreCalles(clienteData.entre_calles)
                    setReferencia(clienteData.referencia)
                    setCargoColonia(Number(clienteData.cargo_delivery))
                }            
    
            } catch (error) {
                console.error("Error al obtener buscar cliente:", error)
                appDispatch({
                    type: "alertMessage",
                    value: error.message,
                    typeAlert: "danger",
                });
            }
        }
        

        setIsFetching(false)
    }    


    // Función para reiniciar los pagos
    const resetPagos = () => {
        setPagos([]); // Reinicia el estado de pagos
    };

    // Pasa la función de reinicio al componente padre
    useEffect(() => {
        if (onResetPagos) {
            onResetPagos(resetPagos);
            setCantidadAPagar(subtotal)
            setPagoParcialoTotal("total")
            setTipoPago("efectivo")
            setNombreCliente('')
            setPagos([])
            setSubTotal(totalPrice)
            setCargoDelivery(0)
            //celularRef.current.focus()
        }
    }, [onResetPagos, totalPrice]);   

    useEffect(() => {
        if (showCancelarPedido && motivoCancelacionRef.current) {
            motivoCancelacionRef.current.focus();
        }
    }, [showCancelarPedido]) 

    // Establece el foco en el campo de celular al cargar el modal
    useEffect(() => {
        console.log('tipo cliente ->', tipoCliente)
        if (show) {
            setTimeout(() => {
                if (celularRef.current) {
                    celularRef.current.focus();
                }
                setPagos([])
            }, 100); // Retrasa la ejecución al siguiente ciclo del evento
        }
        setPagoParcialoTotal("total")
        setKey('cliente')
        setTipoPedidoSeleccionado(1)
        setFormaDePagoSeleccionada(1)
        setTipoClienteSeleccionado(0)
        console.log('Pedido preview', pedidoPreview)
        // Asigno los datos del pedidoPreview
        if (pedidoPreview){
            if (pedidoPreview.detalle) {
                console.log('pedido preview')
                console.log("Valor de celular:", pedidoPreview.detalle.celular);
                setCelular(Number(pedidoPreview.detalle.celular))
                setNombreCliente(pedidoPreview.detalle.nombre)
                setPagos(pedidoPreview.detalle.pagos)
                setId_cliente(pedidoPreview.id_cliente)
                setId_direccion(pedidoPreview.id_direccion)
                setTipoPedidoSeleccionado(pedidoPreview.id_tipo_pedido)
                setTipoClienteSeleccionado(pedidoPreview.id_tipo_cliente)
                setSaldo(pedidoPreview.saldo)
                setCantidadAPagar(pedidoPreview.total) 
                setCargoDelivery(pedidoPreview.detalle.cargo_delivery)           
            }
            if (pedidoPreview.pedido_domicilio){
                setCalle(pedidoPreview.pedido_domicilio.calle)
                setColonia(pedidoPreview.pedido_domicilio.id_colonia)
                setNumero(pedidoPreview.pedido_domicilio.numero_exterior)
                setReferencia(pedidoPreview.pedido_domicilio.referencia)
            }
        else {
            setCelular(0)
            setNombreCliente('Cliente Mostrador')
            setPagos([])
            setId_cliente(0)
            setId_direccion(0)
            setTipoPedidoSeleccionado(1)
            setTipoClienteSeleccionado(0)
            setCalle('')
            setColonia('')
            setNumero('')
            setReferencia('')}
            setPedidoCancelado(false)
            setMotivoCancelacion('')
            setShowCancelarPedido(false)
        }
    
        // setTipoPedidoDescripcion(tipoPedido.find(tipo => tipo.id_tipo_pedido === tipoPedidoSeleccionado).nombre || '') 
        // console.log('tipo pedido:', tipoPedido)
        // console.log('tipo pedido seleccionado', tipoPedidoSeleccionado)

    }, [show]);   

    const handleAgregarPago = (cantidadAPagar) => {
        const cantidad = Number(cantidadAPagar);
        const totalPagos = pagos.reduce((total, item) => total + item.cantidadAPagar, 0);
        const saldoCalculado = Number(subtotal) + cargoDelivery - totalPagos - cantidad;

        // Agrega un nuevo pago al arreglo
        setPagos((prevPagos) => {

            const updatedPagos = [
                ...prevPagos,
                { formaDePagoSeleccionada, tipoPago, pagoParcialoTotal, cantidadAPagar: cantidad, 
                    saldo: saldoCalculado },
            ];
    
            // Calcula el totalPagos basado en los pagos actualizados
            const totalPagosActualizado = updatedPagos.reduce((total, item) => total + item.cantidadAPagar, 0);
    
            // Actualiza cantidadAPagar basado en el nuevo totalPagos
            setCantidadAPagar(Number(subtotal) + cargoDelivery - totalPagosActualizado);
            setSaldo(Number(subtotal) + cargoDelivery - totalPagosActualizado)
    
            return updatedPagos;
        });

        // Limpia el campo de cantidad a pagar
        cantidadAPagarRef.current.focus();        
    };    

    const handleSetPedidoPreview = () => {
        const detalle = {
            celular,
            nombre: nombreCliente,
            pagos,
            pedidoCancelado: false,
            motivoCancelacion: '',
            cargo_delivery: Number(cargoDelivery) || 0           
        };
        const pedido_domicilio = {
            id_direccion,
            id_colonia: colonia,
            colonia: colonia === 0 ? coloniaNueva : coloniaNombreSeleccionada,
            coloniaNueva,
            calle,
            numero_exterior: numero,
            entre_calles: entreCalles,
            referencia
        }
        const Pedido = {
            id_empresa: appState.idEmpresa, // Cambia esto según tu lógica
            id_pedido: 0, // Cambia esto según tu lógica
            id_usuario,
            id_cliente: id_cliente,
            id_direccion, // Cambia esto según tu lógica
            id_pedido_estatus: 1, // Cambia esto según tu lógica
            id_tipo_pedido: tipoPedidoSeleccionado, // Cambia esto según tu lógica
            id_tipo_cliente: tipoClienteSeleccionado,
            total: totalPrice,
            importe_pagado: totalPagos,
            saldo: totalPrice - totalPagos,
            fecha_creacion: new Date(),
            fecha_actualizacion: new Date(),
            pedido_detalle: detallePedido.map(({ id_producto, cantidad, precio }) => ({
                id_producto,
                cantidad,
                precio,
            })),
            pedido_formas_de_pago: pagos.map(({ formaDePagoSeleccionada, tipoPago, pagoParcialoTotal, cantidadAPagar, saldo }) => ({
                id_forma_de_pago: formaDePagoSeleccionada,
                es_pago_total: pagoParcialoTotal === "total" ? 1 : 0,
                monto_pagado: cantidadAPagar,
                saldo
            })),
            pedido_domicilio, // Solo si es a domicilio
            detalle            
        }
        setPedidoPreview(Pedido)
        onHide()                          
    }

    const handleCrearPedido = async () => {
        const detalle = {
            celular,
            nombre: nombreCliente,
            pagos,
            pedidoCancelado: motivoCancelacion !== '' ? true : false,
            motivoCancelacion,
            cargarColonias: coloniaNueva ? true : false
        };

        const pedido_domicilio = {
            id_direccion,
            id_colonia: colonia,
            colonia: colonia === "0" ? coloniaNueva : coloniaNombreSeleccionada,
            calle,
            numero_exterior: numero,
            entre_calles: entreCalles,
            referencia,
            cargo_nueva_colonia: coloniaNuevaCargoEnvio
        }

        setDomicilioTicket(tipoPedidoSeleccionado === 2 ? [pedido_domicilio] : [])
        console.log("Pedido Domicilio:", pedido_domicilio)
        console.log("pedido cancelado:", pedidoCancelado)
        console.log("tipoPedidoSeleccionado:", tipoPedidoSeleccionado)

        const nuevoPedido = {
            id_empresa: appState.idEmpresa, // Cambia esto según tu lógica
            id_pedido: 0, // Cambia esto según tu lógica
            id_usuario,
            id_cliente: id_cliente,
            id_direccion: 0, // Cambia esto según tu lógica
            id_pedido_estatus: motivoCancelacion !== '' ? 6 : 1, // Cambia esto según tu lógica
            //id_tipo_cliente: tipoCliente,
            id_tipo_pedido: tipoPedidoSeleccionado, // Cambia esto según tu lógica
            total: totalPrice,
            importe_pagado: totalPagos,
            saldo: totalPrice - totalPagos,
            fecha_creacion: new Date(),
            fecha_actualizacion: new Date(),
            motivo_cancelacion: motivoCancelacion,
            pedido_detalle: detallePedido.map(({ id_producto, cantidad, precio }) => ({
                id_producto,
                cantidad,
                precio,
            })),
            pedido_formas_de_pago: pagos.map(({ formaDePagoSeleccionada, tipoPago, pagoParcialoTotal, cantidadAPagar, saldo }) => ({
                id_forma_de_pago: formaDePagoSeleccionada,
                es_pago_total: pagoParcialoTotal === "total" ? 1 : 0,
                monto_pagado: cantidadAPagar,
                saldo
            })),
            pedido_domicilio: tipoPedidoSeleccionado === 2 ? [pedido_domicilio] : [], // Solo si es a domicilio
        }

        console.log("Nuevo Pedido:", nuevoPedido);

        try {
            // Llama a la función crearPedido y espera la respuesta
            const response = await crearPedido(nuevoPedido);
            console.log("Pedido creado con éxito:", response.id_pedido);
    
            // Obtén el id_pedido del servidor
            setIdPedido(response.id_pedido);
            console.log("ID del Pedido creado:", idPedido);

            if (onSetIdPedido) {
                onSetIdPedido(response.id_pedido); // Llama a la función para pasar el ID a Cotizar
            }            
    
            
            onGuardarDetalleDelPago(detalle); // Guarda los datos y cierra el modal

            // Limpia los pagos después de crear el pedido
            setPagos([]);
            setNombreCliente('');
            setCelular('');
        
            // appDispatch({
            //     type: "alertMessage",
            //     value: response.message + " No. " + response.id_pedido,
            //     typeAlert: "success",
            // }); 
        } catch (error) {
            console.error("Error al crear el pedido:", error);
            appDispatch({
                type: "alertMessage",
                value: error.message,
                typeAlert: "danger",
            });            
        }        

        // onGuardarDetalleDelPago(detalle); // Guarda los datos y cierra el modal
        // setCelular('');
        // setNombreCliente('');
        // setPagos([]);
    };    

    const resetPedido = () => {
        setPagos([]);
        setCantidadAPagar(0);
        setSaldo(0);
        setNombreCliente('');
        setCelular(0);
        setMotivoCancelacion('');
        setShowCancelarPedido(false);
    };
  
    return (
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {!showCancelarPedido && (
                <>
                    {/* <Row className="justify-content-between align-items-center text-start">
                        <Col xs={12} sm={4} md={4} lg={4} className="mb-2">Sub Total:<Badge>{totalPriceCurrency}</Badge></Col>
                        <Col xs={12} sm={4} md={4} lg={4} className="mb-2">Envío:<Badge>{currencyFormat(cargoDelivery)}</Badge></Col>
                        <Col xs={12} sm={4} md={4} lg={4} className="mb-2">Total:<Badge>{currencyFormat(totalPrice + cargoDelivery)}</Badge></Col>
                        <Col xs={12} sm={4} md={4} lg={4} className="mb-2">Pagado:<Badge bg="warning">{currencyFormat(totalPagos)}</Badge></Col>                                  
                    </Row>  */}
                    <div>
                        <Table id='totales_header' responsive bordered striped hover size="sm" className="text-center mt-3 mb-0">
                            <thead>
                                <tr>
                                    <th>Subtotal</th>
                                    <th>Envío</th>
                                    <th>Total</th>
                                    <th>Pagado</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><Badge>{currencyFormat(subtotal)}</Badge></td>
                                    <td><Badge>{currencyFormat(cargoDelivery)}</Badge></td>
                                    <td><Badge>{currencyFormat(subtotal + cargoDelivery)}</Badge></td>
                                    <td><Badge>{currencyFormat(totalPagos)}</Badge></td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                </>
            )}
            {showCancelarPedido && (
                <h4>Cancelación del pedido</h4>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

            {!showCancelarPedido && (

            <Form>
                <Tabs
                    id="controlled-tab"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className='mb-3'
                >

                    {/* Datos del Cliente */}
                    <Tab eventKey="cliente" title="Cliente" className="p-3">
                        {/* <h6>Datos del Cliente</h6> */}
                        <Form.Group>
                            <Row>
                                <Col>
                                    <ButtonGroup className="w-100 gap-2 mt-3 mb-5">
                                        {tipoCliente.map((tipo, index) => (
                                            <Button
                                                key={index}
                                                variant={tipoClienteSeleccionado === tipo.idTipoCliente ? "primary" : "outline-primary"}
                                                size="sm"
                                                className="w-100"
                                                onClick={() => {
                                                    //console.log('Tipo Cliente presionado =>', tipo.idTipoCliente)
                                                    //console.log('Tipo Cliente seleccionado =>', tipoClienteSeleccionado)
                                                    setTipoClienteSeleccionado(tipo.idTipoCliente)
                                                    if (tipo.idTipoCliente === 0){
                                                        setCelular(0)
                                                        setNombreCliente('Cliente Mostrador')
                                                    } else {
                                                        setCelular('')
                                                        setNombreCliente('')
                                                        setTimeout(() => {
                                                            if (celularRef.current){
                                                                celularRef.current.focus()
                                                            }
                                                        }, 100)
                                                    }
                                                }}  
                                            >
                                                {tipo.tipoCliente}
                                            </Button>
                                        ))}
                                    </ButtonGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Row>
                                        <Col xs={9}>
                                            {/* <Form.Label>Celular:</Form.Label> */}
                                            <Form.Control 
                                                type="number" 
                                                id="celular" 
                                                name="celular" 
                                                placeholder="Registar celular" 
                                                autoComplete="off"
                                                value={celular}
                                                ref={celularRef}
                                                onChange={e => {
                                                    if (e.target.value === '0') {setNombreCliente('Cliente Mostrador')}
                                                    setCelular(e.target.value)
                                                }}
                                                disabled={tipoClienteSeleccionado === 0}
                                            />                                
                                        </Col>
                                        <Col xs={3}>
                                            <Button variant="primary" 
                                                size="sm" className="w-100"
                                                onClick={() => handledBuscarCliente(celular)} 
                                                title="Presione aquí para buscar el cliente por número de teléfono" 
                                                disabled={isFetching || tipoClienteSeleccionado === 0}
                                            >
                                                <BsSearch />
                                            </Button>                                                            
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Form.Control 
                                        ref={nombreRef}
                                        type="text" 
                                        id="nombre" 
                                        name="nombreCliente" 
                                        placeholder= {ayudaNombre === '' ? "Nombre del cliente" : ayudaNombre}
                                        autoComplete="off" 
                                        value={nombreCliente}
                                        onChange={e => setNombreCliente(e.target.value.toUpperCase())}
                                        disabled={tipoClienteSeleccionado === 0}
                                    />
                                </Col>
                            </Row>
                        </Form.Group>                            
                    </Tab>
                
                    {/* Tipo de Pedido */}
                    <Tab eventKey="pedido" title={`Tipo de Pedido: ${tipoPedido.find(col => col.id_tipo_pedido === tipoPedidoSeleccionado)?.tipo_pedido || ''}`} className="p-3">
                        {/* <h6 className='my-3'>Tipo de Pedido</h6> */}
                        
                        <Form.Group>
                            <Row>
                                <Col>
                                    <ButtonGroup className="w-100 gap-2 my-5">
                                        {tipoPedido.map((tipo, index) => (
                                            <Button
                                                key={index}
                                                variant={tipoPedidoSeleccionado === tipo.id_tipo_pedido ? "primary" : "outline-primary"}
                                                size="sm"
                                                className="w-100"
                                                onClick={() => {
                                                    // console.log("Tipo de pedido seleccionado:", tipo.id_tipo_pedido)
                                                    // console.log("celular:", celular)
                                                    // console.log("condicion:", tipo.id_tipo_pedido === 2)
                                                    setTipoPedidoSeleccionado(tipo.id_tipo_pedido)
                                                    if (tipo.id_tipo_pedido === 2){
                                                        console.log('cargo colonia', cargoColonia) 
                                                        setCargoDelivery(cargoColonia)
                                                        setCantidadAPagar(subtotal + cargoColonia)
                                                    } else {
                                                        setCargoDelivery(0)
                                                    }
                                                }}
                                                disabled={tipo.id_tipo_pedido === 2 && celular === 0}
                                            >
                                                {tipo.tipo_pedido}
                                            </Button>
                                        ))}
                                    </ButtonGroup>
                                </Col>
                            </Row>
                        </Form.Group>

                    {/* Campos adicionales para id_tipo_pedido === 2 */}
                    {tipoPedidoSeleccionado === 2 && (
                        <Form.Group className="mt-3">
                            <Row>
                                <Col md={6}>
                                    {/* <Form.Label>Colonia</Form.Label> */}
                                    <Form.Select
                                        value={colonia}
                                        onChange={(e) => {
                                            setColonia(e.target.value)

                                            const selectedColonia = colonias.find(col => col.id_colonia === e.target.value);
                                            setColoniaNombreSeleccionada(selectedColonia ? selectedColonia.nombre : '');
                                            if (e.target.value === "0"){ 
                                                setCargoDelivery(0)
                                                setColoniaNuevaCargoEnvio(0)
                                                setColoniaNueva('')
                                            } else {
                                                setCargoDelivery(cargoColonia)
                                            }
                                            
                                            setTimeout(() => {
                                                if (coloniaNuevaRef.current){
                                                    coloniaNuevaRef.current.focus()
                                                }
                                            }, 100)
                                        }}
                                    >
                                        <option value="">Seleccione una colonia</option>
                                        {colonias.map((colonia) => (
                                            <option key={colonia.id_colonia} value={colonia.id_colonia}>
                                                {colonia.nombre}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col md={6}>
                                        {colonia === "0" && (
                                            <>
                                                <Form.Control
                                                    ref={coloniaNuevaRef}
                                                    type="text"
                                                    placeholder="Ingrese la colonia"
                                                    value={coloniaNueva}
                                                    autoComplete='off'
                                                    onChange={(e) => setColoniaNueva(e.target.value)}
                                                />
                                                <Form.Control
                                                    type='number'
                                                    id="cargo_nueva_colonia"
                                                    value={coloniaNuevaCargoEnvio}
                                                    placeholder='cargo extra'
                                                    autoComplete='off'
                                                    onChange={(e) => {
                                                        setColoniaNuevaCargoEnvio(e.target.value)
                                                        setCargoDelivery(Number(e.target.value))
                                                    }}
                                                />
                                            </>
                                        )}
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col md={4}>
                                    {/* <Form.Label>Calle</Form.Label> */}
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese la calle"
                                        value={calle}
                                        autoComplete='off'
                                        onChange={(e) => setCalle(e.target.value)}
                                    />
                                </Col>
                                <Col md={2}>
                                    {/* <Form.Label>Número</Form.Label> */}
                                    <Form.Control
                                        type="text"
                                        placeholder="Número"
                                        value={numero}
                                        autoComplete='off'
                                        onChange={(e) => setNumero(e.target.value)}
                                    />
                                </Col>
                                <Col md={6}>
                                    {/* <Form.Label>Entre calles (opcional)</Form.Label> */}
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese entre calles"
                                        value={entreCalles}
                                        autoComplete='off'
                                        onChange={(e) => setEntreCalles(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                    <Col md={12}> 
                                        {/* <Form.Label>Referencia (opcional)</Form.Label> */}
                                        <Form.Control
                                            as="textarea"
                                            rows={2}
                                            placeholder="Ingrese una referencia y/o instrucciones adicionales"
                                            value={referencia}
                                            autoComplete='off'
                                            onChange={(e) => setReferencia(e.target.value)}
                                        />                                    
                                    </Col>
                                </Row>                            
                        </Form.Group>
                    )}                        

                     </Tab>                    

                    {/* Formas de Pago */}
                     <Tab eventKey="pago" title="Forma de Pago" className="p-3">
                        <Form.Group>
                            <Row className="mt-3 d-flex align-items-stretch">
                                {formasDePago.map((formaDePago, index) => (
                                    <Col 
                                        key={index} 
                                        xs={6}  // 2 botones por fila en pantallas muy pequeñas
                                        sm={3}  // 4 botones por fila en pantallas pequeñas
                                        md={3}  // 4 botones por fila en pantallas medianas
                                        lg={2}  // 6 botones por fila en pantallas grandes
                                        className="mb-2"
                                    >
                                        <Button
                                            variant={formaDePagoSeleccionada === formaDePago.id_forma_de_pago ? "primary" : "outline-primary"}
                                            size="sm"
                                            className="w-100 h-100 responsive-button"
                                            onClick={() => {
                                                setFormaDePagoSeleccionada(formaDePago.id_forma_de_pago);
                                                setTipoPago(formaDePago.descripcion);
                                            }}
                                            placeholder={formaDePago.descripcion}
                                        >
                                            {formaDePago.descripcion}
                                        </Button>
                                    </Col>
                                ))}
                            </Row>
                        </Form.Group>

                        <h6 className="mt-3">Tipo de Pago</h6>
                        <Form.Group>
                            <Row>
                                {/* Columna izquierda */}
                                <Col>
                                    {/* Botones de tipo de monto */}
                                    <ButtonGroup className="w-100 gap-3 mt-3">
                                        <Button
                                            variant={pagoParcialoTotal === "total" ? "primary" : "outline-primary"}
                                            size="sm"
                                            className="w-50"
                                            onClick={() => {
                                                setPagoParcialoTotal("total")
                                                setCantidadAPagar(0)
                                            } }
                                            disabled={pagoParcialoTotal === "parcial"}
                                        >
                                            Pago Total
                                        </Button>
                                        <Button
                                            variant={pagoParcialoTotal === "parcial" ? "primary" : "outline-primary"}
                                            size="sm"
                                            className="w-50"
                                            onClick={() => {
                                                setPagoParcialoTotal("parcial")
                                                setCantidadAPagar(0)
                                                cantidadAPagarRef.current.focus()
                                            }}
                                        >
                                            Pago Parcial
                                        </Button>
                                    </ButtonGroup>
                                    {/* Input para cantidad a pagar */}
                                    <div className="d-flex gap-2 mt-3">
                                        <Form.Control
                                            value={cantidadAPagar + cargoDelivery}
                                            autoFocus
                                            ref={cantidadAPagarRef}
                                            type="number"
                                            placeholder="Cantidad a pagar"
                                            className="text-center w-100"
                                            autoComplete="off"
                                            onChange={e => setCantidadAPagar(parseFloat(e.target.value) || 0)}
                                            // style={{ maxWidth: "150px" }}
                                        />
                                        <Button 
                                            variant="outline-success"
                                            size="sm" 
                                            className="w-100"
                                            disabled={
                                                nombreCliente.trim() === '' || 
                                                cantidadAPagar === 0 || 
                                                (cantidadAPagar < totalPrice && pagoParcialoTotal === 'total') ||
                                                (cantidadAPagar > saldo && tipoPago === 'tarjeta') ||
                                                // Nuevas validaciones para tipoPedidoSeleccionado === 2
                                                (tipoPedidoSeleccionado === 2 && (!colonia || (colonia === "0" && coloniaNueva.trim() === ''))) || 
                                                (tipoPedidoSeleccionado === 2 && numero.trim() === '')
                                            }
                                            onClick={() => {
                                                console.log({
                                                    celular,
                                                    nombreCliente,
                                                    cantidadAPagar,
                                                    totalPrice,
                                                    pagoParcialoTotal,
                                                    saldo,
                                                    tipoPago,
                                                    isDisabled:
                                                        
                                                        nombreCliente.trim() === '' || 
                                                        cantidadAPagar === 0 || 
                                                        (cantidadAPagar < totalPrice && pagoParcialoTotal === 'total') ||
                                                        (cantidadAPagar > saldo && tipoPago === 'tarjeta')
                                                });                                        
                                                handleAgregarPago(cantidadAPagar + cargoDelivery)
                                                //setTipoPago("efectivo")
                                                //setPagoParcialoTotal("total")
                                                //alert(totalPrice - totalPagos)
                                                console.log("totalPagos:", totalPagos)
                                                
                                                cantidadAPagarRef.current.focus()
                                            }}
                                        >
                                            Agregar Pago
                                        </Button>


                                        {/* <div className="d-flex align-items-center gap-2">
                                        </div> */}
                                    </div>
                                </Col>

                                {/* Columna derecha (vacía por ahora) */}
                                <Col>
                                    <h6>Pagos Realizados:</h6>
                                    <div className="border p-2">
                                        {pagos.length === 0 ? (
                                            <p className="text-muted">No hay pagos registrados.</p>
                                        ) : (
                                            <>
                                                <Table striped bordered hover size="sm">
                                                    <thead>
                                                        <tr>
                                                            <th className="text-center">#</th>
                                                            <th>Forma Pago</th>
                                                            <th className="text-end">Pagado</th>
                                                            <th className="text-end">Saldo</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {pagos.map((pago, index) => (
                                                            <tr key={index}>
                                                                <td className="text-center">{index + 1}</td>
                                                                <td>{pago.tipoPago}</td>
                                                                <td className="text-end">${pago.cantidadAPagar.toFixed(2)}</td>
                                                                <td className="text-end">${pago.saldo.toFixed(2)}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                                <h5>
                                                    {totalPrice + cargoDelivery - totalPagos > 0 ? 'Saldo' : 'Cambio'}: <Badge bg={totalPrice + cargoDelivery - totalPagos === 0 ? "success" : "danger"}>{currencyFormat(totalPrice + cargoDelivery - totalPagos)}</Badge>        
                                                </h5>
                                            </>
                                            
                                        )}
                                    </div>
                                </Col>
                            </Row>                    
                        </Form.Group>
                        
                    </Tab>

                </Tabs>   
            </Form>

            )}

            {showCancelarPedido && (
                <>
                    <Form.Group>
                        <Row className='mt-3'>
                            <Col md={12}> 
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Ingrese el motivo de cancelación del pedido"
                                    value={motivoCancelacion}
                                    autoComplete='off'
                                    onChange={(e) => setMotivoCancelacion(e.target.value)}
                                    ref={motivoCancelacionRef}
                                />                                    
                            </Col>
                        </Row>                         
                    </Form.Group>                
            
                
                </>
            )}

        </Modal.Body>
        <Modal.Footer>
            {!showCancelarPedido && (
                <>
                    {/* Botón Regresar */}
                    {pagos.length === 0 && (
                        <Button variant="secondary" 
                            disabled={pagos.length > 0}
                            onClick={() => {
                            handleSetPedidoPreview()
                            //onHide()                
                        }}>
                            Regresar
                        </Button>            
                    )}    

                    {/* Botón Crear Pedido */}
                    <Button 
                        variant="primary"
                        onClick={() => {
                            setMotivoCancelacion('')
                            handleCrearPedido()
                        }
                        }
                        disabled={((totalPrice + cargoDelivery - totalPagos) > 0) ||
                            String(celular).trim() === '' ||
                            nombreCliente.trim() === '' || 
                            
                            // Nuevas validaciones para tipoPedidoSeleccionado === 2
                            (tipoPedidoSeleccionado === 2 && (!colonia || (colonia === "0" && ( coloniaNueva.trim() === '' || !coloniaNuevaCargoEnvio > 0) ) )) || 
                            (tipoPedidoSeleccionado === 2 && numero.trim() === '') 
                        }
                        >Crear pedido
                    </Button>   

                    {/* Botón Cancelar */}
                    {pagos.length > 0 && (
                        <Button variant="danger"                
                        onClick={() => {
                            setShowCancelarPedido(true)
                            //setPagos([])
                            //handleSetPedidoPreview()
                                        
                        }}>
                            Cancelar
                        </Button>                
                    )}
             
                </>
            )}
            {showCancelarPedido && (
                <>
                    <Button variant="secondary" 
                        //disabled={pagos.length > 0}
                        onClick={() => {
                            setShowCancelarPedido(false)
                            //handleSetPedidoPreview()
                            //onHide()                
                        }}>
                        Regresar
                    </Button>                     
                    <Button 
                        variant="danger"
                        disabled={!motivoCancelacion}
                        onClick={() => {
                            resetPedido()
                            //setShowCancelarPedido(false)
                            //setPedidoCancelado(true)
                            handleCrearPedido()
                        }}
                        >Cancelar pedido
                    </Button>                  
                </>
            )}
            
        </Modal.Footer>
      </Modal>
  )
}
