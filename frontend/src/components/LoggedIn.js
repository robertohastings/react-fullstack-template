import React, { useContext, useState } from "react"
import { Modal, Form, Button } from "react-bootstrap"
import DispatchContext from "../DispatchContext"

function LoggedIn(props) {
    //console.log(props)

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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handledClose}>
                        Olvide contraseña
                    </Button>
                    <Button variant="primary" onClick={handledClose}>
                        Crear Usuario
                    </Button>
                    <Button variant="success" onClick={handledClose} disabled={email === "" || password === "" || password.length < 10 ? true : false}>
                        Entrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default LoggedIn
