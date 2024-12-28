import express from "express";

import { createUser, updateCurrentUser, getCurrentUser } from "../controllers/user.controller";
import { jwtCheck, jwtParse } from "../middlewares/auth.middleware";
import { validateMyUserRequest } from "../middlewares/expressValidator";

const router = express.Router();

//passes /api/v1/user to controller createUser in user.controller
router.get('/', jwtCheck, jwtParse, getCurrentUser);
router.post("/", jwtCheck, createUser);
router.put("/", jwtCheck, jwtParse, validateMyUserRequest, updateCurrentUser);


export default router