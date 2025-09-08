import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCRMDispatch } from '../CrmContext';
import DispatchContext from '../DispatchContext';
import StateContext from '../StateContext';
import { Container, Row, Col, Form, Button, Carousel, Spinner, Image } from 'react-bootstrap';
import styles from './CRMLogin.module.css';
import axios from 'axios';
import { encryptData } from '../tools/Utils';

function CRMLogin() {
    const navigate = useNavigate()

    // const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, seterrorMessage] = useState("")
    const [isFetching, setIsFetching] = useState(false)

    const api_url = process.env.REACT_APP_API_URL;
    const hostnameTesting = process.env.REACT_APP_HOSTNAME_TESTING

    const appDispatch = useContext(DispatchContext)
    const appState = useContext(StateContext)
    const dispatch = useCRMDispatch();

    useEffect(() => {
        setEmail('')
        setPassword('')
        seterrorMessage('')
    }, [])    

    const handleSubmit = async (e) => {
        e.preventDefault();
        // try {
        //     const response = await axios.post(`${api_url}/crm/login`, { username, password });
        //     dispatch({
        //         type: 'crmLogin',
        //         payload: {
        //             token: response.data.token,
        //             user: response.data.user,
        //         },
        //     });
        //     localStorage.setItem('crmToken', response.data.token); // Store CRM token separately
        // } catch (error) {
        //     console.error('CRM Login failed', error);
        //     // Handle login error (e.g., display an error message)
        // }
        console.log('Login form submitted', { email, password });
        // try {
        //     const response = await fetch(`${api_url}/users/login`, {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({ email, password }),
        //     });
        //     const data = await response.json();
        //     if (response.ok) {
        //         dispatch({ type: 'LOGIN_SUCCESS', payload: data });
        //         // Aquí puedes redirigir al usuario al dashboard del CRM
        //     } else {
        //         throw new Error(data.message || 'Error al iniciar sesión');
        //     }
        // } catch (error) {
        //     console.error(error);
        //     dispatch({ type: 'LOGIN_FAIL', payload: error.message });
        //     // Aquí puedes mostrar un mensaje de error al usuario
        // } 
        
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
                                idUsuario: response.data.data.id_usuario,
                                token: response.data.data.token,
                                username: `${response.data.data.nombre} ${response.data.data.apellidos}`,
                                avatar: "",
                                menu: menuJerarquico
                            }
                        })

                        dispatch({
                            type: 'crmLogin',
                            payload: {
                                token: response.data.data.token,
                                user: response.data.data,
                            },
                        });                        


                        // appDispatch({ type: "menu", data: menuJerarquico})
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

    };    

    const handledClose = () => {
        //appDispatch({ type: "showLoggedIn", value: false })
        navigate("/"); 
    }    

  return (
        <Container fluid className={styles.loginPage}>
            {errorMessage && (
                <div className="d-flex justify-content-center">
                    <p className="text-white bg-danger rounded-2 p-2">{errorMessage}</p>
                </div>
            )}
            <Row className="g-0">
                {/* Columna Izquierda - Carrusel */}
                <Col md={4} className={styles.carouselContainer}>
                    <Carousel controls={false} indicators={true} interval={3000}>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                                alt="CRM Dashboard"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                                alt="Customer Interaction"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                                alt="Team Collaboration"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                                alt="Business Growth"
                            />
                        </Carousel.Item>
                    </Carousel>
                </Col>

                {/* Columna Derecha - Formulario */}
                <Col md={8} className={styles.formContainer}>
                    <div className={styles.loginFormWrapper}>
                        <div className="text-center mb-4">
                            <Image src="/img/hostregioapp_logo.png" alt="HostRegio App Logo" style={{ width: '150px', height: 'auto' }} />
                        </div>
                        <h2 className="mb-4">Bienvenido de Nuevo</h2>
                        <p className="mb-4 text-muted">Ingresa tus credenciales para acceder a tu cuenta.</p>
                        <Form onSubmit={handleSubmit}>
                            <div className={styles.inputGroup}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.inputIcon}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                <Form.Control
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className={styles.formInput}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.inputIcon}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                <Form.Control
                                    type="password"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className={styles.formInput}
                                />
                            </div>

                            <Button variant="primary" type="submit" className={styles.submitButton}>                                
                                {isFetching && <Spinner size="sm" animation="border" />}
                                {!isFetching && <span>Ingresar</span>}                                
                            </Button>
                        </Form>

                        <div className={styles.divider}>
                            <span>ó ingresar con</span>
                        </div>

                        <Button variant="outline-secondary" className={styles.googleButton}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.902,35.688,44,28.718,44,20C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>                            
                            {isFetching && <Spinner size="sm" animation="border" />}
                            {!isFetching && <span>Google</span>}                               
                        </Button>

                        <div className="text-center mt-4">
                            <a href="#forgot" className={styles.forgotPasswordLink}>Olvidaste tu contraseña?</a>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
  )
}

export default CRMLogin