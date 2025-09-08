import React from "react"
import Page from "../../Page"
import DatosPersonales from "./DatosPersonales"
import Direcciones from "./Direcciones"
import MisPedidos from "./MisPedidos"
import { Tab, Tabs } from "react-bootstrap"
// import Header2 from "../../../LandingPages/Header2"

function Perfil() {
    return (
        <Page title="Mi Perfil">
            {/* <Header2 /> */}
            <section className="pt-4">
                <h2 className="pb-2">Información de la Cuenta</h2>

                <Tabs defaultActiveKey="MisPedidos" id="perfil_tab" className="mb-3" justify>
                    <Tab eventKey="MisPedidos" title="Mis Pedidos">
                        <MisPedidos />
                    </Tab>
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

            </section>
        </Page>
    )
}

export default Perfil
