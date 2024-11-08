import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { Modal, Form, Button, Row, Col, Container, Spinner } from "react-bootstrap"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"
import { PiGoogleLogo } from "react-icons/pi"
import { LuUserCircle2 } from "react-icons/lu"
import axios from "axios"
import { getDecryptedItem } from "../tools/Utils"

function LoggedIn(props) {
    const api_url = process.env.REACT_APP_API_URL
    //const id_empresa = process.env.REACT_APP_APP_EMPRESA_ID

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, seterrorMessage] = useState("")
    const [isFetching, setIsFetching] = useState(false)

    const appDispatch = useContext(DispatchContext)
    const appState = useContext(StateContext)

    const handledClose = () => {
        appDispatch({ type: "showLoggedIn", value: false })
    }

    const handled_Email = e => {
        setEmail(e.target.value)
    }

    const handled_Password = e => {
        setPassword(e.target.value)
    }
    const handled_In = async () => {
        console.log(`IdEmpresa desde el state: ${appState.idEmpresa}`)
        const id_empresa = getDecryptedItem("hostregioTenant")
        console.log(`Empresa: ${id_empresa}`)
        try {
            setIsFetching(true)
            await axios
                .get(`${api_url}/usersLogin`, {
                    params: {
                        id_empresa,
                        email: email,
                        password: password
                    }
                })
                .then(response => {
                    console.log("Login response:", response.data)
                    if (response.data.success === false) {
                        seterrorMessage(response.data.data.message)
                    } else {
                        seterrorMessage("")
                        appDispatch({
                            type: "login",
                            data: {
                                id_usuario: response.data.data.id_usuario,
                                token: response.data.data.token,
                                username: response.data.data.nombre,
                                avatar: "no-avatar"
                            }
                        })
                        handledClose()
                    }
                })
                .catch(error => {
                    console.error("There was an error fetching data!", error)
                })
        } catch (error) {
            console.error("There was an error fetching data!", error)
        } finally {
            setIsFetching(false)
        }
    }

    return (
        <>
            <Modal show={props.show} onHide={handledClose} size="sm">
                <Modal.Header closeButton={true}>
                    <Modal.Title>
                        <div>
                            <LuUserCircle2 size={30} />
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errorMessage && (
                        <div className="d-flex justify-content-center">
                            <p className="text-white bg-danger rounded-2 p-2">{errorMessage}</p>
                        </div>
                    )}
                    <Form className="mt-2">
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" autoFocus onChange={handled_Email} defaultValue={email} autoComplete="off" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" placeholder="Contraseña" onChange={handled_Password} defaultValue={password} autoComplete="off" />
                            <p className="fst-italic text-sm fs-6">Mínimo 10 caracteres</p>
                        </Form.Group>
                    </Form>
                    <div>
                        <Container>
                            <Row>
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
                <Modal.Footer className="justify-content-center">
                    <Button variant="primary" onClick={handledClose} className="d-flex align-items-center gap-0 px-3">
                        <PiGoogleLogo size={25} /> oogle
                    </Button>
                    <Button className="px-3" variant="success" onClick={handled_In} disabled={email === "" || password === "" || password.length < 10 || isFetching ? true : false}>
                        {isFetching && <Spinner size="sm" animation="border" />}
                        {!isFetching && <span>Entrar</span>}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default LoggedIn
