const multer = require('multer')
const paths = require('../const/paths')


const storage = multer.diskStorage({
    destination(req, _file, callback) { 
        // Magic Values
        if(req?.customPayload?.loadType === 'avatar') { 
            return callback(null, paths.authorDir(req.author._id)) 
        }
        if(req?.customPayload?.loadType === 'arcle') { 
            return callback(null, paths.arclesDir(req.author._id)) 
        }
 
        callback(null, `store/images/`) 
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