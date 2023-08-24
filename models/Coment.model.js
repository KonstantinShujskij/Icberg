const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    text: { type: String, required: true },
    authorName: { type: String },
    author: { type: Types.ObjectId, ref: 'Author' },
    arcle: { type: Types.ObjectId, ref: 'Arcle' },
    
    createdAt: { type: Number },
    updatedAt: { type: Number }
}, {
    timestamps: { currentTime: () => Date.now() }
})

module.exports = model('Coment', schema)
