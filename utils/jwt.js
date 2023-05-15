import jsonwebtoken from "jsonwebtoken"

function createAccessToken(user) {
    const expToken = new Date();
    expToken.setHours(expToken.getHours() + 24)

    const payload = {
        token_type: "access",
        user_id: user._id,
        iat: Date.now(),
        exp: expToken.getTime()
    };

    return jsonwebtoken.sign(payload, process.env.JWT_TOKEN)
} 

function createRefreshToken(user){
    const expToken = new Date();
    expToken.setHours(expToken.getMonth() + 1)

    const payload = {
        token_type: "refresh",
        user_id: user._id,
        iat: Date.now(),
        exp: expToken.getTime()
    };

    return jsonwebtoken.sign(payload, process.env.JWT_TOKEN)
}

function decoded(token) {
    return jsonwebtoken.decode(token, process.env.JWT_TOKEN, true)
}

export const jwt = {
    createAccessToken,
    createRefreshToken,
    decoded
}