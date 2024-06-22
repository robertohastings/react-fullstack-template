import React, { useEffect } from "react"
import { Dropdown } from "react-bootstrap"
import axios from "axios"
import Page from "./Page"

function Products(props) {
    const { titulo, contenido } = props.landing

    useEffect(() => {
        try {
            axios
                .get("/api/catalagos/obtener-categorias")
                .then(response => {
                    console.log("categorias: ", response.data)
                })
                .catch(error => {
                    console.log("There was an error fetching the data", error)
                })
        } catch (error) {
            console.log("There was an error fetching the data", error)
        }
    }, [])

    return (
        <Page title={titulo}>
            <h1>{titulo}</h1>

            <div dangerouslySetInnerHTML={{ __html: contenido }}></div>

            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Page>
    )
}

export default Products
