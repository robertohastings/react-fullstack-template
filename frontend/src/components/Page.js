import React, { useEffect } from "react"
// import Container from "./Container"
import Container from "react-bootstrap/Container"

function Page(props) {
    useEffect(() => {
        document.title = `${props.title} | ComplexApp`
        window.scrollTo(0, 0)
    }, [props.title])
    return (
        <>
            <div className="container mt-5 pt-2">{props.children}</div>
        </>
    )
}

export default Page
