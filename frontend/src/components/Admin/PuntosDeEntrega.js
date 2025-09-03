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
import { gettingPuntosDeEntrega, updatingPuntosDeEntrega } from "../services/Landing.service"

const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre debe ser capturado"),
    horario: Yup.string().required("El Horariodebe ser capturado")
})

function PuntosDeEntrega() {
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
            limite: rowsPerPage,
            pagina: currentPage * rowsPerPage - 5 < 0 ? 0 : currentPage * rowsPerPage - 5
        }

        try {
            const response = await gettingPuntosDeEntrega(params)
            if (!response.success) {
                console.error("Error fetching puntos de entrega:", response.error)
                return
            }
            //console.log("response:", response.puntosDeEntrega)
            setData(response.puntosDeEntrega)
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
            id_puntoDeEntrega: 0,
            nombre: "",
            horario: "",
            activo: 0
        },
        //La validación que hacemos con YUP
        validationSchema: validationSchema,
        //Lo que pasa cuando se envia el formulario
        onSubmit: async values => {
            setSending(true)
            //console.log("values:", values)

            const puntoDeEntrega = {
                id_empresa,
                id_puntoDeEntrega: values.id_puntoDeEntrega,
                nombre: values.nombre,
                horario: values.horario,
                activo: values.activo
            }
            postData(puntoDeEntrega)
        }
    })

    const postData = async puntoDeEntrega => {
        console.log("punto de entrega:", puntoDeEntrega)
        try {
            const response = await updatingPuntosDeEntrega(puntoDeEntrega)
            if (response.success) {
                console.log('Punto de entrega actualizado correctamente')
            } else {
                console.error('No se pudo actualizar el punto de entrega:', response.error)
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
        formik.values.id_puntoDeEntrega = row.id_puntoDeEntrega
        formik.values.nombre = row.nombre
        formik.values.horario = row.horario
        formik.values.activo = row.activo === "Si" ? 1 : 0

        setShow(true)
    }

    const Agregar_handled = () => {
        formik.values.id_empresa = id_empresa
        formik.values.id_puntoDeEntrega = 0
        formik.values.nombre = ""
        formik.values.horario = ""
        formik.values.activo = 1
        setShow(true)
    }
    const Refrescar_handled = () => fetchData()

    return (
        <Page title="Landing Page">
            <h4 className="pt-2 pb-3">ABC Puntos de Entrega</h4>
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
                        <th>Horario</th>
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
                            <tr key={row.id_puntoDeEntrega}>
                                <td className="align-content-center">{row.id_puntoDeEntrega}</td>
                                <td className="align-content-center">{row.nombre}</td>
                                <td className="align-content-center">{row.horario}</td>
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
                        <Modal.Title>Punto de Entrega # {formik.values.id_puntoDeEntrega === 0 ? "nuevo" : formik.values.id_puntoDeEntrega}</Modal.Title>
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
                                    {/* Horario */}
                                    <FloatingLabel label="Horario" className="mb-3">
                                        <Form.Control type="text" placeholder="Horario" id="horario" name="horario" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.horario} />
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

export default PuntosDeEntrega
