const {Router} = require('express')

const trappiner = require('../service/trappiner')
const captcha = require('../service/captcha')


const router = Router()

router.post('/get', trappiner(async (req, res) => {
    const { token, image } = await captcha.generateCaptcha()

    res.json({token, image})
}))

module.exports = router
