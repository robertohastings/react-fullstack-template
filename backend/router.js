const express = require("express")
const apiRouter = express.Router()

const holaMundoController = require("./controllers/holaMundaController")
const landingController = require("./controllers/landingController")
const emailSendController = require("./controllers/emailSendController")

const cors = require("cors")

apiRouter.use(cors())

apiRouter.get("/router", (req, res) => res.json("Hello, if you see this message that means that backend routing is up and running successfully"))
apiRouter.get("/holamundo", holaMundoController.apiHolaMundo)
apiRouter.get("/landingPage", landingController.apiLanding)
apiRouter.post("/send-email-by-gmail", emailSendController.apiSendEmailByGmal)

module.exports = apiRouter
