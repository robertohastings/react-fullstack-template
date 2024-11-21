import React, { useState, useEffect, useContext } from "react"
import { Container, Row, Col, Button, Modal, Image, Form } from "react-bootstrap"
import axios from "axios"
import StateContext from "../StateContext"

function Galeria({ fuente }) {
    const api_url = process.env.REACT_APP_API_URL
    const appState = useContext(StateContext)

    const [fotos, setFotos] = useState([])
    const [selectedFotos, setSelectedFotos] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [currentImage, setCurrentImage] = useState(null)
    const [isFetching, setIsFetching] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            setIsFetching(true)

            const id_empresa = appState.idEmpresa

            await axios
                .get(`${api_url}/getGaleria`, {
                    params: {
                        id_empresa,
                        host: "",
                        fuente
                    }
                })
                .then(response => {
                    console.log("Galeria:", response.data)
                    if (response.data.success === false) {
                        //seterrorMessage(response.data.data.message)
                    } else {
                        setFotos(response.data)
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

    const toggleSelectFoto = foto => {
        if (selectedFotos.includes(foto)) {
            setSelectedFotos(selectedFotos.filter(f => f !== foto))
        } else {
            setSelectedFotos([...selectedFotos, foto])
        }
    }

    const handleVerImagen = foto => {
        setCurrentImage(foto)
        setModalShow(true)
    }

    return (
        <Container className="mt-4">
            {/* Botones */}
            <div className="d-flex justify-content-between mb-3">
                <Button variant="primary" onClick={() => alert("Agregar")}>
                    Agregar
                </Button>

                <Button variant="danger" onClick={() => alert("Eliminar")} disabled={selectedFotos.length === 0}>
                    Eliminar
                </Button>
            </div>

            {/* Galería */}
            <Row className="g-3">
                {fotos.map((foto, index) => (
                    <Col key={index} xs={12} sm={6} md={4} lg={2}>
                        <div className="border p-2 position-relative">
                            <Form.Check type="checkbox" className="position-absolute top-0 end-0" style={{ zIndex: 1 }} checked={selectedFotos.includes(foto)} onChange={() => toggleSelectFoto(foto)} />
                            <Image src={foto.url} alt={`Imagen ${index}`} thumbnail style={{ cursor: "pointer" }} onClick={() => handleVerImagen(foto.url)} />
                            <Button variant="link" className="d-block text-center" onClick={() => handleVerImagen(foto.url)}>
                                Ver imagen
                            </Button>
                        </div>
                    </Col>
                ))}
            </Row>

            {/* Modal para ver imagen */}
            <Modal show={modalShow} onHide={() => setModalShow(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Imagen seleccionada</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">{currentImage && <Image src={currentImage} alt="Imagen seleccionada" fluid />}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalShow(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default Galeria
