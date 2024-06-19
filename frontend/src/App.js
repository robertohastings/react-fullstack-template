// frontend/src/App.js
import React, { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import axios from "axios"

//My Components
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./components/Home"
import AboutUs from "./components/AboutUs"
import ContactUs from "./components/ContactUs"
import Products from "./components/Products"
import Services from "./components/Services"

function App() {
    const [data, setData] = useState("")

    useEffect(() => {
        axios
            .get("/api/landingPage")
            .then(response => {
                console.log('data:', response.data)
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

        <>
            <BrowserRouter>
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/AboutUs" element={<AboutUs landing={data.aboutUs} />} />
                        <Route path="/ContactUs" element={<ContactUs />} />
                        <Route path="/Products" element={<Products landing={data.products} />} />
                        <Route path="/Services" element={<Services landing={data.services} />} />
                    </Routes>
                </main>

                <Footer />
            </BrowserRouter>
        </>
    )
}

export default App
