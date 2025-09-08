import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
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
import { is } from "date-fns/locale"

function Header2(props) {
    const navigate = useNavigate()
    const [cart, setCart] = useContext(CartContext)
    const [expanded, setExpanded] = useState(false);

    const quantity = cart.reduce((acc, curr) => {
        return acc + parseInt(curr.cantidad)
    }, 0)

    const appDispatch = useContext(DispatchContext)
    const appState = useContext(StateContext)

    const [menu, setMenu] = useState([])
    const [menuLanding, setMenuLanding] =  useState([])
    console.log("menu:", appState.menu)

    useEffect(() => {
        if (appState.menu && Array.isArray(appState.menu)) {
            setMenu(appState.menu);
        } else {
            console.error("El menú no es un arreglo válido:", appState.menu);
        }
    }, [appState.menu]);

    useEffect(() => {
        if (appState.landingPage.menuLanding && Array.isArray(appState.landingPage.menuLanding)) {
            setMenuLanding(appState.landingPage.menuLanding)
        }else {
            console.error("El menú no es un arreglo válido:", appState.landingPage.menuLanding);
        }
    }, [appState.landingPage.menuLanding])

    //const [userMenu, setUserMenu] = useState([appState.menu])
    

    // useEffect(() => {

    //     const {padres, hijos } = appState.menu

    //     const menuJerarquico = padres.map((padre) => {
    //         return {
    //           ...padre,
    //           hijos: hijos.filter((hijo) => hijo.id_padre === padre.id_procMenu),
    //         };
    //       });
    //       console.log('menuJerarquico', menuJerarquico)        
        
    //     setMenu(menuJerarquico);

    // }, [userMenu])

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
        //appDispatch({ type: "crmLogout", value: true })
        //appDispatch({ type: "showLoggedIn", value: true })
        navigate("/")
    }

    const actions = {
        "Salir" : handled_LoggedOut,
        "Entrar" : handled_LoggedIn,
        "Ver Notificaciones": handled_Notificactions
    }


    function Icon({ svgString }) {
        if (!svgString) {
          return null; // O un icono por defecto si no hay SVG
        }
      
        return <div dangerouslySetInnerHTML={{ __html: svgString }} style={{ color: "white" }} />;
    }

    return (
        <>
            {appState.loggedIn ? (
                <>
                    <div className="flex-row my-3 my-md-0">
                        <Navbar 
                            bg="dark" 
                            variant="dark" 
                            expand="lg" 
                            fixed="top" 
                            style={{ width: '100%' }}
                            expanded={expanded} // Controla el estado del colapso
                            onToggle={(isExpanded) => setExpanded(isExpanded)} // Actualiza el estado al expandir/colapsar
                        >
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />

                            <Navbar.Collapse id="basic-navbar-nav">

                                <Nav className="w-100 d-flex justify-content-between px-3" >
                                    {menu && menu.length > 0 ? (
                                        menu.map((item, index) => (
                                            item.hijos && item.hijos.length > 0 ? (
                                                <NavDropdown 
                                                        key={index} 
                                                        title={
                                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "5px" }}>
                                                                {item.icono && item.icono.trim() !== "" ? (
                                                                    <Icon svgString={item.icono} />
                                                                ) : <>{item.nombre}</>}                                                    
                                                            </div>
                                                        }
                                                        id={`nav-${item.nombre}`} 
                                                        drop={index === menu.length - 1 ? "start" : "down-centered"} 
                                                        className="menu-dropdown" 
                                                    >
                                                    {item.hijos.map((hijo, hijoIndex) => (
                                                        <NavDropdown.Item 
                                                            key={hijoIndex} 
                                                            as={hijo.linkTo ? Link : "button"} 
                                                            to={`/erp/${hijo.linkTo}` || undefined}
                                                            onClick={() => {
                                                                actions[hijo.nombre]?.();
                                                                setExpanded(false); // Cierra el menú al seleccionar una opción
                                                            }}
                                                            style={{ cursor: actions[hijo.nombre] ? "pointer" : "pointer"}}
                                                        >
                                                            {hijo.nombre}
                                                        </NavDropdown.Item>
                                                    ))}
                                                </NavDropdown>
                                            ) : (
                                                <Nav.Link 
                                                    key={index} 
                                                    as={Link} 
                                                    to={item.linkTo}
                                                    onClick={() => {                                                        
                                                        setExpanded(false); // Cierra el menú al seleccionar una opción
                                                    }}
                                                >
                                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "5px"  }}>
                                                        {item.icono && item.icono.trim() !== "" ? (
                                                            <Icon svgString={item.icono} />
                                                        ) : <>{item.nombre}</>}
                                                        
                                                    </div>
                                                </Nav.Link>
                                            )
                                        ))
                                    ) : (
                                        <Nav.Link disabled>Escriba su email y contraseña.</Nav.Link>
                                    )}
                                </Nav>

                            </Navbar.Collapse>

                        </Navbar>

                    </div>
                    <style type="text/css">
                        {`
                            .menu-dropdown .dropdown-toggle::after {
                            display: none;
                            margin-left: 0.255em;
                            vertical-align: 0.255em;
                            content: "";
                            border-top: 0.3em solid;
                            border-right: 0.3em solid transparent;
                            border-bottom: 0;
                            border-left: 0.3em solid transparent;
                            }
                            .menu-dropdown .dropdown-toggle {
                            display: flex;
                            align-items: center;
                            }
                        `}
                    </style>     
                </>       
            ) : appState.landingPage.settings.mostrar_landingPage ? (
                <div className="flex-row my-3 my-md-0">
                    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" style={{ width: '100%' }} >
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="w-100 d-flex justify-content-between px-3">
                                {menuLanding && menuLanding.length > 0 && (
                                    menuLanding.map((item, index) => ( 
                                        <Nav.Link key={index} as={Link} to={item.linkTo}>
                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "5px"  }}>
                                                {item.icono && item.icono.trim() !== "" ? (
                                                    <Icon svgString={item.icono} />
                                                ) : <>{item.nombre}</>}                                                
                                            </div>                                            
                                        </Nav.Link>
                                    ))
                                )}
                                <NavDropdown
                                    title={
                                        <>
                                            <RiUser3Line />                                    
                                        </>
                                    }
                                    id="nav-dropdown"
                                    drop="start"                            
                                >
                                    <NavDropdown.Item onClick={handled_LoggedIn}>
                                        <PiPassword /> Entrar
                                    </NavDropdown.Item>
                                </NavDropdown>    
                            </Nav>

                        </Navbar.Collapse>
                    </Navbar>
                </div>
            ) : (
                <div className="flex-row my-3 my-md-0">
                    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" style={{ width: '100%' }} >
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="w-100 d-flex justify-content-between px-3">
                                <NavDropdown
                                    title={
                                        <>
                                            <RiUser3Line />                                    
                                        </>
                                    }
                                    id="nav-dropdown"
                                    drop="end"                            
                                >
                                    <NavDropdown.Item onClick={handled_LoggedIn}>
                                        <PiPassword /> Entrar
                                    </NavDropdown.Item>
                                </NavDropdown>    
                            </Nav>

                        </Navbar.Collapse>
                    </Navbar>
                </div>
            )}
        </>
    )
}

export default Header2

