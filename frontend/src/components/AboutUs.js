import React from "react"
import HtmlReactParser from "html-react-parser"
import Page from "./Page"

const AboutUs = props => {
    const { titulo, contenido } = props.landing
    console.log(contenido)

    return (
        <Page title="About us">
            {/* <h1>{titulo}</h1> */}
            {/* <div>
                <div dangerouslySetInnerHTML={{ __html: contenido }}></div>
            </div> */}

            <div>{HtmlReactParser(contenido)}</div>
        </Page>
    )
}

export default AboutUs
