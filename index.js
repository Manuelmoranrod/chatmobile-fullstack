import * as dotenv from 'dotenv'
dotenv.config()
import { server } from "./app.js"
import { mongoose } from "mongoose"
import { io } from "./utils/index.js"


const mongoUrl = process.env.MONGO_URI

mongoose.connect(mongoUrl)

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    server.listen(process.env.PORT, () => {
        console.log("HOLAAAA")
        console.log("API")
        console.log("SOCKETTT")
        console.log(`http://${process.env.IP_SERVER}:${process.env.PORT}/api`)
        
        io.sockets.on("conection", (socket) => {
            console.log("nuevo usuario")
            
            socket.on("disconnects", () => {
                console.log("usuario desconectado")
            })
            
            socket.on("subscribe", (room) => {
                socket.join(room)
            })
            
            socket.on("unsubscribe", (room) => {
                socket.leave(room)
            })
        })
        
    })
});