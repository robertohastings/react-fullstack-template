import React, { useContext } from "react"
import HtmlReactParser from "html-react-parser"
import StateContext from "../StateContext"
import Page from "./Page"

function Services() {
    const appState = useContext(StateContext)
    const { titulo, contenido } = appState.landinPage.services
    console.log("appstate", appState)

    return (
        <Page title={titulo}>
            <h1>{titulo}</h1>
            {/* <div dangerouslySetInnerHTML={{__html: contenido}}></div> */}
            <div>{HtmlReactParser(contenido)}</div>
        </Page>
    )
}

export default Services
