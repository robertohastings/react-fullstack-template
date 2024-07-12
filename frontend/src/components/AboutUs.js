import React, { useContext } from "react"
import HtmlReactParser from "html-react-parser"
import StateContext from "../StateContext"

import Page from "./Page"

const AboutUs = () => {
    const appState = useContext(StateContext)
    //const { titulo, contenido } = appState.landinPage.quienesSomos
    //console.log("appState:", appState.landinPage.aboutUs)

    return (
        <Page title="Quienes somos">
            <h1>Quienes somos</h1>


            <div>{HtmlReactParser(appState.landingPage.quienesSomos)}</div>
        </Page>
    )
}

export default AboutUs
