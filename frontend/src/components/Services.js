import React, { useContext } from "react"
import HtmlReactParser from "html-react-parser"
import StateContext from "../StateContext"
import Page from "./Page"

function Services() {
    const appState = useContext(StateContext)
    //const { titulo, contenido } = appState.landinPage.services
    //console.log("appstate", appState.landingPage)

    return (
        <Page title='Servicios'>
            <h1>Servicios</h1>
            {/* <div dangerouslySetInnerHTML={{__html: contenido}}></div> */}
            <div>{HtmlReactParser(appState.landingPage.servicios)}</div>
        </Page>
    )
}

export default Services
