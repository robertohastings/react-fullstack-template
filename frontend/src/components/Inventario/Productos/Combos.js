import React, { useState, useEffect} from 'react'
import { Table, Button, Form, Row, Col } from "react-bootstrap"
import { getProductosCombo } from '../../../models/Pedido/Producto';

function Combos({id_empresa, id_producto, setCombo}) {
    const [selectedCombo, setSelectedCombo] = useState(""); // id_producto_combo seleccionado
    const [selectedComboNombre, setSelectedComboNombre] = useState(""); // id_producto_combo seleccionado
    const [comboCantidad, setComboCantidad] = useState(1); // cantidad para combo
    const [comboProductos, setComboProductos] = useState([]); // Productos disponibles para combo
    const [comboList, setComboList] = useState([]); // Combos actuales del producto
    const [addingCombo, setAddingCombo] = useState(false); // loading para agregar combo

    //Limpiar nombre del producto
    const nombreProductoLimpio = (nombreProducto) => {
        let nombreLimpio = "";
        if (nombreProducto) {
            // Obtiene la parte después del guión y elimina espacios
            const partes = nombreProducto.split("-");
            if (partes.length > 1) {
                nombreLimpio = partes[1].trimStart();
            }
        }
        return nombreLimpio
    }

    // Cargar productos para el selector de combos (puedes usar la misma lista de productos o una consulta aparte)
    const fetchComboProductos = async () => {
        try {
            const data = await getProductosCombo(id_empresa, id_producto)
            console.log('getProductosCombo:', data);
            setComboProductos(data.productos || []);
            setComboList(data.combo)
        } catch (error) {
            setComboProductos([]);
        }
    };


    // Agregar combo
    const handleAddCombo = async () => {
        setAddingCombo(true);
        try {

            const nuevaLista = [
                ...comboList,
                {
                    id_producto_combo: selectedCombo,
                    nombre: selectedComboNombre,
                    cantidad: comboCantidad
                }
            ];
            setComboList(nuevaLista);

            // Elimina el producto seleccionado de comboProductos
            setComboProductos(prev =>
                prev.filter(p => String(p.id_producto) !== String(selectedCombo))
            );            

            // Reinicia los campos
            setSelectedCombo("");
            setComboCantidad(1);

            // Actualiza la copia para el padre
            setCombo(nuevaLista);
        } catch (error) {
            // Manejo de error opcional
        } finally {
            setAddingCombo(false);
        }

        //alert('alta de combo')
    };

    // Eliminar combo
    const handleDeleteCombo = async (id_producto_combo) => {

        // Encuentra el combo a eliminar
        const comboEliminado = comboList.find(c => String(c.id_producto_combo) === String(id_producto_combo));
        if (!comboEliminado) return;

        // Elimina el combo de la lista
        const nuevaComboList = comboList.filter(c => String(c.id_producto_combo) !== String(id_producto_combo));
        setComboList(nuevaComboList);

        // Agrega el producto de regreso a comboProductos y ordena por id_producto
        setComboProductos(prev => {
            const nuevaLista = [...prev, {
                id_producto: comboEliminado.id_producto_combo,
                nombre: comboEliminado.nombre
            }];
            // Ordena por id_producto numéricamente
            return nuevaLista.sort((a, b) => Number(a.id_producto) - Number(b.id_producto));
        });
        setCombo(nuevaComboList);

        //alert('producto combo eliminado')
    };    

    useEffect(() => {
        console.log('id_producto', id_producto)
        console.log('id_empresa', id_empresa)
        fetchComboProductos()
    }, [])

  return (
    <Col>
        <h5>Combo</h5>
        {id_producto > 0 ? (
            <>
                <Row>
                    <Col md={8}>
                        <Form.Select
                            value={selectedCombo}
                            onChange={(e) => {
                                setSelectedCombo(e.target.value);
                                const selected = comboProductos.find(p => String(p.id_producto) === e.target.value);
                                // console.log('combo:', comboProductos)
                                // console.log('target value', e.target.value)
                                // console.log('selected', selected)

                                // let nombreLimpio = "";
                                // if (selected && selected.nombre) {
                                //     // Obtiene la parte después del guión y elimina espacios
                                //     const partes = selected.nombre.split("-");
                                //     if (partes.length > 1) {
                                //         nombreLimpio = partes[1].trimStart();
                                //     }
                                // }
                                //setSelectedComboNombre(nombreLimpio);
                                setSelectedComboNombre(selected ? selected.nombre : "");
                            }}
                            aria-label="Selecciona producto combo"
                        >
                            <option value="">Selecciona producto</option>
                            {comboProductos
                                .map(p => (
                                    <option key={p.id_producto} value={p.id_producto}>
                                        {p.nombre}
                                    </option>
                                ))}
                        </Form.Select>
                    </Col>
                    <Col md={2} className='text-center'>
                        <Form.Control
                            type="number"
                            min={1}
                            className="text-center"
                            placeholder="Cantidad"
                            value={comboCantidad}
                            onChange={e => setComboCantidad(Number(e.target.value))}
                        />
                    </Col>
                    <Col md={2} className='text-center'>
                        <Button
                            variant="success"
                            disabled={!selectedCombo || comboCantidad <= 0 || addingCombo}
                            onClick={handleAddCombo}
                        >
                            +
                        </Button>
                    </Col>
                </Row>
                <hr/>
                {/* Lista de combos */}
                <Table size="sm" bordered className="mt-3">
                    <thead>
                        <tr className='text-center'>
                            <th>ID Producto Combo</th>
                            <th>Descripción</th>
                            <th>Cantidad</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comboList.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center">No hay combos para este producto</td>
                            </tr>
                        ) : (
                            comboList.map(combo => (
                                <tr key={combo.id_producto_combo}>
                                    <td className='text-center'>{combo.id_producto_combo}</td>
                                    <td>{nombreProductoLimpio(combo.nombre)}</td>
                                    <td className='text-center'>{combo.cantidad}</td>
                                    <td className='text-center'>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDeleteCombo(combo.id_producto_combo)}
                                        >
                                            -
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </>
        ) : (
            <p>Guarde primero el producto para poder asigarle un combo</p>
        )}
    </Col>
  )
}

export default Combos