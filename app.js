import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import http from 'http'
import { initSocketServer } from './utils/socketServer.js'
import bodyParser from "body-parser"
import cors from "cors"
import morgan from "morgan"
import { authRoutes } from "./routes/auth.js"

const app = express()

const server = http.createServer(app)
initSocketServer(server)

//configure Body Parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Configure static folder
app.use(express.static("uploads"))

//Configure header HTTP - CORS
app.use(cors())

//Configure morgan HTTP logger
app.use(morgan("dev"))

//Configure Routes
app.use("/api", authRoutes)

export { server }