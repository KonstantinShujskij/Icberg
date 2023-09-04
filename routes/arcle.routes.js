const {Router} = require('express')
const { check, body } = require('express-validator')
const { isExist, isComplite } = require('../middleware/author.middeleware')
const auth = require('../middleware/auth.middleware')
const file = require('../middleware/file.middleware')
const addition = require('../middleware/addition.middleware')
const trappiner = require('../service/trappiner')

const consts = require('../const/consts')

const Arcle = require('../controllers/arcle.controller')


const router = Router()

router.post('/create', auth, isExist, isComplite, 
    addition({ loadType: consts.imagesLoadType.arcle }),
    file.single('image'),
    [
        check('title', 'IncorectTitle').isString().isLength(consts.arcle.title.len),
        check('description', 'IncorectDescription').isString().isLength(consts.arcle.description.len),
        check('text', 'IncorectText').isString().isLength(consts.arcle.text.len), 
    ], trappiner(async (req, res) => {
        const image = req.file?.filename

        await Arcle.create(req.author, req.body, image)
        
        res.json(true)
    })
)

router.post('/update', auth, isExist, isComplite, 
    addition({ loadType: 'arcle' }),
    file.single('image'),
    [
        check('title', 'IncorectTitle').isString().isLength(consts.arcle.title.len),
        check('description', 'IncorectDescription').isString().isLength(consts.arcle.description.len),
        check('text', 'IncorectText').isString().isLength(consts.arcle.text.len),
    ], 
    trappiner(async (req, res) => {
        const { id } = req.body
        const image = req.file?.filename

        await Arcle.update(req.author, id, req.body, image)
        
        res.json(true)
    })
)

router.post('/get', trappiner(async (req, res) => {
    const {id} = req.body

    const arcle = await Arcle.get(id)
    
    res.json(arcle)
}))

router.post('/byAuthor', trappiner(async (req, res) => {
    const { author, query } = req.body

    const arclesList = await Arcle.getByAuthor(author, query)
    
    res.json(arclesList)
}))

router.post('/list', trappiner(async (req, res) => {
    const { query } = req.body

    console.log(query);

    const arclesList = await Arcle.list(query)
    
    res.json(arclesList)
}))

module.exports = router
