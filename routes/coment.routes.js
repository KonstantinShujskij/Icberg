const {Router} = require('express')
const { check } = require('express-validator')
const { isExist, isComplite } = require('../middleware/author.middeleware')
const auth = require('../middleware/auth.middleware')
const trappiner = require('../service/trappiner')

const Coment = require('../controllers/coment.controller')


const router = Router()

router.post('/create', auth, isExist, isComplite, 
    [
        check('text', 'IncorectComent').isString().isLength({min: 3, max: 500}) // Magic Values
    ], 
    trappiner(async (req, res) => {
        await Coment.create(req.author, req.body)
        
        res.json(true)
    })
)

router.post('/byArcle', trappiner(async (req, res) => {
    const { arcle } = req.body

    const comentsList = await Coment.getByArcle(arcle)
    
    res.json(comentsList)
}))


module.exports = router
