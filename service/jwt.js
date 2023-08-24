const jwt = require('jsonwebtoken')

const config = require('config')


const generateLoginJwt = (id) => { 
    const secret = config.get('jwtSecret')
    const alive = config.get('jwtAlive')

    return jwt.sign({ _id: id }, secret, { expiresIn: alive }) 
}

module.exports = { 
    generateLoginJwt,
}
