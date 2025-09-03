import React, { useEffect } from "react"
// import Container from "./Container"
//import Container from "react-bootstrap/Container"

function Page(props) {
    useEffect(() => {
        document.title = `${props.title} | ComplexApp`
        window.scrollTo(0, 0)
    }, [props.title])

    //const containerClass = props.fluid ? "container-fluid mt-5" : "container mt-5 pt-2"
    const marginTop = props.mt || 5; // Use the provided mt prop or default to 5
    const containerClass = props.fluid ? `container-fluid mt-${marginTop}` : `container mt-${marginTop} pt-2`;
    return (
        <>
            <div className={containerClass}>{props.children}</div>
        </>
    )
}

export default Page
