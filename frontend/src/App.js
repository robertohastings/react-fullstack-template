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
import { setTokenGetter } from "./tools/AxiosInstance"

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
    const [hostname, setHostname] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [enMtto, setEnMtto] = useState({
        settings: {
            mostrar_landingPage: 0,
            mostrar_sitioEnMantenimiento: 1
        }
    })
    const currentHostname = window.location.hostname;
    const esLocalHost = false; // Cambia a false si no estás en localhost

    useEffect(() => {
        setHostname(esLocalHost ? hostnameTesting : currentHostname);
    }, [hostnameTesting]);
 
    const initialState = {
        hostname: "",
        token: "",
        loggedIn: false,
        menu: [],
        landingPage: null,
        idEmpresa: null,
        usuario: {
            idUsuario: 0,
            username: '',
            avatar: '',
            menu: []
        },
        flashMessages: [],
        alert: {
            message: [],
            typeAlert: "",
        },
        notifications: false,
    };

    function ourReducer(draft, action) {
        switch (action.type) {
            case "initialize":
                draft.hostname = action.data.hostname;
                draft.token = action.data.token;
                draft.loggedIn = action.data.loggedIn;
                draft.menu = action.data.menu;
                draft.landingPage = action.data.landingPage;
                draft.idEmpresa = action.data.idEmpresa;
                break;
            case "login":
                draft.usuario.idUsuario = action.data.idUsuario;
                draft.usuario.username = action.data.username;
                draft.usuario.avatar = action.data.avatar;
                draft.usuario.menu = action.data.menu;
                draft.menu = action.data.menu;
                draft.loggedIn = true;
                draft.token = action.data.token
                setTokenGetter(() => action.data.token);
                break;                
            case "logout":
                draft.loggedIn = false;
                localStorage.removeItem("hostregioLandingPage");
                break;
            case "menu":
                draft.menu = action.data
                break;
            case "alertMessage":
                draft.alert.message.push(action.value);
                draft.alert.typeAlert = action.typeAlert;
                break;
            default:
                break;
        }
    }

    const [state, dispatch] = useImmerReducer(ourReducer, initialState)

    useEffect(() => {
        //if (!hostname) return; // Espera a que hostname esté definido

        const storedData = getDecryptedItem("hostregioLandingPage");

        //const resolvedHostname = hostname || window.location.hostname; // Usa un valor predeterminado si hostname es undefined
        const resolvedHostname = esLocalHost ? currentHostname : hostnameTesting ;

        if (storedData && isTokenValid(storedData.token)) {
            // Si los datos existen y el token es válido, inicializa el estado
            dispatch({
                type: "initialize",
                data: {
                    hostname: resolvedHostname,
                    token: storedData.token,
                    loggedIn: true,
                    menu: storedData.menu,
                    landingPage: storedData.landingPage,
                    idEmpresa: storedData.idEmpresa,
                },
            });
        } else {
            // Si no hay datos o el token no es válido, realiza la llamada a la API
            axios
                .get(`${api_url}/getLandingPage`, {
                    params: { hostname: resolvedHostname },
                })
                .then((response) => {
                    console.log('Reponse data:', response.data, )
                    const landingPageData = {
                        hostname: resolvedHostname,
                        token: response.data.token || "",
                        loggedIn: !!response.data.token && isTokenValid(response.data.token),
                        menu: response.data.landingPage.menuLanding || [],
                        landingPage: response.data.landingPage,
                        idEmpresa: response.data.landingPage.idEmpresa,
                    };

                    // Guarda los datos en localStorage
                    setEncryptedItem("hostregioLandingPage", landingPageData);

                    // Inicializa el estado
                    dispatch({
                        type: "initialize",
                        data: landingPageData,
                    });
                })
                .catch((error) => {
                    console.error("Error al obtener los datos del landing page:", error);
                });
        }
    }, [dispatch]);

    if (!state.landingPage) {
        return (
            <div>
                <SpinnerDot />
            </div>
        );
    }    

    // if (isLoading) {
    //     //console.log("Cargando info...")
    //     return (
    //         <div>
    //             <SpinnerDot />
    //         </div>
    //     )
    // }

    return (
        <>
            <StateContext.Provider value={state}>
                <DispatchContext.Provider value={dispatch}>
                    <BrowserRouter>
                        <ShoppingCartProvider>
                            {/* <FlashMessage messages={state.flashMessages} /> */}
                            <FlashMessage messages={state.alert.message} typeAlert={state.alert.typeAlert} />
                            <Notifications show={state.notifications} />
                            <LoggedIn show={!state.loggedIn} />
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
