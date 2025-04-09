import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Modal, Form, Button, Row, Col, Container, Spinner } from "react-bootstrap"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"
import { PiGoogleLogo } from "react-icons/pi"
import { LuUserCircle2 } from "react-icons/lu"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Importa íconos para mostrar/ocultar contraseña

import axios from "axios"
//import { getDecryptedItem } from "../tools/Utils"
import { encryptData } from "../tools/Utils"

function LoggedIn(props) {
    const api_url = process.env.REACT_APP_API_URL
    const hostnameTesting = process.env.REACT_APP_HOSTNAME_TESTING
    const appDispatch = useContext(DispatchContext)
    const appState = useContext(StateContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, seterrorMessage] = useState("")
    const [isFetching, setIsFetching] = useState(false)
    const [hostname, setHostname] = useState("")
    const [showPassword, setShowPassword] = useState(false); // Estado para alternar la visibilidad de la contraseña


    useEffect(() => {
        setEmail('')
        setPassword('')
        seterrorMessage('')

        // Obtengo el hostname        
        // if (window.location.hostname === 'localhost') {
        //     appDispatch({ type: "hostname", value: hostnameTesting })
        // }
        // console.log("Hostname -> windows.location:", window.location.hostname)
        // console.log("Hostname -> appState:", appState.hostname)
        // console.log("Hostname -> hostnameTesting:", hostnameTesting)

    }, [])

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Cambia el estado de visibilidad
    };

    const handledClose = () => {
        appDispatch({ type: "showLoggedIn", value: false })
    }

    const handled_Email = e => {
        setEmail(e.target.value)
    }

    const handled_Password = e => {
        // console.log('Password:', e.target.value)
        // console.log('Password encrypted:', encryptData(e.target.value))
        setPassword(e.target.value)
    }
    const handled_In = async () => {


        //const id_empresa = appState.idEmpresa
        //const hostname = appState.hostname
        console.log("hostname login:", appState.hostname)

        try {
            setIsFetching(true)
            await axios
                .get(`${api_url}/usersLogin`, {
                    params: {
                        hostname: appState.hostname,
                        email: email,
                        password: encryptData(password)
                    }
                })
                .then(response => {
                    console.log("Login response:", response.data)
                    if (response.data.success === false) {
                        seterrorMessage(response.data.data.message)
                    } else {
                        // Obtengo menú dinámico del usuario autenticado
                        const { padres, hijos } = response.data.data.menu;
                        const menuJerarquico = padres.map((padre) => {
                            return {
                              ...padre,
                              hijos: hijos.filter((hijo) => hijo.id_padre === padre.id_procMenu),
                            };
                          });
                        console.log("Menu jerarquico:", menuJerarquico)


                        seterrorMessage("")
                        appDispatch({
                            type: "login",
                            data: {
                                id_usuario: response.data.data.id_usuario,
                                token: response.data.data.token,
                                username: response.data.data.nombre,
                                avatar: "no-avatar",
                                menu: menuJerarquico
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
            <Modal show={props.show} onHide={handledClose} size="sm" centered>
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
                    <Form className="mt-3">
                        <Form.Group className="mb-4 text-center" controlId="email">
                            <Form.Label className="fw-bold">Email</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" autoFocus onChange={handled_Email} 
                                defaultValue={email} autoComplete="off" className="text-center"/>
                        </Form.Group>

                        <Form.Group className="mb-3 text-center position-relative" controlId="password">
                            <Form.Label className="fw-bold">Contraseña</Form.Label>
                            <div className="position-relative">
                                <Form.Control 
                                    type={showPassword ? "text" : "password"} // Cambia entre "text" y "password"
                                    placeholder="Contraseña" 
                                    onChange={handled_Password} 
                                    value={password} 
                                    autoComplete="off" 
                                    className="text-center"
                                />
                                <span
                                    onClick={togglePasswordVisibility}
                                    style={{
                                        position: "absolute",
                                        right: "10px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        cursor: "pointer",
                                        color: "#6c757d",
                                        zIndex: 10, // Asegura que el ícono esté por encima del campo de texto
                                    }}
                                >
                                    {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                                </span>                                
                            </div>
                            <p className="fst-italic text-sm fs-6">Mínimo 10 caracteres</p>
                        </Form.Group>
                    </Form>
                    <div className="mt-5 mb-3">
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
