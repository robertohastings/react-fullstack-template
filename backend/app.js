const express = require("express")
const app = express()
const PORT = process.env.PORT || 8080

//const PORT = 5000

// Para parsear el cuerpo de las solicitudes como JSON que esta incluido en express
app.use(express.json())

app.use("/api", require("./router"))

app.get("/api", (req, res) => {
    res.send("Hola mundo from backend! 5")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
