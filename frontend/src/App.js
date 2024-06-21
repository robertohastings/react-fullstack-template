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
import SpinnerDot from "./components/Spinner/SpinnerDot"
import Admin from "./components/Admin"
import Testing from "./components/Testing"

function App() {
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        try {
            axios
                .get("/api/landingPage")
                .then(response => {
                    console.log("data:", response.data)
                    setData(response.data)
                    setIsLoading(false)
                })
                .catch(error => {
                    console.error("There was an error fetching the data!", error)
                    setIsLoading(true)
                })
        } catch (error) {
            console.error("There was an error fetching the data!", error)
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }, [])

    if (isLoading) {
        console.log("Cargando info...")
        return (
            <div>
                <SpinnerDot />
            </div>
        )
    }

    return (
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
                        <Route path="/Admin" element={<Admin />} />
                        <Route path="/Usuarios" element={<Testing title="Usuarios" />} />
                    </Routes>
                </main>

                <Footer />
            </BrowserRouter>
        </>
    )
}

export default App
