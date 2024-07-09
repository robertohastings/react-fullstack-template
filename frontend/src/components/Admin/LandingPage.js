import React, { useState, useRef, useContext, useEffect } from "react"
import { Tab, Tabs, Form, Button, Spinner } from "react-bootstrap"
import JoditEditor from "jodit-react"
import { IoSaveOutline } from "react-icons/io5"
import Page from "../Page"
import StateContext from "../../StateContext"
import Axios from "axios"

function LandingPage() {
    const appState = useContext(StateContext)

    const editorAboutUs = useRef(null)
    const editorProducts = useRef(null)
    const editorServices = useRef(null)

    const [aboutUs, setAboutUs] = useState(appState.landingPage.quienesSomos)
    const [products, setProducts] = useState(appState.landingPage.productos)
    const [services, setServices] = useState(appState.landingPage.servicios)
    const [settings, setSettings] = useState({
        mostrar_quienes_somos: false,
        mostrar_contactanos: false,
        mostrar_productos: false,
        mostrar_servicios: false
    })

    const [isSaving, setIsSaving] = useState(false)

    console.log("aboutus:", appState.landingPage.quienesSomos)

    // useEffect(() => {
    //   setAboutUs(appState.landinPage.products.contenido)
    // }, [])

    const handledSubmit_AboutUs = async e => {
        e.preventDefault()

        setIsSaving(true)

        const landingPage = {
            id_empresa: 1,
            id_landingPage: 1,
            quienes_somos: aboutUs
        }

        try {
            await Axios.put("/api/putLandingPage_QuienesSomos", landingPage)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log("There was an error updating about us: ", error)
                })
        } catch (error) {
            console.log("error:", error)
        } finally {
            setIsSaving(false)
        }
    }

    const handledSubmitProducts = async e => {
        e.preventDefault()
        setIsSaving(true)

        const landingPage = {
            id_empresa: 1,
            id_landingPage: 1,
            productos: products
        }

        try {
            await Axios.put("/api/putLandingPage_Productos", landingPage)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log("There was an error updating about us: ", error)
                })
        } catch (error) {
            console.log("error:", error)
        } finally {
            setIsSaving(false)
        }
    }

    const handledSubmitServicios = async e => {
        e.preventDefault()
        setIsSaving(true)

        const landingPage = {
            id_empresa: 1,
            id_landingPage: 1,
            servicios: services
        }

        try {
            await Axios.put("/api/putLandingPage_Servicios", landingPage)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log("There was an error updating about us: ", error)
                })
        } catch (error) {
            console.log("error:", error)
        } finally {
            setIsSaving(false)
        }
    }

    const activa_desactiva_handled = async e => {
        e.preventDefault()
        // setServices(true)
        // const { name, value } = e.target
        // setSettings({ ...settings, [name]: value })
        // console.log("settings:", settings)
        console.log(e.target.mostrar_quienes_somos)
    }

    return (
        <Page title="Landig Page">
            <Tabs defaultActiveKey="profile" id="justify-tab-example" className="mb-3" justify>
                <Tab eventKey="landing-page" title="Landing Page">
                    <h4 className="pt-4">Activar / Desactivar páginas</h4>
                    <hr />
                    <div>
                        <Form onSubmit={activa_desactiva_handled}>
                            <Form.Check // prettier-ignore
                                type="switch"
                                label="¿Quienes somos?"
                                defaultChecked={true}
                                id="aboutUs"
                                className="pt-2"
                                name="mostrar_quienes_somos"
                            />
                            <Form.Check // prettier-ignore
                                type="switch"
                                label="Contáctanos"
                                defaultChecked={true}
                                id="contactUs"
                                className="pt-2"
                                name="mostrar_contactanos"
                            />
                            <Form.Check // prettier-ignore
                                type="switch"
                                label="Productoss"
                                defaultChecked={true}
                                id="products"
                                className="pt-2"
                                name="mostrar_productos"
                            />
                            <Form.Check // prettier-ignore
                                type="switch"
                                label="Servicios"
                                defaultChecked={true}
                                id="services"
                                className="pt-2 pb-3"
                                name="mostrar_servicios"
                            />
                            <Button type="submit" className="mt-3 d-flex align-items-center gap-1">
                                <IoSaveOutline />
                                <span>Guardar</span>
                            </Button>
                        </Form>
                    </div>
                </Tab>
                <Tab eventKey="profile" title="¿Quienes somos?">
                    <h4 className="pt-2 pb-3">¿Quienes somos?</h4>

                    <Form onSubmit={handledSubmit_AboutUs}>
                        <JoditEditor tabIndex={1} ref={editorAboutUs} value={aboutUs} onChange={newContent => setAboutUs(newContent)} />

                        <Button type="submit" className="mt-3 d-flex align-items-center gap-1">
                            <IoSaveOutline />
                            {isSaving && <Spinner size="sm" animation="border" />}
                            {!isSaving && <span>Guardar</span>}
                        </Button>
                    </Form>
                </Tab>

                <Tab eventKey="products-tab" title="Productos">
                    <h4 className="pt-2 pb-3">Productos</h4>

                    <Form onSubmit={handledSubmitProducts}>
                        <JoditEditor tabIndex={2} ref={editorProducts} value={products} onChange={newContent => setProducts(newContent)} />

                        <Button type="submit" className="mt-3 d-flex align-items-center gap-1">
                            <IoSaveOutline />
                            {isSaving && <Spinner size="sm" animation="border" />}
                            {!isSaving && <span>Guardar</span>}
                        </Button>
                    </Form>
                </Tab>
                <Tab eventKey="services-tab" title="Servicios">
                    <h4 className="pt-2 pb-3">Servicios</h4>

                    <Form onSubmit={handledSubmitServicios}>
                        <JoditEditor tabIndex={3} ref={editorServices} value={services} onChange={newContent => setServices(newContent)} />

                        <Button type="submit" className="mt-3 d-flex align-items-center gap-1">
                            <IoSaveOutline />
                            {isSaving && <Spinner size="sm" animation="border" />}
                            {!isSaving && <span>Guardar</span>}
                        </Button>
                    </Form>
                </Tab>
            </Tabs>
        </Page>
    )
}

export default LandingPage
