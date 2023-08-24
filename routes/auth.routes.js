const {Router} = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const {check} = require('express-validator')
const captcha = require('../middleware/captcha.middleware')
const trappiner = require('../service/trappiner')
const { generateLoginJwt } = require('../service/jwt')

const config = require('config')

const Author = require('../controllers/author.controller')


const router = Router()

router.get('/google', passport.authenticate('google', { session: false, scope: ['email'] })) // Magic Const

router.get('/google/redirect', passport.authenticate('google', { session: false }), (req, res) => {
    const author = req.user
    const token = generateLoginJwt(author._id)

    const baseUrl = config.get('baseUrl')
    res.redirect(`${baseUrl}/window?token=${token}&id=${author._id}`)
})

router.post('/login', captcha,
    [
        check('email', 'IncorectEmail').isEmail(),
        check('password', 'IncorectPassword').isLength({min: 8})
    ], 
    trappiner(async (req, res) => {
        const {email, password} = req.body

        const author = await Author.login(email, password)

        if(!author.verify) { return res.json({ token: null, userId: null, verify: false }) }

        const token = generateLoginJwt(author._id)
        
        res.json({ token, userId: author._id, verify: true })
    })
)

router.post('/verify', trappiner(async (req, res) => {
    const { token } = req.body
    const { _id } = jwt.verify(token, config.get('jwtSecret'))
    
    await Author.verify(_id)

    const accessToken = generateLoginJwt(_id)  

    res.json({ token: accessToken, userId: _id })
}))


module.exports = router
