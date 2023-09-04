const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const captcha = require('./service/captcha')

const config = require('config')
const path = require('path')


const app = express()

app.use(express.json({ extended: true }))
app.use(passport.initialize())

// Google OAuth 2.0 
passport.use(require('./service/google'))

// Static
app.use('/store', express.static(path.join(__dirname, 'store')))

// Routes
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/captcha', require('./routes/captcha.routes'))
app.use('/api/author', require('./routes/author.routes'))
app.use('/api/arcle', require('./routes/arcle.routes'))
app.use('/api/coment', require('./routes/coment.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

// Entry Point
async function start() {
    // there most be SSL 
    try {
        const PORT = config.get('port') || 5000
        const mongoUri = config.get('mongoUri')

        captcha.reset()

        await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
        
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}`))
    } catch(error) {
        console.log("Server error: ", error.message)
        process.exit(1)
    }
}

start()
