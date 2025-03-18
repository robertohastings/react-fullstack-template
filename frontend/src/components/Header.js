import React, { useContext, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Navbar, Nav, NavDropdown, Dropdown} from "react-bootstrap"
import { Link } from "react-router-dom"
import { RiUser3Line } from "react-icons/ri"
import { CiLogout } from "react-icons/ci"
//import { PiGoogleLogo } from "react-icons/pi"
import { PiPassword } from "react-icons/pi"
import { IoMdNotifications } from "react-icons/io"
import { MdOutlineLocalGroceryStore } from "react-icons/md"
import { MdLocalGroceryStore } from "react-icons/md"

import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"
//import Carrito from "./Carrito"
import { CartContext } from "../context/ShoppingCartContext"

function Header(props) {
    const [cart, setCart] = useContext(CartContext)

    console.log("cart length:", cart)
    

    const quantity = cart.reduce((acc, curr) => {
        return acc + parseInt(curr.cantidad)
    }, 0)

    const appDispatch = useContext(DispatchContext)
    const appState = useContext(StateContext)

    console.log("menu:", appState.user.menu)
    const [menu, setMenu] = useState(appState.user.menu)
    //const [carrito, setCarrito] = useState([])
    //const [carrito, setCarrito] = useState(appState.carrito ?? [])

    //console.log("carrito items:", JSON.parse(localStorage.getItem("carrito")).length)

    // useEffect(() => {
    //     console.log("shoppingCart", props.shoppingCart)
    //     setCarrito(JSON.parse(localStorage.getItem("carrito")))
    // }, [props.shoppingCart])

    // useEffect(() => {
    //     setCarrito(appState.carrito)
    // }, [appState.carrito])

    //TODO: cambiar sessionTitle por el nombre del usuario cuando se autentique
    //y cambiar el icono por la imagen del usurio redondeada como
    //const [sessionTitle, setsessionTitle] = useState(appState.user.username)
    //console.log('Landing Page:', appState.landingPage)
    //console.log("carrito items:", appState.carrito)
    //const sessionTitle = appState.user.username
    // const navDropdownTitle = (
    //     <>
    //         <RiUser3Line /> {sessionTitle}
    //     </>
    // )

    const handled_Notificactions = () => {
        //alert("Notifications")
        appDispatch({ type: "notifications", value: true })
    }

    const handled_LoggedIn = () => {
        //alert("Click")
        appDispatch({ type: "showLoggedIn", value: true })
    }

    const handled_LoggedOut = () => {
        appDispatch({ type: "logout", value: true })
        appDispatch({ type: "showLoggedIn", value: true })
    }

    return (
        <>
            <div className="flex-row my-3 my-md-0">
                <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
                    {/* <Navbar.Brand href="/">Responsive Web Template</Navbar.Brand> */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        {/* Menú Landing Page */}
                        <Nav className="me-auto">
                                <Nav.Link as={Link} to="/">
                                    Inicio
                                </Nav.Link>
                            {/* {(!appState.loggedIn && (!appState.landingPage.settings.mostrar_sitioEnMantenimiento && 
                                appState.landingPage.settings.mostrar_landingPage)) && (
                            )} */}
                            {/* {console.log("appState.landingPage.settings.mostrar_sitioEnMantenimiento:", appState.landingPage.settings.mostrar_sitioEnMantenimiento)} */}
                            {/* {console.log("appState.landingPage.settings.mostrar_landingPage:", appState.landingPage.settings.mostrar_landingPage)} */}
                            {(!appState.loggedIn && (!appState.landingPage.settings.mostrar_sitioEnMantenimiento && 
                                appState.landingPage.settings.mostrar_landingPage)) && (
                                <>
                                    <Nav.Link as={Link} to="AboutUs">
                                        ¿Quienes somos?
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="ContactUs">
                                        Contáctanos
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="Products">
                                        Productos
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="Services">
                                        Servicios
                                    </Nav.Link>
                                </>
                            )}
                        </Nav>
                        {/* Menú Ventas */}
                        {console.log("appState.loggedIn:", appState.loggedIn)}
                        {appState.loggedIn && (
                            <>
                                {/* Ventas */}
                                <Nav>
                                    <NavDropdown title="Ventas" id="nav-ventas" drop="start">
                                        <NavDropdown.Item as={Link} to={"Ventas/Cotizar"}>
                                            Cotizar
                                        </NavDropdown.Item>
                                        <NavDropdown.Item>Colocar Remisión</NavDropdown.Item>
                                        <NavDropdown.Item>Colocar Remisión2</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                                {/* Compras */}
                                <Nav>
                                    <NavDropdown title="Compras" id="nav-compras" drop="start">
                                        <NavDropdown.Item as={Link} to={"Compras/Proveedores/ListProveedores"}>
                                            ABC Proveedores
                                        </NavDropdown.Item>
                                        <NavDropdown.Item>Orden de Compra</NavDropdown.Item>
                                        <NavDropdown.Item>Punto de Reorden</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                                {/* Cartera */}
                                <Nav>
                                    <NavDropdown title="Cartera" id="nav-cartera" drop="start">
                                        <NavDropdown.Item>ABC Clientes</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to={"Cartera/Agenda"}>Agenda</NavDropdown.Item>
                                        <NavDropdown.Item>Estado de Cuenta</NavDropdown.Item>
                                        <NavDropdown.Item>Antigüedad de Saldos</NavDropdown.Item>
                                        <NavDropdown.Item>Notas de Crédito</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                                {/* Inventario */}
                                <Nav>
                                    <NavDropdown title="Inventario" id="nav-inventario" drop="start">
                                        <NavDropdown.Item as={Link} to={"Inventario/Productos/ListProductos"}>
                                            ABC Productos
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to={"Inventario/Categorias/ListCategorias"}>
                                            ABC Categorías
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to={"Inventario/Canvas/PedidoCanvas"}>
                                            Pedidos Canvas
                                        </NavDropdown.Item>
                                        <NavDropdown.Item>Kárdex</NavDropdown.Item>
                                        <NavDropdown.Item>Recepción de mercancía</NavDropdown.Item>
                                        <NavDropdown.Item>Devoluciones</NavDropdown.Item>
                                        <NavDropdown.Item>Entrega de mercancía (Remisión)</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                                {/* Caja */}
                                <Nav>
                                    <NavDropdown title="Caja" id="nav-caja" drop="start">
                                        <NavDropdown.Item>Recepción de Pago</NavDropdown.Item>
                                        <NavDropdown.Item>Generación de Remisión</NavDropdown.Item>
                                        <NavDropdown.Item>Generación de Factura</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                                {/* Facturación */}
                                <Nav>
                                    <NavDropdown title="Facturación" id="nav-facturacion" drop="start">
                                        <NavDropdown.Item>Consulta de Factura</NavDropdown.Item>
                                        <NavDropdown.Item>Consulta de Comprobantes</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                                {/* Catálogos */}
                                <Nav>
                                    <NavDropdown title="Catálogos" id="nav-catalogos" drop="start">
                                        <NavDropdown.Item>Usuarios</NavDropdown.Item>
                                        <NavDropdown.Item>Roles</NavDropdown.Item>
                                        <NavDropdown.Item>Permisos</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                                {/* Mesa de Ayuda */}
                                <Nav>
                                    <NavDropdown title="Mesa de Ayuda" id="nav-mesa-de-ayuda" drop="start">
                                        <NavDropdown.Item>ABC de áreas</NavDropdown.Item>
                                        <NavDropdown.Item>Generación de ticket</NavDropdown.Item>
                                        <NavDropdown.Item>Consultas por estado</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </>
                        )}
                        {/* Menú Notificaciones */}
                        {appState.loggedIn && (
                            <Nav>
                                <Nav.Link onClick={handled_Notificactions}>
                                    <IoMdNotifications />
                                </Nav.Link>
                            </Nav>
                        )}

                        {/* Carrito de compras */}
                        {(!appState.landingPage.settings.mostrar_sitioEnMantenimiento &&
                            appState.landingPage.settings.mostrar_carritoDeCompras
                        ) && (
                            <>
                                <Nav>
                                    <Nav.Link as={Link} to="Carrito">
                                        {quantity === 0 && <MdOutlineLocalGroceryStore size={30} />}
                                        {quantity > 0 && (
                                            <>
                                                <MdLocalGroceryStore size={30} />
                                                <span>{quantity}</span>
                                            </>
                                        )}
                                    </Nav.Link>
                                </Nav>
                            </>
                        )}

                        {/* Menú Usuario */}
                        <Nav>
                            <NavDropdown
                                title={
                                    <>
                                        <RiUser3Line />
                                        {` ${appState.user.username === null ? "" : appState.user.username}`}
                                    </>
                                }
                                id="nav-dropdown"
                                drop="start"
                            >
                                {!appState.loggedIn && (
                                    <NavDropdown.Item eventKey="4.1" className="d-flex align-items-center gap-2" onClick={handled_LoggedIn}>
                                        <PiPassword /> Entrar
                                    </NavDropdown.Item>
                                )}

                                {appState.loggedIn && (
                                    <>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item eventKey="4.3" className="d-flex align-items-center gap-2" onClick={handled_LoggedOut}>
                                            <CiLogout /> Salir
                                        </NavDropdown.Item>

                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={Link} to="Admin/Perfil" eventKey="4.4" className="d-flex align-items-center gap-2">
                                            <RiUser3Line />
                                            Peril
                                        </NavDropdown.Item>
                                    </>
                                )}
                            </NavDropdown>
                        </Nav>
                        {/* Menú Admin */}
                        {appState.loggedIn && (
                            <Nav>
                                <NavDropdown title="CRM" id="nav-dropdown" drop="start">
                                    <NavDropdown.Item as={Link} eventKey="5.1">
                                        Usuarios
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item eventKey="5.2">Productos</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} to="Admin/LandingPage" eventKey="5.3">
                                        Landing Page
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        )}
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </>
    )
}

export default Header
