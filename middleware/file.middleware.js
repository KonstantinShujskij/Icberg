const multer = require('multer')

const storage = multer.diskStorage({
    destination(req, _file, callback) { 
        let prefix = ''

        // Magic Values
        if(req?.customPayload?.loadType === 'avatar') { prefix = `${req.author._id}/` }
        if(req?.customPayload?.loadType === 'arcle') { prefix = `${req.author._id}/arcles/` }
 
        callback(null, `store/images/${prefix}`) 
    },
    filename(_req, file, callback) { 
        const name = (new Date().toISOString() + '-' + file?.originalname).replace(/:/g, '-')
        callback(null, name) 
    }
})

const types = ['image/png', 'image/jpg', 'image/jpeg'] // Magic Values

const fileFilter = (req, file, callback) => {
    if(types.includes(file?.mimetype)) { callback(null, true) }
    else { callback(null, false) }
}

module.exports = multer({storage, fileFilter})