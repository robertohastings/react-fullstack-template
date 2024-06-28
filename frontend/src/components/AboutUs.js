import React, { useContext } from "react"
import HtmlReactParser from "html-react-parser"
import StateContext from "../StateContext"

import Page from "./Page"

const AboutUs = () => {
    const appState = useContext(StateContext)
    const { titulo, contenido } = appState.landinPage.aboutUs
    console.log("appState:", appState.landinPage.aboutUs)

    return (
        <Page title={titulo}>
            <h1>{titulo}</h1>

            {/* <div>
                <div dangerouslySetInnerHTML={{ __html: contenido }}></div>
            </div> */}

            <div>{HtmlReactParser(contenido)}</div>
        </Page>
    )
}

export default AboutUs
