import React, { useState, useEffect } from "react"
import { Card, Col, Container, Row, Button, Modal, Table, Image, ButtonGroup } from "react-bootstrap"
import Axios from "axios"
//import SpinnerButton from "../../Spinner/SpinnerButton"
import "./cotizar.css"
import { FaPlus, FaMinus } from "react-icons/fa"

function Cotizar() {
    const [isLoading, setIsLoaging] = useState(false)
    const [dataCategories, setDataCategories] = useState([])
    const [dataProducts, setDataProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)

    useEffect(() => {
        fetchCategorias()
    }, [])

    const fetchCategorias = async () => {
        setIsLoaging(true)

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
            setIsLoaging(false)
        }
    }

    const fetchCProductosByCategoria = async id_categoria => {
        console.log(`Categoria: ${id_categoria}`)
        setIsLoaging(true)
        setSelectedCategory(id_categoria)

        try {
            await Axios.get("/api/getProductosByCategoria", {
                params: {
                    id_empresa: 1,
                    id_categoria: id_categoria
                }
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
            setIsLoaging(false)
        }
    }

    // Función para manejar la selección de categoría
    const handleCategorySelect = id_categoria => {
        console.log(`Categoria Seleccionada: ${id_categoria}`)
        setSelectedCategory(id_categoria)
        fetchCProductosByCategoria(id_categoria)
    }

    return (
        <Container fluid>
            <Row>
                {/* Columna de categorías fija a la izquierda */}
                <Col xs={3} className="categories-column">
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
                <Col xs={9} className="mt-5">
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
                                            <Card.Text>{product.descripcion}</Card.Text>
                                            <Card.Text className="text-muted">Precio: </Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <div className="d-flex justify-content-between align-items-center border rounded p-2">
                                                {/* Grupo de botones para aumentar/disminuir cantidad */}
                                                <ButtonGroup>
                                                    <Button variant="outline-secondary" onClick={() => {}}>
                                                        <FaMinus />
                                                    </Button>
                                                    <input type="text" className="text-center" value={1} onChange={e => {}} style={{ width: "40px", border: "none" }} />
                                                    <Button variant="outline-secondary" onClick={() => {}}>
                                                        <FaPlus />
                                                    </Button>
                                                </ButtonGroup>
                                                {/* Botón de agregar al carrito */}
                                                <Button variant="primary">Agregar</Button>
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
            </Row>
        </Container>
    )
}

export default Cotizar
