import React, { useState, useEffect } from "react"
import { Table, Button, Pagination, Spinner, Modal, Form, FloatingLabel, Row, Col } from "react-bootstrap"
import { CiEdit } from "react-icons/ci"
import { IoIosAddCircle } from "react-icons/io"
import { MdMenuOpen } from "react-icons/md";
import { TbRefresh } from "react-icons/tb"
import * as Yup from "yup"
import { Formik, useFormik } from "formik"
import Page from '../../Page'
import SpinnerButton from "../../Spinner/SpinnerButton"
import { useEmpresaID } from "../../../tools/StateUtils"
import { gettingRolMenuListing, postingRolMenu, gettingRoles } from "../../services/Settings.service";

const validationSchema = Yup.object({
    activo: Yup.number().required("El estado debe ser capturado"),
})

function RolMenu() {
    const id_empresa = useEmpresaID()
    const [data, setData] = useState([])
    const [roles, setRoles] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [totalRecords, setTotalRecords] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [isLoading, setIsLoaging] = useState(false)
    const [sending, setSending] = useState(false)
    const [showHijos, setShowHijos] = useState(false)
    const [selectedIdPadre, setSelectedIdPadre] = useState(0);
    const [selectedRol, setSelectedRol] = useState(1);

    //Modal
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)

    // Obtener los roles disponibles al cargar el componente
    const fetchRoles = async () => {
        const params = {
            id_empresa
        }
        try {
            const response = await gettingRoles(params)
            if (response.success) {
                setRoles(response.roles)
            } else {
                console.error("Error fetching roles:", response.error)
            }
        } catch (error) {
            console.error("There was an error fetching the roles!", error.message)
        }
    }

    const fetchData = async () => {
        setIsLoaging(true)

        const params= {
            id_empresa,
            id_rol: selectedRol,
            limite: rowsPerPage,
            pagina: currentPage * rowsPerPage - 10 < 0 ? 0 : currentPage * rowsPerPage - 10
        }

        try {
            const response = await gettingRolMenuListing(params)
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
        fetchRoles()
    }, [])

    useEffect(() => {
        fetchData()
    }, [selectedRol, currentPage])

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber)    

    const formik = useFormik({
        //Lo que necesita el formulario
        initialValues: {
            id_procMenu: 0,
            id_rol: 0,
            activo: 0,
            menu: "",
            opcion: ""
        },
        //La validación que hacemos con YUP
        validationSchema: validationSchema,
        //Lo que pasa cuando se envia el formulario
        onSubmit: async values => {
            setSending(true)
            console.log("Request body from RolMenu:", values)

            const menu = {
                id_empresa,
                id_procMenu: values.id_procMenu,
                id_rol: 1,
                activo: values.activo
            }
            console.log("menu:", menu)
            postData(menu)
        }
    })
    const postData = async menu => {
        console.log("menu:", menu)
        try {
            const response = await postingRolMenu(menu)
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
        console.log('row:', row)
        formik.values.id_procMenu = row.id_procMenu
        formik.values.id_rol = row.id_rol        
        formik.values.activo = row.activo
        formik.values.menu = row.menu
        formik.values.opcion = row.opcion
        setShow(true)
    }

    // const Agregar_handled = () => {
    //     formik.values.id_empresa = id_empresa
    //     formik.values.id_procMenu = 0
    //     formik.values.activo = 1
    //     setShow(true)
    // }
    const Refrescar_handled = () => fetchData()     

    //const handleShowHijos = () => setShowHijos(true)
    const handleCloseHijos = () => setShowHijos(false)

    const handleShowHijos = (id) => {
        setSelectedIdPadre(id);
        setShowHijos(true);
    }

  return (
    <Page title="ABC RolMenu" mt={1}>
            <h4 className="pt-0 pb-3">ABC RolMenu</h4>
            <div className="align-items-center pb-3">
                <Row className="align-items-center">
                    <Col md="2">
                      <Button size="md" variant="outline-primary" onClick={Refrescar_handled}>
                          <TbRefresh />
                          {` Refrescar`}
                      </Button>
                    </Col>
                    <Col md="10">
                      <FloatingLabel controlId="floatingSelect" label="Seleccionar Rol">
                        <Form.Select
                            aria-label="Default select example"
                            onChange={e => setSelectedRol(e.target.value)}
                            value={selectedRol}
                        >
                              <option value="">Seleccione un rol</option>
                          {roles.map(rol => (
                              <option key={rol.id_rol} value={rol.id_rol}>
                                  {rol.nombre}
                              </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                </Row>
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

            {/* Lista */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="text-center">Menu</th>
                        <th className="text-center">Opcion</th>
                        <th className="text-center">Id proc Menu</th>
                        <th className="text-center">¿Activo?</th>
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
                                <td className="align-content-center">{row.menu}</td>
                                <td className="align-content-center">{row.opcion}</td>
                                <td className="align-content-center text-center">{row.id_procMenu}</td>
                                <td className="align-content-center text-center">{row.activo ? "Si" : "No"}</td>
                                <td className="align-content-center justify-content-center text-center">
                                    <Button className="my-1" size="sm" variant="warning" onClick={() => edit_handled(row)} title="Editar">
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
                        <Modal.Title>Proc Menu # {formik.values.id_procMenu === 0 ? "nuevo" : formik.values.id_procMenu}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row>
                                <Col xs={12} sm={6} md={6}>
                                    {/* Menu */}
                                    <FloatingLabel label="Menu" className="mb-3">
                                        <Form.Control type="text" placeholder="Menu" id="menu" name="menu" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.menu} />
                                        {formik.touched.menu && formik.errors.menu ? <div className="text-danger">{formik.errors.menu}</div> : null}
                                    </FloatingLabel>
                                </Col>
                                <Col xs={12} sm={6} md={6}>
                                    {/* Opcion */}
                                    <FloatingLabel label="Opcion" className="mb-3">
                                        <Form.Control type="text" placeholder="Opcion" id="opcion" name="opcion" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.opcion} />
                                        {formik.touched.opcion && formik.errors.opcion ? <div className="text-danger">{formik.errors.opcion}</div> : null}
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={6} md={6}>
                                    {/* Id proc Menu */}
                                    <FloatingLabel label="Id proc Menu" className="mb-3">
                                        <Form.Control type="text" placeholder="id_procMenu" id="idProcMenu" name="idProcMenu" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.id_procMenu} />
                                        {formik.touched.id_procMenu && formik.errors.id_procMenu ? <div className="text-danger">{formik.errors.id_procMenu}</div> : null}
                                    </FloatingLabel>
                                </Col>
                                <Col xs={12} sm={6} md={6}>
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
            <>
                <Modal size="lg" show={showHijos} onHide={handleCloseHijos} backdrop="static" keyboard={false} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Submenú</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseHijos}>Cerrar</Button>
                    </Modal.Footer>
                </Modal>
            </>
    </Page>
  )
}

export default RolMenu