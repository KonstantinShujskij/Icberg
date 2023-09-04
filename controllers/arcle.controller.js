const fs = require('fs')

const paths = require('../const/paths')
const errors = require('../const/errors')

const Arcle = require('../models/Arcle.model')


async function create(author, params, image) {
    const candidate = await Arcle.findOne({ author: author._id, title: params.title })
    if(candidate) { throw errors.arcleIsExist }
    if(!image) { throw errors.unknown }

    const arcle = new Arcle({
        title: params.title,
        description: params.description,
        text: params.text,
        image,
        author: author._id,
        authorName: `${author.name} ${author.lastname}`
    })

    author.arcles.push(arcle._id)

    await author.save()
    await arcle.save()

    return arcle
}

async function update(author, id, params, image) {
    const arcle = await Arcle.findOne({ _id: id })

    if(!arcle) { throw errors.notFind }
    if(!arcle.author.equals(author._id)) { throw errors.notAccess }

    if(params.title && params.title !== arcle.title) {
        const candidate = await Arcle.findOne({ author: author._id, title: params.title })
        if(candidate) { throw errors.arcleIsExist }

        arcle.title = params.title
    }
    if(params.description) { arcle.description = params.description }
    if(params.text) { arcle.text = params.text }
    if(image) { 
        if(arcle.image) { 
            fs.unlink(paths.arcleImage(author._id, arcle.image), (err) => {
                if(err) { throw errors.unknown }
            })
        }

        arcle.image = image 
    }

    await arcle.save()

    return arcle
}


async function addComent(id, comentId) {
    const arcle = await Arcle.findOne({ _id: id })
    if(!arcle) { throw errors.notFind }

    arcle.coments.push(comentId)

    await arcle.save()

    return arcle
}

async function get(id) {
    const arcle = await Arcle.findOne({ _id: id })
    if(!arcle) { throw errors.notFind }

    return arcle
}

async function getByAuthor(author, query) {
    const options = { author }
    if(query) { options.title = {$regex: `.*${query}.*`, $options: 'i'} }

    const list = await Arcle.find(options)
    const format = list.map((arcle) => ({
        ...arcle._doc,
        text: undefined,
        comentsCount: arcle.coments.length
    }))

    return format
}

async function list(query) {
    const options = query? {title: {$regex: `.*${query}.*`, $options: 'i'}} : undefined
    const list = await Arcle.find(options)

    const format = list.map((arcle) => ({
        ...arcle._doc,
        text: undefined,
        comentsCount: arcle.coments.length
    }))

    return format
}

module.exports = {
    create,
    update,
    addComent,
    get,
    getByAuthor,
    list
}