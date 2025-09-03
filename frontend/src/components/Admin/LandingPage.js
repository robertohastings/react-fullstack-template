import React, { useState, useRef, useContext, useEffect } from "react"
import { Tab, Tabs, Form, Button, Spinner } from "react-bootstrap"
import JoditEditor from "jodit-react"
import { IoSaveOutline } from "react-icons/io5"
import Page from "../Page"
import PuntosDeEntrega from "./PuntosDeEntrega"
import FormasDePago from "./FormasDePago"
import ColoniasDelivery from "./ColoniasDelivery"
import Cajeros from "./Cajeros"
import Usuarios from './Usuarios'
import Galeria from "./Galeria"
import StateContext from "../../StateContext"
import DispatchContext from "../../DispatchContext"
import { useEmpresaID, useHostname, useLandingPageID } from "../../tools/StateUtils"
import { gettingLandingPageAdmin, updateLanding, updateLandingPage_QuienesSomos, updateLandingPage_Products,
    updateLandingPage_Servicios
 } from "../services/Landing.service"

function LandingPage() {
    const id_empresa = useEmpresaID()
    const hostname = useHostname()
    const id_landingPage = useLandingPageID()
    const appState = useContext(StateContext)
    const appDispatch = useContext(DispatchContext)

    const editorAboutUs = useRef(null)
    const editorProducts = useRef(null)
    const editorServices = useRef(null)
    const editorInicio = useRef(null)
    const editorDescripcion = useRef(null)

    const [aboutUs, setAboutUs] = useState()
    const [products, setProducts] = useState(appState.landingPage.productos)
    const [services, setServices] = useState(appState.landingPage.servicios)
    const [inicioTitulo, setInicioTitulo] = useState(appState.landingPage.inicioTitulo)
    const [inicioDescripcion, setInicioDescripcion] = useState(appState.landingPage.inicioDescripcion)
    const [quienesSomosChecked, setQuienesSomosChecked] = useState(false)
    const [contactanosChecked, setContactanosChecked] = useState(false)
    const [productosChecked, setproductosChecked] = useState(false)
    const [productosVerMasChecked, setproductosVerMasChecked] = useState(false)
    const [serviciosChecked, setServiciosChecked] = useState(false)
    const [sitioEnMttoChecked, setSitioEnMttoChecked] = useState(false)
    const [carritoDeComprasChecked, setCarritoDeComprasChecked] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    console.log("hostname:", hostname)
    console.log("id_LandingPage:", id_landingPage)

    useEffect(() => {
        fetchData();
    }, [])
    
    const fetchData = async () => {
        const response = await gettingLandingPageAdmin(hostname);
        if (response.success) {
            console.log("Landing page data:", response);
            console.log("quienes somos:", response.landingPage.settings.mostrar_quienes_somos);
            //appDispatch({ type: "landingPage", data: response.landingPage });
            setAboutUs(response.landingPage.quienesSomos);
            setProducts(response.landingPage.productos);
            setServices(response.landingPage.servicios);
            setInicioTitulo(response.landingPage.inicio_titulo);
            setInicioDescripcion(response.landingPage.inicio_descripcion);
            setQuienesSomosChecked(response.landingPage.settings.mostrar_quienes_somos === 1 ? true : false);
            setContactanosChecked(response.landingPage.settings.mostrar_contactanos === 1 ? true : false);
            setproductosChecked(response.landingPage.settings.mostrar_productos === 1 ? true : false);
            setproductosVerMasChecked(response.landingPage.settings.mostrar_productos_verMas === 1 ? true : false);
            setServiciosChecked(response.landingPage.settings.mostrar_servicios === 1 ? true : false);
            setSitioEnMttoChecked(response.landingPage.settings.mostrar_sitioEnMantenimiento === 1 ? true : false);
            setCarritoDeComprasChecked(response.landingPage.settings.mostrar_carritoDeCompras === 1 ? true : false);
        }
    };
    
    
    const handledSubmit_AboutUs = async e => {
        e.preventDefault()

        setIsSaving(true)

        const landingPage = {
            id_empresa,
            id_landingPage,
            quienes_somos: aboutUs,
            inicio_titulo: inicioTitulo,
            inicio_descripcion: inicioDescripcion
        }

        try {
            const response = await updateLandingPage_QuienesSomos(landingPage)
            if (response.success) {
                console.log('Se actualizó correctamente')
            } else {
                console.log('No se puedo actualizar la información correctamente')
            }
            //console.log('response quienes somos', response)
            
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
            id_empresa,
            id_landingPage,
            productos: products
        }

        try {
            const response = await updateLandingPage_Products(landingPage)
            if (response.success) {
                console.log('Se actualizó correctamente')
            } else {
                console.log('No se puedo actualizar la información correctamente')
            }
            console.log('response productos', response)

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
            id_empresa,
            id_landingPage,
            servicios: services
        }

        try {
            const response = await updateLandingPage_Servicios(landingPage)
            if (response.success) {
                console.log('Se actualizó correctamente')
            } else {
                console.log('No se puedo actualizar la información correctamente')
            }
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
            mostrar_productos_verMas: productosVerMasChecked === true ? 1 : 0,
            mostrar_servicios: serviciosChecked === true ? 1 : 0,
            mostrar_contactanos: contactanosChecked === true ? 1 : 0,
            mostrar_sitioEnMantenimiento: sitioEnMttoChecked === true ? 1 : 0,
            mostrar_carritoDeCompras: carritoDeComprasChecked === true ? 1 : 0
        }

        appDispatch({
            type: "landingPageSettings",
            data: {
                mostrar_quienes_somos: quienesSomosChecked === true ? 1 : 0,
                mostrar_productos: productosChecked === true ? 1 : 0,
                mostrar_productos_verMas: productosVerMasChecked === true ? 1 : 0,
                mostrar_servicios: serviciosChecked === true ? 1 : 0,
                mostrar_contactanos: contactanosChecked === true ? 1 : 0,
                mostrar_sitioEnMantenimiento: sitioEnMttoChecked === true ? 1 : 0,
                mostrar_carritoDeCompras: carritoDeComprasChecked === true ? 1 : 0
            }
        })

        try {
            await updateLanding(landingPage)

            // await Axios.put("/api/putLandingPage_Settings", landingPage)
            //     .then(response => {
            //         console.log(response)
            //     })
            //     .catch(error => {
            //         console.log("There was an error updating about us: ", error)
            //     })
        } catch (error) {
            console.log("error:", error)
        } finally {
            setIsSaving(false)
        }

        setIsSaving(false)
    }

    return (
        <Page title="Landig Page">
            <Tabs defaultActiveKey="settings" id="justify-tab-example" className="mb-3" justify variant="tabs">
                <Tab eventKey="settings" title="Landing Page">
                    <h4 className="pt-4">Activar / Desactivar páginas</h4>
                    <hr />
                    <div>
                        <Form onSubmit={activa_desactiva_handled}>
                            <Form.Check // prettier-ignore
                                type="switch"
                                label="¿Quienes somos?"
                                //defaultChecked={quienesSomosChecked}
                                id="aboutUs"
                                className="pt-2"
                                //value={quienesSomosChecked}
                                checked={quienesSomosChecked}
                                onChange={e => setQuienesSomosChecked(e.target.checked)}
                            />
                            <Form.Check // prettier-ignore
                                type="switch"
                                label="Contáctanos"
                                //defaultChecked={contactanosChecked}
                                id="contactUs"
                                className="pt-2"
                                checked={contactanosChecked}
                                onChange={e => setContactanosChecked(e.target.checked)}
                            />
                            <Form.Check // prettier-ignore
                                type="switch"
                                label="Productos"
                                //defaultChecked={productosChecked}
                                id="products"
                                className="pt-2"
                                checked={productosChecked}
                                onChange={e => setproductosChecked(e.target.checked)}
                            />
                            <Form.Check // prettier-ignore
                                type="switch"
                                label="Productos ver más"
                                //defaultChecked={productosVerMasChecked}
                                id="products_vermas"
                                className="pt-2"
                                checked={productosVerMasChecked}
                                onChange={e => setproductosVerMasChecked(e.target.checked)}
                            />
                            <Form.Check // prettier-ignore
                                type="switch"
                                label="Servicios"
                                //defaultChecked={serviciosChecked}
                                id="services"
                                className="pt-2"
                                checked={serviciosChecked}
                                onChange={e => setServiciosChecked(e.target.checked)}
                            />
                            <Form.Check // prettier-ignore
                                type="switch"
                                label="Mostrar Sitio en Mantenimiento"
                                //defaultChecked={sitioEnMttoChecked}
                                id="mtto"
                                className="pt-2"
                                checked={sitioEnMttoChecked}
                                onChange={e => setSitioEnMttoChecked(e.target.checked)}
                            />
                            <Form.Check // prettier-ignore
                                type="switch"
                                label="Mostrar Carrito de compras"
                                id="carrito"
                                className="pt-2 pb-3"
                                checked={carritoDeComprasChecked}
                                onChange={e => setCarritoDeComprasChecked(e.target.checked)}
                            />
                            <Button type="submit" className="mt-3 d-flex align-items-center gap-1">
                                <IoSaveOutline />
                                {isSaving && <Spinner size="sm" animation="border" />}
                                {!isSaving && <span>Guardar</span>}
                            </Button>
                        </Form>
                    </div>
                </Tab>
                {/* Quienes somos */}
                <Tab eventKey="profile" title="¿Quienes somos?">

                    <Form onSubmit={handledSubmit_AboutUs}>
                        <h4 className="pt-2 pb-3">¿Quienes somos?</h4>
                        <JoditEditor tabIndex={1} ref={editorAboutUs} value={aboutUs} onChange={newContent => setAboutUs(newContent)} />
                        <hr />
                        <h4 className="pt-4 pb-3">Inicio - Título</h4>
                        <JoditEditor tabIndex={2} ref={editorInicio} value={inicioTitulo} onChange={newContent => setInicioTitulo(newContent)} />
                        <hr />
                        <h4 className="pt-4 pb-3">Inicio - Descripción</h4>
                        <JoditEditor tabIndex={3} ref={editorDescripcion} value={inicioDescripcion} onChange={newContent => setInicioDescripcion(newContent)} />    

                        <Button type="submit" className="mt-3 d-flex align-items-center gap-1">
                            <IoSaveOutline />
                            {isSaving && <Spinner size="sm" animation="border" />}
                            {!isSaving && <span>Guardar</span>}
                        </Button>
                    </Form>

                    <h4 className="pt-5">Carrousel</h4>
                    {/*<Galeria fuente={"quienes_somos"} />*/}
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
                <Tab eventKey="formasDePago" title="Formas de Pago">
                    <FormasDePago />
                </Tab>
                <Tab eventKey="coloniasDelivery" title="Colonias Delivery">
                    <ColoniasDelivery />
                </Tab>
                <Tab eventKey="cajeros" title="Cajeros">
                    <Cajeros />
                </Tab>
                <Tab eventKey="usuarios" title="Usuarios">
                    <Usuarios />
                </Tab>
            </Tabs>
        </Page>
    )
}

export default LandingPage
