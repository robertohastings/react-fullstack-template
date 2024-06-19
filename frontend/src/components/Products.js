import React from "react"
import Page from "./Page"

function Products(props) {
    const {titulo, contenido} = props.landing
    return (
        <Page title={titulo}>
            <h1>{titulo}</h1>
            <div>
            <div dangerouslySetInnerHTML={{__html: contenido}}></div>
                {/* {contenido} */}
            </div>
        </Page>
    )
}

export default Products
