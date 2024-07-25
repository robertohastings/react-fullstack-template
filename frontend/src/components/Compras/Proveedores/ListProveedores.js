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

function ListProveedores() {
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [totalRecords, setTotalRecords] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [isLoading, setIsLoaging] = useState(false)
    const [sending, setSending] = useState(false)
    const [imageSelected, setImageSelected] = useState({})

    //Modal
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)

    const fetchProducts = async () => {
        setIsLoaging(true)

        try {
            const response = await Axios.get("/api/compras/getProveedoresListado", {
                params: {
                    limite: rowsPerPage,
                    pagina: currentPage * rowsPerPage - 5 < 0 ? 0 : currentPage * rowsPerPage - 5
                }
            })
            console.log("response:", response.data.proveedores)
            setData(response.data.proveedores)
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
            id_proveedor: 0,
            nombre: "",
            contacto1: "",
            contacto2: "",
            telefono1: "",
            telefono2: "",
            whatsapp: "",
            email1: "",
            email2: "",
            horario: "",
            activo: 0
        },
        //La validación que hacemos con YUP
        validationSchema: validationSchema,
        //Lo que pasa cuando se envia el formulario
        onSubmit: async values => {
            setSending(true)
            //console.log("values:", values)

            const proveedor = {
                id_empresa: 1,
                id_proveedor: values.id_proveedor,
                nombre: values.nombre,
                contacto1: values.contacto1,
                contacto2: values.contacto2,
                telefono1: values.telefono1,
                telefono2: values.telefono2,
                whatsapp: values.whatsapp,
                email1: values.email1,
                email2: values.email2,
                horario: values.horario,
                activo: values.activo
            }
            postProveedor(proveedor)
        }
    })

    const postProveedor = async proveedor => {
        try {
            await Axios.post("/api/compras/postProveedor", proveedor)
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
        formik.values.id_proveedor = row.id_proveedor
        formik.values.nombre = row.nombre
        formik.values.contacto1 = row.contacto1
        formik.values.contacto2 = row.contacto2
        formik.values.telefono1 = row.telefono1
        formik.values.telefono2 = row.telefono2
        formik.values.whatsapp = row.whatsapp
        formik.values.email1 = row.email1
        formik.values.email2 = row.email2
        formik.values.horario = row.horario
        formik.values.activo = row.activo === "Si" ? 1 : 0

        setShow(true)
    }

    const Agregar_handled = () => {
        formik.values.id_empresa = 1
        formik.values.id_proveedor = 0
        formik.values.nombre = ""
        formik.values.contacto1 = ""
        formik.values.contacto2 = ""
        formik.values.telefono1 = ""
        formik.values.telefono2 = ""
        formik.values.whatsapp = ""
        formik.values.email1 = ""
        formik.values.email2 = ""
        formik.values.horario = ""

        formik.values.activo = 1
        setShow(true)
    }
    const Refrescar_handled = () => fetchProducts()

    return (
        <Page title="ABC Categorias">
            <h3>ABC Proveedores</h3>
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
                        <th>Contacto</th>
                        <th>Teléfono 1</th>
                        <th>Teléfono 2</th>
                        <th>Email</th>
                        <th>Whatsapp</th>
                        <th>F. Actualización</th>
                        <th>Activo</th>
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
                            <tr key={row.id_proveedor}>
                                <td className="align-content-center">{row.id_proveedor}</td>
                                <td className="align-content-center">{row.nombre}</td>
                                <td className="align-content-center">{row.contacto1 !== null ? row.contacto1 : "1"}</td>
                                <td className="align-content-center">{row.telefono1}</td>
                                <td className="align-content-center">{row.telefono2}</td>
                                <td className="align-content-center">{row.email1}</td>
                                <td className="align-content-center">{row.whatsapp}</td>
                                <td className="align-content-center">{row.fecha_actualizacion}</td>
                                <td className="align-content-center">{row.activo}</td>
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
                        <Modal.Title>Proveedor # {formik.values.id_proveedor === 0 ? "nuevo" : formik.values.id_proveedor}</Modal.Title>
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
                            <Row>
                                <Col>
                                    {/* contacto1 */}
                                    <FloatingLabel label="Contacto 1" className="mb-3">
                                        <Form.Control type="text" placeholder="Contacto 1" id="contacto1" name="contacto1" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.contacto1} />
                                        {formik.touched.contacto1 && formik.errors.contacto1 ? <div className="text-danger">{formik.errors.contacto1}</div> : null}
                                    </FloatingLabel>
                                </Col>
                                <Col>
                                    {/* contacto2 */}
                                    <FloatingLabel label="Contacto 2" className="mb-3">
                                        <Form.Control as="text" placeholder="Contacto 2" id="contacto2" name="contacto2" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.contacto2} />
                                        {formik.touched.contacto2 && formik.errors.contacto2 ? <div className="text-danger">{formik.errors.contacto2}</div> : null}
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {/* telefono1 */}
                                    <FloatingLabel label="Teléfono 1" className="mb-3">
                                        <Form.Control as="text" placeholder="Teléfono 1" id="telefono1" name="telefono1" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.telefono1} />
                                        {formik.touched.telefono1 && formik.errors.telefono1 ? <div className="text-danger">{formik.errors.telefono1}</div> : null}
                                    </FloatingLabel>
                                </Col>
                                <Col>
                                    {/* telefono2 */}
                                    <FloatingLabel label="Teléfono 2" className="mb-3">
                                        <Form.Control as="text" placeholder="Teléfono 2" id="telefono2" name="telefono2" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.telefono2} />
                                        {formik.touched.telefono2 && formik.errors.telefono2 ? <div className="text-danger">{formik.errors.telefono2}</div> : null}
                                    </FloatingLabel>
                                </Col>
                                <Col>
                                    {/* whatsapp */}
                                    <FloatingLabel label="Whatsapp" className="mb-3">
                                        <Form.Control as="text" placeholder="Whatsapp" id="whatsapp" name="whatsapp" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.whatsapp} />
                                        {formik.touched.whatsapp && formik.errors.whatsapp ? <div className="text-danger">{formik.errors.whatsapp}</div> : null}
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {/* email1 */}
                                    <FloatingLabel label="Email 1" className="mb-3">
                                        <Form.Control as="text" placeholder="Email 1" id="whatsapp" name="email1" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email1} />
                                        {formik.touched.email1 && formik.errors.email1 ? <div className="text-danger">{formik.errors.email1}</div> : null}
                                    </FloatingLabel>
                                </Col>
                                <Col>
                                    {/* email2 */}
                                    <FloatingLabel label="Email 2" className="mb-3">
                                        <Form.Control as="text" placeholder="Email 2" id="whatsapp" name="email2" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email2} />
                                        {formik.touched.email2 && formik.errors.email2 ? <div className="text-danger">{formik.errors.email2}</div> : null}
                                    </FloatingLabel>
                                </Col>
                                <Col>
                                    {/* email2 */}
                                    <FloatingLabel label="Horario" className="mb-3">
                                        <Form.Control as="text" placeholder="Horario" id="horario" name="horario" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.horario} />
                                        {formik.touched.horario && formik.errors.horario ? <div className="text-danger">{formik.errors.horario}</div> : null}
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {/* Activo */}
                                    <FloatingLabel label="Activo" className="mb-3">
                                        <Form.Select aria-label="Floating label select example" id="activo" name="activo" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.activo}>
                                            <option value="0">No</option>
                                            <option value="1">Si</option>
                                        </Form.Select>
                                        {formik.touched.activo && formik.errors.activo ? <div className="text-danger">{formik.errors.activo}</div> : null}
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
        </Page>
    )
}

export default ListProveedores
