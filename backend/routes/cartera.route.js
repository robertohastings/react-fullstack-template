import { Router } from "express";
import { authenticateToken } from "../middlewares/authenticateToken.js"
import { getClientesListing, postCliente } from "../controllers/cartera.controller.js"

const router = Router();

router.get("/cartera/getclientesListing", authenticateToken, getClientesListing);
router.post("/cartera/postCliente", authenticateToken, postCliente);

export default router;
