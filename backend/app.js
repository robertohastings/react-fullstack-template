const express = require("express")
const app = express()
const PORT = process.env.PORT || 8080

//const PORT = 5000

app.get("/api", (req, res) => {
    res.send("Hola mundo from backend! 5")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
