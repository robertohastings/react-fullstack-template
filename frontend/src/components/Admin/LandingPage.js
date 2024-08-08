import React, { useState, useRef, useContext, useEffect } from "react"
import { Tab, Tabs, Form, Button, Spinner } from "react-bootstrap"
import JoditEditor from "jodit-react"
import { IoSaveOutline } from "react-icons/io5"
import Page from "../Page"
import PuntosDeEntrega from "./PuntosDeEntrega"
import StateContext from "../../StateContext"
import DispatchContext from "../../DispatchContext"
import Axios from "axios"

function LandingPage() {
    const appState = useContext(StateContext)
    const appDispatch = useContext(DispatchContext)

    const editorAboutUs = useRef(null)
    const editorProducts = useRef(null)
    const editorServices = useRef(null)

    const [aboutUs, setAboutUs] = useState(appState.landingPage.quienesSomos)
    const [products, setProducts] = useState(appState.landingPage.productos)
    const [services, setServices] = useState(appState.landingPage.servicios)
    // const [settings, setSettings] = useState({
    //     mostrar_quienes_somos: false,
    //     mostrar_contactanos: false,
    //     mostrar_productos: false,
    //     mostrar_servicios: false
    // })
    const [quienesSomosChecked, setQuienesSomosChecked] = useState(appState.landingPage.settings.mostrar_quienes_somos === 1 ? true : false)
    const [contactanosChecked, setContactanosChecked] = useState(appState.landingPage.settings.mostrar_contactanos === 1 ? true : false)
    const [productosChecked, setproductosChecked] = useState(appState.landingPage.settings.mostrar_productos === 1 ? true : false)
    const [serviciosChecked, setServiciosChecked] = useState(appState.landingPage.settings.mostrar_servicios === 1 ? true : false)
    const [sitioEnMttoChecked, setSitioEnMttoChecked] = useState(appState.landingPage.settings.mostrar_sitioEnMantenimiento === 1 ? true : false)
    //const [ settingsChecked, setSettingsChecked ] = useState(false)

    const [isSaving, setIsSaving] = useState(false)

    //console.log("aboutus:", appState.landingPage.quienesSomos)

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
        setIsSaving(true)

        const landingPage = {
            id_empresa: 1,
            id_landingPage: 1,
            mostrar_quienes_somos: quienesSomosChecked === true ? 1 : 0,
            mostrar_productos: productosChecked === true ? 1 : 0,
            mostrar_servicios: serviciosChecked === true ? 1 : 0,
            mostrar_contactanos: contactanosChecked === true ? 1 : 0,
            mostrar_sitioEnMantenimiento: sitioEnMttoChecked === true ? 1 : 0
        }

        appDispatch({
            type: "landingPageSettings",
            data: {
                mostrar_quienes_somos: quienesSomosChecked === true ? 1 : 0,
                mostrar_productos: productosChecked === true ? 1 : 0,
                mostrar_servicios: serviciosChecked === true ? 1 : 0,
                mostrar_contactanos: contactanosChecked === true ? 1 : 0,
                mostrar_sitioEnMantenimiento: sitioEnMttoChecked === true ? 1 : 0
            }
        })

        try {
            await Axios.put("/api/putLandingPage_Settings", landingPage)
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

        setIsSaving(false)
    }

    return (
        <Page title="Landig Page">
            <Tabs defaultActiveKey="settings" id="justify-tab-example" className="mb-3" justify>
                <Tab eventKey="settings" title="Landing Page">
                    <h4 className="pt-4">Activar / Desactivar páginas</h4>
                    <hr />
                    <div>
                        <Form onSubmit={activa_desactiva_handled}>
                            <Form.Check // prettier-ignore
                                type="switch"
                                label="¿Quienes somos?"
                                defaultChecked={quienesSomosChecked}
                                id="aboutUs"
                                className="pt-2"
                                onChange={e => setQuienesSomosChecked(e.target.checked)}
                            />
                            <Form.Check // prettier-ignore
                                type="switch"
                                label="Contáctanos"
                                defaultChecked={contactanosChecked}
                                id="contactUs"
                                className="pt-2"
                                onChange={e => setContactanosChecked(e.target.checked)}
                            />
                            <Form.Check // prettier-ignore
                                type="switch"
                                label="Productos"
                                defaultChecked={productosChecked}
                                id="products"
                                className="pt-2"
                                onChange={e => setproductosChecked(e.target.checked)}
                            />
                            <Form.Check // prettier-ignore
                                type="switch"
                                label="Servicios"
                                defaultChecked={serviciosChecked}
                                id="services"
                                className="pt-2"
                                onChange={e => setServiciosChecked(e.target.checked)}
                            />
                            <Form.Check // prettier-ignore
                                type="switch"
                                label="Mostrar Sitio en Mantenimiento"
                                defaultChecked={sitioEnMttoChecked}
                                id="mtto"
                                className="pt-2 pb-3"
                                onChange={e => setSitioEnMttoChecked(e.target.checked)}
                            />
                            <Button type="submit" className="mt-3 d-flex align-items-center gap-1">
                                <IoSaveOutline />
                                {isSaving && <Spinner size="sm" animation="border" />}
                                {!isSaving && <span>Guardar</span>}
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

                <Tab eventKey="products" title="Productos">
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
                <Tab eventKey="services" title="Servicios">
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
                <Tab eventKey="puntosDeAcceso" title="Puntos de Entrega">
                    <PuntosDeEntrega />
                </Tab>
            </Tabs>
        </Page>
    )
}

export default LandingPage
