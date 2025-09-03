// frontend/src/App.js
import React, { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import axios from "axios"
import AxiosConfig from "./tools/AxiosConfig"
import { useImmerReducer } from "use-immer"
import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"
import ShoppingCartProvider from "./context/ShoppingCartContext"
import { setEncryptedItem, getDecryptedItem } from "./tools/Utils"
import { isTokenValid } from "./tools/Utils"
import { setTokenGetter} from "./tools/AxiosInstance"

//My Components
//import Header from "./components/Header"
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
import Clientes from "./components/Cartera/Clientes"
import MovimientosCaja from "./components/Ventas/Cotizar/MovimientosCaja"
import Kardex from "./components/Inventario/Kardex/Kardex"
import OrdenCompra from "./components/Compras/Proveedores/OrdenCompra"
//import Menu from "./components/Admin/Settings/Menu"
import Settings from "./components/Admin/Settings/Settings"

//LandingPages
import LandingPageOne from "./LandingPages/LandingPageOne/LandingPageOne"
import LandingPageTwo from "./LandingPages/LandingPageTwo/LandingPageTwo"

//CRM Components
import { CRMProvider, useCRMState } from "./CrmContext"
import CRMLogin from "./components/CRMLogin"

function App() {
    const api_url = process.env.REACT_APP_API_URL
    const hostnameTesting = process.env.REACT_APP_HOSTNAME_TESTING
    const esAmbienteDesarrollo = process.env.REACT_APP_AMBIENTE_DESARROLLO === "true"
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
    //esLocalHost indica si estoy en ambiente desarrollo
    //const esLocalHost = true; // Cambia a false si no estás en localhost

    // useEffect(() => {
    //     setHostname(esLocalHost ? hostnameTesting : currentHostname);
    // }, [hostnameTesting]);
 
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
                draft.tipoPedido = action.data.tipoPedido;
                draft.formasDePago = action.data.formasDePago;
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
    const [landingPageComponent, setLandingPageComponent] = useState(null)


    useEffect(() => {
        //if (!hostname) return; // Espera a que hostname esté definido

        const resolvedHostname = esAmbienteDesarrollo ? hostnameTesting : currentHostname ;
        
        const storedData = getDecryptedItem(`${resolvedHostname}LandingPage`);

        //const resolvedHostname = hostname || window.location.hostname; // Usa un valor predeterminado si hostname es undefined

        if (storedData && isTokenValid(storedData.token)) {
            // Si los datos existen y el token es válido, inicializa el estado
            dispatch({
                type: "initialize",
                data: {
                    hostname: resolvedHostname,
                    token: storedData.token,
                    loggedIn: true,
                    menu: storedData.menu,
                    tipoPedido: storedData.tipoPedido,
                    formasDePago: storedData.formasDePago,
                    landingPage: storedData.landingPage,
                    idEmpresa: storedData.idEmpresa,
                },
            });
            console.log('Stored data found in localStorage:', storedData.landingPage);
            // Determine the landing page component based on id_landingPage
            switch (storedData.landingPage.id_landingPage) {
                case 1:
                    setLandingPageComponent(<LandingPageOne content={storedData.landingPage} />);
                    break;
                case 2:
                    setLandingPageComponent(<LandingPageTwo content={storedData.landingPage.content} />);
                    break;
                // Add more cases for other landing pages
                default:
                    setLandingPageComponent(<LandingPageOne content={storedData.landingPage.content} />); // Default landing page
                    break;
            }            
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
                        tipoPedido: response.data.landingPage.tipoPedido || [],
                        formasDePago: response.data.landingPage.formasDePago || [],
                        landingPage: response.data.landingPage,
                        idEmpresa: response.data.landingPage.idEmpresa,
                    };
                    console.log('Landing page response data:', response.data.landingPage);

                    // Guarda los datos en localStorage
                    setEncryptedItem("hostregioLandingPage", landingPageData);

                    // Inicializa el estado
                    dispatch({
                        type: "initialize",
                        data: landingPageData,
                    });
                    // Determine the landing page component based on id_landingPage
                    switch (response.data.landingPage.id_landingPage) {
                        case 1:
                            setLandingPageComponent(<LandingPageOne content={response.data.landingPage} />);
                            break;
                        case 2:
                            setLandingPageComponent(<LandingPageTwo content={response.data.landingPage.content} />);
                            break;
                        // Add more cases for other landing pages
                        default:
                            setLandingPageComponent(<LandingPageOne content={response.data.landingPage.content} />); // Default landing page
                            break;
                    }                    
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
                    <CRMProvider>   
                        <BrowserRouter>
                            <AxiosConfig />
                            <ShoppingCartProvider>
                                {/* <FlashMessage messages={state.flashMessages} /> */}
                                <FlashMessage messages={state.alert.message} typeAlert={state.alert.typeAlert} />
                                <Notifications show={state.notifications} />
                                {/* <LoggedIn show={!state.loggedIn} /> Este lo comenté */}

                                {/* <LoggedIn show={!isLoggedIn} /> */}
                                {/* <Header shoppingCart={state.carrito} /> */}

                                {/* <Header2 shoppingCart={state.carrito} /> También lo comenté */}
                                    <Routes>
                                        <Route path="/" element={landingPageComponent} />{" "}
                                        {/* Dynamic Landing Page */}
                                        <Route path="/crm/login" element={<CRMLogin />} />{" "}
                                        <Route path="/crm/perfil" element={<Perfil />} />{" "}
                                        {/* CRM Login Route */}
                                        <Route
                                            path="/erp/*"
                                            element={
                                                state.loggedIn ? (
                                                    <>
                                                        <Header2 shoppingCart={state.carrito} />
                                                        <main>
                                                            <Routes>
                                                                <Route path="/" element={<Home />} />
                                                                <Route path="AboutUs" element={<AboutUs />} />
                                                                <Route path="ContactUs" element={<ContactUs />} />
                                                                <Route path="Products" element={<Products />} />
                                                                <Route path="Services" element={<Services />} />
                                                                <Route path="Usuarios" element={<Testing title="Usuarios" />} />
                                                                <Route path="Inventario/Categorias/ListCategorias" element={<ListCategorias />} />
                                                                <Route path="Inventario/Productos/ListProductos" element={<ListProductos />} />
                                                                <Route path="Inventario/Canvas/PedidoCanvas" element={<PedidoCanvas />} />
                                                                <Route path="Inventario/Kardex/Kardex" element={<Kardex />} />
                                                                <Route path="Compras/Proveedores/ListProveedores" element={<ListProveedores />} />
                                                                <Route path="Compras/Proveedores/OrdenCompra" element={<OrdenCompra />} />
                                                                <Route path="Carrito" element={<Carrito />} />
                                                                <Route path="Ventas/Cotizar" element={<Cotizar />} />
                                                                <Route path="Ventas/MovimientosCaja" element={<MovimientosCaja />} />
                                                                <Route path="Cartera/Agenda" element={<Agenda />} />
                                                                <Route path="Cartera/Clientes" element={<Clientes />} />
                                                                <Route path="Admin/LandingPage" element={<LandingPage />} />
                                                                <Route path="Admin/Settings/Settings" element={<Settings />} />
                                                            </Routes>
                                                        </main>
                                                        <Footer />
                                                    </>
                                                ) : (
                                                    <Navigate to="/" />
                                                )
                                            }
                                        />
                                        <Route path="/Admin/*" element={state.loggedIn ? <AdminRoutes /> : <Navigate to="/" />} />{" "}
                                        {/* Admin Route */}
                                        <Route path="/LandingPagePreview" element={<LandingPagePreview />} />
                                    </Routes>
                            </ShoppingCartProvider>
                        </BrowserRouter>
                    </CRMProvider>
                </DispatchContext.Provider>
            </StateContext.Provider>
        </>
    )
}

function AdminRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Admin />} />
            <Route path="LandingPage" element={<LandingPage />} />
            <Route path="Settings/Settings" element={<Settings />} />
            {/* Add other admin routes here */}
        </Routes>
    );
}

export default App
