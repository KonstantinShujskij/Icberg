const {Router} = require('express')
const { check } = require('express-validator')
const { isExist } = require('../middleware/author.middeleware')
const auth = require('../middleware/auth.middleware')
const file = require('../middleware/file.middleware')
const addition = require('../middleware/addition.middleware')
const trappiner = require('../service/trappiner')

const Author = require('../controllers/author.controller')


const router = Router()

router.post('/update', auth, isExist,
    addition({ loadType: 'avatar' }),
    file.single('avatar'),
    [
        check('name', 'IncorectName').optional({checkFalsy: true}).isString().isLength({min: 2}),
        check('lastname', 'IncorectLastname').optional({checkFalsy: true}).isString().isLength({min: 2}),
        check('website', 'IncorectWebsite').optional({checkFalsy: true}).isURL()
        // Magic Values
    ],
    trappiner(async (req, res) => {
        const avatar = req.file?.filename

        await Author.update(req.author, req.body, avatar)
        
        res.json(true)
    })
)

router.post('/get', trappiner(async (req, res) => {
    const { id } = req.body

    const author = await Author.get(id)
    
    res.json(author)
}))

router.post('/load', auth, trappiner(async (req, res) => {
    const author = await Author.load(req.author._id)
    
    res.json(author)
}))


module.exports = router
