const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: '' },
    text: { type: String, required: true },
    authorName: { type: String, require: true, default: 'Unknow' },
    author: { type: Types.ObjectId, ref: 'Author', required: true },
    coments: [ { type: Types.ObjectId, ref: 'Coment' } ],

    createdAt: {type: Number},
    updatedAt: {type: Number}
}, {
    timestamps: { currentTime: () => Date.now() }
})

module.exports = model('Arcle', schema)
