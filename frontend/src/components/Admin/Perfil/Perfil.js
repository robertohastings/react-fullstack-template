import React from "react"
import Page from "../../Page"
import DatosPersonales from "./DatosPersonales"
import Direcciones from "./Direcciones"
import { Tab, Tabs, Form, Button, Spinner } from "react-bootstrap"

function Perfil() {
    return (
        <Page title="Mi Perfil">
            <Tabs defaultActiveKey="Perfil" id="perfil_tab" className="mb-3" justify>
                <Tab eventKey="Perfil" title="Mi Perfil">
                    <DatosPersonales />
                </Tab>
                <Tab eventKey="Domicilios" title="Domicilios">
                    <Direcciones />
                </Tab>
                <Tab eventKey="CambioPassword" title="Cambio Contraseña">
                    <h4 className="pt-4">Cambiar Contraseña</h4>
                    <hr />
                </Tab>
            </Tabs>
        </Page>
    )
}

export default Perfil
