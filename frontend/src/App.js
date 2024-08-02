// frontend/src/App.js
import React, { useEffect, useState, useContext, act } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import axios from "axios"
import { useImmerReducer } from "use-immer"
import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"

//My Components
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./components/Home"
import AboutUs from "./components/AboutUs"
import ContactUs from "./components/ContactUs"
import Products from "./components/Products"
import Services from "./components/Services"
import SpinnerDot from "./components/Spinner/SpinnerDot"
import Admin from "./components/Admin"
import Testing from "./components/Testing"
import LandingPage from "./components/Admin/LandingPage"
import FlashMessage from "./tools/FlashMessage"
import Notifications from "./components/Notifications"
import LoggedIn from "./components/LoggedIn"
import ListCategorias from "./components/Inventario/Categorias/ListCategorias"
import ListProveedores from "./components/Compras/Proveedores/ListProveedores"
import ListProductos from "./components/Inventario/Productos/ListProductos"
import Carrito from "./components/Carrito"

function App() {
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [carrito, setCarrito] = useState([])

    const initialState = {
        loggedIn: Boolean(localStorage.getItem("complexappToken")),
        showLoggedIn: false,
        flashMessages: [],
        alert: {
            message: [],
            typeAlert: ""
        },
        user: {
            token: localStorage.getItem("complexappToken"),
            username: localStorage.getItem("complexappUsername"),
            avatar: localStorage.getItem("complexappAvatar")
        },
        isSearchOpen: false,
        isChatOpen: false,
        unreadReadChatCount: 0,
        landingPage: JSON.parse(localStorage.getItem("complexappLanding")),
        notifications: false,
        carrito: JSON.parse(localStorage.getItem("carrito")) ?? []
    }

    function ourReducer(draft, action) {
        switch (action.type) {
            case "login":
                draft.loggedIn = true
                //draft.user = action.data
                localStorage.setItem("complexappToken", action.data.token)
                localStorage.setItem("complexappUsername", action.data.username)
                localStorage.setItem("complexappAvatar", action.data.avatar)
                break
            case "logout":
                draft.loggedIn = false
                localStorage.removeItem("complexappToken")
                localStorage.removeItem("complexappUsername")
                localStorage.removeItem("complexappAvatar")
                break
            case "landingPage":
                console.log("action data landingPage:", action.data)
                //draft.landingPage = action.data
                localStorage.setItem("complexappLanding", JSON.stringify(action.data))
                break
            case "setCarrito":
                draft.carrito = JSON.parse(localStorage.getItem("carrito")) ?? []
                break
            case "agregarCarrito":
                //console.log("action data", action.data)
                //console.log('agregando....', guitarra)
                //se va a interar sobre carrito mediante some

                //Se activa la animación del flying
                //setIsFlying(true);
                //setTimeout(() => setIsFlying(false), 1000);

                setCarrito(JSON.parse(localStorage.getItem("carrito")) ?? [])

                if (carrito.some(productoState => productoState.id_producto === action.data.id_producto)) {
                    // iterar sobre el arreglo e indentificar el
                    // elemento duplicado
                    const carritoActualizado = carrito.map(productoState => {
                        if (productoState.id_producto === action.data.id_producto) {
                            //rescribir la cantidad
                            console.log("cantidad actual:", productoState.cantidad, " cantidad a agregar:", action.data.cantidad)
                            productoState.cantidad = action.data.cantidad
                        }
                        return productoState
                    })
                    setCarrito(carritoActualizado)
                } else {
                    //registro nuevo
                    setCarrito([...carrito, action.data])
                }
                localStorage.setItem("carrito", JSON.stringify(carrito))
                draft.carrito = carrito
                break
            case "actualizarCantidad":
                const carritoActualizado = carrito.map(productoState => {
                    if (productoState.id_producto === action.data.id_producto) {
                        productoState.cantidad = action.data.cantidad
                    }
                    return productoState
                })
                setCarrito(carritoActualizado)
                break
            case "eliminarProducto":
                //setIsFlying(true);
                //setTimeout(() => setIsFlying(false), 1500);
                console.log("Action value:", action.value)
                setCarrito(JSON.parse(localStorage.getItem("carrito")) ?? [])
                const carritoEliminar = carrito.filter(productoState => productoState.id_producto !== action.value)
                setCarrito(carritoEliminar)
                localStorage.setItem("carrito", JSON.stringify(carrito))
                draft.carrito = carrito
                break
            case "vaciarCarrito":
                setCarrito([])
                localStorage.removeItem("carrito")
                break
            case "landingPageSettings":
                //console.log('action data landingPage:', action.data)
                draft.landingPage.settings = action.data
                break
            case "flashMessage":
                draft.flashMessages.push(action.value)
                break
            case "notifications":
                draft.notifications = action.value
                break
            case "showLoggedIn":
                draft.showLoggedIn = action.value
                break
            case "alertMessage":
                draft.alert.message.push(action.value)
                draft.alert.typeAlert = action.typeAlert
                break
            default:
            //do nothing
        }
        return
    }

    const [state, dispatch] = useImmerReducer(ourReducer, initialState)

    useEffect(() => {
        //localStorage.setItem("complexappCarrito", JSON.stringify([]))
        localStorage.setItem("complexappLanding", JSON.stringify([]))
        //const carritoLS = JSON.parse(localStorage.getItem("carrito")) ?? []
        //setCarrito(carritoLS)
        dispatch({ type: "setCarrito" })

        try {
            // await axios
            //     .get("/api/landingPage")
            //     .then(response => {
            //         console.log("data:", response.data)
            //         setData(response.data)
            //         setIsLoading(false)
            //         dispatch({ type: "landinPage", data: response.data })
            //     })
            //     .catch(error => {
            //         console.error("There was an error fetching the data!", error)
            //         setIsLoading(true)
            //     })
            axios
                .get("/api/getLandingPage", {
                    params: {
                        id_empresa: 1,
                        id_landingPage: 1
                    }
                })
                .then(response => {
                    console.log("dataLanding:", response.data)
                    setData(response.data)
                    setIsLoading(false)
                    //dispatch({ type: "landingPage", data: response.data.landingPage })
                    localStorage.setItem("complexappLanding", JSON.stringify(response.data.landingPage))
                })
                .catch(error => {
                    console.error("There was an error fetching the data!", error)
                    setIsLoading(true)
                })
        } catch (error) {
            console.error("There was an error fetching the data!", error)
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }, [])

    // UseEffect para grabar en el LS
    // useEffect(() => {
    //     if (carrito?.length === 0) return
    //     localStorage.setItem("carrito", JSON.stringify(carrito))
    // }, [carrito])

    if (isLoading) {
        //console.log("Cargando info...")
        return (
            <div>
                <SpinnerDot />
            </div>
        )
    }

    return (
        <>
            <StateContext.Provider value={state}>
                <DispatchContext.Provider value={dispatch}>
                    <BrowserRouter>
                        {/* <FlashMessage messages={state.flashMessages} /> */}
                        <FlashMessage messages={state.alert.message} typeAlert={state.alert.typeAlert} />
                        <Notifications show={state.notifications} />
                        <LoggedIn show={state.showLoggedIn} />
                        <Header shoppingCart={state.carrito} />

                        <main>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/AboutUs" element={<AboutUs />} />
                                <Route path="/ContactUs" element={<ContactUs />} />
                                <Route path="/Products" element={<Products />} />
                                <Route path="/Services" element={<Services />} />
                                <Route path="/Admin" element={<Admin />} />
                                <Route path="/Usuarios" element={<Testing title="Usuarios" />} />
                                <Route path="/Admin/LandingPage" element={<LandingPage />} />
                                <Route path="/Inventario/Categorias/ListCategorias" element={<ListCategorias />} />
                                <Route path="/Inventario/Productos/ListProductos" element={<ListProductos />} />
                                <Route path="/Compras/Proveedores/ListProveedores" element={<ListProveedores />} />
                                <Route path="/Carrito" element={<Carrito />} />
                            </Routes>
                        </main>

                        <Footer />
                    </BrowserRouter>
                </DispatchContext.Provider>
            </StateContext.Provider>
        </>
    )
}

export default App
