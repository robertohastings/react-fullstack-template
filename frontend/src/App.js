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

function App() {
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)

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
        notifications: false
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
                //console.log('action data landingPage:', action.data)
                //draft.landingPage = action.data
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
                    dispatch({ type: "landingPage", data: response.data.landingPage })
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
                        <Header />

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
