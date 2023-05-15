import { User } from "../models/index.js"

function register(req, res) {
    const { email, password } = req.body

    const user = new User({
        email: email.toLowerCase(),
        password: password,
    })

    user.save((error, userStorage) => {
        if (error) {
            res.status(404).send({msg: "HA IDO MAL"})
        } else {
            res.status(201).send(userStorage)
        }
    })
}

export const AuthController = { register };