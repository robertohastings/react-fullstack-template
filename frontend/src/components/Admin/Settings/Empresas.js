import React, { useState, useEffect } from "react"
import { Table, Button, Pagination, Spinner, Modal, Form, FloatingLabel, Row, Col } from "react-bootstrap"
import { CiEdit } from "react-icons/ci"
import { IoIosAddCircle } from "react-icons/io"
import { TbRefresh } from "react-icons/tb"
import * as Yup from "yup"
import { Formik, useFormik } from "formik"
import Page from '../../Page'
import SpinnerButton from "../../Spinner/SpinnerButton"
// import { useEmpresaID } from "../../../tools/StateUtils"
import { gettingEmpresasListing, postingEmpresas } from "../../services/Settings.service"

const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre debe ser capturado"),
})

function Empresas() {
    // const id_empresa = useEmpresaID()
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
            const response = await gettingEmpresasListing(params)
            if (!response.success) {
                console.error("Error fetching empresas:", response.error)
                return
            }
            setData(response.empresas)
            setTotalRecords(response.totalRegistros)
        } catch (error) {
            console.error("There was an error fetching the empresas!", error.message)
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
            id_empresa: 0,
            nombre: "",
            logo: "",
            host: "",
            activo: 0
        },
        //La validación que hacemos con YUP
        validationSchema: validationSchema,
        //Lo que pasa cuando se envia el formulario
        onSubmit: async values => {
            setSending(true)
            //console.log("values:", values)

            const empresas = {
                id_empresa: values.id_empresa,
                nombre: values.nombre,
                logo: values.logo,
                host: values.host,
                activo: values.activo
            }
            postData(empresas)
        }
    })

    const postData = async empresas => {
        console.log("empresas:", empresas)
        try {
            const response = await postingEmpresas(empresas)
            if (response.success) {
                console.log('Empresas actualizado correctamente')
            } else {
                console.error('No se pudo actualizar el empresas:', response.error)
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
        formik.values.id_empresa = row.id_empresa
        formik.values.nombre = row.nombre
        formik.values.logo = row.logo
        formik.values.host = row.host
        formik.values.activo = row.activo === "Si" ? 1 : 0

        setShow(true)
    }

    const Agregar_handled = () => {
        formik.values.id_empresa = 0
        formik.values.nombre = ""
        formik.values.logo = ""
        formik.values.host = ""
        formik.values.activo = 1
        setShow(true)
    }
    const Refrescar_handled = () => fetchData()    


  return (
    <Page title="ABC Empresas" mt={1}>
            <h4 className="pt-2 pb-3">ABC Empresas</h4>
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
                        {/* <th className="col-2">Logo</th> */}
                        <th>Host</th>
                        <th className="text-center">Activo</th>
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
                            <tr key={row.id_empresa}>
                                <td className="align-content-center">{row.id_empresa}</td>
                                <td className="align-content-center">{row.nombre}</td>
                                {/* <td className="align-content-center col-2">{row.logo}</td> */}
                                <td className="align-content-center">{row.host}</td>
                                <td className="align-content-center text-center">{row.activo}</td>
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
                        <Modal.Title>Rol # {formik.values.id_rol === 0 ? "nuevo" : formik.values.id_rol}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row>
                                <Col md={12}>
                                    {/* Nombre */}
                                    <FloatingLabel label="Nombre" className="mb-3">
                                        <Form.Control type="text" placeholder="Nombre" id="nombre" name="nombre" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.nombre} />
                                        {formik.touched.nombre && formik.errors.nombre ? <div className="text-danger">{formik.errors.nombre}</div> : null}
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    {/* Logo */}
                                    <FloatingLabel label="Logo" className="mb-3">
                                        <Form.Control type="text" placeholder="Logo" id="logo" name="logo" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.logo} />
                                        {formik.touched.logo && formik.errors.logo ? <div className="text-danger">{formik.errors.logo}</div> : null}
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    {/* Hosts */}
                                    <FloatingLabel label="Host" className="mb-3">
                                        <Form.Control type="text" placeholder="Host" id="host" name="host" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.host} />
                                        {formik.touched.host && formik.errors.host ? <div className="text-danger">{formik.errors.host}</div> : null}
                                    </FloatingLabel>
                                </Col>
                                <Col md={6}>
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

export default Empresas