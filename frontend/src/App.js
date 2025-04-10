// frontend/src/App.js
import React, { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import axios from "axios"
import { useImmerReducer } from "use-immer"
import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"
import ShoppingCartProvider from "./context/ShoppingCartContext"
import { setEncryptedItem, getDecryptedItem } from "./tools/Utils"
import { isTokenValid } from "./tools/Utils"

//My Components
import Header from "./components/Header"
import Header2 from "./components/Header2"
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
import Perfil from "./components/Admin/Perfil/Perfil"
//import { PiEraserFill } from "react-icons/pi"
import PedidoCanvas from "./components/Inventario/Canvas/PedidoCanvas"
import Cotizar from "./components/Ventas/Cotizar/Cotizar"
import LandingPagePreview from "./components/LandingPagePreview"
import Agenda from "./components/Cartera/Agenda/Agenda"

function App() {
    //.log("Aquí")
    //const [cart, setCart] = useContext(CartContext)
    //const [data, setData] = useState({})
    const api_url = process.env.REACT_APP_API_URL
    const hostnameTesting = process.env.REACT_APP_HOSTNAME_TESTING
    const [isLoading, setIsLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [hostname, setHostname] = useState("")
    const [enMtto, setEnMtto] = useState({
        settings: {
            mostrar_sitioEnMantenimiento: 1
        }
    })
    const esLocalHost = true // false si quiero simular un dominio valido, true si el dominio es localhost

    // useEffect(() => {

    //     // Si estamos en production
    //     if (window.location.hostname === "localhost" && !esLocalHost) {
    //         console.log(1)
    //         console.log('hostnameTesting:', hostnameTesting)
    //         setHostname(hostnameTesting)            
    //     } else {
    //         console.log(2)
    //         setHostname(window.location.hostname)
    //     }
    //     console.log("Effect app")
    //     console.log(`hostname: ${hostname}`)
    // }, [])    


    const initialState = {
        hostname: getDecryptedItem("hostregioHostname") ?? window.location.hostname,
        idLandingPage: 1,
        //loggedIn: Boolean(localStorage.getItem("complexappToken")),
        loggedIn: isTokenValid(localStorage.getItem("complexappToken")),
        //showLoggedIn: !Boolean(localStorage.getItem("complexappToken")),
        showLoggedIn: !isTokenValid(localStorage.getItem("complexappToken")) || !getDecryptedItem("hostregioUsuarioMenu"),
        flashMessages: [],
        alert: {
            message: [],
            typeAlert: ""
        },
        user: {
            idUser: localStorage.getItem("complexappIdUser"),
            token: localStorage.getItem("complexappToken"),
            username: localStorage.getItem("complexappUsername"),
            avatar: localStorage.getItem("complexappAvatar"),
            menu: getDecryptedItem("hostregioUsuarioMenu")
        },
        isSearchOpen: false,
        isChatOpen: false,
        unreadReadChatCount: 0,
        //landingPage: JSON.parse(localStorage.getItem("complexappLanding")),
        landingPage: getDecryptedItem("hostregioLandingPage") ?? enMtto,
        idEmpresa: getDecryptedItem("hostregioTenant") ?? getDecryptedItem("hostregioLandingPage")?.idEmpresa,
        notifications: false
        //carrito: JSON.parse(localStorage.getItem("carrito")) ?? []
    }

    function ourReducer(draft, action) {
        switch (action.type) {
            case "idEmpresa":
                console.log("Actualizando idEmpresa:", action.data);
                draft.idEmpresa = action.data; // Actualiza el estado con el nuevo idEmpresa
                break;            
            case "tenant":
                setEncryptedItem("hostregioTenant", action.data)
                break
            case "hostname":
                draft.hostname = action.data
                //setEncryptedItem("hostregioHostname", action.data)
                break
            case "login":
                draft.loggedIn = true
                draft.user.menu = action.data.menu
                localStorage.setItem("complexappIdUser", action.data.id_usuario)
                localStorage.setItem("complexappToken", action.data.token)
                localStorage.setItem("complexappUsername", action.data.username)
                localStorage.setItem("complexappAvatar", action.data.avatar)
                setEncryptedItem("hostregioUsuarioMenu", action.data.menu)
                break
            case "logout":
                draft.loggedIn = false
                localStorage.removeItem("complexappToken")
                localStorage.removeItem("complexappUsername")
                localStorage.removeItem("complexappAvatar")
                localStorage.removeItem("hostregioUsuarioMenu")
                //window.location.reload()
                break
            case "landingPage":
                console.log("action data landingPage:", action.data)
                draft.landingPage = action.data
                localStorage.setItem("complexappLanding", JSON.stringify(action.data))
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
        console.log("Aquí....")
        localStorage.setItem("complexappLanding", JSON.stringify([]))
        console.log('api_url:', api_url)

        // Si estamos en production
        var hostname = window.location.hostname
        if (window.location.hostname === "localhost" && !esLocalHost) {
            console.log(1)
            console.log('hostnameTesting:', hostnameTesting)
            hostname = hostnameTesting
            //setHostname(hostnameTesting)            
        } else {
            console.log(2)
            //setHostname(window.location.hostname)
        }
        console.log("Effect app")
        console.log(`hostname: ${hostname}`)
        //console.log('decrypted landing page:', getDecryptedItem("hostregioLandingPage"))
        


       
        try {
            axios
                .get(`${api_url}/getLandingPage`, {
                    params: {
                        hostname: hostname,
                    }
                })
                .then(response => {
                    console.log("dataLanding:", response.data)
                    setIsLoading(false)
                    
                    localStorage.setItem("complexappLanding", JSON.stringify(response.data.landingPage))
                    
                    // creo cockies encriptadas
                    setEncryptedItem("hostregioTenant", response.data.landingPage.idEmpresa)
                    setEncryptedItem("hostregioLandingPage", response.data.landingPage)
                    setEncryptedItem("hostregioLandingPageId", response.data.landingPage.idLandingPage)
                    setEncryptedItem("hostregioLandingPageSettings", response.data.landingPage.settings)                    

                    // seteo el estado directo el response
                    dispatch({ type: "landingPage", data: response.data.landingPage })
                    dispatch({ type: "idEmpresa", data: response.data.landingPage.idEmpresa })
                    dispatch({ type: "hostname", data: hostname })
                    console.log('showLoogedIn: ', Boolean(localStorage.getItem("complexappToken")))

                    //
                    console.log("appState user menu:", state.user.menu)
                    console.log("Menú landing:", response.data.landingPage.menuLanding)
                    if (Array.isArray(state.user.menu) && state.user.menu.length === 0) {
                        console.log("No hay menú en el estate")
                        //dispatch({ type: "showLoggedIn", value: true })
                        if (Array.isArray(response.data.landingPage.menuLanding) && response.data.landingPage.menuLanding.length > 0){
                            console.log("Si menú en landing")
                            setEncryptedItem("hostregioUsuarioMenu", response.data.landingPage.menuLanding)
                        }
                    }


                    // if (response.data.landingPage.menuLanding.length = 0) {
                    //     console.log("No hay menú")
                    //     dispatch({ type: "showLoggedIn", value: true })
                    // }
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
    }, [dispatch])

    //UseEffect para grabar en el LS
    // useEffect(() => {
    //     if (cart?.length === 0) return
    //     localStorage.setItem("carrito", JSON.stringify(cart))
    // }, [cart])

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
                        <ShoppingCartProvider>
                            {/* <FlashMessage messages={state.flashMessages} /> */}
                            <FlashMessage messages={state.alert.message} typeAlert={state.alert.typeAlert} />
                            <Notifications show={state.notifications} />
                            <LoggedIn show={state.showLoggedIn} />
                            {/* <LoggedIn show={!isLoggedIn} /> */}
                            {/* <Header shoppingCart={state.carrito} /> */}
                            <Header2 shoppingCart={state.carrito} />

                            <main>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    {/* <Route path="/Header2" element={<Header2/>} /> */}
                                    <Route path="/AboutUs" element={<AboutUs />} />
                                    <Route path="/ContactUs" element={<ContactUs />} />
                                    <Route path="/Products" element={<Products />} />
                                    <Route path="/Services" element={<Services />} />
                                    <Route path="/Admin" element={<Admin />} />
                                    <Route path="/Usuarios" element={<Testing title="Usuarios" />} />
                                    <Route path="/Admin/LandingPage" element={<LandingPage />} />
                                    <Route path="/Inventario/Categorias/ListCategorias" element={<ListCategorias />} />
                                    <Route path="/Inventario/Productos/ListProductos" element={<ListProductos />} />
                                    <Route path="/Inventario/Canvas/PedidoCanvas" element={<PedidoCanvas />} />
                                    <Route path="/Compras/Proveedores/ListProveedores" element={<ListProveedores />} />
                                    <Route path="/Carrito" element={<Carrito />} />
                                    <Route path="/Admin/Perfil" element={<Perfil />} />
                                    <Route path="/Ventas/Cotizar" element={<Cotizar />} />
                                    <Route path="/LandingPagePreview" element={<LandingPagePreview />} />
                                    <Route path="/Cartera/Agenda" element={<Agenda />} />
                                </Routes>
                            </main>

                            <Footer />
                        </ShoppingCartProvider>
                    </BrowserRouter>
                </DispatchContext.Provider>
            </StateContext.Provider>
        </>
    )
}

export default App
