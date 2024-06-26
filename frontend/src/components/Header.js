import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Navbar, Nav, NavDropdown, Dropdown, Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import { RiUser3Line } from "react-icons/ri";
import { CiLogout } from "react-icons/ci"
import { PiGoogleLogo } from "react-icons/pi";
import { PiPassword } from "react-icons/pi";

function Header() {
    //TODO: cambiar sessionTitle por el nombre del usuario cuando se autentique
    //y cambiar el icono por la imagen del usurio redondeada como
    const sessionTitle = 'Roberto'
    const navDropdownTitle = (<><RiUser3Line />{' '}{sessionTitle}</> );
    return (
        <div className="flex-row my-3 my-md-0">
            <Navbar bg="dark" variant="dark" expand="lg">
                {/* <Navbar.Brand href="/">Responsive Web Template</Navbar.Brand> */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="AboutUs">
                            About Us
                        </Nav.Link>
                        <Nav.Link as={Link} to="ContactUs">
                            Contact Us
                        </Nav.Link>
                        <Nav.Link as={Link} to="Products">
                            Products
                        </Nav.Link>
                        <Nav.Link as={Link} to="Services">
                            Services
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title={navDropdownTitle} id="nav-dropdown" drop="start">
                            <NavDropdown.Item as={Link} eventKey="4.1" className="d-flex align-items-center gap-2">
                                <PiPassword/> Usuario y Contraseña
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item eventKey="4.2" className="d-flex align-items-center gap-2">
                                
                                    <PiGoogleLogo />
                                
                                Google
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item eventKey="4.3" className="d-flex align-items-center gap-2"><CiLogout /> Salir</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item eventKey="4.4" className="d-flex align-items-center gap-2"><RiUser3Line />Peril</NavDropdown.Item>
 
                        </NavDropdown>
                    </Nav>                    
                    <Nav>
                        <NavDropdown title="Admin" id="nav-dropdown" drop="start">
                            <NavDropdown.Item as={Link} eventKey="5.1">
                                Usuarios
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item eventKey="5.2">Productos</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="Admin/LandingPage" eventKey="5.3">Landing Page</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header
