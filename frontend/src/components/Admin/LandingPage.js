import React, { useState, useRef, useContext, useEffect } from "react"
import { Tab, Tabs, Form, Button } from "react-bootstrap"
import JoditEditor from "jodit-react"
import { IoSaveOutline } from "react-icons/io5"
import Page from "../Page"
import StateContext from "../../StateContext"

function LandingPage() {
    const appState = useContext(StateContext)

    const editorAboutUs = useRef(null)
    const editorProducts = useRef(null)
    const editorServices = useRef(null)

    const [aboutUs, setAboutUs] = useState(appState.landinPage.aboutUs.contenido)
    const [products, setProducts] = useState(appState.landinPage.products.contenido)
    const [services, setServices] = useState(appState.landinPage.services.contenido)

    // useEffect(() => {
    //   setAboutUs(appState.landinPage.products.contenido)
    // }, [])

    const handledSubmit_AboutUs = e => {
        e.preventDefault()
        //TODO: MANDARLO AL SERVIDOR
        console.log(aboutUs)
    }
    const handledSubmitProducts = e => {
        e.preventDefault()
        //TODO: MANDARLO AL SERVIDOR
        console.log(aboutUs)
    }

    return (
        <Page title="Landig Page">
            <Tabs defaultActiveKey="profile" id="justify-tab-example" className="mb-3" justify>
                <Tab eventKey="landing-page" title="Landing Page">
                    <h4 className="pt-4">Activar / Desactivar páginas</h4>
                    <hr />
                    <div>
                        <Form>
                            <Form.Check // prettier-ignore
                                type="switch"
                                label="About Us"
                                defaultChecked={true}
                                id="aboutUs"
                                className="pt-2"
                            />
                            <Form.Check // prettier-ignore
                                type="switch"
                                label="Contat Us"
                                defaultChecked={true}
                                id="contactUs"
                                className="pt-2"
                            />
                            <Form.Check // prettier-ignore
                                type="switch"
                                label="Products"
                                defaultChecked={true}
                                id="products"
                                className="pt-2"
                            />
                            <Form.Check // prettier-ignore
                                type="switch"
                                label="Services"
                                defaultChecked={true}
                                id="services"
                                className="pt-2 pb-3"
                            />
                            <Button type="submit" className="mt-3 d-flex align-items-center gap-1">
                                <IoSaveOutline />
                                <span>Guardar</span>
                            </Button>
                        </Form>
                    </div>
                </Tab>
                <Tab eventKey="profile" title="About Us">
                    <h4 className="pt-2 pb-3">About Us</h4>

                    <Form onSubmit={handledSubmit_AboutUs}>
                        <JoditEditor ref={editorAboutUs} value={aboutUs} onChange={newContent => setAboutUs(newContent)} />

                        <Button type="submit" className="mt-3 d-flex align-items-center gap-1">
                            <IoSaveOutline />
                            <span>Guardar</span>
                        </Button>
                    </Form>
                </Tab>

                <Tab eventKey="products-tab" title="Products">
                    <h4 className="pt-2 pb-3">Products</h4>

                    <Form onSubmit={handledSubmitProducts}>
                        <JoditEditor ref={editorProducts} value={products} onChange={newContent => setProducts(newContent)} />

                        <Button type="submit" className="mt-3 d-flex align-items-center gap-1">
                            <IoSaveOutline />
                            <span>Guardar</span>
                        </Button>
                    </Form>
                </Tab>
                <Tab eventKey="services-tab" title="Services">
                    <h4 className="pt-2 pb-3">Services</h4>

                    <Form onSubmit={handledSubmitProducts}>
                        <JoditEditor ref={editorServices} value={services} onChange={newContent => setServices(newContent)} />

                        <Button type="submit" className="mt-3 d-flex align-items-center gap-1">
                            <IoSaveOutline />
                            <span>Guardar</span>
                        </Button>
                    </Form>
                </Tab>
            </Tabs>
        </Page>
    )
}

export default LandingPage
