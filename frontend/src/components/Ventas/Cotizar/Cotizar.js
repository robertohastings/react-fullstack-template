import React, { useState, useEffect, useContext } from "react"
import { Card, Col, Container, Row, Button, Table, Image, ButtonGroup, Badge, ButtonToolbar } from "react-bootstrap"
import Axios from "axios"
//import SpinnerButton from "../../Spinner/SpinnerButton"
import "./cotizar.css"
import { FaPlus, FaMinus, FaRegTrashAlt, FaShoppingCart, FaMotorcycle, FaSearch } from "react-icons/fa"
import CustomModal from "../../../tools/CustomModal"
import StateContext from "../../../StateContext"

function Cotizar() {
    //const [isLoading, setIsLoaging] = useState(false)
    const [dataCategories, setDataCategories] = useState([])
    const [dataProducts, setDataProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [detallePedido, setDetallePedido] = useState([])
    const [quantities, setQuantities] = useState({})
    const totalPrice = detallePedido.reduce((total, item) => total + item.cantidad * item.precio, 0)
    const totalItems = detallePedido.reduce((total, item) => total + parseInt(item.cantidad), 0)
    const appState = useContext(StateContext)
    const id_empresa = appState.idEmpresa

    //Definición del Modal
    const [modalParams, setModalParams] = useState(null)
    const showModal = ({ title, question, buttons }) => {
        return new Promise(resolve => {
            setModalParams({
                title,
                question,
                buttons,
                onClose: value => {
                    setModalParams(null) // Cierra el modal
                    resolve(value) // Retorna el valor seleccionado
                }
            })
        })
    }

    useEffect(() => {
        fetchCategorias()
    }, [])

    const fetchCategorias = async () => {
        //setIsLoaging(true)

        try {
            const response = await Axios.get("/api/getCategorias", {
                params: {
                    limite: 0,
                    pagina: 0
                }
            })
            console.log("response pedido canvas:", response.data.categorias)
            setDataCategories(response.data.categorias)
        } catch (error) {
            console.error("There was an error fetching the categorias!", error)
        } finally {
            //setIsLoaging(false)
        }
    }

    const fetchCProductosByCategoria = async id_categoria => {
        console.log(`Categoria: ${id_categoria}`)
        //setIsLoaging(true)
        setSelectedCategory(id_categoria)
        const params = {
            id_empresa,
            id_categoria
        }
        console.log("params:", params)

        try {
            await Axios.get("/api/getProductosByCategoria", {
                params
            })
                .then(response => {
                    if ((response.status = 200)) {
                        console.log("productos encontrados:", response.data.productos)
                        setDataProducts(response.data.productos)
                    } else {
                        console.log("There was an error fetching data", response.error.statusText)
                    }
                })
                .catch(error => {
                    console.log("There was an error fetching data", error)
                })
        } catch (error) {
            console.log("error:", error)
        } finally {
            //setIsLoaging(false)
        }
    }

    // Función para manejar la selección de categoría
    // const handleCategorySelect = id_categoria => {
    //     console.log(`Categoria Seleccionada: ${id_categoria}`)
    //     setSelectedCategory(id_categoria)
    //     fetchCProductosByCategoria(id_categoria)
    // }
    const Agregar_handled = producto => {
        console.log(producto)
        const data = {
            id_producto: producto.id_producto,
            nombre: producto.nombre,
            cantidad: quantities[producto.id_producto] || 1,
            precio: producto.precio_promocion > 0 ? producto.precio_promocion : producto.precio,
            imagen: producto.image1
        }
        // setDetallePedido([...detallePedido, data])

        setDetallePedido(currItems => {
            const isItemFound = currItems.find(item => item.id_producto === producto.id_producto)

            if (isItemFound) {
                return currItems.map(item => {
                    if (item.id_producto === producto.id_producto) {
                        return { ...item, cantidad: item.cantidad + (quantities[producto.id_producto] || 1) }
                    } else {
                        return item
                    }
                })
            } else {
                return [...currItems, data]
            }
        })

        //Regreso la cantidad a 1
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [producto.id_producto]: 1
        }))
    }
    // const Restar_handled = producto => {
    //     console.log(producto)
    //     const data = {
    //         id_producto: producto.id_producto,
    //         nombre: producto.nombre,
    //         cantidad: 1,
    //         precio: producto.precio_promocion > 0 ? producto.precio_promocion : producto.precio,
    //         imagen: producto.image1
    //     }
    //     // setDetallePedido([...detallePedido, data])

    //     setDetallePedido(currItems => {
    //         const isItemFound = currItems.find(item => item.id_producto === producto.id_producto)

    //         if (isItemFound) {
    //             return currItems.map(item => {
    //                 if (item.id_producto === producto.id_producto) {
    //                     return { ...item, cantidad: item.cantidad - 1 }
    //                 } else {
    //                     return item
    //                 }
    //             })
    //         } else {
    //             return [...currItems, data]
    //         }
    //     })
    // }
    const RestarProducto_handled = id_producto => {
        setDetallePedido(currItems => {
            if (currItems.find(item => item.id_producto === id_producto)?.cantidad === 1) {
                return currItems.filter(item => item.id_producto !== id_producto)
            } else {
                return currItems.map(item => {
                    if (item.id_producto === id_producto) {
                        return { ...item, cantidad: item.cantidad - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }
    const EliminarProducto_handled = producto => {
        setDetallePedido(currItems => {
            const isItemFound = currItems.find(item => item.id_producto === producto.id_producto)

            if (isItemFound) {
                return currItems.filter(item => item.id_producto !== producto.id_producto)
            }
        })
    }

    // Función para aumentar la cantidad
    const increaseQuantity = id_producto => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [id_producto]: (prevQuantities[id_producto] || 1) + 1
        }))
    }

    // Función para disminuir la cantidad
    const decreaseQuantity = id_producto => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [id_producto]: Math.max(0, (prevQuantities[id_producto] || 1) - 1)
        }))
    }
    function currencyFormat(num) {
        return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    }

    const LimpiarCaptura_handled = async () => {
        setDetallePedido([])
        await showModal({
            title: "Información",
            question: "La captura fue eliminada",
            buttons: [{ label: "Ok", value: "yes", variant: "primary" }]
        })
    }

    const LimpiarCaptura_handleOpenModal = async () => {
        const result = await showModal({
            title: "Confirmar Acción",
            question: "¿ Está seguro de eliminar los productos capturados ?",
            buttons: [
                { label: "Si", value: "yes", variant: "primary" },
                { label: "No", value: "no", variant: "danger" }
                // { label: 'Back', value: 'back', variant: 'secondary' },
            ]
        })
        //console.log("Selected Option:", result)
        if (result === "yes") {
            LimpiarCaptura_handled()
        } else {
            alert("No")
        }
    }

    return (
        <Container fluid>
            <Row>
                {/* Columna de categorías fija a la izquierda */}
                <Col xs={1} className="categories-column">
                    <div className="categories-scroll">
                        {dataCategories.map(category => (
                            <div key={category.id_categoria} className="category-item" onClick={() => fetchCProductosByCategoria(category.id_categoria)}>
                                <Image src={category.imagen} className="category-image" />
                                <div className="category-name-overlay">{category.nombre}</div>
                            </div>
                        ))}
                    </div>
                </Col>

                {/* Columna de productos */}
                <Col xs={7} className="mt-5">
                    {selectedCategory ? (
                        <Row>
                            {dataProducts.map(product => (
                                <Col key={product.id_producto} xs={12} md={6} lg={3} className="mb-4">
                                    <Card className="product-card">
                                        <div className="d-flex justify-content-center pt-1">
                                            <Card.Img variant="top" src={product.image1} className="product-image" />
                                        </div>
                                        <Card.Body>
                                            <Card.Title className="text-center">{product.nombre}</Card.Title>
                                            <Card.Text className="product-description">{product.descripcion}</Card.Text>
                                            <Card.Text className="text-muted">Precio: </Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <div className="d-flex justify-content-around align-items-center border rounded p-1">
                                                {/* Grupo de botones para aumentar/disminuir cantidad */}
                                                <ButtonGroup>
                                                    <Button size="sm" variant="outline-secondary" onClick={() => decreaseQuantity(product.id_producto)}>
                                                        <FaMinus size={10} />
                                                    </Button>
                                                    <input type="text" className="text-center" value={quantities[product.id_producto] || 1} onChange={e => {}} style={{ width: "40px", border: "none" }} />
                                                    <Button size="sm" variant="outline-secondary" onClick={() => increaseQuantity(product.id_producto)}>
                                                        <FaPlus size={10} />
                                                    </Button>
                                                </ButtonGroup>
                                                {/* Botón de agregar al carrito */}
                                            </div>
                                            <div className="d-grid">
                                                <Button className="mt-2" variant="outline-primary" size="sm" onClick={() => Agregar_handled(product)}>
                                                    <FaShoppingCart size={12} />
                                                </Button>
                                            </div>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <p>Selecciona una categoría para ver los productos.</p>
                    )}
                </Col>

                {/* Columna del resumen a la derecha  */}
                <Col xs={4} className="resumen-column">
                    <div className="resumen-scroll mt-2">
                        <Row>
                            <Col xs={3}>
                                <p>
                                    # Prod: <Badge>{totalItems}</Badge>
                                </p>
                            </Col>
                            <Col xs={5}>
                                <p className="text-end">Total a pagar: </p>
                            </Col>
                            <Col xs={4}>
                                <p className="text-end">
                                    <h4>
                                        <Badge>{currencyFormat(totalPrice)}</Badge>{" "}
                                    </h4>
                                </p>
                            </Col>
                        </Row>
                        <hr className="mt-0 mb-2" />
                        <Row>
                            <Col>
                                <ButtonToolbar className="justify-content-around">
                                    <ButtonGroup size="">
                                        <Button size="sm" variant="danger" style={{ width: "60px" }} title="Lipiar captura e iniciar de nuevo" onClick={LimpiarCaptura_handleOpenModal} disabled={detallePedido.length === 0}>
                                            <FaRegTrashAlt size={25} />
                                        </Button>
                                        <Button size="sm" variant="warning" style={{ width: "100px" }} title="Definir tipo de entrega: Domiclio ó Recoge" disabled={detallePedido.length === 0}>
                                            <FaMotorcycle size={30} />
                                        </Button>
                                        <Button size="sm" variant="success" style={{ width: "100px" }} disabled={detallePedido.length === 0}>
                                            Crear Pedido
                                        </Button>
                                        <Button size="sm" variant="info" style={{ width: "100px" }}>
                                            <FaSearch size={22} /> Pedido
                                        </Button>
                                    </ButtonGroup>
                                </ButtonToolbar>
                            </Col>
                        </Row>
                        <p></p>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Cant.</th>
                                    <th>Producto</th>
                                    <th>Subtotal</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {detallePedido.map(product => (
                                    <tr>
                                        <td className="text-center align-content-center">{product.cantidad}</td>
                                        <td className="align-content-center">{product.nombre}</td>
                                        <td className="text-end align-content-center">{product.cantidad * product.precio}</td>
                                        <td className="align-content-center text-center">
                                            <ButtonGroup>
                                                <Button size="sm" variant="outline-warning" onClick={() => RestarProducto_handled(product.id_producto)}>
                                                    <FaMinus />
                                                </Button>
                                                <Button size="sm" variant="outline-success" onClick={() => Agregar_handled(product)}>
                                                    <FaPlus />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline-danger"
                                                    onClick={() => {
                                                        EliminarProducto_handled(product)
                                                    }}
                                                >
                                                    <FaRegTrashAlt />
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>

            {/* Se defino el modal para mostrarse, código fijo */}
            {modalParams && <CustomModal show={true} title={modalParams.title} question={modalParams.question} buttons={modalParams.buttons} onClose={modalParams.onClose} />}
        </Container>
    )
}

export default Cotizar
