const bcrypt = require('bcrypt');

function hashPassword(password) {
    const rounds = 10
    const salt = bcrypt.genSaltSync(rounds)
    return bcrypt.hashSync(password, salt)
}

function comparePassword(passIntrod, passUser) {
    return bcrypt.compareSync(passIntrod, passUser)
}

module.exports = {
    hashPassword,
    comparePassword
}