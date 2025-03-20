import React, { useContext, useEffect, useState } from "react"
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

function Header2(props) {
    const [cart, setCart] = useContext(CartContext)
    
    
    

    const quantity = cart.reduce((acc, curr) => {
        return acc + parseInt(curr.cantidad)
    }, 0)

    const appDispatch = useContext(DispatchContext)
    const appState = useContext(StateContext)

    const [menu, setMenu] = useState([])
    console.log("menu:", appState.user.menu)

    useEffect(() => {
        if (appState.user.menu && Array.isArray(appState.user.menu)) {
            setMenu(appState.user.menu);
        } else {
            console.error("El menú no es un arreglo válido:", appState.user.menu);
        }
    }, [appState.user.menu]);

    //const [userMenu, setUserMenu] = useState([appState.user.menu])
    

    // useEffect(() => {

    //     const {padres, hijos } = appState.user.menu

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
        appDispatch({ type: "logout", value: true })
        appDispatch({ type: "showLoggedIn", value: true })
    }

    function Icon({ svgString }) {
        if (!svgString) {
          return null; // O un icono por defecto si no hay SVG
        }
      
        return <div dangerouslySetInnerHTML={{ __html: svgString }} style={{ color: "white" }} />;
    }

    return (
        <>
            <div className="flex-row my-3 my-md-0">
                {/* {console.log('menu map', menu)} */}
                <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="me-auto">
                            {menu && menu.length > 0 ? (
                                menu.map((item, index) => (
                                    item.hijos && item.hijos.length > 0 ? (
                                        <NavDropdown key={index} title={item.nombre} id={`nav-${item.nombre}`} drop="down-centered">
                                            {item.hijos.map((hijo, hijoIndex) => (
                                                <NavDropdown.Item key={hijoIndex} as={Link} to={hijo.linkTo}>
                                                    {hijo.nombre}
                                                </NavDropdown.Item>
                                            ))}
                                        </NavDropdown>
                                    ) : (
                                        <Nav.Link key={index} as={Link} to={item.linkTo}>
                                            {item.icono && item.icono.trim() !== "" ? (
                                                <Icon svgString={item.icono} />
                                            ) : (
                                                item.nombre
                                            )}
                                            
                                        </Nav.Link>
                                    )
                                ))
                            ) : (
                                <Nav.Link disabled>No hay elementos en el menú</Nav.Link>
                            )}
                        </Nav>

                    </Navbar.Collapse>

                </Navbar>

            </div>
        </>
    )
}

export default Header2

