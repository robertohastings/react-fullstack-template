import React, { useState, useEffect } from "react"
import Axios from "axios"
import { Table, Button, Pagination, Spinner, Image, Modal, Form, FloatingLabel, Row, Col } from "react-bootstrap"
import { CiEdit } from "react-icons/ci"
import { IoIosAddCircle } from "react-icons/io"
import { TbRefresh } from "react-icons/tb"
import * as Yup from "yup"
import { Formik, useFormik } from "formik"
//import { Navigate } from "react-router-dom"
import Page from "../../Page"
import SpinnerButton from "../../Spinner/SpinnerButton"
import ImageEditor from "../../../tools/ImageEditor"

const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre debe ser capturado"),
    contacto1: Yup.string().required("Contacto 1 debe ser capturado")
    // descripcion: Yup.string().required("La descripción tiene que ser capturada")
})

function ListProductos() {
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [totalRecords, setTotalRecords] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [isLoading, setIsLoaging] = useState(false)
    const [sending, setSending] = useState(false)
    const [showPicture, setShowPicture] = useState(false)
    const [showLoadPicture, setShowLoadPicture] = useState(false)
    const [imageSelected, setImageSelected] = useState({})

    //Modal
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)

    const fetchProducts = async () => {
        setIsLoaging(true)

        try {
            const response = await Axios.get("/api/inventario/getProductosListado", {
                params: {
                    limite: rowsPerPage,
                    pagina: currentPage * rowsPerPage - 5 < 0 ? 0 : currentPage * rowsPerPage - 5
                }
            })
            console.log("response:", response.data.productos)
            setData(response.data.productos)
            setTotalRecords(response.data.totalRegistros)
        } catch (error) {
            console.error("There was an error fetching the products!", error)
        } finally {
            setIsLoaging(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [currentPage])

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber)

    const formik = useFormik({
        //Lo que necesita el formulario
        initialValues: {
            id_producto: 0,
            nombre: "",
            descripcion: "",
            id_proveedor: 0,
            id_categoria: 0,
            precio: 0,
            precio_promocion: 0,
            costo: 0,
            image1: "",
            image2: "",
            image3: "",
            existencia: 0,
            sku: "",
            activo: 0
        },
        //La validación que hacemos con YUP
        validationSchema: validationSchema,
        //Lo que pasa cuando se envia el formulario
        onSubmit: async values => {
            setSending(true)
            //console.log("values:", values)

            const producto = {
                id_empresa: 1,
                id_producto: values.id_producto,
                nombre: values.nombre,
                descripcion: values.descripcion,
                id_proveedor: values.id_proveedor,
                id_categoria: values.id_categoria,
                precio: values.precio,
                precio_promocion: values.precio_promocion,
                costo: values.costo,
                image1: values.image1,
                image2: values.image2,
                image3: values.image3,
                existencia: values.existencia,
                sku: values.sku,
                activo: values.activo
            }
            postProducto(producto)
        }
    })

    const postProducto = async producto => {
        try {
            await Axios.post("/api/inventario/postCategoria", producto)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log("There was an error updating about us: ", error)
                })
        } catch (error) {
            console.log("error:", error)
        } finally {
            setSending(false)
            setShow(false)
            fetchProducts()
        }
    }

    const edit_handled = row => {
        formik.values.id_producto = row.id_producto
        formik.values.nombre = row.nombre
        formik.values.descripcion = row.descripcion
        formik.values.id_proveedor = row.id_proveedor
        formik.values.id_categoria = row.id_categoria
        formik.values.precio = row.precio
        formik.values.precio_promocion = row.precio_promocion
        formik.values.costo = row.costo
        formik.values.image1 = row.image1
        formik.values.image2 = row.image2
        formik.values.image3 = row.image3
        formik.values.existencia = row.existencia
        formik.values.sku = row.sku
        formik.values.activo = row.activo === "Si" ? 1 : 0

        setShow(true)
    }

    const Agregar_handled = () => {
        formik.values.id_empresa = 1
        formik.values.id_producto = 0
        formik.values.nombre = ""
        formik.values.descripcion = 0
        formik.values.id_proveedor = ""
        formik.values.id_categoria = 0
        formik.values.precio = 0
        formik.values.costo = 0
        formik.values.image1 = ""
        formik.values.image2 = ""
        formik.values.image3 = ""
        formik.values.existencia = 0
        formik.values.sku = ""
        formik.values.activo = 1
        setShow(true)
    }
    const Refrescar_handled = () => fetchProducts()

    const imageHandled = row => {
        setImageSelected({
            id_producto: row.id_producto,
            nombre: row.nombre,
            descripcion: row.descripcion,
            imagen: row.imagen
        })
        setShowPicture(true)
    }
    const closeImageModal = () => setShowPicture(false)
    const closeImageLoadModal = () => setShowLoadPicture(false)

    const cargarImagen_handled = () => {
        setShowPicture(false)
        setShowLoadPicture(true)
    }

    const handleImageEdited = async blob => {
        //console.log("blob", blob)
        //console.log("categora a subr:", imageSelected.id_categoria)
        setShowLoadPicture(false)

        const formData = new FormData()
        formData.append("image", blob)
        formData.append("id_categoria", imageSelected.id_categoria)
        formData.append("id_empresa", "1")

        try {
            const response = await Axios.post("/api/upload/postCloudinary", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            console.log("postImage response:", response.data)
            fetchProducts()
            //console.log("image uploaded:", response.data.file)
        } catch (error) {
            console.error("Error uploading the file:", error)
        }
    }

    return (
        <Page title="ABC Categorias">
            <h3>ABC Productos</h3>
            <div className="gap-2">
                <div>
                    <Button className="my-3" size="sm" variant="outline-primary" onClick={Agregar_handled}>
                        <IoIosAddCircle />
                        {` Agregar`}
                    </Button>
                    <Button className="mx-2 my-3" size="sm" variant="outline-primary" onClick={Refrescar_handled}>
                        <TbRefresh />
                        {` Refrescar`}
                    </Button>
                </div>
                <div>
                    <Pagination>
                        {Array.from({ length: Math.ceil(totalRecords / rowsPerPage) }, (_, index) => (
                            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </div>
            </div>

            {/* Lista */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#Id</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Categoria</th>
                        <th>Proveedor</th>
                        <th>Precio</th>
                        <th>Precio Oferta</th>
                        <th>Costo</th>
                        <th>F. Act.</th>
                        <th>Activo</th>
                        <th>Imagen</th>
                    </tr>
                </thead>
                {isLoading && (
                    <>
                        <div className="d-flex justify-content-center">
                            <Spinner animation="grow" />
                        </div>
                    </>
                )}
                {!isLoading && (
                    <tbody>
                        {data.map(row => (
                            <tr key={row.id_producto}>
                                <td className="align-content-center">{row.id_producto}</td>
                                <td className="align-content-center">{row.nombre}</td>
                                <td className="align-content-center">{row.descripcion}</td>
                                <td className="align-content-center">{row.Categoria}</td>
                                <td className="align-content-center">{row.Proveedor}</td>
                                <td className="align-content-center">{row.precio}</td>
                                <td className="align-content-center">{row.precio_promocion}</td>
                                <td className="align-content-center">{row.costo}</td>
                                <td className="align-content-center">{row.fecha_actualizacion}</td>
                                <td className="align-content-center">{row.activo}</td>
                                <td>
                                    <Image style={{ height: "80px", width: "80px", cursor: "pointer" }} src={row.image1} thumbnail onClick={() => imageHandled(row)} />
                                </td>
                                <td className="align-content-center justify-content-center">
                                    <Button size="sm" variant="warning" onClick={() => edit_handled(row)}>
                                        <CiEdit />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                )}
            </Table>
            <Pagination>
                {Array.from({ length: Math.ceil(totalRecords / rowsPerPage) }, (_, index) => (
                    <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>

            {/* Modal edicion de categoria */}
            <>
                <Modal size="lg" show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Producto # {formik.values.id_producto === 0 ? "nuevo" : formik.values.id_producto}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row>
                                <Col>
                                    {/* Nombre */}
                                    <FloatingLabel label="Nombre" className="mb-3">
                                        <Form.Control type="text" placeholder="Nombre" id="nombre" name="nombre" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.nombre} />
                                        {formik.touched.nombre && formik.errors.nombre ? <div className="text-danger">{formik.errors.nombre}</div> : null}
                                    </FloatingLabel>
                                </Col>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                        <Button type="button" variant="primary" disabled={sending} onClick={formik.handleSubmit}>
                            {sending && <SpinnerButton mensaje="Guardando..." />}
                            {!sending && "Guardar"}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
            {/* Modal imagen */}
            <>
                <Modal size="lg" show={showPicture} onHide={closeImageModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <h5>{imageSelected.nombre}</h5>
                            <h4>{imageSelected.descripcion}</h4>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div class="d-flex justify-content-center">
                            <Image className="justify-content-center" style={{ width: "700px", height: "500px" }} src={imageSelected !== null || imageSelected !== "" ? imageSelected.imagen : "https://fiestatijuana.mx/image-not-available.png"} thumbnail />
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-center">
                        <Button variant="secondary" onClick={cargarImagen_handled}>
                            Cargar imagen
                        </Button>
                        <Button variant="secondary" onClick={closeImageModal}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
            {/* Modal cargar imagen */}
            <>
                <Modal size="lg" show={showLoadPicture} onHide={closeImageLoadModal} centered fullscreen={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cargar imagen</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ImageEditor onImageEdited={handleImageEdited} />
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-center">
                        <Button variant="secondary" onClick={closeImageLoadModal}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </Page>
    )
}

export default ListProductos