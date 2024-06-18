import React from "react"
import { FloatingLabel, Form, Button} from "react-bootstrap"
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';

import Page from "./Page"

const validationSchema = Yup.object({
    nombre: Yup.string().required('El nombre es requerido'),
    email: Yup.string().required('El email es requerido').email('Email no valido'),
    telefono: Yup.string().required('El teléfono es requerido').min(10, 'La longitud del teléfono debe ser mínimo 10 números'),
    comentarios: Yup.string().required('Los comentarios son requeridos')
})

function ContactUs() {

    const formik = useFormik({
        //Lo que necesita el formulario
        initialValues: {
            nombre: '',
            email: '',
            telefono: '',
            comentarios: ''
        },
        //La validación que hacemos con YUP
        validationSchema: validationSchema,
        //Lo que pasa cuando se envia el formulario
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2))
            console.log('values:', values)
        }
    })

    return (
        <Page title="Contáctanos" >

            <h1>Contactanos</h1>
            <p className="mt-3">¡Queremos saber de ti!. Favor de llenar el siguiente formulario y en breve lo contactaremos</p>

            <div className="border rounded-3 mt-4">

                <div className="p-4">

                    <Form onSubmit={formik.handleSubmit}>

                        <FloatingLabel controlId="floatingName" label="Nombre" className="mb-3">                
                            <Form.Control 
                                type="text" placeholder="Nombre"
                                id="nombre"
                                name="nombre"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.nombre}
                            />
                            {formik.touched.nombre && formik.errors.nombre ? (
                                <div className="text-danger">{formik.errors.nombre}</div>
                            ): null}
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3">
                            <Form.Control 
                                type="email" placeholder="name@example.com" 
                                id="email"
                                name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}                            
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-danger">{formik.errors.email}</div>
                            ): null}
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingPassword" label="Teléfono" className="mb-3">
                            <Form.Control 
                                type="number" placeholder="Telefono" 
                                id="telefono"
                                name="telefono"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.telefono}                             
                            />
                            {formik.touched.telefono && formik.errors.telefono ? (
                                <div className="text-danger">{formik.errors.telefono}</div>
                            ): null}                            
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingComentarios" label="Comentarios">
                            <Form.Control as="textarea" placeholder="Comentarios" style={{height: '150px'}}
                                id="comentarios"
                                name="comentarios"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.comentarios}                              
                            />
                            {formik.touched.comentarios && formik.errors.comentarios ? (
                                <div className="text-danger">{formik.errors.comentarios}</div>
                            ): null}                                                        
                        </FloatingLabel>

                        <div className="text-end mt-3">
                            <Button type="submit" className="btn btn-warning px-5">
                                Enviar
                            </Button>
                        </div>

                    </Form>

                </div>

            </div>

        </Page>
    )
}

export default ContactUs
