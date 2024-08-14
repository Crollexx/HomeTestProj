require('dotenv').config()
const jwt = require('../config/jwtConfig')

function verifyRefreshToken(req, res, next) {
    try {
        const { refreshToken } = req.cookies
        const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        user = res.locals.user
        user()
    } catch (error) {

    }
}

module.exports = verifyRefreshToken