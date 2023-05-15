import mongoose from "mongoose"

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    firstName: String,
    lastName: String,
    number: Number,
    address: String,
})

export const User = mongoose.model("User", UserSchema);