const captcha = require('../service/captcha')

const errors = require('../errors')


module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS') { return next() }

    try {
        if(!req.body.captcha) { return res.status(401).json(errors.noCaptcha.answer) }

        const { token, answer } = req.body.captcha
        const verify = captcha.verify(token, answer)

        if(!verify) { return res.status(401).json(errors.noValidCaptcha.answer) }

        next()
    } catch(error) {
        return res.status(401).json(errors.noAliveCaptcha.answer)
    }
}