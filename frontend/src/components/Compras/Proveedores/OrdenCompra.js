import React, { useState, useEffect } from 'react';
import { Form, Button, Table, Row, Col, FloatingLabel, Pagination, Spinner, Alert, Modal } from 'react-bootstrap';
import { getOrdenDeCompra, getProveedoresFiltro, getOrdenCompraEstatus } from '../../../models/Pedido/Producto';
import { getProductosByProveedor, postOrdenDeCompra, putOrdenDeCompra, putOrdenDeCompraRecibo, deleteOrdenDeCompra } from '../../../models/Pedido/Producto';
import { useEmpresaID, useUsuarioID } from '../../../tools/StateUtils';
import Page from '../../Page';
import { MdOutlineAdd } from "react-icons/md";
import { AiOutlineMinus } from "react-icons/ai";
import { CiSaveDown2 } from "react-icons/ci";
import { IoMdExit } from "react-icons/io";
import { BsEraser } from "react-icons/bs";

function OrdenCompra() {
    //console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const id_empresa = useEmpresaID();
    const id_usuario = useUsuarioID();
    const [id_ordencompra, setIdOrdenCompra] = useState('');
    const [fecha_inicial, setFechaInicial] = useState(new Date().toISOString().slice(0, 10));
    const [fecha_final, setFechaFinal] = useState(new Date().toISOString().slice(0, 10));
    const [proveedores, setProveedores] = useState([]);
    const [id_proveedor, setIdProveedor] = useState('');
    const [estatus, setEstatus] = useState([]);
    const [id_estado_ordencompra, setIdEstadoOrdenCompra] = useState('');
    const [ordenesCompra, setOrdenesCompra] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [showDetalle, setShowDetalle] = useState(null);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [ordenCompraToDelete, setOrdenCompraToDelete] = useState(null);
    const [showOrdenModal, setShowOrdenModal] = useState(false);
    const [ordenModalMode, setOrdenModalMode] = useState('crear'); // 'crear', 'ver', 'editar'
    const [ordenSeleccionada, setOrdenSeleccionada] = useState(null); // Para

    // Estados para el Modal de Crear Nueva Orden
    const [showCrearModal, setShowCrearModal] = useState(false);
    const [nuevaOrdenFecha, setNuevaOrdenFecha] = useState(new Date().toISOString().slice(0, 10));
    const [nuevaOrdenProveedor, setNuevaOrdenProveedor] = useState('');
    const [productosProveedor, setProductosProveedor] = useState([]);
    const [nuevoProducto, setNuevoProducto] = useState('');
    const [nuevoCosto, setNuevoCosto] = useState(0);
    const [nuevaCantidad, setNuevaCantidad] = useState(0);
    const [nuevoSubtotal, setNuevoSubtotal] = useState(0);
    const [detalleNuevaOrden, setDetalleNuevaOrden] = useState([]);
    const [totalOrden, setTotalOrden] = useState(0);    

    const [showRecibirModal, setShowRecibirModal] = useState(false);
    const [ordenCompraRecibir, setOrdenCompraRecibir] = useState(null);

    useEffect(() => {
        const fetchProveedores = async () => {
            try {
                const data = await getProveedoresFiltro(id_empresa);
                setProveedores(data.proveedores);
            } catch (error) {
                setError(error.message);
            }
        };

        const fetchEstatus = async () => {
            try {
                const data = await getOrdenCompraEstatus(id_empresa);
                setEstatus(data.estatus);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchProveedores();
        fetchEstatus();
    }, [id_empresa]);  

    useEffect(() => {
        const fetchProductosProveedor = async () => {
            if (nuevaOrdenProveedor) {
                try {
                    const data = await getProductosByProveedor(id_empresa, nuevaOrdenProveedor);
                    setProductosProveedor(data.productos);
                } catch (error) {
                    setError(error.message);
                    setProductosProveedor([]);
                }
            } else {
                setProductosProveedor([]);
            }
        };

        fetchProductosProveedor();
    }, [id_empresa, nuevaOrdenProveedor]);

    useEffect(() => {
        setNuevoSubtotal(nuevoCosto * nuevaCantidad);
    }, [nuevoCosto, nuevaCantidad]); 
    
    useEffect(() => {
        let nuevoTotalOrden = 0;
        detalleNuevaOrden.forEach(item => {
            nuevoTotalOrden += item.subtotal;
        });
        setTotalOrden(nuevoTotalOrden);
    }, [detalleNuevaOrden]);    

    const handleBuscar = async () => {
        setLoading(true);
        setError('');
        setSuccessMessage('');

        if (fecha_inicial > fecha_final) {
            setError('La fecha inicial no puede ser posterior a la fecha final.');
            setLoading(false);
            return;
        }

        try {

            const params = {
                id_empresa,
                id_ordencompra: Number(id_ordencompra),
                fecha_inicial,
                fecha_final,
                id_proveedor: Number(id_proveedor),
                id_estado_ordencompra: Number(id_estado_ordencompra),
                //currentPage: currentPage * rowsPerPage - 10 < 0 ? 0 : currentPage * rowsPerPage - 10,
                currentPage,
                rowsPerPage
            }

            const data = await getOrdenDeCompra(params);
            setOrdenesCompra(data);
            setTotalRecords(data.totalRecords);
        } catch (error) {
            setError(error.message);
            setOrdenesCompra(null);
            setTotalRecords(0);
        } finally {
            setLoading(false);
        }
    }; 
    
    const handleVer = (id_ordencompra) => {
        handleShowVerModal(id_ordencompra);
    };

    const handled_Editar = (id_ordencompra, id_proveedor) => {
        setNuevaOrdenProveedor(id_proveedor)
        handleShowEditarModal(id_ordencompra);
    };

    const handled_Eliminar = (id_ordencompra) => {
        setOrdenCompraToDelete(id_ordencompra);
        setShowConfirmDelete(true);
    };

    const confirmDelete = async () => {
        // Aquí iría la lógica para eliminar la orden de compra
        // alert(`Eliminar orden de compra ${ordenCompraToDelete}`);
        // setShowConfirmDelete(false);
        // setSuccessMessage('Orden de compra eliminada exitosamente.');

        try {
            //const id_usuario = 1; // Reemplazar con el ID del usuario actual
            const result = await deleteOrdenDeCompra(id_empresa, ordenCompraToDelete, id_usuario);

            if (result.success) {
                setShowConfirmDelete(false)
                setSuccessMessage("Orden de compra fue cancelada satisfactoriamente.");
                handleBuscar(); // Recargar las órdenes de compra
            } else {
                setError(`Error al cancelar orden de compra: ${result.message}`);
            }

        } catch (error) {
            setError(`Error al cancelar orden de compra: ${error.message}`);
        }

    };

    const cancelDelete = () => {
        setShowConfirmDelete(false);
        setOrdenCompraToDelete(null);
    };

    const handled_Recibir = (id_ordencompra) => {
        setOrdenCompraRecibir(id_ordencompra);
        setShowRecibirModal(true);
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        handleBuscar();
    };

    const formatCurrency = (number) => {
        const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(number);
        //console.log("Valor formateado:", formatted); // Agrega esta línea
        return formatted;
    };    

    // Funciones para el Modal de Crear Nueva Orden
    const handleShowCrearModal = () => {
        setOrdenModalMode('crear');
        setShowCrearModal(true);
    };    

    const handleShowVerModal = (id_ordencompra) => {
        setOrdenModalMode('ver');
        const ordenSeleccionada = ordenesCompra.ordencompra.find(orden => orden.id_ordencompra === id_ordencompra);
        setOrdenSeleccionada(ordenSeleccionada);
        setShowOrdenModal(true);
    };

    const handleShowEditarModal = (id_ordencompra) => {
        setOrdenModalMode('editar');
        const ordenSeleccionada = ordenesCompra.ordencompra.find(orden => orden.id_ordencompra === id_ordencompra);
        setOrdenSeleccionada(ordenSeleccionada);

        // Cargar el detalle de la orden en el estado detalleNuevaOrden
        if (ordenSeleccionada?.ordencompra_detalle && typeof ordenSeleccionada.ordencompra_detalle === 'string') {
            try {
                const detalle = JSON.parse(ordenSeleccionada.ordencompra_detalle);
                if (Array.isArray(detalle)) {
                    const detalleMapeado = detalle.map(item => ({
                        id_producto: item.id_producto,
                        nombre: item.nombre_producto,
                        costo: item.costo_unitario,
                        cantidad: item.cantidad,
                        subtotal: item.subtotal
                    }));
                    setDetalleNuevaOrden(detalleMapeado);
                    // Eliminar esta línea
                    // setTotalOrden(ordenSeleccionada.total_orden);
                } else {
                    setDetalleNuevaOrden([]);
                    setTotalOrden(0);
                }
            } catch (error) {
                console.error("Error al parsear JSON:", error);
                setDetalleNuevaOrden([]);
                setTotalOrden(0);
            }
        } else {
            setDetalleNuevaOrden([]);
            setTotalOrden(0);
        }

        setShowOrdenModal(true);
    };

    const handleCloseOrdenModal = () => {
        setShowOrdenModal(false);
        setOrdenSeleccionada(null);
        // Limpiar los estados del modal (dependiendo del modo)
        setNuevaOrdenFecha(new Date().toISOString().slice(0, 10));
        setNuevaOrdenProveedor('');
        setProductosProveedor([]);
        setNuevoProducto('');
        setNuevoCosto(0);
        setNuevaCantidad(0);
        setNuevoSubtotal(0);
        setDetalleNuevaOrden([]);
        setTotalOrden(0);
    };    

    const handleCloseCrearModal = () => {
        setShowCrearModal(false);
        // Limpiar los estados del modal
        setNuevaOrdenFecha(new Date().toISOString().slice(0, 10));
        setNuevaOrdenProveedor('');
        setProductosProveedor([]);
        setNuevoProducto('');
        setNuevoCosto(0);
        setNuevaCantidad(0);
        setNuevoSubtotal(0);
        setDetalleNuevaOrden([]);
        setTotalOrden(0);
    };

    const LimpiarModal = () => {
        // Limpiar los estados del modal
        setNuevaOrdenFecha(new Date().toISOString().slice(0, 10));
        setNuevaOrdenProveedor('');
        setProductosProveedor([]);
        setNuevoProducto('');
        setNuevoCosto(0);
        setNuevaCantidad(0);
        setNuevoSubtotal(0);
        setDetalleNuevaOrden([]);
        setTotalOrden(0);
    };  

   const handleProveedorChange = (e) => {
        setNuevaOrdenProveedor(e.target.value);
        setProductosProveedor([]);
    };

    const handleProductoChange = (e) => {
        setNuevoProducto(e.target.value);
        // Busca el producto seleccionado y asigna el costo
        const productoSeleccionado = productosProveedor.find(p => p.id_producto === parseInt(e.target.value));
        if (productoSeleccionado) {
            setNuevoCosto(productoSeleccionado.costo);
        } else {
            setNuevoCosto(0);
        }
    };

    const handleAgregaProducto = () => {
        if (nuevoProducto && nuevaCantidad > 0) {
            const productoSeleccionado = productosProveedor.find(p => p.id_producto === parseInt(nuevoProducto));
            if (productoSeleccionado) {
                const nuevoItem = {
                    id_producto: productoSeleccionado.id_producto,
                    nombre: productoSeleccionado.nombre,
                    costo: nuevoCosto,
                    cantidad: nuevaCantidad,
                    subtotal: nuevoSubtotal
                };

                // Buscar si el producto ya existe en detalleNuevaOrden
                const productoExistenteIndex = detalleNuevaOrden.findIndex(item => item.id_producto === nuevoItem.id_producto);

                if (productoExistenteIndex > -1) {
                    // El producto ya existe, actualizar cantidad y subtotal
                    const detalleActualizado = [...detalleNuevaOrden];

                    //Revisar si el costo es diferente
                    if (detalleActualizado[productoExistenteIndex].costo !== nuevoCosto) {
                        //Actualizar el costo en productosProveedor
                        const productosProveedorActualizados = [...productosProveedor];
                        const productoProveedorIndex = productosProveedorActualizados.findIndex(p => p.id_producto === nuevoItem.id_producto);
                        productosProveedorActualizados[productoProveedorIndex].costo = nuevoCosto;
                        setProductosProveedor(productosProveedorActualizados);

                        //Recalcular el subtotal
                        detalleActualizado[productoExistenteIndex].costo = nuevoCosto;
                    }

                    detalleActualizado[productoExistenteIndex].cantidad += nuevaCantidad;
                    detalleActualizado[productoExistenteIndex].subtotal = detalleActualizado[productoExistenteIndex].costo * detalleActualizado[productoExistenteIndex].cantidad;

                    setDetalleNuevaOrden(detalleActualizado);

                } else {
                    // El producto no existe, agregar al detalle
                    setDetalleNuevaOrden([...detalleNuevaOrden, nuevoItem]);
                }

                //Recalcular totalOrden
                let nuevoTotalOrden = 0;
                [...detalleNuevaOrden].forEach(item => {
                    nuevoTotalOrden += item.subtotal;
                });
                setTotalOrden(nuevoTotalOrden);

                setNuevoProducto('');
                setNuevoCosto(0);
                setNuevaCantidad(0);
                setNuevoSubtotal(0);
            }
        }
    };

    const handleEliminaProducto = (id_producto) => {
        const itemAEliminar = detalleNuevaOrden.find(item => item.id_producto === id_producto);
        if (itemAEliminar) {
            setTotalOrden(totalOrden - itemAEliminar.subtotal);
            setDetalleNuevaOrden(detalleNuevaOrden.filter(item => item.id_producto !== id_producto));
        }
    };

    const handled_GuardarNuevaOrden = async () => {
        try {
            // Validar que haya al menos un producto en el detalle
            // if (detalleNuevaOrden.length === 0) {
            //     setError("Debe agregar al menos un producto al detalle de la orden.");
            //     return;
            // }

            // Crear el objeto ordencompra_detalle para enviar al backend
            const ordencompra_detalle = detalleNuevaOrden.map(item => ({
                id_producto: item.id_producto,
                cantidad: item.cantidad,
                costo_unitario: item.costo,
                subtotal: item.subtotal
            }));

            // Llamar a la función postOrdenDeCompra
            //const id_usuario = 1; // Reemplazar con el ID del usuario actual
            const result = await postOrdenDeCompra(
                id_empresa,
                nuevaOrdenFecha,
                nuevaOrdenProveedor,
                totalOrden,
                id_usuario,
                ordencompra_detalle
            );

            if (result.success === 0) {
                setSuccessMessage("Orden de compra creada exitosamente.");
                handleCloseCrearModal();
                handleBuscar(); // Recargar las órdenes de compra
            } else {
                setError(`Error al crear la orden de compra: ${result.mensaje_resultado}`);
            }

        } catch (error) {
            setError(`Error al crear la orden de compra: ${error.message}`);
        }
    }; 

const handleGuardarOrden = async () => {
    if (ordenModalMode === 'crear') {
        // Lógica para crear nueva orden (postOrdenDeCompra)
        try {
            // Validar que haya al menos un producto en el detalle
            if (detalleNuevaOrden.length === 0) {
                setError("Debe agregar al menos un producto al detalle de la orden.");
                return;
            }

            // Crear el objeto ordencompra_detalle para enviar al backend
            const ordencompra_detalle = detalleNuevaOrden.map(item => ({
                id_producto: item.id_producto,
                cantidad: item.cantidad,
                costo_unitario: item.costo,
                subtotal: item.subtotal
            }));

            // Llamar a la función postOrdenDeCompra
            //const id_usuario = 1; // Reemplazar con el ID del usuario actual
            const result = await postOrdenDeCompra(
                id_empresa,
                nuevaOrdenFecha,
                nuevaOrdenProveedor,
                totalOrden,
                id_usuario,
                ordencompra_detalle
            );

            if (result.success === 0) {
                setSuccessMessage("Orden de compra creada exitosamente.");
                handleCloseOrdenModal();
                handleBuscar(); // Recargar las órdenes de compra
            } else {
                setError(`Error al crear la orden de compra: ${result.mensaje_resultado}`);
            }

        } catch (error) {
            setError(`Error al crear la orden de compra: ${error.message}`);
        }
    } else if (ordenModalMode === 'editar') {
        // Lógica para editar orden existente (putOrdenDeCompra)
        try {
            // Crear el objeto ordencompra_detalle para enviar al backend
            const ordencompra_detalle = detalleNuevaOrden.map(item => ({
                id_producto: item.id_producto,
                cantidad: item.cantidad,
                costo_unitario: item.costo,
                subtotal: item.subtotal
            }));

            // Llamar a la función putOrdenDeCompra
            //const id_usuario = 1; // Reemplazar con el ID del usuario actual
            const result = await putOrdenDeCompra(
                id_empresa,
                ordenSeleccionada.id_ordencompra,
                nuevaOrdenFecha,
                nuevaOrdenProveedor,
                totalOrden,
                1, // id_estado_ordencompra
                id_usuario,
                ordencompra_detalle
            );

            if (result.success) {
                setSuccessMessage("Orden de compra actualizada exitosamente.");
                handleCloseOrdenModal();
                handleBuscar(); // Recargar las órdenes de compra
            } else {
                setError(`Error al actualizar la orden de compra: ${result.message}`);
            }

        } catch (error) {
            setError(`Error al actualizar la orden de compra: ${error.message}`);
        }
    }
};    

const handleConfirmarRecibo = async () => {
    try {
        //const id_usuario = 1; // Reemplazar con el ID del usuario actual
        const result = await putOrdenDeCompraRecibo(id_empresa, ordenCompraRecibir, id_usuario);

        if (result.success) {
            setSuccessMessage("Orden de compra recibida exitosamente.");
            setShowRecibirModal(false);
            handleBuscar(); // Recargar las órdenes de compra
        } else {
            setError(`Error al recibir la orden de compra: ${result.message}`);
        }

    } catch (error) {
        setError(`Error al recibir la orden de compra: ${error.message}`);
    }
};

const handleCancelarRecibo = () => {
    setShowRecibirModal(false);
    setOrdenCompraRecibir(null);
};

  return (
<Page title="Ordenes de Compra">
            <h2>Ordenes de Compra</h2>
            <h6>Filtrar por:</h6>
            <Form>
                <Row className="mb-3">
                    <Col md={2}>
                        <FloatingLabel controlId="id_ordencompra" label="# Ord. Compra">
                            <Form.Control
                                type="text"
                                placeholder="Orden de Compra"
                                value={id_ordencompra}
                                onChange={(e) => setIdOrdenCompra(e.target.value)}
                            />
                        </FloatingLabel>
                    </Col>
                    <Col md={2}>
                        <FloatingLabel controlId="fecha_inicial" label="Fecha Inicial">
                            <Form.Control
                                type="date"
                                value={fecha_inicial}
                                onChange={(e) => setFechaInicial(e.target.value)}
                            />
                        </FloatingLabel>
                    </Col>
                    <Col md={2}>
                        <FloatingLabel controlId="fecha_final" label="Fecha Final">
                            <Form.Control
                                type="date"
                                value={fecha_final}
                                onChange={(e) => setFechaFinal(e.target.value)}
                            />
                        </FloatingLabel>
                    </Col>
                    <Col md={3}>
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
                    <Col md={2}>
                        <FloatingLabel controlId="id_estado_ordencompra" label="Estatus">
                            <Form.Select value={id_estado_ordencompra} onChange={(e) => setIdEstadoOrdenCompra(e.target.value)}>
                                <option value="">Todos</option>
                                {estatus.map((estado) => (
                                    <option key={estado.id_estado_ordencompra} value={estado.id_estado_ordencompra}>
                                        {estado.descripcion}
                                    </option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col md={1} className="d-flex align-items-end">
                        <Button variant="primary" onClick={handleBuscar} disabled={loading}>
                            {loading ? <Spinner animation="border" size="sm" /> : 'Buscar'}
                        </Button>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={12} className="d-flex align-items-end">
                        <Button variant="secondary" onClick={handleShowCrearModal} disabled={loading}>
                            {loading ? <Spinner animation="border" size="sm" /> : 'Crear Orden'}
                        </Button>
                    </Col>
                </Row>
            </Form>
            <hr />

            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            {ordenesCompra && ordenesCompra.ordencompra && ordenesCompra.ordencompra.length > 0 ? (
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr className="text-center">
                                <th>Acciones</th>
                                <th>ID</th>
                                <th>Fecha</th>
                                <th>Proveedor</th>
                                <th>Total</th>
                                <th>Estatus</th>
                                <th>Usuario</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordenesCompra.ordencompra.map((orden) => (
                                <tr key={orden.id_ordencompra}>
                                    <td className="text-center">
                                        <Button variant="outline-info" size="sm" onClick={() => handleVer(orden.id_ordencompra)}>
                                            Ver
                                        </Button>{' '}
                                        {orden.id_estado_ordencompra === 1 && (
                                            <>
                                                <Button variant="outline-warning" size="sm" onClick={() => handled_Editar(orden.id_ordencompra, orden.id_proveedor)}>
                                                    Editar
                                                </Button>{' '}
                                                <Button variant="outline-danger" size="sm" onClick={() => handled_Eliminar(orden.id_ordencompra)}>
                                                    Cancelar
                                                </Button>{' '}
                                                <Button variant="outline-success" size="sm" onClick={() => handled_Recibir(orden.id_ordencompra)}>
                                                    Recibir
                                                </Button>
                                            </>
                                        )}
                                    </td>
                                    <td className='text-center'>{orden.id_ordencompra}</td>
                                    <td className='text-center'>{orden.fecha}</td>
                                    <td className='text-center'>{orden.proveedor}</td>
                                    <td className='text-end'>{formatCurrency(orden.total_orden)}</td>
                                    <td className='text-center'>{orden.estatus}</td>
                                    <td className='text-center'>{orden.id_usuario}</td>
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

                    {showDetalle && (
                        <>
                            <h4>Detalle de la Orden de Compra {showDetalle}</h4>
                            {ordenesCompra.ordencompra.find(orden => orden.id_ordencompra === showDetalle) && (
                                <>
                                    {/* Verifica si ordencompra_detalle es una cadena y la parsea si es necesario */}
                                    {typeof ordenesCompra.ordencompra.find(orden => orden.id_ordencompra === showDetalle).ordencompra_detalle === 'string' ? (
                                        (() => {
                                            try {
                                                const detalle = JSON.parse(ordenesCompra.ordencompra.find(orden => orden.id_ordencompra === showDetalle).ordencompra_detalle);
                                                if (Array.isArray(detalle) && detalle.length > 0) {
                                                    return (
                                                        <Table striped bordered hover>
                                                            <thead>
                                                                <tr className="text-center">
                                                                    <th>Partida</th>
                                                                    <th>ID Producto</th>
                                                                    <th>Nombre</th>
                                                                    <th>Cantidad</th>
                                                                    <th>Costo Unitario</th>
                                                                    <th>Subtotal</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {detalle.map((detalleItem) => (
                                                                    <tr key={detalleItem.partida}>
                                                                        <td>{detalleItem.partida}</td>
                                                                        <td>{detalleItem.id_producto}</td>
                                                                        <td>{detalleItem.nombre_producto}</td>
                                                                        <td>{detalleItem.cantidad}</td>
                                                                        <td>{formatCurrency(detalleItem.costo_unitario)}</td>
                                                                        <td>{formatCurrency(detalleItem.subtotal)}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </Table>
                                                    );
                                                } else {
                                                    return (<p>No hay detalles para esta orden de compra.</p>);
                                                }
                                            } catch (error) {
                                                console.error("Error al parsear JSON:", error);
                                                return (<p>Error al mostrar los detalles de la orden de compra.</p>);
                                            }
                                        })()
                                    ) : (
                                        <p>No hay detalles para esta orden de compra.</p>
                                    )}
                                </>
                            )}
                        </>
                    )}

                    <Modal show={showConfirmDelete} onHide={cancelDelete}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirmar Eliminación</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            ¿Está seguro de que desea eliminar la orden de compra {ordenCompraToDelete}?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={cancelDelete}>
                                Regresar
                            </Button>
                            <Button variant="danger" onClick={confirmDelete}>
                                Cancelar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            ) : (
                !loading && <p>No se encontraron órdenes de compra.</p>
            )}

            {loading && <Spinner animation="border" />}

            {/* Modal para Crear Nueva Orden */}
            <Modal show={showCrearModal} onHide={handleCloseCrearModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Crear Nueva Orden de Compra</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Col md={3}>
                                <FloatingLabel controlId="nuevaOrdenFecha" label="Fecha">
                                    <Form.Control
                                        type="date"
                                        value={nuevaOrdenFecha}
                                        onChange={(e) => setNuevaOrdenFecha(e.target.value)}
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col md={4}>
                                <FloatingLabel controlId="nuevaOrdenProveedor" label="Proveedor">
                                    <Form.Select value={nuevaOrdenProveedor} onChange={handleProveedorChange}>
                                        <option value="">Seleccione un proveedor</option>
                                        {proveedores.map((proveedor) => (
                                            <option key={proveedor.id_proveedor} value={proveedor.id_proveedor}>
                                                {proveedor.nombre}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col md={3}>
                                <FloatingLabel controlId="nuevoOrdenEstatus" label="Estatus">
                                    <Form.Control
                                        type="text"
                                        value="Pendiente"
                                        readOnly
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col md={2}>
                                <FloatingLabel controlId="nuevoOrdenTotal" label="Total">
                                    <Form.Control
                                        type="number"
                                        value={totalOrden}
                                        readOnly
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <h6 className='pt-3'>Captura de productos:</h6>
                        <hr/>
                        <Row className="mb-3">
                            <Col md={5}>
                                <FloatingLabel controlId="nuevoProducto" label="Producto">
                                    <Form.Select value={nuevoProducto} onChange={handleProductoChange}>
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
                                <FloatingLabel controlId="nuevoCosto" label="Costo">
                                    <Form.Control
                                        type="number"
                                        value={nuevoCosto}
                                        onChange={(e) => setNuevoCosto(e.target.value)}
                                        // readOnly
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col md={2}>
                                <FloatingLabel controlId="nuevaCantidad" label="Cantidad">
                                    <Form.Control
                                        type="number"
                                        value={nuevaCantidad}
                                        onChange={(e) => {
                                            setNuevaCantidad(parseFloat(e.target.value) || 0)
                                            setNuevoSubtotal(e.target.value * nuevoCosto)
                                        }}
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col md={2} className="d-flex align-items-end">
                                <FloatingLabel controlId="nuevoSubtotal" label="Subtotal">
                                    <Form.Control
                                        type="number"
                                        value={nuevoSubtotal}
                                        readOnly
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col md={1} className="d-flex justify-content-end">
                                <Button variant="secondary" onClick={handleAgregaProducto}>
                                    <MdOutlineAdd />
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    <h6>Partidas:</h6>
                    <hr/>
                    <Table striped bordered hover>
                        <thead>
                            <tr className="text-center">
                                <th>ID Producto</th>
                                <th>Nombre</th>
                                <th>Costo</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detalleNuevaOrden.map((item) => (
                                <tr key={item.id_producto}>
                                    <td>{item.id_producto}</td>
                                    <td>{item.nombre}</td>
                                    <td>{formatCurrency(item.costo)}</td>
                                    <td>{item.cantidad}</td>
                                    <td>{formatCurrency(item.subtotal)}</td>
                                    <td className="text-center">
                                        <Button variant="danger" size="sm" onClick={() => handleEliminaProducto(item.id_producto)}>
                                            <AiOutlineMinus />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCrearModal}>
                        Cancelar <IoMdExit/> 
                    </Button>
                    <Button variant="primary" 
                        disabled={!nuevaOrdenFecha || !nuevaOrdenProveedor || !totalOrden}
                        onClick={LimpiarModal}>
                        Limpiar <BsEraser/> 
                    </Button>
                    <Button variant="success" 
                        disabled={!nuevaOrdenFecha || !nuevaOrdenProveedor || !totalOrden}
                        onClick={handled_GuardarNuevaOrden}>
                        Guardar <CiSaveDown2/> 
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal para Crear/Ver/Editar Orden de Compra */}
            <Modal show={showOrdenModal} onHide={handleCloseOrdenModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {ordenModalMode === 'crear' ? 'Crear Nueva Orden de Compra' :
                            ordenModalMode === 'ver' ? `Detalle de la Orden de Compra #${ordenSeleccionada?.id_ordencompra}` :
                                `Editar Orden de Compra #${ordenSeleccionada?.id_ordencompra}`}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Col md={3}>
                                <FloatingLabel controlId="nuevaOrdenFecha" label="Fecha">
                                    <Form.Control
                                        type="date"
                                        value={ordenModalMode === 'crear' ? nuevaOrdenFecha : ordenSeleccionada?.fecha.slice(0, 10)}
                                        onChange={(e) => setNuevaOrdenFecha(e.target.value)}
                                        readOnly={ordenModalMode === 'ver'}
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col md={4}>
                                <FloatingLabel controlId="nuevaOrdenProveedor" label="Proveedor">
                                    <Form.Select
                                        value={ordenModalMode === 'crear' ? nuevaOrdenProveedor : ordenSeleccionada?.id_proveedor}
                                        onChange={handleProveedorChange}
                                        disabled={ordenModalMode === 'ver'}
                                    >
                                        <option value="">Seleccione un proveedor</option>
                                        {proveedores.map((proveedor) => (
                                            <option key={proveedor.id_proveedor} value={proveedor.id_proveedor}>
                                                {proveedor.nombre}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col md={3}>
                                <FloatingLabel controlId="nuevoOrdenEstatus" label="Estatus">
                                    <Form.Control
                                        type="text"
                                        value={ordenSeleccionada?.estatus || "Pendiente"}
                                        readOnly
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col md={2}>
                                {console.log(ordenSeleccionada?.total_orden, totalOrden)}
                                <FloatingLabel controlId="nuevoOrdenTotal" label="Total">
                                    <Form.Control
                                        type="number"
                                        value={ordenModalMode === 'ver' ? ordenSeleccionada?.total_orden : totalOrden}
                                        //value={totalOrden}
                                        readOnly
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>

                        {/* Sección de captura de productos (solo para Crear y Editar) */}
                        {(ordenModalMode === 'crear' || ordenModalMode === 'editar') && (
                            <>
                                <Row className="mb-3">
                                    <Col md={4}>
                                        <FloatingLabel controlId="nuevoProducto" label="Producto">
                                            <Form.Select value={nuevoProducto} onChange={handleProductoChange}>
                                                <option value="">Seleccione un producto</option>
                                                {productosProveedor.map((producto) => (
                                                    <option key={producto.id_producto} value={producto.id_producto}>
                                                        {producto.nombre}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Col>
                                    <Col md={3}>
                                        <FloatingLabel controlId="nuevoCosto" label="Costo">
                                            <Form.Control
                                                type="number"
                                                value={nuevoCosto}
                                                readOnly
                                            />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md={3}>
                                        <FloatingLabel controlId="nuevaCantidad" label="Cantidad">
                                            <Form.Control
                                                type="number"
                                                value={nuevaCantidad}
                                                onChange={(e) => setNuevaCantidad(parseFloat(e.target.value) || 0)}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md={2} className="d-flex align-items-end">
                                        <FloatingLabel controlId="nuevoSubtotal" label="Subtotal">
                                            <Form.Control
                                                type="number"
                                                value={nuevoSubtotal}
                                                readOnly
                                            />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col md={12} className="d-flex justify-content-end">
                                        <Button variant="outline-secondary" onClick={handleAgregaProducto}>
                                            +
                                        </Button>
                                    </Col>
                                </Row>
                            </>
                        )}

                        <Table striped bordered hover>
                            <thead>
                                <tr className="text-center">
                                    <th>ID Producto</th>
                                    <th>Nombre</th>
                                    <th>Costo</th>
                                    <th>Cantidad</th>
                                    <th>Subtotal</th>
                                    {ordenModalMode !== 'ver' && <th>Acción</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {ordenModalMode === 'crear' || ordenModalMode === 'editar' ? (
                                    detalleNuevaOrden.map((item) => (
                                        <tr key={item.id_producto}>
                                            <td className='text-center'>{item.id_producto}</td>
                                            <td>{item.nombre}</td>
                                            <td className='text-end'>{formatCurrency(item.costo)}</td>
                                            <td className='text-center'>{item.cantidad}</td>
                                            <td className='text-end'>{formatCurrency(item.subtotal)}</td>
                                            {ordenModalMode !== 'ver' && (
                                                <td className="text-center">
                                                    <Button variant="outline-danger" size="sm" onClick={() => handleEliminaProducto(item.id_producto)}>
                                                        -
                                                    </Button>
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                ) : (
                                    // Muestra el detalle de la orden seleccionada (modo "ver")
                                    ordenSeleccionada?.ordencompra_detalle && typeof ordenSeleccionada.ordencompra_detalle === 'string' ? (
                                        (() => {
                                            try {
                                                const detalle = JSON.parse(ordenSeleccionada.ordencompra_detalle);
                                                if (Array.isArray(detalle) && detalle.length > 0) {
                                                    return detalle.map((detalleItem) => (
                                                        <tr key={detalleItem.id_producto}>
                                                            <td className='text-center'>{detalleItem.id_producto}</td>
                                                            <td>{detalleItem.nombre_producto}</td>
                                                            <td className='text-end'>{formatCurrency(detalleItem.costo_unitario)}</td>
                                                            <td className='text-center'>{detalleItem.cantidad}</td>
                                                            <td className='text-end'>{formatCurrency(detalleItem.subtotal)}</td>
                                                        </tr>
                                                    ));
                                                } else {
                                                    return (
                                                        <tr>
                                                            <td colSpan="6">No hay detalles para esta orden de compra.</td>
                                                        </tr>
                                                    );
                                                }
                                            } catch (error) {
                                                console.error("Error al parsear JSON:", error);
                                                return (
                                                    <tr>
                                                        <td colSpan="6">Error al mostrar los detalles de la orden de compra.</td>
                                                    </tr>
                                                );
                                            }
                                        })()
                                    ) : (
                                        <tr>
                                            <td colSpan="6">No hay detalles para esta orden de compra.</td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </Table>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseOrdenModal}>
                        Cerrar
                    </Button>
                    {ordenModalMode !== 'ver' && (
                        <Button variant="primary" onClick={handleGuardarOrden}>
                            Guardar
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>

            {/* Modal para Confirmar Recibo de Orden de Compra */}
            <Modal show={showRecibirModal} onHide={handleCancelarRecibo}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Recibo de Orden de Compra</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Está seguro de que desea recibir la orden de compra #{ordenCompraRecibir}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelarRecibo}>
                        Regresar
                    </Button>
                    <Button variant="primary" onClick={handleConfirmarRecibo}>
                        Continuar
                    </Button>
                </Modal.Footer>
            </Modal>            

        </Page>
  )
}

export default OrdenCompra