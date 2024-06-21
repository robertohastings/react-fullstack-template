import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Navbar, Nav, NavDropdown, Dropdown } from "react-bootstrap"
import { Link } from "react-router-dom"

function Header() {
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
                        <NavDropdown title="Admin" id="nav-dropdown" drop="start">
                            <NavDropdown.Item as={Link} eventKey="4.1">
                                Usuarios
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item eventKey="4.2">Productos</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item eventKey="4.3">Landing Page</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header
