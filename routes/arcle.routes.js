const {Router} = require('express')
const { check } = require('express-validator')
const { isExist, isComplite } = require('../middleware/author.middeleware')
const auth = require('../middleware/auth.middleware')
const file = require('../middleware/file.middleware')
const addition = require('../middleware/addition.middleware')
const trappiner = require('../service/trappiner')

const Arcle = require('../controllers/arcle.controller')


const router = Router()

router.post('/create', auth, isExist, isComplite, 
    addition({ loadType: 'arcle' }),
    file.single('image'),
    [
        check('title', 'IncorectTitle').isString().isLength({min: 6}),
        check('description', 'IncorectDescription').isString().isLength({min: 4, max: 500}),
        check('text', 'IncorectText').isString().isLength({min: 10, max: 10000}),
    ], trappiner(async (req, res) => {
        const image = req.file?.filename

        const arcle = await Arcle.create(req.author, req.body, image)
        
        res.json(true)
    })
)

router.post('/update', auth, isExist, isComplite, 
    addition({ loadType: 'arcle' }),
    file.single('image'),
    [
        check('title', 'IncorectTitle').isString().isLength({min: 6}),
        check('description', 'IncorectDescription').isString().isLength({min: 4, max: 500}),
        check('text', 'IncorectText').isString().isLength({min: 10, max: 10000}),
    ], 
    trappiner(async (req, res) => {
        const { id } = req.body
        const image = req.file?.filename

        const arcle = await Arcle.update(req.author, id, req.body, image)
        
        res.json(true)
    })
)

router.post('/get', trappiner(async (req, res) => {
    const {id} = req.body

    const arcle = await Arcle.get(id)
    
    res.json(arcle)
}))

router.post('/byAuthor', trappiner(async (req, res) => {
    const { author } = req.body

    const arclesList = await Arcle.getByAuthor(author)
    
    res.json(arclesList)
}))

router.post('/list', trappiner(async (req, res) => {
    const arclesList = await Arcle.list()
    
    res.json(arclesList)
}))

module.exports = router
