import React from "react"
import Page from "./Page"

function Services(props) {
    const {titulo, contenido} = props.landing
    return (
        <Page title={titulo}>
            <h1>{titulo}</h1>
            <div dangerouslySetInnerHTML={{__html: contenido}}></div>
        </Page>
    )
}

export default Services
