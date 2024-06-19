import React from "react"
import Page from "./Page"

const AboutUs = (props) => {
    //console.log("About us:", props.landing)
    const {titulo, contenido} = props.landing
    //console.log('about us:', props.landing)
    //console.log('titulo:', titulo)
    //console.log('contenido:', contenido)
    return (
        <Page title="About us">
            <h1>{titulo}</h1>
            <div>
                <p>{contenido}</p>
            </div>
        </Page>
    )
}

export default AboutUs
