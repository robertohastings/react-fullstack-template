import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { Modal, Form, Button, Row, Col, Container } from "react-bootstrap"
import DispatchContext from "../DispatchContext"
import { PiGoogleLogo } from "react-icons/pi"
import { Axios } from "axios"

function LoggedIn(props) {
    //console.log(props)
    const api_url = process.env.REACT_APP_API_URL
    console.log('url', api_url)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const appDispatch = useContext(DispatchContext)

    const handledClose = () => {
        appDispatch({ type: "showLoggedIn", value: false })
    }

    const handled_Email = e => {
        setEmail(e.target.value)
    }

    const handled_Password = e => {
        setPassword(e.target.value)
    }
    const handled_In = () => {
        try {
            Axios.get("api")
        } catch (error) {
            
        }
    }

    return (
        <>
            <Modal show={props.show} onHide={handledClose}>
                <Modal.Header closeButton={true}>
                    <Modal.Title>Log In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" autoFocus onChange={handled_Email} defaultValue={email} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" placeholder="Contraseña" onChange={handled_Password} defaultValue={password} />
                            <p className="fst-italic text-sm">Mínimo 10 caracteres</p>
                        </Form.Group>
                    </Form>
                    <div >
                        <Container >
                            <Row >
                                <Col className="d-flex justify-content-center">                            
                                    <Link>Olvide mi contraseña</Link>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="d-flex justify-content-center">
                                    <Link>Aún no tengo cuenta</Link>
                                </Col>
                            </Row>
                        </Container>                                            
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handledClose} className="d-flex align-items-center gap-2">
                        <PiGoogleLogo size={25}/> Autenticarse con Google 
                    </Button>
                    <Button variant="success" onClick={handled_In} disabled={email === "" || password === "" || password.length < 10 ? true : false}>
                        Entrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default LoggedIn
