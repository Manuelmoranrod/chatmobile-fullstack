import express from "express"

import { AuthController } from "../controllers/index.js"

const api = express.Router();

api.post("/auth/register", AuthController.register)

export const authRoutes = api 