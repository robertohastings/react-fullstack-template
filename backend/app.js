const express = require("express")
const app = express()
const PORT = process.env.PORT || 8080

//const PORT = 5000

app.get("/api/landingPage", (req, res) => {
    const data = {
        aboutUs: {
            titulo: "About Us",
            activo: true,
            contenido: "p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas aliquam nemo laboriosam consectetur ut voluptatem ad, saepe tenetur porro repudiandae recusandae exercitationem eveniet quia mollitia dolorem. Quidem delectus voluptatibus fuga?</p><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem adipisci maiores ab sequi unde explicabo ratione excepturi harum obcaecati modi. Sint, minus quo? Ut quibusdam excepturi, officiis odio non libero.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem adipisci maiores ab sequi unde explicabo ratione excepturi harum obcaecati modi. Sint, minus quo? Ut quibusdam excepturi, officiis odio non libero.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem adipisci maiores ab sequi unde explicabo ratione excepturi harum obcaecati modi. Sint, minus quo? Ut quibusdam excepturi, officiis odio non libero.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem adipisci maiores ab sequi unde explicabo ratione excepturi harum obcaecati modi. Sint, minus quo? Ut quibusdam excepturi, officiis odio non libero.</p>"
        }
    }
    res.send(data)
})

app.get("/api", (req, res) => {
    res.send("Hola mundo from backend! 5")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
