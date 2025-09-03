import React, { useState, useEffect } from "react"
import { Table, Button, Pagination, Spinner, Modal, Form, FloatingLabel, Row, Col } from "react-bootstrap"
import { CiEdit } from "react-icons/ci"
import { IoIosAddCircle } from "react-icons/io"
import { TbRefresh } from "react-icons/tb"
import * as Yup from "yup"
import { Formik, useFormik } from "formik"
import { postDireccion } from "../../../models/Usuario/Usuario.model"
import { getDirecciones } from "../../../models/Usuario/Usuario.model"
import { useEmpresaID, useUsuarioID } from "../../../tools/StateUtils"
//import Page from "../../Page"
import SpinnerButton from "../../Spinner/SpinnerButton"

const validationSchema = Yup.object({
    calle: Yup.string().required("La Calle debe ser capturada"),
    numero: Yup.string().required("El número debe ser capturado"),
    colonia: Yup.string().required("La Colonia debe ser capturado"),
    ciudad: Yup.string().required("La Ciudad debe ser capturado"),
    estado: Yup.string().required("El Estado debe ser capturado"),
    pais: Yup.string().required("El País debe ser capturado"),
    codigo_postal: Yup.string().required("El código postal debe ser capturado")
})

function Direcciones() {
    const id_empresa = useEmpresaID();
    const id_usuario = useUsuarioID();
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [totalRecords, setTotalRecords] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [isLoading, setIsLoaging] = useState(false)
    const [sending, setSending] = useState(false)

    //Modal
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)

    const fetchDirecciones = async () => {
        setIsLoaging(true)

        try {

            const params = {
                limite: rowsPerPage,
                pagina: currentPage * rowsPerPage - 5 < 0 ? 0 : currentPage * rowsPerPage - 5,
                id_empresa,
                tipo_identidad: 1,
                identidad: 1
            }
            const response = await getDirecciones(params)

            setData(response.direcciones)
            setTotalRecords(response.totalRegistros)
        } catch (error) {
            console.error("There was an error fetching the products!", error)
        } finally {
            setIsLoaging(false)
        }
    }

    useEffect(() => {
        fetchDirecciones()
    }, [currentPage])

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber)

    const formik = useFormik({
        //Lo que necesita el formulario
        initialValues: {
            calle: "",
            numero: "",
            colonia: "",
            ciudad: "",
            estado: "",
            pais: "",
            codigo_postal: ""
        },
        //La validación que hacemos con YUP
        validationSchema: validationSchema,
        //Lo que pasa cuando se envia el formulario
        onSubmit: async values => {
            setSending(true)
            console.log("values:", values)

            const direccion = {
                id_empresa: 1,
                id_direccion: values.id_direccion,
                identidad: 1,
                id_direccion_tipo_identidad: 1,
                direccion_por_defecto: parseInt(values.direccion_por_defecto),
                calle: values.calle,
                numero: values.numero,
                colonia: values.colonia,
                ciudad: values.ciudad,
                estado: values.estado,
                pais: values.pais,
                codigo_postal: values.codigo_postal
            }
            handled_postDireccion(direccion)
        }
    })

    const handled_postDireccion = async direccion => {
        try {
            await postDireccion(direccion)

        } catch (error) {
            console.log("error:", error)
        } finally {
            setSending(false)
            setShow(false)
            fetchDirecciones()
        }
    }

    const edit_handled = row => {
        formik.values.id_direccion = row.id_direccion
        formik.values.direccion_por_defecto = row.direccion_por_defecto === "Si" ? 1 : 0
        formik.values.calle = row.calle
        formik.values.numero = row.numero
        formik.values.colonia = row.colonia
        formik.values.ciudad = row.ciudad
        formik.values.estado = row.estado
        formik.values.pais = row.pais
        formik.values.codigo_postal = row.codigo_postal

        setShow(true)
    }

    const Agregar_handled = () => {
        formik.values.id_direccion = 0
        formik.values.direccion_por_defecto = "No"
        formik.values.calle = ""
        formik.values.numero = ""
        formik.values.colonia = ""
        formik.values.ciudad = ""
        formik.values.estado = ""
        formik.values.pais = ""
        formik.values.codigo_postal = ""
        setShow(true)
    }
    const Refrescar_handled = () => fetchDirecciones()

    return (
        <div>
            <h4 className="pt-4">Direcciones</h4>
            <hr />

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
                        <th>Calle</th>
                        <th>Número</th>
                        <th>Colonia</th>
                        <th>Ciudad</th>
                        <th>Estado</th>
                        <th>Pais</th>
                        <th>Código Postal</th>
                        <th>¿Dirección por defecto?</th>
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
                            <tr key={row.id_direccion}>
                                <td className="align-content-center">{row.id_direccion}</td>
                                <td className="align-content-center">{row.calle}</td>
                                <td className="align-content-center">{row.numero}</td>
                                <td className="align-content-center">{row.colonia}</td>
                                <td className="align-content-center">{row.ciudad}</td>
                                <td className="align-content-center">{row.estado}</td>
                                <td className="align-content-center">{row.pais}</td>
                                <td className="align-content-center">{row.codigo_postal}</td>
                                <td className="align-content-center">{row.direccion_por_defecto}</td>

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
                        <Modal.Title>{formik.values.id_direccion === 0 ? "Nueva dirección:" : `Dirección # ${formik.values.id_direccion}:`}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row>
                                <Col xs={10}>
                                    {/* Calle */}
                                    <FloatingLabel label="Calle" className="mb-3">
                                        <Form.Control type="text" placeholder="Calle" id="calle" name="calle" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.calle} />
                                        {formik.touched.calle && formik.errors.calle ? <div className="text-danger">{formik.errors.calle}</div> : null}
                                    </FloatingLabel>
                                </Col>
                                <Col xs={2}>
                                    {/* Número */}
                                    <FloatingLabel label="Número" className="mb-3">
                                        <Form.Control type="text" placeholder="Número" id="numero" name="numero" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.numero} />
                                        {formik.touched.numero && formik.errors.numero ? <div className="text-danger">{formik.errors.numero}</div> : null}
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {/* Colonia */}
                                    <FloatingLabel label="Colonia" className="mb-3">
                                        <Form.Control type="text" placeholder="Colonia" id="colonia" name="colonia" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.colonia} />
                                        {formik.touched.colonia && formik.errors.colonia ? <div className="text-danger">{formik.errors.colonia}</div> : null}
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6}>
                                    {/* Ciudad */}
                                    <FloatingLabel label="Ciudad" className="mb-3">
                                        <Form.Control type="text" placeholder="Ciudad" id="ciudad" name="ciudad" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.ciudad} />
                                        {formik.touched.ciudad && formik.errors.ciudad ? <div className="text-danger">{formik.errors.ciudad}</div> : null}
                                    </FloatingLabel>
                                </Col>
                                <Col xs={3}>
                                    {/* Estado */}
                                    <FloatingLabel label="Estado" className="mb-3">
                                        <Form.Control type="text" placeholder="Estado" id="estado" name="estado" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.estado} />
                                        {formik.touched.estado && formik.errors.estado ? <div className="text-danger">{formik.errors.estado}</div> : null}
                                    </FloatingLabel>
                                </Col>
                                <Col xs={3}>
                                    {/* País */}
                                    <FloatingLabel label="País" className="mb-3">
                                        <Form.Control type="text" placeholder="País" id="pais" name="pais" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.pais} />
                                        {formik.touched.pais && formik.errors.pais ? <div className="text-danger">{formik.errors.pais}</div> : null}
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {/* Código Postal */}
                                    <FloatingLabel label="Código Postal" className="mb-3">
                                        <Form.Control type="text" placeholder="Código Postal" id="codigo_postal" name="codigo_postal" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.codigo_postal} />
                                        {formik.touched.codigo_postal && formik.errors.codigo_postal ? <div className="text-danger">{formik.errors.codigo_postal}</div> : null}
                                    </FloatingLabel>
                                </Col>
                                <Col>
                                    {/* Activo */}
                                    <FloatingLabel label="PorDefecto" className="mb-3">
                                        <Form.Select aria-label="Floating label select example" id="direccion_por_defecto" name="direccion_por_defecto" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.direccion_por_defecto}>
                                            <option value="0">No</option>
                                            <option value="1">Si</option>
                                        </Form.Select>
                                        {formik.touched.direccion_por_defecto && formik.errors.direccion_por_defecto ? <div className="text-danger">{formik.errors.direccion_por_defecto}</div> : null}
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
        </div>
    )
}

export default Direcciones
