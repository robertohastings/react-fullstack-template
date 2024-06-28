// frontend/src/App.js
import React, { useEffect, useState, useContext } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import axios from "axios"
import { useImmerReducer } from "use-immer"
import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"

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
import LandingPage from "./components/Admin/LandingPage"
import FlashMessage from "./tools/FlashMessage"

function App() {
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const initialState = {
        loggedIn: Boolean(localStorage.getItem("complexappToken")),
        flashMessages: [],
        user: {
            token: localStorage.getItem("complexappToken"),
            username: localStorage.getItem("complexappUsername"),
            avatar: localStorage.getItem("complexappAvatar")
        },
        isSearchOpen: false,
        isChatOpen: false,
        unreadReadChatCount: 0,
        landinPage: {}
    }

    function ourReducer(draft, action) {
        switch (action.type) {
            case "login":
                draft.loggedIn = true
                draft.user = action.data
                break
            case "logout":
                draft.loggedIn = false
                break
            case "landinPage":
                draft.landinPage = action.data
                break
            case "flashMessage":
                draft.flashMessages.push(action.value)
                break
            default:
            //do nothing
        }
        return
    }

    const [state, dispatch] = useImmerReducer(ourReducer, initialState)

    useEffect(() => {
        try {
            axios
                .get("/api/landingPage")
                .then(response => {
                    console.log("data:", response.data)
                    setData(response.data)
                    setIsLoading(false)
                    dispatch({ type: "landinPage", data: response.data })
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
            <StateContext.Provider value={state}>
                <DispatchContext.Provider value={dispatch}>
                    <BrowserRouter>
                        <FlashMessage messages={state.flashMessages} />
                        <Header />

                        <main>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/AboutUs" element={<AboutUs />} />
                                <Route path="/ContactUs" element={<ContactUs />} />
                                <Route path="/Products" element={<Products />} />
                                <Route path="/Services" element={<Services />} />
                                <Route path="/Admin" element={<Admin />} />
                                <Route path="/Usuarios" element={<Testing title="Usuarios" />} />
                                <Route path="/Admin/LandingPage" element={<LandingPage />} />
                            </Routes>
                        </main>

                        <Footer />
                    </BrowserRouter>
                </DispatchContext.Provider>
            </StateContext.Provider>
        </>
    )
}

export default App
