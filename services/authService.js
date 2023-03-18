const jwt = require('jwt-simple')
const moment = require('moment');

function createToken(user) {
    const payload = {
        sub: user.id,
        iat: moment().unix(),
        exp: moment().add(7, 'days').unix()
    }

    return jwt.encode(payload, process.env.SECRET_TOKEN);
}

function decodeToken(token) {
    const decoded = new Promise((resolve, rejects) => {
        try {
            const payload = jwt.decode(token, process.env.SECRET_TOKEN)
            if (payload.exp <= moment.unix()) {
                rejects({
                    status: 401,
                    message: 'El token ha expirat'
                })
            }

            resolve(payload.sub)
        } catch (error) {
            rejects({
                status: 500,
                message: 'Invalid token'
            })
        }
    })

    return decoded
}

module.exports = {
    createToken,
    decodeToken
}