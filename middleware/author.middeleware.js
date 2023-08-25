const errors = require('../const/errors')

const Author = require('../models/Author.model')


const isExist = async (req, res, next) => {
    if(req.method === 'OPTIONS') { return next() }

    try {
        const author = await Author.findOne({ _id: req.author._id })
        if(!author) { return res.status(401).json(errors.notAuth.answer) }
        req.author = author

        next()
    } catch(error) {
        return res.status(500).json(errors.unknown.answer)
    }
}

const isComplite = async (req, res, next) => {
    if(req.method === 'OPTIONS') { return next() }

    if(!req.author?.complite) { return res.status(400).json(errors.notComplite) }

    next()
}

module.exports = {
    isExist,
    isComplite
}
    