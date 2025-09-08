import React, { useEffect, useState, useContext } from "react"
import HtmlReactParser from "html-react-parser"
import StateContext from "../StateContext"
import { Col, Form, Row, Card, ListGroup, Button, Container, Image } from "react-bootstrap"
import DispatchContext from "../DispatchContext"

import Page from "./Page"
import Axios from "axios"

import SpinnerDot from "./Spinner/SpinnerDot"
import { CartContext } from "../context/ShoppingCartContext"
import styles from "./Products.module.css"
import Header2 from "../LandingPages/Header2"

function Products() {
    const [cart, setCart] = useContext(CartContext)

    const appDispatch = useContext(DispatchContext)
    const appState = useContext(StateContext)
    console.log("appState:", appState.landingPage.productos)
    //const { productos } = appState.landinPage.productos
    const dataCategories = appState.landingPage.categorias

    const [categoria, setCategoria] = useState(1)
    const [productos, setProductos] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    // const handleChange = e => {
    //     //console.log("handleSelect", e.target.value)
    //     setCategoria(e.target.value)
    // }

    useEffect(() => {
        if (categoria > 0) {
            //console.log(categoria)
            setIsLoading(true)
            async function fetchData() {
                try {
                    await Axios.get("/api/getProductosByCategoria", {
                        params: {
                            id_empresa: 1,
                            id_categoria: categoria
                        }
                    })
                        .then(response => {
                            if ((response.status = 200)) {
                                console.log("productos encontrados:", response.data.productos)
                                setProductos(response.data.productos)
                            } else {
                                console.log("There was an error fetching data", response.error.statusText)
                            }
                        })
                        .catch(error => {
                            console.log("There was an error fetching data", error)
                        })
                    // console.log("productos", response.data)
                    // setProductos(response.data)
                } catch (error) {
                    console.log("error:", error)
                } finally {
                    setIsLoading(false)
                }
            }
            fetchData()
        }
    }, [categoria])

    const agregarCarrito_handled = producto => {
        const data = {
            id_producto: producto.id_producto,
            nombre: producto.nombre,
            cantidad: 1,
            precio: producto.precio_promocion > 0 ? producto.precio_promocion : producto.precio,
            imagen: producto.image1
        }
        // console.log("producto", data)
        // appDispatch({
        //     type: "agregarCarrito",
        //     data: data
        // })
        // appDispatch({ type: "alertMessage", value: "Producto agregado al carrito", typeAlert: "success" })

        setCart(currItems => {
            const isItemFound = currItems.find(item => item.id_producto === producto.id_producto)

            if (isItemFound) {
                return currItems.map(item => {
                    if (item.id_producto === producto.id_producto) {
                        return { ...item, cantidad: parseInt(item.cantidad) + 1 }
                    } else {
                        return item
                    }
                })
            } else {
                return [...currItems, data]
            }
        })

        appDispatch({ type: "alertMessage", value: "Producto agregado al carrito", typeAlert: "success" })
    }

    // Dividimos las categorías en filas de 4
    const rows = []
    for (let i = 0; i < dataCategories.length; i += 4) {
        rows.push(dataCategories.slice(i, i + 4))
    }

    return (
        <Page title="Productos">
            <div className={styles.productsPage}>
                <Container>
                    <h2 className={styles.title}>Nuestros Productos</h2>
                    <div className={styles.categorySelector}>
                        <Form.Group controlId="selectorCategoria">
                            <Form.Label>Filtrar por Categoría</Form.Label>
                            <Form.Select value={categoria} onChange={e => setCategoria(e.target.value)}>
                                {dataCategories.map(cat => (
                                    <option key={cat.id_categoria} value={cat.id_categoria}>
                                        {cat.nombre}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </div>

                    {isLoading && <SpinnerDot />}

                    {!isLoading && productos.length > 0 && (
                        <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-center">
                            {productos.map(producto => (
                                <Col key={producto.id_producto} className="d-flex">
                                    {/* 2. Aplicar los nuevos estilos a la tarjeta */}
                                    <div className={styles.productCard}>
                                        <div className={styles.cardImageContainer}>
                                            <img src={producto.image1 || "https://fiestatijuana.mx/image-not-available.png"} alt={producto.nombre} className={styles.cardImage} />
                                        </div>
                                        <div className={styles.cardBody}>
                                            <h3 className={styles.cardTitle}>{producto.nombre}</h3>
                                            <p className={styles.cardText}>{producto.descripcion}</p>
                                        </div>
                                        <div className={styles.priceInfo}>
                                            <span className={styles.price}>${producto.precio}</span>
                                            <span className={styles.stock}>Stock: {producto.existencia}</span>
                                        </div>
                                        <div className={styles.cardFooter}>
                                            <button className={`btn btn-outline-secondary ${styles.actionButton}`}>Ver</button>
                                            <button className={`btn btn-primary ${styles.actionButton}`} onClick={() => agregarCarrito_handled(producto)}>
                                                Agregar
                                            </button>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    )}
                </Container>
            </div>
        </Page>
    )
}

export default Products
