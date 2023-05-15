import bcrypt from "bcryptjs"
import { User } from "../models/index.js"
import { jwt } from "../utils/jwt.js"

function register(req, res) {
    const { email, password } = req.body

    const user = new User({
        email: email.toLowerCase(),
    })

    const salt = bcrypt.genSaltSync(10);
    const hastPass = bcrypt.hashSync(password, salt)
    user.password = hastPass

    user.save().then(() => {
        res.status(200).send(user)
    }).catch((err) => {
        console.log(err)
        res.status(404).send({msg: "HA IDO MAL"})
    })
}

function login(req,res){
    const { email, password}  = req.body;
    const emailLower = email.toLowerCase();

    User.findOne({email: emailLower}).then((user) => {
        
        bcrypt.compare(password, user.password, (bycrptError, data) => {
            if(bycrptError) {
                return res.status(500).send({msg: "error server"})
            }
            else if (data) {
                return res.status(200).send({
                    access: jwt.createAccessToken(user),
                    refresh: jwt.createRefreshToken(user)
                })
            } else {
                return res.status(401).send({msg: "HA IDO MAL"})
            }
        })
        
    }).catch((err) => {
        res.status(501).send("User or password wrong")
    })
}

export const AuthController = { register, login };