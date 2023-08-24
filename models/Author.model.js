const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: '' },
    name: { type: String, default: '' },
    lastname: { type: String, default: '' },
    site: { type: String, default: '' },
    complite: { type: Boolean, default: false },
    verify: { type: Boolean, default: false },
    arcles: [ { type: Types.ObjectId, ref: 'Arcle' } ]
})

module.exports = model('Author', schema)
