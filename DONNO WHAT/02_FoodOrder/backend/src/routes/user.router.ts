import express from "express";

import { createUser } from "../controllers/user.controller";
import { jwtCheck } from "../middlewares/auth.middleware";

const router = express.Router();

//passes /api/v1/user to controller createUser in user.controller
router.post("/", jwtCheck, createUser)

export default router