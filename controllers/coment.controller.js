const Coment = require('../models/Coment.model')
const Arcle = require('../controllers/arcle.controller')


async function create(author, params) {
    const coment = new Coment({
        author: author._id,
        authorName: `${author.name} ${author.lastname}`,
        arcle: params.arcle,
        text: params.text
    })

    await Arcle.addComent(params.arcle, coment._id)

    await coment.save()

    return coment
}

async function getByArcle(arcle) {
    const list = await Coment.find({ arcle })

    return list
}

module.exports = {
    create,
    getByArcle
}