import React, { useState, useContext, useRef } from 'react'
import { Button, Col, Form, InputGroup, Modal, Row } from 'react-bootstrap'
import { useFormasDePagoEnSitio, useEmpresaID } from '../../../tools/StateUtils'
import { abrirCaja, movimientosCaja, CerrarCaja } from '../../../models/Pedido/Pedido'
import DispatchContext from '../../../DispatchContext';
import TicketCaja from './TicketCaja';
import { useReactToPrint } from 'react-to-print';

function Caja({show, onHide, cajeros, caja, ip, setCaja}) {
    const formasDePago = useFormasDePagoEnSitio()
    const id_empresa = useEmpresaID()
    const initialState = {
        cajeroId: 0,
        password: '',
        tipoMovimiento: '',
        motivo: '',
        importe: 0,
        cerrarCaja: false,
        formasDePago: {}, // Aquí almacenaremos los importes de cada forma de pago
    };
    const [formData, setFormData] = useState(initialState); 
    const appDispatch = useContext(DispatchContext)
    const [showTicketCaja, setShowTicketCaja] = useState(false);
    const [ticketData, setTicketData] = useState(null);
    const contentRef  = useRef();
    const reactToPrintFn = useReactToPrint({contentRef})
    
    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };
    
    const handleFormaDePagoChange = (idFormaDePago, value) => {
        setFormData((prev) => ({
            ...prev,
            formasDePago: {
                ...prev.formasDePago,
                [idFormaDePago]: value,
            },
        }));
    };

    const handleSubmit = async () => {

        console.log(`Datos del formulario: ${formData}, cajaAbierta: ${caja.cajaAbierta}`);
        // Aquí puedes enviar los datos al backend o procesarlos como necesites
        try {
            // Si la caaja esta cerrada y si es un ingreso
            if (caja.cajaAbierta === 0 && formData.tipoMovimiento === 'ingreso'){
                const data = {
                    id_empresa,
                    ip,
                    id_cajero: Number(formData.cajeroId),
                    password: formData.password,
                    importe: Number(formData.importe),
                    motivo: formData.motivo
                }
                const response = await abrirCaja(data)
                console.log(`Apertura de caja: ${response}`)

                if (response.id_caja !== 0) {
                    // Actualizar el estado de la caja
                    setCaja((prevCaja) => ({
                        ...prevCaja,
                        cajaAbierta: 1,
                    }));

                    // Mostrar el modal con el TicketCaja
                    setTicketData(formData);
                    setShowTicketCaja(true);
                    onHide(); // Cerrar el modal actual
                } else {
                    appDispatch({
                        type: "alertMessage",
                        value: response.mensaje,
                        typeAlert: "danger",
                    });
                }                    
            } else if (caja.cajaAbierta === 1 && formData.cerrarCaja === false){
                const data = {
                    id_empresa,
                    id_caja: caja.id_caja,
                    id_cajero: Number(formData.cajeroId),
                    password: formData.password,
                    ingesoOEgreso: formData.tipoMovimiento === 'ingreso' ? 1 : 0,
                    importe: Number(formData.importe),
                    motivo: formData.motivo
                }
                console.log(`data: ${JSON.stringify(data)}`)                 
                const response = await movimientosCaja(data)

                console.log(`Movimientos de caja response: ${JSON.stringify(response)}`)

                appDispatch({
                    type: "alertMessage",
                    value: response.mensaje,
                    typeAlert: "success",
                });

                // Mostrar el modal con el TicketCaja
                setTicketData({
                    ...formData,
                    nombre_cajero: response.nombre_cajero
                });
                setShowTicketCaja(true);
                onHide(); // Cerrar el modal actual
                setFormData(initialState); // Limpia el formulario             

            } else if (caja.cajaAbierta === 1 && formData.cerrarCaja === true) {

                const formasDePagoArray = Object.entries(formData.formasDePago)
                .filter(([_, importe]) => Number(importe) > 0) // Opcional: solo los que tengan importe > 0
                .map(([idFormaDePago, importe]) => ({
                    idFormaDePago: Number(idFormaDePago),
                    importe: Number(importe)
                })); 

                const sumaImportesFormaDePago = formasDePagoArray.reduce((acc, curr) => acc + curr.importe, 0);

                const data = {
                    id_empresa,
                    id_caja: caja.id_caja,
                    id_cajero: Number(formData.cajeroId),
                    password: formData.password,
                    importe: Number(formData.importe),
                    motivo: formData.motivo,
                    formasDePago: formasDePagoArray,
                    sumaImportesFormaDePago,
                    efectivoEnCaja: formasDePagoArray[0].importe
                }
                console.log(`data: ${JSON.stringify(data)}`)                 
                const response = await CerrarCaja(data)

                console.log(`Movimientos de caja response: ${JSON.stringify(response)}`)

                appDispatch({
                    type: "alertMessage",
                    value: response.mensaje,
                    typeAlert: "success",
                });

                // Mostrar el modal con el TicketCaja
                setTicketData({
                    ...formData,
                    nombre_cajero: response.nombre_cajero
                });
                // Actualiza el estado de la caja a cerrada)
                setCaja(prevCaja => ({
                    ...prevCaja,
                    cajaAbierta: 0
                })) 
                // Actualizar el estado de la caja
                setShowTicketCaja(true);
                onHide(); // Cerrar el modal actual
                setFormData(initialState); // Limpia el formulario    
            }
            
        } catch (error) {
            console.error("Error al crear el pedido:", error);
            appDispatch({
                type: "alertMessage",
                value: error.message,
                typeAlert: "danger",
            });  
        }
    };
    
    const handleLimpiar = () => {setFormData(initialState)}

    const isFormValid = () => {
        // Verificar si los campos obligatorios están completos
        if (!formData.cajeroId || !formData.password || !formData.tipoMovimiento || !formData.motivo || !formData.importe) {
            return false;
        }
    
        // // Si "Cerrar Caja" está marcado, verificar que todas las formas de pago tengan valores
        // if (formData.cerrarCaja) {
        //     return formasDePago.every((forma) => formData.formasDePago[forma.id_forma_de_pago] && formData.formasDePago[forma.id_forma_de_pago] > 0);
        // }

        // Si "Cerrar Caja" está marcado, verificar que al menos una forma de pago tenga un valor mayor a 0
        if (formData.cerrarCaja) {
            return Object.values(formData.formasDePago).some((importe) => importe > 0);
        }        
    
        return true;
    };    

  return (
    
    <>
        {/* Modal forma captura */}
        <Modal show={show} onHide={onHide} size='lg' centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h5>Movimientos de Caja</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Select
                                value={formData.cajeroId}
                                onChange={(e) => handleChange('cajeroId', e.target.value)}
                            >
                                <option value="">Seleccione un cajero</option>
                                {cajeros.map((cajero) => (
                                                <option key={cajero.id_cajero} value={cajero.id_cajero}>
                                                    {cajero.nombre}
                                                </option>
                                            ))}
                            </Form.Select>
                        </Col>
                        <Col>
                            <Form.Control
                                type="password"
                                placeholder="Contraseña del cajero"
                                value={formData.password}
                                autoComplete='off'
                                onChange={(e) => handleChange('password', e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col>
                            <Form.Select
                                value={formData.tipoMovimiento}                            
                                onChange={(e) => handleChange('tipoMovimiento', e.target.value)}
                            >
                                <option value="">Seleccione un movimiento</option>
                                <option value="ingreso">Ingreso</option>
                                {caja.cajaAbierta === 1 && (
                                    <option value="egreso">Egreso</option>  
                                )}
                            </Form.Select>
                        </Col>
                        <Col>
                            <InputGroup>
                                <InputGroup.Text>$</InputGroup.Text>
                                <Form.Control
                                    type="number"
                                    placeholder="Importe del movimiento"
                                    value={formData.importe}
                                    autoComplete='off'
                                    onChange={(e) => handleChange('importe', e.target.value)}
                                />
                            </InputGroup>
                        </Col>

                    </Row>
                    <Row className='mt-3'>
                    </Row>
                    <Row className='mt-3'>
                        <Col>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                placeholder="Ingrese el motivo del movimiento"
                                value={formData.motivo}
                                autoComplete='off'
                                onChange={(e) => handleChange('motivo', e.target.value)}
                            />  
                        </Col> 
                    </Row>
                    <Row className='mt-3'>
                        <Col>
                            <Form.Check
                                type="checkbox"
                                label="¿ Cerrar caja ?"
                                checked={formData.cerrarCaja}
                                disabled={formData.tipoMovimiento === 'ingreso' || caja.cajaAbierta === 0}
                                onChange={(e) => handleChange('cerrarCaja', e.target.checked)}
                            />
                        </Col>  
                    </Row>
                    {formData.cerrarCaja && (
                        <Row className='mt-3'>
                            <p className='text-center fw-bold fs-6'>Capture los importes recibidos de las siguientes formas de pago:</p>
                            {formasDePago.map((forma) => (
                                <React.Fragment key={forma.id_forma_de_pago}>
                                    <Col md={6}>
                                        <Form.Label>{forma.descripcion}:</Form.Label>
                                    </Col>
                                    <Col md={6} className='d-flex align-items-center mt-2'>
                                        <InputGroup>
                                            <InputGroup.Text>$</InputGroup.Text>    
                                            <Form.Control
                                                type="number"
                                                // placeholder={`Importe para ${forma.descripcion}`}
                                                autoComplete="off"
                                                value={formData.formasDePago[forma.id_forma_de_pago] || ''}
                                                onChange={(e) =>
                                                    handleFormaDePagoChange(forma.id_forma_de_pago, e.target.value)
                                                }
                                            />
                                        </InputGroup>
                                    </Col>
                                </React.Fragment>
                            ))}
                        </Row>  
                    )}
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='success' onClick={handleSubmit} disabled={!isFormValid()}>Guardar</Button>
                <Button variant='primary' onClick={handleLimpiar}>Limpiar</Button>
                <Button variant='primary' onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    
        {/* Modal TicketCaja */}
        <Modal show={showTicketCaja} onHide={() => setShowTicketCaja(false)} size="lg" centered onExited={() => setTicketData(null)}>
            <Modal.Header closeButton>
                <Modal.Title>Ticket de Caja</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {ticketData &&
                    <div ref={contentRef} className='m-3'>
                        <TicketCaja formData={ticketData} formasDePago={formasDePago} />
                    </div>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => {
                    reactToPrintFn()
                    }}>
                    Imprimir Ticket
                </Button>

                <Button variant="primary" onClick={() => {
                    setShowTicketCaja(false)                    
                }}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>        

    </>

    
    


  )
}

export default Caja