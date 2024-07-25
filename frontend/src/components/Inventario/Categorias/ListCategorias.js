import React, { useState, useEffect } from "react"
import Axios from "axios"
import { Table, Button, Pagination, Spinner, Image, Modal, Form, FloatingLabel } from "react-bootstrap"
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
    descripcion: Yup.string().required("La descripción tiene que ser capturada")
})

function ListCategorias() {
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
            const response = await Axios.get("/api/getCategoriasListado", {
                params: {
                    limite: rowsPerPage,
                    pagina: currentPage * rowsPerPage - 5 < 0 ? 0 : currentPage * rowsPerPage - 5
                }
            })
            console.log("response:", response.data.categorias)
            setData(response.data.categorias)
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
            id_categoria: 0,
            nombre: "",
            descripcion: "",
            imagen: "",
            activo: 0
        },
        //La validación que hacemos con YUP
        validationSchema: validationSchema,
        //Lo que pasa cuando se envia el formulario
        onSubmit: async values => {
            setSending(true)
            console.log("values:", values)

            const categoria = {
                id_empresa: 1,
                id_categoria: values.id_categoria,
                nombre: values.nombre,
                descripcion: values.descripcion,
                imagen: "",
                activo: values.activo
            }
            postCategoria(categoria)
        }
    })

    const postCategoria = async categoria => {
        try {
            await Axios.post("/api/inventario/postCategoria", categoria)
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
        formik.values.id_categoria = row.id_categoria
        formik.values.nombre = row.nombre
        formik.values.descripcion = row.descripcion
        formik.values.activo = row.activo === "Si" ? 1 : 0
        formik.values.imagen = row.imagen

        setShow(true)
    }

    const Agregar_handled = () => {
        formik.values.id_empresa = 1
        formik.values.id_categoria = 0
        formik.values.nombre = ""
        formik.values.descripcion = ""
        formik.values.imagen = ""
        formik.values.activo = 1
        setShow(true)
    }
    const Refrescar_handled = () => fetchProducts()

    const imageHandled = row => {
        //console.log("row", row)
        //console.log("data", data)
        // console.log('imagen:', data[id_categoria - 1].imagen)
        setImageSelected({
            id_categoria: row.id_categoria,
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
            <h3>ABC Categorias</h3>
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
                        <th>Descripción</th>
                        <th>F. Actualización</th>
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
                            <tr key={row.id_categoria}>
                                <td className="align-content-center">{row.id_categoria}</td>
                                <td className="align-content-center">{row.nombre}</td>
                                <td className="align-content-center">{row.descripcion}</td>
                                <td className="align-content-center">{row.fecha_actualizacion}</td>
                                <td className="align-content-center">{row.activo}</td>
                                <td>
                                    <Image style={{ height: "80px", width: "80px", cursor: "pointer" }} src={row.imagen} thumbnail onClick={() => imageHandled(row)} />
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
                        <Modal.Title>Categoria # {formik.values.id_categoria === 0 ? "nueva" : formik.values.id_categoria}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            {/* Nombre */}
                            <FloatingLabel label="Nombre" className="mb-3">
                                <Form.Control type="text" placeholder="Nombre" id="nombre" name="nombre" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.nombre} />
                                {formik.touched.nombre && formik.errors.nombre ? <div className="text-danger">{formik.errors.nombre}</div> : null}
                            </FloatingLabel>

                            {/* Descripcion */}
                            <FloatingLabel label="Descripción" className="mb-3">
                                <Form.Control as="textarea" placeholder="Descripción" id="descripcion" name="descripcion" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.descripcion} style={{ height: "120px" }} />
                                {formik.touched.descripcion && formik.errors.descripcion ? <div className="text-danger">{formik.errors.descripcion}</div> : null}
                            </FloatingLabel>

                            {/* Activo */}
                            <FloatingLabel label="Activo" className="mb-3">
                                {/* <Form.Control type="text" placeholder="Activo" id="activo" name="activo" onChange={formik.handleChange} onBlur={formik.handleBlur} defaultValue={categoriaSelected.activo} /> */}

                                <Form.Select aria-label="Floating label select example" id="activo" name="activo" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.activo}>
                                    <option value="0">No</option>
                                    <option value="1">Si</option>
                                </Form.Select>
                                {formik.touched.activo && formik.errors.activo ? <div className="text-danger">{formik.errors.activo}</div> : null}
                            </FloatingLabel>
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

export default ListCategorias
