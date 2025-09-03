import React, { useState, useEffect } from "react"
import { Table, Button, Pagination, Spinner, Modal, Form, FloatingLabel, Row, Col } from "react-bootstrap"
import { CiEdit } from "react-icons/ci"
import { IoIosAddCircle } from "react-icons/io"
import { MdMenuOpen } from "react-icons/md";
import { TbRefresh } from "react-icons/tb"
import * as Yup from "yup"
import { Formik, useFormik } from "formik"
import Page from "../../Page"
import MenuHijos from "./MenuHijos"
import SpinnerButton from "../../Spinner/SpinnerButton"
import { useEmpresaID } from "../../../tools/StateUtils"
import { gettingMenu, updatingMenu } from "../../services/Settings.service"

const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre debe ser capturado"),
    orden: Yup.number().required("El orden debe ser capturado"),
})

function Menu() {
    const id_empresa = useEmpresaID()
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [totalRecords, setTotalRecords] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [isLoading, setIsLoaging] = useState(false)
    const [sending, setSending] = useState(false)
    const [showHijos, setShowHijos] = useState(false)
    const [selectedIdPadre, setSelectedIdPadre] = useState(0);

    //Modal
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)

    const fetchData = async () => {
        setIsLoaging(true)

        const params= {
            id_empresa,
            id_padre: 0,
            limite: rowsPerPage,
            pagina: currentPage * rowsPerPage - 5 < 0 ? 0 : currentPage * rowsPerPage - 5
        }

        try {
            const response = await gettingMenu(params)
            if (!response.success) {
                console.error("Error fetching menu:", response.error)
                return
            }
            //console.log("response:", response.menu)
            setData(response.menu)
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
            id_procMenu: 0,
            id_padre: 0,
            nombre: "",
            orden: 0,
            activo: 0,
            linkTo: "",
            icono: "",
            soloLanding: 0
        },
        //La validación que hacemos con YUP
        validationSchema: validationSchema,
        //Lo que pasa cuando se envia el formulario
        onSubmit: async values => {
            setSending(true)

            const menu = {
                id_empresa,
                id_procMenu: values.id_procMenu,
                nombre: values.nombre,
                orden: values.orden,
                activo: values.activo,
                linkTo: values.linkTo,
                icono: values.icono,
                soloLanding: values.soloLanding,
                id_padre: values.id_padre
            }
            postData(menu)
        }
    })
    const postData = async menu => {
        console.log("menu:", menu)
        try {
            const response = await updatingMenu(menu)
            if (response.success) {
                console.log('Menu actualizado correctamente')
            } else {
                console.error('No se pudo actualizar el menu:', response.error)
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
        formik.values.id_procMenu = row.id_procMenu
        formik.values.nombre = row.nombre
        formik.values.orden = row.orden
        formik.values.activo = row.activo === "Si" ? 1 : 0
        formik.values.linkTo = row.linkTo
        formik.values.icono = row.icono
        formik.values.soloLanding = row.soloLanding === "Sí" ? 1 : 0
        formik.values.id_padre = row.id_padre

        setShow(true)
    }

    const Agregar_handled = () => {
        formik.values.id_empresa = id_empresa
        formik.values.id_procMenu = 0
        formik.values.nombre = ""
        formik.values.orden = 0
        formik.values.activo = 1
        formik.values.linkTo = ""
        formik.values.icono = ""
        formik.values.soloLanding = 1
        formik.values.id_padre = 0
        setShow(true)
    }
    const Refrescar_handled = () => fetchData()     

    //const handleShowHijos = () => setShowHijos(true)
    const handleCloseHijos = () => setShowHijos(false)

    const handleShowHijos = (id) => {
        setSelectedIdPadre(id);
        setShowHijos(true);
    }

  return (
        <Page title="Landing Page" mt={1}>
            <h4 className="pt-2 pb-3">ABC Menu</h4>
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
                        <th className="text-center">Orden</th>
                        <th className="text-center">Activo</th>
                        <th className="text-center">Link To</th>
                        <th className="text-center">Icono</th>
                        <th className="text-center">¿Solo Landing?</th>
                        <th className="text-center">Id Padre</th>
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
                            <tr key={row.id_cajero}>
                                <td className="align-content-center">{row.id_procMenu}</td>
                                <td className="align-content-center">{row.nombre}</td>
                                <td className="align-content-center text-center">{row.orden}</td>
                                <td className="align-content-center text-center">{row.activo}</td>
                                <td className="align-content-center text-center">{row.linkTo}</td>
                                <td className="align-content-center text-center">{row.icono}</td>
                                <td className="align-content-center text-center">{row.soloLanding ? "Sí" : "No"}</td>
                                <td className="align-content-center text-center">{row.id_padre}</td>
                                <td className="align-content-center justify-content-center text-center">
                                    <Button className="my-1" size="sm" variant="warning" onClick={() => edit_handled(row)} title="Editar">
                                        <CiEdit />
                                    </Button>
                                    <Button size="sm" variant="success" onClick={() => handleShowHijos(row.id_procMenu)} title="Submenu">
                                        <MdMenuOpen />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        {showHijos && <MenuHijos handleCloseHijos={handleCloseHijos} id_padre={formik.values.id_procMenu} />}
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
                        <Modal.Title>Proc Menu # {formik.values.id_procMenu === 0 ? "nuevo" : formik.values.id_procMenu}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row>
                                <Col xs={12} sm={6} md={8}>
                                    {/* Nombre */}
                                    <FloatingLabel label="Nombre" className="mb-3">
                                        <Form.Control type="text" placeholder="Nombre" id="nombre" name="nombre" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.nombre} />
                                        {formik.touched.nombre && formik.errors.nombre ? <div className="text-danger">{formik.errors.nombre}</div> : null}
                                    </FloatingLabel>
                                </Col>
                                <Col xs={12} sm={6} md={2}>
                                    {/* Id Padre */}
                                    <FloatingLabel label="Id Padre" className="mb-3">
                                        <Form.Control type="text" placeholder="Id Padre" id="idPadre" name="idPadre" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.idPadre} />
                                        {formik.touched.idPadre && formik.errors.idPadre ? <div className="text-danger">{formik.errors.idPadre}</div> : null}
                                    </FloatingLabel>
                                </Col>
                                <Col xs={12} sm={6} md={2}>
                                    {/* Orden */}
                                    <FloatingLabel label="Orden" className="mb-3">
                                        <Form.Control type="text" placeholder="Orden" id="orden" name="orden" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.orden} />
                                        {formik.touched.orden && formik.errors.orden ? <div className="text-danger">{formik.errors.orden}</div> : null}
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={6} md={8}>
                                    {/* Link To */}
                                    <FloatingLabel label="Link To" className="mb-3">
                                        <Form.Control type="text" placeholder="Link To" id="linkTo" name="linkTo" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.linkTo} />
                                        {formik.touched.linkTo && formik.errors.linkTo ? <div className="text-danger">{formik.errors.linkTo}</div> : null}
                                    </FloatingLabel>
                                </Col>
                                <Col xs={12} sm={6} md={2}>
                                    {/* Activo */}
                                    <FloatingLabel label="Activo" className="mb-3">
                                        <Form.Select aria-label="Floating label select example" id="activo" name="activo" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.activo}>
                                            <option value="0">No</option>
                                            <option value="1">Si</option>
                                        </Form.Select>
                                        {formik.touched.activo && formik.errors.activo ? <div className="text-danger">{formik.errors.activo}</div> : null}
                                    </FloatingLabel>
                                </Col>
                                <Col xs={12} sm={6} md={2}>
                                    {/* ¿Solo Landing? */}
                                    <FloatingLabel label="¿Solo Landing?" className="mb-3">
                                        <Form.Select aria-label="Floating label select example" id="soloLanding" name="soloLanding" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.soloLanding}>
                                            <option value={false}>No</option>
                                            <option value={true}>Si</option>
                                        </Form.Select>
                                        {formik.touched.soloLanding && formik.errors.soloLanding ? <div className="text-danger">{formik.errors.soloLanding}</div> : null}
                                    </FloatingLabel>
                                </Col>

                            </Row>
                            <Row>
                                <Col>
                                    {/* Icono */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Icono</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={7}  // Correct placement of the rows attribute
                                            placeholder="Icono"
                                            id="icono"
                                            name="icono"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.icono}
                                        />
                                        {formik.touched.icono && formik.errors.icono ? (
                                            <div className="text-danger">{formik.errors.icono}</div>
                                        ) : null}


                                    </Form.Group>
                                    {/* <FloatingLabel label="Icono" className="mb-3">
                                    </FloatingLabel> */}
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
            <>
                <Modal size="lg" show={showHijos} onHide={handleCloseHijos} backdrop="static" keyboard={false} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Submenú</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <MenuHijos handleCloseHijos={handleCloseHijos} id_padre={selectedIdPadre} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseHijos}>Cerrar</Button>
                    </Modal.Footer>
                </Modal>
            </>
        </Page>
    )
}

export default Menu