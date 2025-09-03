import React, { useState, useEffect } from 'react';
import { Form, Button, Table, Image, Modal, Row, Col, FloatingLabel, Pagination, Spinner } from 'react-bootstrap';
import { getKardex, getProveedoresFiltro, getProductosByProveedor } from '../../../models/Pedido/Producto';
import Page from '../../Page';
import { useEmpresaID } from '../../../tools/StateUtils';

export default function Kardex() {
    const id_empresa = useEmpresaID()
    const [sku, setSku] = useState('');
    const [id_proveedor, setIdProveedor] = useState('');
    const [proveedores, setProveedores] = useState([]);
    const [productosProveedor, setProductosProveedor] = useState([]);
    const [id_producto, setIdProducto] = useState(0)
    const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));
    const [tipoMovimiento, setTipoMovimiento] = useState('');
    const [kardexData, setKardexData] = useState(null);
    const [showImage, setShowImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);

    useEffect(() => {
        const fetchProveedores = async () => {
            try {
                const data = await getProveedoresFiltro(id_empresa);
                setProveedores(data.proveedores);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchProveedores();
    }, [id_empresa]); 

    useEffect(() => {
        const fetchProductosProveedor = async () => {
            try {
                const data = await getProductosByProveedor(id_empresa, id_proveedor);
                setProductosProveedor(data.productos);
            } catch (error) {
                setError(error.message);
                setProductosProveedor([]);
            }

        };

        fetchProductosProveedor();
    }, [id_empresa, id_proveedor]);         

    const handleBuscar = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await getKardex(id_empresa, sku, id_producto, fecha, tipoMovimiento, currentPage, rowsPerPage);
            console.log("Kardex data:", data);
            setKardexData(data);
            setTotalRecords(data.totalRecords);
        } catch (error) {
            setError(error.message);
            setKardexData(null);
            setTotalRecords(0);
        } finally {
            setLoading(false);
        }
    };

    const handleImageClick = () => {
        setShowImage(true);
    };    

    const closeImageModal = () => {
        setShowImage(false);
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        handleBuscar();
    };    


  return (
       <Page title="Kardex">
            <h2>Kardex</h2>
            <h6>Filtrar por:</h6>
            <Form>
                <Row className="mb-3">
                    <Col md={2}>
                        <FloatingLabel controlId="sku" label="SKU">
                            <Form.Control
                                type="text"
                                placeholder="SKU"
                                value={sku}
                                onChange={(e) => setSku(e.target.value)}
                                isInvalid={!!error}
                            />
                            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>
                    <Col md={2}>
                        <FloatingLabel controlId="id_proveedor" label="Proveedor">
                            <Form.Select value={id_proveedor} onChange={(e) => setIdProveedor(e.target.value)}>
                                <option value="">Todos</option>
                                {proveedores.map((proveedor) => (
                                    <option key={proveedor.id_proveedor} value={proveedor.id_proveedor}>
                                        {proveedor.nombre}
                                    </option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col md={3}>
                        <FloatingLabel controlId="nuevoProducto" label="Producto">
                            <Form.Select value={id_producto} onChange={(e) => setIdProducto(e.target.value)}>
                                <option value="">Seleccione un producto</option>
                                {productosProveedor.map((producto) => (
                                    <option key={producto.id_producto} value={producto.id_producto}>
                                        {producto.nombre}
                                    </option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                    </Col>                                        
                    <Col md={2}>
                        <FloatingLabel controlId="fecha" label="Fecha">
                            <Form.Control
                                type="date"
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                            />
                        </FloatingLabel>
                    </Col>
                    <Col md={2}>
                        <FloatingLabel controlId="tipoMovimiento" label="Tipo de Movimiento">
                            <Form.Select value={tipoMovimiento} onChange={(e) => setTipoMovimiento(e.target.value)}>
                                <option value="">Todos</option>
                                <option value="E">Entrada</option>
                                <option value="S">Salida</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col md={1}>
                        <Row className='pb-2'>
                            <Button variant="primary" size='sm' onClick={handleBuscar} disabled={loading || (sku === '' && id_producto === 0)}>
                                {loading ? <Spinner animation="border" size="sm" /> : 'Buscar'}
                            </Button>
                        </Row>
                        <Row>
                            <Button variant="secondary" size='sm' onClick={() => {
                                setSku('')
                                setIdProducto(0)
                                setFecha(new Date().toISOString().slice(0, 10))
                                setKardexData(null)
                            }}>
                                Limpiar
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </Form>
            <hr />

            {kardexData && kardexData.producto ? (
                <>
                    <h6>Información y movimientos del Producto:</h6>
                    <Row className='mb-4 text-center'>
                        <Col md={3}><strong>ID:</strong> {kardexData.producto.id_producto}</Col>
                        <Col md={3}><strong>Nombre:</strong> {kardexData.producto.nombre}</Col>
                        <Col md={3}><strong>Activo:</strong> {kardexData.producto.activo ? 'Sí' : 'No'}</Col>
                        <Col md={3}>
                            <Button variant="outline-info" onClick={handleImageClick}>
                                Ver Imagen
                            </Button>
                        </Col>
                    </Row>

                    <Modal show={showImage} onHide={closeImageModal} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Imagen del Producto: {sku}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Image src={kardexData.producto.image1} fluid />
                        </Modal.Body>
                    </Modal>

                    {/* <h4>Movimientos</h4> */}
                    {kardexData.movimientos && kardexData.movimientos.length > 0 ? (
                        <>
                            <Table striped bordered hover>
                                <thead>
                                    <tr className='text-center'>
                                        <th>ID Kardex</th>
                                        <th title='Id del Producto'>ID Prod</th>
                                        <th title='Fecha del Movimiento'>F Mov</th>
                                        <th title='Tipo de  Operación'>Tipo Op.</th>
                                        <th title='Tipo de  Movimiento'>Tipo Mov</th>
                                        <th title='Referencia del documento'>Ref Doc</th>
                                        <th title='Saldo anterior'>Saldo Ant</th>
                                        <th>Cant</th>
                                        <th>Saldo Actual</th>
                                        <th title='Id del Usuario'>Usuario</th>
                                        <th title='Id del Proveedor'>Prov</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {kardexData.movimientos.map((movimiento) => (
                                        <tr key={movimiento.id_kardex}>
                                            <td className='text-center'>{movimiento.id_kardex}</td>
                                            <td className='text-center'>{movimiento.id_producto}</td>
                                            <td className='text-center'>{movimiento.fecha_movimiento}</td>
                                            {/* <td className='text-center' 
                                                title={movimiento.id_tipo_movimiento === 'E' ? 'Entrada' : 'Salida'}>
                                                {movimiento.id_tipo_movimiento}
                                            </td> */}
                                            <td className='text-center'>{movimiento.tipo_operacion}</td>
                                            <td className='text-center'>{movimiento.tipo_movimiento}</td>
                                            <td className='text-center'>{movimiento.referencia_documento}</td>
                                            <td className='text-end'>{movimiento.saldo_anterior}</td>
                                            <td className='text-end'>{movimiento.cantidad}</td>
                                            <td className='text-end'>{movimiento.saldo_actual}</td>
                                            <td className='text-center'>{movimiento.id_usuario}</td>
                                            <td className='text-center'>{movimiento.id_proveedor}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Pagination>
                                {Array.from({ length: Math.ceil(totalRecords / rowsPerPage) }, (_, index) => (
                                    <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                                        {index + 1}
                                    </Pagination.Item>
                                ))}
                            </Pagination>
                        </>
                    ) : (
                        <p>No hay movimientos para este producto.</p>
                    )}
                </>
            ) : (
                <p>No se encontró información del producto.</p>
            )}
        </Page>
  )
}
