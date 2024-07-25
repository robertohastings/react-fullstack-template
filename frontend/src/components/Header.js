import React, { useContext, useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Navbar, Nav, NavDropdown, Dropdown, Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import { RiUser3Line } from "react-icons/ri"
import { CiLogout } from "react-icons/ci"
import { PiGoogleLogo } from "react-icons/pi"
import { PiPassword } from "react-icons/pi"
import { IoMdNotifications } from "react-icons/io"

import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"

function Header() {
    const appDispatch = useContext(DispatchContext)
    const appState = useContext(StateContext)

    //TODO: cambiar sessionTitle por el nombre del usuario cuando se autentique
    //y cambiar el icono por la imagen del usurio redondeada como
    //const [sessionTitle, setsessionTitle] = useState(appState.user.username)
    console.log(appState.loggedIn)
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
    }

    return (
        <div className="flex-row my-3 my-md-0">
            <Navbar bg="dark" variant="dark" expand="lg">
                {/* <Navbar.Brand href="/">Responsive Web Template</Navbar.Brand> */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    {/* Menú Landing Page */}
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">
                            Inicio
                        </Nav.Link>
                        {!appState.loggedIn && (
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
                    {appState.loggedIn && (
                        <>
                            <Nav>
                                <NavDropdown title="Ventas" id="nav-ventas" drop="start">
                                    <NavDropdown.Item>Cotizar</NavDropdown.Item>
                                    <NavDropdown.Item>Colocar Remisión</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Nav>
                                <NavDropdown title="Compras" id="nav-compras" drop="start">
                                    <NavDropdown.Item as={Link} to={"Compras/Proveedores/ListProveedores"}>
                                        ABC Proveedores
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>Orden de Compra</NavDropdown.Item>
                                    <NavDropdown.Item>Punto de Reorden</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Nav>
                                <NavDropdown title="Cartera" id="nav-cartera" drop="start">
                                    <NavDropdown.Item>ABC Clientes</NavDropdown.Item>
                                    <NavDropdown.Item>Estado de Cuenta</NavDropdown.Item>
                                    <NavDropdown.Item>Antigüedad de Saldos</NavDropdown.Item>
                                    <NavDropdown.Item>Notas de Crédito</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Nav>
                                <NavDropdown title="Inventario" id="nav-inventario" drop="start">
                                    <NavDropdown.Item>ABC Productos</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to={"Inventario/Categorias/ListCategorias"}>
                                        ABC Categorías
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>Kárdex</NavDropdown.Item>
                                    <NavDropdown.Item>Recepción de mercancía</NavDropdown.Item>
                                    <NavDropdown.Item>Devoluciones</NavDropdown.Item>
                                    <NavDropdown.Item>Entrega de mercancía (Remisión)</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Nav>
                                <NavDropdown title="Caja" id="nav-caja" drop="start">
                                    <NavDropdown.Item>Recepción de Pago</NavDropdown.Item>
                                    <NavDropdown.Item>Generación de Remisión</NavDropdown.Item>
                                    <NavDropdown.Item>Generación de Factura</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Nav>
                                <NavDropdown title="Facturación" id="nav-facturacion" drop="start">
                                    <NavDropdown.Item>Consulta de Factura</NavDropdown.Item>
                                    <NavDropdown.Item>Consulta de Comprobantes</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Nav>
                                <NavDropdown title="Catálogos" id="nav-catalogos" drop="start">
                                    <NavDropdown.Item>Usuarios</NavDropdown.Item>
                                    <NavDropdown.Item>Roles</NavDropdown.Item>
                                    <NavDropdown.Item>Permisos</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
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
                                    <NavDropdown.Item eventKey="4.4" className="d-flex align-items-center gap-2">
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
    )
}

export default Header
