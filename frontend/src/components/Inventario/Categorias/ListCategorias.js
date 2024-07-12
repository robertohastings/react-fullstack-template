import React, { useState, useEffect } from "react"
import Axios from "axios"
import { Table, Button, Pagination, Spinner, Image, Modal, Form, FloatingLabel } from "react-bootstrap"
import { CiEdit } from "react-icons/ci"
import * as Yup from "yup"
import { Formik, useFormik } from "formik"
//import { Navigate } from "react-router-dom"
import Page from "../../Page"
import SpinnerButton from "../../Spinner/SpinnerButton"

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
    //const history = useHistory()

    //Modal
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    //Categoria seleccionada
    const [categoriaSelected, setCategoriaSelected] = useState({})

    const fetchProducts = async () => {
        //console.log("rowsPerPage:", rowsPerPage, " currentPage:", currentPage)
        try {
            //console.log("rowsPerPage:", rowsPerPage, " currentPage:", currentPage)
            const response = await Axios.get("/api/getCategoriasListado", {
                params: {
                    limite: rowsPerPage,
                    pagina: currentPage * rowsPerPage - 5 < 0 ? 0 : currentPage * rowsPerPage - 5
                }
            })
            console.log("response:", response)
            setData(response.data.categorias)
            setTotalRecords(response.data.totalRegistros)
        } catch (error) {
            console.error("There was an error fetching the products!", error)
        } finally {
            setIsLoaging(false)
        }
    }

    useEffect(() => {
        setIsLoaging(true)
        //setRowsPerPage(5)

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
                activo: values.activo
            }
            postCategoria(categoria)
        }
    })

    const postCategoria = async categoria => {
        try {
            await Axios.put("/api/inventario/postCategoria", categoria)
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
        }
    }

    const edit_handled = id_categoria => {
        formik.values.id_categoria = data[id_categoria - 1].id_categoria
        formik.values.nombre = data[id_categoria - 1].nombre
        formik.values.descripcion = data[id_categoria - 1].descripcion
        formik.values.activo = data[id_categoria - 1].activo === "Si" ? 1 : 0

        setShow(true)
    }

    const Agregar_handled = () => {
        formik.values.id_categoria = 0
        formik.values.nombre = ""
        formik.values.descripcion = ""
        formik.values.activo = 1
        setShow(true)
    }

    return (
        <Page title="ABC Categorias">
            <h3>ABC Categorias</h3>

            <Button className="my-3" size="sm" variant="outline-primary" onClick={Agregar_handled}>
                Agregar
            </Button>

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
                                    <Image style={{ height: "80px", width: "80px" }} src={row.imagen !== null ? row.imagen : "https://fiestatijuana.mx/image-not-available.png"} thumbnail />
                                </td>
                                <td className="align-content-center justify-content-center">
                                    <Button size="sm" variant="warning" onClick={() => edit_handled(row.id_categoria)}>
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

            <>
                <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Categoria # {formik.values.id_categoria === 0 ? "nueva" : categoriaSelected.id_categoria}</Modal.Title>
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
                                <Form.Control type="text" placeholder="Descripción" id="descripcion" name="descripcion" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.descripcion} />
                                {formik.touched.descripcion && formik.errors.descripcion ? <div className="text-danger">{formik.errors.descripcion}</div> : null}
                            </FloatingLabel>

                            {/* Activo */}
                            <FloatingLabel label="Activo" className="mb-3">
                                {/* <Form.Control type="text" placeholder="Activo" id="activo" name="activo" onChange={formik.handleChange} onBlur={formik.handleBlur} defaultValue={categoriaSelected.activo} /> */}

                                <Form.Select aria-label="Floating label select example" id="activo" name="activo" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.activo}>
                                    <option value="1">Si</option>
                                    <option value="2">No</option>
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
        </Page>
    )
}

export default ListCategorias
