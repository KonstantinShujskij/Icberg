const bcrypt = require('bcrypt')
const fs = require('fs')
const { generateLoginJwt } = require('../service/jwt')
const { sendComfirmLink } = require('../service/mail')

const paths = require('../const/paths')
const consts = require('../const/consts')
const errors = require('../const/errors')

const Author = require('../models/Author.model')


async function login(email, password, service=undefined) {
    const author = await Author.findOne({ email, verify: true })

    if(!author) {
        const hashedPassword = !service? await bcrypt.hash(password, 12) : 'None'
        
        let verify = false
        if(service === consts.authTypes.google) { verify = true }

        let author = await Author.findOne({ email })
        if(!author) { author = new Author({ email }) }

        author.password = hashedPassword
        author.verify = verify

        fs.mkdir(paths.arclesDir(author._id), { recursive: true }, (err) => { 
            if(err) { throw errors.unknown } 
        })

        if(!verify) {
            const token = generateLoginJwt(author._id)
            sendComfirmLink(email, token)
        }

        await author.save()

        return author
    }

    if(service === consts.authTypes.google) { return author } 

    const isMatch = await bcrypt.compare(password, author.password);
    if(!isMatch) { throw errors.notFind }

    return author
}

async function verify(id) {
    const author = await Author.findOne({ _id: id })

    if(!author) { throw errors.notFind }
    if(author.verify) { throw errors.notFind }

    author.verify = true
    await author.save()

    return true
}

function checkComplite(author) {
    if(author.name && author.lastname) return true

    return false
}

async function update(author, params, avatar) {
    if(params.name) { author.name = params.name }
    if(params.lastname) { author.lastname = params.lastname }
    if(params.website) { author.site = params.website }
    if(avatar) { 
        if(author.avatar) { 
            fs.unlink(paths.authorAvatar(author._id, author.avatar), (err) => {
                if(err) { throw errors.unknown }
            })
        }

        author.avatar = avatar 
    }

    if(!author.complite) { author.complite = checkComplite(author) }

    await author.save()

    return author
}

async function get(id) {
    const author = await Author.findOne({ _id: id })
    if(!author) { throw errors.notFind }

    return {
        id: author._id,
        name: author.name,
        lastname: author.lastname,
        site: author.site,
        avatar: author.avatar,
        arclesCount: author.arcles.length,
        arcles: author.arcles
    }
}

async function load(id) {
    const author = await Author.findOne({ _id: id })
    if(!author) { throw errors.notFind }

    return {
        id: author._id,
        complite: author.complite,
        name: author.name,
        lastname: author.lastname,
        site: author.site,
        avatar: author.avatar,
        arclesCount: author.arcles.length,
        arcles: author.arcles        
    }
}

module.exports = {
    login,
    verify,
    update,
    get,
    load
}