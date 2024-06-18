import React from "react"
import { FloatingLabel, Form } from "react-bootstrap"

import Page from "./Page"

function ContactUs() {
    return (
        <Page title="Contáctanos">
            <div className="jus m-5 p-5 border rounded-3" style={{ width: "70%" }}>
                <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                    <Form.Control type="email" placeholder="name@example.com" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control type="password" placeholder="Password" />
                </FloatingLabel>
            </div>
        </Page>
    )
}

export default ContactUs
