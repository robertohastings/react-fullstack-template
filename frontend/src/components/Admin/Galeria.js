import React, { useState, useEffect, useContext } from "react"
import { Container, Row, Col, Button, Modal, Image, Form } from "react-bootstrap"
import axios from "axios"
import StateContext from "../../StateContext"
import ImageEditor from "../../tools/ImageEditor"
import Axios from "axios"

function Galeria({ fuente }) {
    const api_url = process.env.REACT_APP_API_URL
    const appState = useContext(StateContext)
    const id_empresa = appState.idEmpresa
    const hostname = appState.hostname

    const [fotos, setFotos] = useState([])
    const [selectedFotos, setSelectedFotos] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [currentImage, setCurrentImage] = useState(null)
    const [isFetching, setIsFetching] = useState(false)
    const [imageSize, setImageSize] = useState([])
    const [showLoadPicture, setShowLoadPicture] = useState(false)

    //console.log(`hostname galeria: ${hostname}`)

    useEffect(() => {
        if (fuente === 'quienes_somos') {
            setImageSize({
                width:1920,
                height: 600
            })
        }
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            setIsFetching(true)

            await axios
                .get(`${api_url}/galeria/getGaleria`, {
                    params: {
                        id_empresa/*,
                        hostname: "",
                        fuente*/
                    }
                })
                .then(response => {
                    //console.log("Galeria:", response.data)
                    if (response.data.success === false) {
                        //seterrorMessage(response.data.data.message)
                    } else {
                        setFotos(response.data.galeria)
                        console.log(`Galeria: ${response.data.galeria}`)
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

    const cargarImagen_handled = () => {
        setShowLoadPicture(true)
    }
    const closeImageLoadModal = () => setShowLoadPicture(false)

    const handleImageEdited = async blob => {
        //console.log("blob", blob)
        //console.log("categora a subr:", imageSelected.id_categoria)
        setShowLoadPicture(false)

        const formData = new FormData()
        formData.append("image", blob)
        formData.append("fuente", 'quienes_somos')
        formData.append("id_empresa", id_empresa)
        formData.append("hostname", hostname)

        try {

            const response = await Axios.post("/api/upload/postCloudinary", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            console.log("postImage response:", response.data)
            await fetchData()

        } catch (error) {
            console.error("Error uploading the file:", error)
        }
    }    

    return (
        <div className="mt-3 mb-5">
            {/* Botones */}
            <div className="d-flex justify-content-start mb-3 gap-2">
                <Button variant="primary" onClick={() => alert("Agregar")}>
                    Agregar
                </Button>
                <Button variant="primary" onClick={cargarImagen_handled}>
                    Cargar imagen
                </Button>                

                {/* <Button variant="danger" onClick={() => alert("Eliminar")} disabled={selectedFotos.length === 0}>
                    Eliminar
                </Button> */}
            </div>

            {/* Galería */}
            <Row className="g-3">
                {fotos.map(foto => (
                    <Col key={foto.id_producto} xs={12} sm={6} md={4} lg={2}>
                        <div className="border border-success rounded p-2 position-relative">
                            <Form.Check type="checkbox" className="position-absolute top-0 end-0 p-1" style={{ zIndex: 1 }} checked={selectedFotos.includes(foto)} onChange={() => toggleSelectFoto(foto)} />
                            <Image className="border-0 p-2" src={foto.image} alt={`Imagen ${foto.id_producto}`} thumbnail style={{ cursor: "pointer", width:'120px', height:'120px'  }} onClick={() => handleVerImagen(foto.image)} />
                            {/* <Button variant="link" className="d-block text-center" onClick={() => handleVerImagen(foto.image)}>
                                Ver imagen
                            </Button> */}
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
                <Modal.Footer className="d-flex justify-content-between">                   
                    <Button variant="danger" onClick={() => alert("Eliminar")} disabled={selectedFotos.length === 0}>
                        Eliminar
                    </Button>
                    <Button variant="secondary" onClick={() => setModalShow(false)}>
                        Cerrar
                    </Button>                                           
                </Modal.Footer>
            </Modal>
            
            {/* Modal cargar imagen */}
            <Modal size="lg" show={showLoadPicture} onHide={closeImageLoadModal} centered fullscreen={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cargar imagen</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ImageEditor 
                            onImageEdited={handleImageEdited}
                            ImageWidth={imageSize.width}
                            ImageHeight={imageSize.height}
                        />
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-center">
                        <Button variant="secondary" onClick={closeImageLoadModal}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
            </Modal>            
        </div>
    )
}

export default Galeria
