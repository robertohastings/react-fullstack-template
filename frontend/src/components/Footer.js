import React from "react"
import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer style={{ backgroundColor: "#222", color: "#ccc", padding: "30px" }}>
            <Row>
                <Col md={6}>
                    <p>Síguenos en:</p>
                </Col>
                <Col md={6} style={{ textAlign: "right" }}>
                    <Link href="#" style={{ margin: "0 20px", color: "#fff", textDecoration: "none" }}>
                        Facebook
                    </Link>
                    <Link href="#" style={{ margin: "0 20px", color: "#fff", textDecoration: "none" }}>
                        Instagram
                    </Link>
                    <Link href="#" style={{ margin: "0 20px", color: "#fff", textDecoration: "none" }}>
                        Twitter
                    </Link>
                    <Link href="#" style={{ margin: "0 20px", color: "#fff", textDecoration: "none" }}>
                        YouTube
                    </Link>
                </Col>
            </Row>

            <div className="bg-dark text-white text-center py-3">
                <p>© {new Date().getFullYear()} Todos los derechos reservados. Power By hostregio.app</p>
            </div>
        </footer>
    )
}

export default Footer
