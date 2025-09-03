import React, { useState, useEffect } from "react"
import { Table, Button, Pagination, Spinner, Modal, Form, FloatingLabel, Row, Col } from "react-bootstrap"
import { CiEdit } from "react-icons/ci"
import { IoIosAddCircle } from "react-icons/io"
import { TbRefresh } from "react-icons/tb"
import * as Yup from "yup"
import { Formik, useFormik } from "formik"
import Page from "../Page"
import SpinnerButton from "../Spinner/SpinnerButton"
import { useEmpresaID } from "../../tools/StateUtils"
import { gettingClientes, postingCliente } from "../services/Cartera.service"

const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre debe ser capturado"),
})

function Clientes() {
    const id_empresa = useEmpresaID()
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [totalRecords, setTotalRecords] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [isLoading, setIsLoaging] = useState(false)
    const [sending, setSending] = useState(false)

    //Modal
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)

    const fetchData = async () => {
        setIsLoaging(true)

        const params= {
            id_empresa,
            limite: rowsPerPage,
            pagina: currentPage * rowsPerPage - 5 < 0 ? 0 : currentPage * rowsPerPage - 5
        }

        try {
            const response = await gettingClientes(params)
            if (!response.success) {
                console.error("Error fetching clientes:", response.error)
                return
            }
            //console.log("response:", response.clientes)
            setData(response.clientes)
            setTotalRecords(response.totalRegistros)
        } catch (error) {
            console.error("There was an error fetching the products!", error.message)
        } finally {
            setIsLoaging(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [currentPage])

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber)

    const formik = useFormik({
        //Lo que necesita el formulario
        initialValues: {
            id_cliente: 0,
            empresa: "",
            nombre: "",
            telefonos: "",
            celulares: ""
        },
        //La validación que hacemos con YUP
        validationSchema: validationSchema,
        //Lo que pasa cuando se envia el formulario
        onSubmit: async values => {
            setSending(true)
            //console.log("values:", values)

            const clientes = {
                id_empresa,
                id_cliente: values.id_cliente,
                nombre: values.nombre,
                telefonos: values.telefonos,
                celulares: values.celulares
            }
            postData(clientes)
        }
    })

    const postData = async clientes => {
        console.log("clientes:", clientes)
        try {
            const response = await postingCliente(clientes)
            if (response.success) {
                console.log('Clientes actualizado correctamente')
            } else {
                console.error('No se pudo actualizar el clientes:', response.error)
            }

        } catch (error) {
            console.log("error:", error)
        } finally {
            setSending(false)
            setShow(false)
            fetchData()
        }
    }

    const edit_handled = row => {
        formik.values.id_cliente = row.id_cliente
        formik.values.nombre = row.nombre
        formik.values.telefonos = row.telefonos
        formik.values.celulares = row.celulares

        setShow(true)
    }

    const Agregar_handled = () => {
        formik.values.id_empresa = id_empresa
        formik.values.id_cliente = 0
        formik.values.nombre = ""
        formik.values.telefonos = ""
        formik.values.celulares = ""
        setShow(true)
    }
    const Refrescar_handled = () => fetchData()    


  return (
        <Page title="Landing Page">
            <h4 className="pt-2 pb-3">ABC Clientes</h4>
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
                        <th>empresa</th>
                        <th>Telefonos</th>
                        <th>Celulares</th>
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
                            <tr key={row.id_cliente}>
                                <td className="align-content-center">{row.id_cliente}</td>
                                <td className="align-content-center">{row.nombre}</td>
                                <td className="align-content-center">{row.empresa}</td>
                                <td className="align-content-center text-center">{row.telefonos}</td>
                                <td className="align-content-center text-center">{row.celulares}</td>
                                <td className="align-content-center justify-content-center text-center">
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
                        <Modal.Title>Cliente # {formik.values.id_cliente === 0 ? "nuevo" : formik.values.id_cliente}</Modal.Title>
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
                                    {/* Empresa */}
                                    <FloatingLabel label="Empresa" className="mb-3">
                                        <Form.Control type="text" placeholder="Empresa" id="empresa" name="empresa" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.empresa} />
                                        {formik.touched.empresa && formik.errors.empresa ? <div className="text-danger">{formik.errors.empresa}</div> : null}
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {/* Telefono */}
                                    <FloatingLabel label="Telefono" className="mb-3">
                                        <Form.Control type="text" placeholder="Telefono" id="telefono" name="telefono" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.telefonos} />
                                        {formik.touched.telefonos && formik.errors.telefonos ? <div className="text-danger">{formik.errors.telefonos}</div> : null}
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {/* Celular */}
                                    <FloatingLabel label="Celular" className="mb-3">
                                        <Form.Control type="text" placeholder="Celular" id="celular" name="celular" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.celulares} />
                                        {formik.touched.celulares && formik.errors.celulares ? <div className="text-danger">{formik.errors.celulares}</div> : null}
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

export default Clientes