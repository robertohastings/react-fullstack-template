import React from "react"
import { Spinner } from "react-bootstrap"
function SpinnerButton(props) {
    console.log("contactus:", props)
    return (
        <>
            <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
            <span> {props.mensaje}</span>
        </>
    )
}

export default SpinnerButton
