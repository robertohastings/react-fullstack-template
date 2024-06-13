import React from "react"
import { Navbar, Nav } from "react-bootstrap"

function Header() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">Responsive Web Template</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#home">About Us</Nav.Link>
                    <Nav.Link href="#ContactUs">Contact Us</Nav.Link>
                    <Nav.Link href="#Products">Products</Nav.Link>
                    <Nav.Link href="#Services">Services</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header
