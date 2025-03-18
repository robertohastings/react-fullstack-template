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

function Header2(props) {
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
                <Nav>
                    {menu.map((item) => (
                        <React.Fragment key={item.id_procMenu}>
                        {item.hijos && item.hijos.length > 0 ? (
                            <Dropdown>
                            <Dropdown.Toggle variant="link">
                                {/* <Icon name={item.icono} /> {item.nombre} */}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {item.hijos.map((hijo) => (
                                <Dropdown.Item key={hijo.id_procMenu} as={Link} to={hijo.linkTo}>
                                    {/* <Icon name={hijo.icono} /> {hijo.nombre} */}
                                </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <Nav.Link as={Link} to={item.linkTo}>
                            {/* <Icon name={item.icono} /> {item.nombre} */}
                            </Nav.Link>
                        )}
                        </React.Fragment>
                    ))}
                </Nav>
            </div>
        </>
    )
}

export default Header2

