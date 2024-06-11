// frontend/src/App.js
import React, { useEffect, useState } from "react"
import axios from "axios"

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
        <div className="App">
            <header className="App-header">
                <h3>Testing!!!</h3>
                <p>{data}</p>
            </header>
        </div>
    )
}

export default App
