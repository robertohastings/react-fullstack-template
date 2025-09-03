import React, { useState, useEffect, useContext } from "react"
import Axios from "axios"
import { Button, Form, FloatingLabel, Row, Col } from "react-bootstrap"
import * as Yup from "yup"
import { Formik, useFormik } from "formik"
import SpinnerButton from "../../Spinner/SpinnerButton"
import StateContext from "../../../StateContext"
import { useUsuarioID, useEmpresaID } from "../../../tools/StateUtils"
import { getUsuario, putUsuario } from "../../../models/Usuario/Usuario.model"

const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre debe ser capturado"),
    apellidos: Yup.string().required("Los apellidos deben ser capturados"),
    celular: Yup.number().required("El celular debe ser capturado"),
    fechaCumple: Yup.date().required("La fecha de cumpleaños debe ser capturada")
})

function DatosPersonales() {
    const id_empresa = useEmpresaID();
    const id_usuario = useUsuarioID();
    const [sending, setSending] = useState(false)
    const [user, setUser] = useState({})
    //onst idUser = useContext(StateContext).user.idUser
    //const api_url = process.env.REACT_APP_API_URL
    //const id_empresa = process.env.REACT_APP_APP_EMPRESA_ID
    //console.log("user:", idUser)

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const data = await getUsuario(id_empresa, id_usuario);

                if (data.success){
                    setUser(data.usuario)

                    formik.values.nombre = data.usuario.nombre
                    formik.values.apellidos = data.usuario.apellidos
                    formik.values.celular = data.usuario.celular
                    formik.values.fechaCumple = data.usuario.fecha_nacimiento                    

                }

            } catch (error) {
                console.error("There was an error fetching data!", error.message)
            }

        };
       
        fetchUsuario()
    }, [])

    // const getUsuario = async () => {
    //     try {
    //         //setIsFetching(true)
    //         await Axios.get(`${api_url}/getUsuario`, {
    //             params: {
    //                 id_empresa,
    //                 id_usuario
    //             }
    //         })
    //             .then(response => {
    //                 //console.log("user response:", response.data)
    //                 if (response.data.success === false) {
    //                     //console.log(response.data.data.message)
    //                     //seterrorMessage(response.data.data.message)
    //                 } else {
    //                     //seterrorMessage("")
    //                     //console.log("response data:", response.data.usuario)
    //                     setUser({
    //                         nombre: response.data.usuario.nombre,
    //                         apellidos: response.data.usuario.apellidos,
    //                         celular: response.data.usuario.celular,
    //                         fecha_nacimiento: response.data.usuario.fecha_nacimiento
    //                     })

    //                     //console.log("Fecha", response.data.usuario.fecha_nacimiento)

    //                     formik.values.nombre = response.data.usuario.nombre
    //                     formik.values.apellidos = response.data.usuario.apellidos
    //                     formik.values.celular = response.data.usuario.celular
    //                     formik.values.fechaCumple = response.data.usuario.fecha_nacimiento
    //                 }
    //             })
    //             .catch(error => {
    //                 console.error("There was an error fetching data!", error.message)
    //             })
    //     } catch (error) {
    //         console.error("There was an error fetching data!", error.message)
    //     } finally {
    //         //formik.values = user
    //     }
    // }

    const formik = useFormik({
        initialValues: {
            nombre: "",
            apellidos: "",
            celular: ""
        },
        validationSchema: validationSchema,
        onSubmit: async values => {
            const perfil = {
                id_empresa,
                id_usuario,
                nombre: values.nombre,
                apellidos: values.apellidos,
                celular: values.celular,
                fecha_nacimiento: values.fechaCumple
            }
            //console.log("perfil:", perfil)
            await fetch_guardarUsuario(perfil)
        }
    })

    const fetch_guardarUsuario = async perfil => {
        console.log("Perfil", perfil)
        setSending(true)
        try {
            const data = await putUsuario(perfil);

            // await Axios.put(`${api_url}/putUsuario`, perfil)
            //     .then(response => {
            //         console.log("Respuesta", response)
            //     })
            //     .catch(error => {
            //         console.log("There was an error updating usuario: ", error.message)
            //     })
        } catch (error) {
            console.log("error:", error)
        } finally {
            setSending(false)
        }
    }

    return (
        <div>
            <h4 className="pt-4">Datos personales</h4>
            <hr />

            <Form>
                <Row>
                    <Col>
                        {/* Nombre */}
                        <FloatingLabel label="Nombre" className="mb-3">
                            <Form.Control type="text" placeholder="Nombre" id="nombre" name="nombre" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.nombre} />
                            {formik.touched.nombre && formik.errors.nombre ? <div className="text-danger">{formik.errors.nombre}</div> : null}
                        </FloatingLabel>
                    </Col>
                    <Col>
                        {/* Apellidos */}
                        <FloatingLabel label="Apellidos" className="mb-3">
                            <Form.Control type="text" placeholder="apellidos" id="apellidos" name="apellidos" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.apellidos} />
                            {formik.touched.apellidos && formik.errors.apellidos ? <div className="text-danger">{formik.errors.apellidos}</div> : null}
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {/* Celular */}
                        <FloatingLabel label="Celular" className="mb-3">
                            <Form.Control type="number" placeholder="celular" id="celular" name="celular" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.celular} />
                            {formik.touched.celular && formik.errors.celular ? <div className="text-danger">{formik.errors.celular}</div> : null}
                        </FloatingLabel>
                    </Col>
                    <Col>
                        {/* Fecha Nacimiento */}
                        <FloatingLabel label="Fecha Nacimiento" className="mb-3">
                            <Form.Control type="date" placeholder="fechaCumple" id="fechaCumple" name="fechaCumple" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.fechaCumple} />
                            {formik.touched.fechaCumple && formik.errors.fechaCumple ? <div className="text-danger">{formik.errors.fechaCumple}</div> : null}
                        </FloatingLabel>
                    </Col>
                </Row>
            </Form>
            <Button type="button" variant="primary" disabled={sending} onClick={formik.handleSubmit}>
                {sending && <SpinnerButton mensaje="Guardando..." />}
                {!sending && "Guardar"}
            </Button>
        </div>
    )
}

export default DatosPersonales
