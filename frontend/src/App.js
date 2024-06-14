// frontend/src/App.js
import React, { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import axios from "axios"

//My Components
import Header from "./components/Header"
import Footer from "./components/Footer"
import Page from "./components/Page"

function App() {
    const [data, setData] = useState("")

    useEffect(() => {
        axios
            .get("/api")
            .then(response => {
                setData(response.data)
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error)
            })
    }, [])

    return (
        // <div className="App">
        //     <header className="App-header">
        //         <p>{data}</p>
        //     </header>
        // </div>

        <BrowserRouter>
            <Header />
            <Page title="Home Page" />
            <Footer />
        </BrowserRouter>
    )
}

export default App
