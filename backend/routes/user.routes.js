import { Router } from "express";
import { getUsuarioLogin } from "../controllers/user.controller.js";

const router = Router()

router.get('/usersLogin', getUsuarioLogin)

export default router