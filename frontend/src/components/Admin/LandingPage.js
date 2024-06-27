import React, { useState, useMemo, useRef } from "react"
import { Tab, Tabs, Form, InputGroup, Button } from "react-bootstrap"
import JoditEditor from "jodit-react"
import Page from "../Page"

function LandingPage() {
    const editor = useRef(null)
    const [aboutUs, setAboutUs] = useState("")

    const handledSubmit = e => {
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
                            <Button className="pt-2">Guardar</Button>
                        </Form>
                    </div>
                </Tab>
                <Tab eventKey="profile" title="About Us">
                    <h4 className="pt-4 pb-3">About Us</h4>
                    <hr />
                    <div>
                        <Form onSubmit={handledSubmit}>
                            <JoditEditor ref={editor} value={aboutUs} onChange={newContent => setAboutUs(newContent)} />

                            <Button type="submit" className="mt-3">
                                Guardar
                            </Button>
                        </Form>
                    </div>
                </Tab>
                <Tab eventKey="longer-tab" title="Products">
                    Tab content for Loooonger Tab
                </Tab>
                <Tab eventKey="contact" title="Services" disabled>
                    Tab content for Contact
                </Tab>
            </Tabs>
        </Page>
    )
}

export default LandingPage
